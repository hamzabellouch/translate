/**
 * Google Translate Capsule - Content Script (Firefox MV3)
 * High-speed in-place DOM TreeWalker translator with streaming parallel batching and CSP immunity
 */

(function () {
  if (window.__GT_CAPSULE_CONTENT_INITIALIZED__) {
    return;
  }
  window.__GT_CAPSULE_CONTENT_INITIALIZED__ = true;

  const originalTextsMap = new WeakMap();
  const originalDocTitle = document.title;
  const originalDocDir = document.documentElement.getAttribute('dir') || '';
  const originalDocLang = document.documentElement.getAttribute('lang') || '';

  let isCurrentlyTranslated = false;
  let currentSl = 'auto';
  let currentTl = 'en';
  let mutationObserver = null;
  let isTranslatingNow = false;

  const RTL_LANGS = new Set(['ar', 'he', 'fa', 'ur', 'ckb', 'ps', 'sd', 'ug', 'yi', 'bm-Nkoo']);
  const IGNORE_TAGS = new Set([
    'SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT',
    'CODE', 'PRE', 'KBD', 'SAMP', 'VAR', 'SVG', 'MATH', 'CANVAS'
  ]);

  // Load saved settings & auto-translate
  try {
    chrome.runtime.sendMessage({ action: 'GET_SETTINGS' }, (response) => {
      if (chrome.runtime.lastError) return;
      if (response?.success && response.settings) {
        const settings = response.settings;
        currentSl = settings.sl || 'auto';
        currentTl = settings.tl || 'en';

        const host = window.location.hostname;
        if (Array.isArray(settings.autoTranslateSites) && settings.autoTranslateSites.includes(host)) {
          startPageTranslation(currentSl, currentTl);
        }
      }
    });
  } catch (e) {}

  function collectTextNodes(root = document.body) {
    const textNodes = [];
    if (!root) return textNodes;

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;

          const tagName = parent.tagName.toUpperCase();
          if (IGNORE_TAGS.has(tagName)) return NodeFilter.FILTER_REJECT;

          if (parent.getAttribute('translate') === 'no' || parent.classList.contains('notranslate')) {
            return NodeFilter.FILTER_REJECT;
          }

          const text = node.textContent.trim();
          if (text.length > 0 && !/^[\d\s.,\/#!$%\^&\*;:{}=\-_`~()@+?><\[\]\\|'"’‘“”«»]+$/.test(text)) {
            return NodeFilter.FILTER_ACCEPT;
          }

          return NodeFilter.FILTER_REJECT;
        }
      }
    );

    let currentNode;
    while ((currentNode = walker.nextNode())) {
      textNodes.push(currentNode);
    }
    return textNodes;
  }

  function sendBatchTranslation(texts, sl, tl) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        action: 'TRANSLATE_BATCH',
        texts: texts,
        sl: sl,
        tl: tl
      }, (res) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else if (res && res.success) {
          resolve(res);
        } else {
          reject(new Error(res?.error || 'Batch translation returned failure'));
        }
      });
    });
  }

  function sendSingleTranslation(text, sl, tl) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        action: 'TRANSLATE_SINGLE',
        text: text,
        sl: sl,
        tl: tl
      }, (res) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else if (res && res.success) {
          resolve(res);
        } else {
          reject(new Error(res?.error || 'Single translation returned failure'));
        }
      });
    });
  }

  async function startPageTranslation(sl = 'auto', tl = 'en') {
    if (isTranslatingNow) {
      return;
    }
    isTranslatingNow = true;
    currentSl = sl;
    currentTl = tl;

    try {
      if (mutationObserver) {
        mutationObserver.disconnect();
      }

      const nodes = collectTextNodes(document.body);
      if (nodes.length === 0) {
        isCurrentlyTranslated = true;
        notifyBackgroundState();
        return;
      }

      const nodesToTranslate = [];
      const textsToTranslate = [];

      for (const node of nodes) {
        let orig = node.__gt_orig_text__ || originalTextsMap.get(node);

        // Capture initial original text only once to preserve pristine source language
        if (orig === undefined || orig === null) {
          orig = node.textContent;
          originalTextsMap.set(node, orig);
          node.__gt_orig_text__ = orig;
        }

        const trimmed = orig.trim();
        if (trimmed.length > 0) {
          nodesToTranslate.push(node);
          textsToTranslate.push(trimmed);
        }
      }

      // Split into batches of 30 text nodes
      const BATCH_SIZE = 30;
      const batchPromises = [];
      let successfulBatches = 0;

      for (let i = 0; i < textsToTranslate.length; i += BATCH_SIZE) {
        const batchTexts = textsToTranslate.slice(i, i + BATCH_SIZE);
        const batchNodes = nodesToTranslate.slice(i, i + BATCH_SIZE);

        const p = sendBatchTranslation(batchTexts, sl, tl)
          .then((response) => {
            if (response && response.success && Array.isArray(response.translations)) {
              successfulBatches++;
              for (let j = 0; j < batchNodes.length; j++) {
                const node = batchNodes[j];
                const trans = response.translations[j];
                if (trans && node && node.parentNode) {
                  const orig = node.__gt_orig_text__ || originalTextsMap.get(node) || '';
                  const leadingSpace = orig.match(/^\s*/)?.[0] || '';
                  const trailingSpace = orig.match(/\s*$/)?.[0] || '';
                  node.textContent = leadingSpace + trans + trailingSpace;
                }
              }
            }
          })
          .catch((err) => {
            console.error('Batch translation error:', err);
          });

        batchPromises.push(p);
      }

      // Translate title in parallel
      if (originalDocTitle && originalDocTitle.trim()) {
        sendSingleTranslation(originalDocTitle, sl, tl)
          .then((res) => {
            if (res && res.success && res.translated) {
              document.title = res.translated;
            }
          })
          .catch(() => {});
      }

      // Handle RTL alignment
      if (RTL_LANGS.has(tl)) {
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        if (originalDocDir) {
          document.documentElement.setAttribute('dir', originalDocDir);
        } else {
          document.documentElement.removeAttribute('dir');
        }
      }
      document.documentElement.setAttribute('lang', tl);

      await Promise.all(batchPromises);

      if (successfulBatches === 0 && textsToTranslate.length > 0) {
        throw new Error('All translation batches failed to execute.');
      }

      isCurrentlyTranslated = true;
      notifyBackgroundState();
      setupMutationObserver();
    } finally {
      isTranslatingNow = false;
    }
  }

  function restoreOriginalPage() {
    if (mutationObserver) {
      mutationObserver.disconnect();
    }

    const nodes = collectTextNodes(document.body);
    for (const node of nodes) {
      const orig = node.__gt_orig_text__ || originalTextsMap.get(node);
      if (orig !== undefined && orig !== null) {
        node.textContent = orig;
      }
    }

    document.title = originalDocTitle;
    if (originalDocDir) {
      document.documentElement.setAttribute('dir', originalDocDir);
    } else {
      document.documentElement.removeAttribute('dir');
    }

    if (originalDocLang) {
      document.documentElement.setAttribute('lang', originalDocLang);
    } else {
      document.documentElement.removeAttribute('lang');
    }

    isCurrentlyTranslated = false;
    notifyBackgroundState();
  }

  function setupMutationObserver() {
    if (mutationObserver) {
      mutationObserver.disconnect();
    }

    let mutationDebounceTimer = null;
    const pendingAddedNodes = [];

    mutationObserver = new MutationObserver((mutations) => {
      if (!isCurrentlyTranslated || isTranslatingNow) return;

      let hasNewText = false;
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const added of mutation.addedNodes) {
            if (added.nodeType === Node.ELEMENT_NODE && !IGNORE_TAGS.has(added.tagName)) {
              pendingAddedNodes.push(added);
              hasNewText = true;
            }
          }
        }
      }

      if (hasNewText) {
        clearTimeout(mutationDebounceTimer);
        mutationDebounceTimer = setTimeout(async () => {
          if (pendingAddedNodes.length === 0) return;
          const roots = pendingAddedNodes.splice(0, pendingAddedNodes.length);
          for (const root of roots) {
            const nodes = collectTextNodes(root);
            const batchNodes = [];
            const batchTexts = [];
            for (const n of nodes) {
              if (!n.__gt_orig_text__ && !originalTextsMap.has(n)) {
                const orig = n.textContent;
                originalTextsMap.set(n, orig);
                n.__gt_orig_text__ = orig;
                const trimmed = orig.trim();
                if (trimmed.length > 0) {
                  batchNodes.push(n);
                  batchTexts.push(trimmed);
                }
              }
            }

            if (batchTexts.length > 0) {
              try {
                const res = await sendBatchTranslation(batchTexts, currentSl, currentTl);
                if (res?.success && Array.isArray(res.translations)) {
                  for (let i = 0; i < batchNodes.length; i++) {
                    const node = batchNodes[i];
                    const trans = res.translations[i];
                    if (trans && node && node.parentNode) {
                      const orig = node.__gt_orig_text__ || '';
                      const leadingSpace = orig.match(/^\s*/)?.[0] || '';
                      const trailingSpace = orig.match(/\s*$/)?.[0] || '';
                      node.textContent = leadingSpace + trans + trailingSpace;
                    }
                  }
                }
              } catch (e) {}
            }
          }
        }, 300);
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function notifyBackgroundState() {
    try {
      chrome.runtime.sendMessage({
        action: 'UPDATE_TAB_STATE',
        isTranslated: isCurrentlyTranslated,
        tl: currentTl,
        sl: currentSl,
        title: document.title
      }, () => {
        void chrome.runtime.lastError;
      });
    } catch (e) {}
  }

  // Message listener from popup & background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
      case 'START_PAGE_TRANSLATION':
        startPageTranslation(request.sl || 'auto', request.tl || 'en')
          .then(() => {
            sendResponse({ success: true, isTranslated: true, tl: currentTl });
          })
          .catch((err) => {
            console.error('Page translation execution error:', err);
            sendResponse({ success: false, error: err.message || 'Translation execution failed' });
          });
        return true; // Keep async message channel open

      case 'RESTORE_PAGE_ORIGINAL':
        restoreOriginalPage();
        sendResponse({ success: true, isTranslated: false });
        break;

      case 'GET_PAGE_STATUS':
        sendResponse({
          success: true,
          isTranslated: isCurrentlyTranslated,
          tl: currentTl,
          sl: currentSl,
          title: document.title
        });
        break;

      default:
        sendResponse({ success: false, error: 'Unknown action' });
        break;
    }
  });
})();
