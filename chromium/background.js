/**
 * Google Translate Capsule - Background Service Worker (Chromium MV3)
 * High-speed stateless Google Translate engine with native array batching,
 * multi-tier fallback resilience, and in-memory caching.
 */

const DEFAULT_SETTINGS = {
  sl: 'auto',
  tl: 'en',
  defaultLang: 'en',
  autoTranslateSites: []
};

// In-memory tab states: tabId -> { isTranslated: boolean, tl: string, sl: string, title: string, updatedAt: number }
const tabStates = new Map();

// In-memory translation cache: key `${sl}:${tl}:${text}` -> translatedText
const translationCache = new Map();

// Initialize settings and Context Menus
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
    chrome.storage.sync.set(items);
  });

  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'translate-full-page',
      title: 'Translate Page with Google Translate',
      contexts: ['page']
    });
  });
});

chrome.tabs.onRemoved.addListener((tabId) => {
  tabStates.delete(tabId);
});

// Context menu actions
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab || !tab.id) return;

  if (info.menuItemId === 'translate-full-page') {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
      chrome.tabs.sendMessage(tab.id, {
        action: 'START_PAGE_TRANSLATION',
        sl: settings.sl || 'auto',
        tl: settings.tl || 'en'
      }, () => {
        void chrome.runtime.lastError;
      });
    });
  }
});

/**
 * Translate a single text string with multi-tier resilient fallback
 */
async function translateGoogleSingle(text, from = 'auto', to = 'en') {
  if (!text || !text.trim()) {
    return { translated: text, detectedLang: from };
  }

  const cacheKey = `${from}:${to}:${text}`;
  if (translationCache.has(cacheKey)) {
    return { translated: translationCache.get(cacheKey), detectedLang: from };
  }

  const sl = encodeURIComponent(from || 'auto');
  const tl = encodeURIComponent(to || 'en');

  // Tier 1: translate_a/single (dj=1 JSON mode)
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&dj=1`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      credentials: 'omit',
      body: 'q=' + encodeURIComponent(text)
    });

    if (response.ok) {
      const data = await response.json();
      let translated = '';
      if (Array.isArray(data.sentences)) {
        translated = data.sentences.map((s) => s?.trans || '').join('');
      }
      const detectedLang = data.src || from;

      if (translated && translated.trim()) {
        translationCache.set(cacheKey, translated);
        return { translated, detectedLang };
      }
    }
  } catch (err) {
    // Silently proceed to Tier 2
  }

  // Tier 2: translate_a/t
  try {
    const url = `https://translate.googleapis.com/translate_a/t?client=gtx&sl=${sl}&tl=${tl}&v=1.0`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      credentials: 'omit',
      body: 'q=' + encodeURIComponent(text)
    });

    if (response.ok) {
      const data = await response.json();
      let translated = '';
      let detectedLang = from;

      if (Array.isArray(data)) {
        const first = data[0];
        if (Array.isArray(first)) {
          translated = first[0] || '';
          detectedLang = first[1] || from;
        } else if (typeof first === 'string') {
          translated = first;
        }
      } else if (typeof data === 'string') {
        translated = data;
      }

      if (translated && translated.trim()) {
        translationCache.set(cacheKey, translated);
        return { translated, detectedLang };
      }
    }
  } catch (err) {
    // Silently proceed to Tier 3
  }

  // Tier 3: batchexecute RPC
  try {
    const reqData = JSON.stringify([[text, from || 'auto', to || 'en', true], [null]]);
    const body = 'f.req=' + encodeURIComponent(JSON.stringify([[['MkEWBc', reqData, null, 'generic']]]));

    const response = await fetch('https://translate.google.com/_/TranslateWebserverUi/data/batchexecute?rpcids=MkEWBc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      credentials: 'omit',
      body: body
    });

    if (response.ok) {
      const raw = await response.text();
      const lines = raw.split('\n');
      for (const line of lines) {
        if (line.startsWith('[') && line.includes('MkEWBc')) {
          const parsed = JSON.parse(line);
          const inner = JSON.parse(parsed[0][2]);
          const translations = inner[1]?.[0]?.[0]?.[5];
          let translated = '';
          if (Array.isArray(translations)) {
            translated = translations.map((t) => (t && t[0] ? t[0] : '')).join('');
          } else if (inner[1]?.[0]?.[0]?.[0]) {
            translated = inner[1][0][0][0];
          }
          const detectedLang = inner[0]?.[2] || from;

          if (translated && translated.trim()) {
            translationCache.set(cacheKey, translated);
            return { translated, detectedLang };
          }
        }
      }
    }
  } catch (err) {
    // Fallback to original text
  }

  return { translated: text, detectedLang: from };
}

/**
 * Translate an array of text strings using native multi-q batching and parallel chunking
 */
async function translateGoogleBatch(texts, from = 'auto', to = 'en') {
  if (!texts || texts.length === 0) {
    return { translations: [], detectedLang: from };
  }

  const results = new Array(texts.length);
  const uncachedIndices = [];
  const uncachedTexts = [];

  // 1. Check cache first
  for (let i = 0; i < texts.length; i++) {
    const t = texts[i];
    if (!t || !t.trim()) {
      results[i] = t;
      continue;
    }
    const cacheKey = `${from}:${to}:${t}`;
    if (translationCache.has(cacheKey)) {
      results[i] = translationCache.get(cacheKey);
    } else {
      uncachedIndices.push(i);
      uncachedTexts.push(t);
    }
  }

  if (uncachedTexts.length === 0) {
    return { translations: results, detectedLang: from };
  }

  // 2. Chunk uncached texts (up to 30 items or ~3000 chars per batch)
  const chunks = [];
  let currentChunkTexts = [];
  let currentChunkIndices = [];
  let currentLength = 0;

  for (let k = 0; k < uncachedTexts.length; k++) {
    const text = uncachedTexts[k];
    const textLen = text.length;

    if (currentChunkTexts.length >= 30 || (currentLength + textLen > 3000 && currentChunkTexts.length > 0)) {
      chunks.push({ texts: currentChunkTexts, indices: currentChunkIndices });
      currentChunkTexts = [];
      currentChunkIndices = [];
      currentLength = 0;
    }

    currentChunkTexts.push(text);
    currentChunkIndices.push(uncachedIndices[k]);
    currentLength += textLen;
  }

  if (currentChunkTexts.length > 0) {
    chunks.push({ texts: currentChunkTexts, indices: currentChunkIndices });
  }

  // 3. Process all chunks in parallel using native multi-q translation
  let detectedLang = from;
  await Promise.all(chunks.map(async (chunk) => {
    try {
      const sl = encodeURIComponent(from || 'auto');
      const tl = encodeURIComponent(to || 'en');
      const url = `https://translate.googleapis.com/translate_a/t?client=gtx&sl=${sl}&tl=${tl}&v=1.0`;

      const params = new URLSearchParams();
      for (const txt of chunk.texts) {
        params.append('q', txt);
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        credentials: 'omit',
        body: params.toString()
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length === chunk.texts.length) {
          for (let idx = 0; idx < chunk.texts.length; idx++) {
            const original = chunk.texts[idx];
            const item = data[idx];
            let trans = '';

            if (Array.isArray(item)) {
              trans = item[0] || '';
              if (item[1]) detectedLang = item[1];
            } else if (typeof item === 'string') {
              trans = item;
            }

            const finalStr = trans && trans.trim() ? trans : original;
            results[chunk.indices[idx]] = finalStr;
            translationCache.set(`${from}:${to}:${original}`, finalStr);
          }
          return;
        }
      }

      // Fallback if batch format mismatches
      throw new Error(`Batch response format mismatch or HTTP status: ${response.status}`);
    } catch (chunkErr) {
      // Resilient fallback: translate items individually in parallel
      await Promise.all(chunk.texts.map(async (original, idx) => {
        try {
          const singleRes = await translateGoogleSingle(original, from, to);
          results[chunk.indices[idx]] = singleRes.translated;
          if (singleRes.detectedLang) detectedLang = singleRes.detectedLang;
        } catch (e) {
          results[chunk.indices[idx]] = original;
        }
      }));
    }
  }));

  return { translations: results, detectedLang };
}

// Handle runtime messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const tabId = sender.tab ? sender.tab.id : request.tabId;

  switch (request.action) {
    case 'TRANSLATE_BATCH': {
      translateGoogleBatch(request.texts, request.sl || 'auto', request.tl || 'en')
        .then((res) => {
          sendResponse({ success: true, translations: res.translations, detectedLang: res.detectedLang });
        })
        .catch((err) => {
          console.error('Batch translation failed:', err);
          sendResponse({ success: false, error: err.message, translations: request.texts });
        });
      return true; // Keep async channel open
    }

    case 'TRANSLATE_SINGLE': {
      translateGoogleSingle(request.text, request.sl || 'auto', request.tl || 'en')
        .then((res) => {
          sendResponse({ success: true, translated: res.translated, detectedLang: res.detectedLang });
        })
        .catch((err) => {
          console.error('Single translation failed:', err);
          sendResponse({ success: false, error: err.message, translated: request.text });
        });
      return true; // Keep async channel open
    }

    case 'UPDATE_TAB_STATE': {
      if (tabId) {
        tabStates.set(tabId, {
          isTranslated: !!request.isTranslated,
          tl: request.tl || 'en',
          sl: request.sl || 'auto',
          title: request.title || '',
          updatedAt: Date.now()
        });
      }
      sendResponse({ success: true });
      break;
    }

    case 'GET_TAB_STATE': {
      const state = tabStates.get(tabId) || { isTranslated: false, tl: 'en', sl: 'auto' };
      sendResponse({ success: true, state });
      break;
    }

    case 'SAVE_SETTINGS': {
      if (request.settings) {
        chrome.storage.sync.set(request.settings, () => {
          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: false });
      }
      return true;
    }

    case 'GET_SETTINGS': {
      chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
        sendResponse({ success: true, settings: items });
      });
      return true;
    }

    default:
      sendResponse({ success: false, error: 'Unknown action' });
      break;
  }
});
