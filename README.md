# Translate

A modern, fast, and sleek browser extension to translate entire webpages in real-time powered by **Google Translate**. Designed with a modern capsule-style popup interface, instant language switching, dynamic content support, multi-tier fallback resilience, and over **250+ supported languages**.

Compatible with all major browsers: **Google Chrome, Brave, Microsoft Edge, Opera (Chromium-based)** and **Mozilla Firefox**.

---

### <a name="Features"></a> ⭐ Features

- **Full-Page In-Place Translation:** Fast DOM TreeWalker engine translates text in place without breaking page layout, scripts, or styles.
- **250+ Languages Supported:** Instant access to 250+ world languages with alphabetical grouping and quick real-time search.
- **Smart Capsule Interface:** Modern popup UI with quick access to top languages (English, Arabic, French, Spanish, German, Turkish, Russian, Chinese, Japanese, Korean) and system default detection.
- **Dynamic Content & SPA Support:** Automatically observes and translates dynamic elements, infinite scrolling feeds, and AJAX content with `MutationObserver`.
- **Automatic RTL/LTR Handling:** Automatically switches page direction to Right-to-Left (`rtl`) for Arabic, Persian, Urdu, Hebrew, and other RTL languages.
- **Multi-Tier Google Translate Engine:** High-reliability fallback architecture:
  - **Tier 1:** `translate_a/single` (JSON mode)
  - **Tier 2:** `translate_a/t` (Batch mode)
  - **Tier 3:** `batchexecute` RPC fallback
- **High Performance & In-Memory Caching:** Batched parallel translation requests with smart in-memory caching to eliminate duplicate requests.
- **Right-Click Context Menu:** One-click full page translation from the browser context menu.
- **Privacy-Focused:** Direct client-side requests to translation endpoints without any third-party tracking, analytics, or external servers.

---

### <a name="RepositoryStructure"></a> 📁 Repository Structure

```text
├── chromium/          # Extension build directory for Chrome, Brave, Edge, Opera
│   ├── fonts/         # Twemoji flag font assets
│   ├── icons/         # Extension icons (16px, 32px, 48px, 128px)
│   ├── background.js  # Service worker with multi-tier translation & caching
│   ├── content.js     # DOM TreeWalker & MutationObserver content script
│   ├── manifest.json  # Chromium Manifest V3 configuration
│   ├── popup.css      # Capsule UI stylesheet
│   ├── popup.html     # Popup entry point
│   └── popup.js       # Capsule controller & 250+ language browser
│
├── firefox/           # Extension build directory for Mozilla Firefox
│   ├── fonts/         # Twemoji flag font assets
│   ├── icons/         # Extension icons (16px, 32px, 48px, 128px)
│   ├── background.js  # Background script with multi-tier translation & caching
│   ├── content.js     # DOM TreeWalker & MutationObserver content script
│   ├── manifest.json  # Firefox Manifest V3 configuration (with Gecko ID)
│   ├── popup.css      # Capsule UI stylesheet
│   ├── popup.html     # Popup entry point
│   └── popup.js       # Capsule controller & 250+ language browser
│
└── .gitignore         # Prevents tracking of OS metadata, IDE configurations, etc.
```

---

### <a name="InstallationUsage"></a> ⚙️ Installation & Usage

### <a name="ForChromiumBasedBrowsers"></a> 🌐 For Chromium-Based Browsers (Chrome, Brave, Edge, Opera)

1. Open your Chromium-based browser and navigate to:
   - **Google Chrome / Brave / Opera:** `chrome://extensions/`
   - **Microsoft Edge:** `edge://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked**.
4. Select the `chromium/` directory:

```text
chromium/
├── fonts/
├── icons/
├── background.js
├── content.js
├── manifest.json
├── popup.css
├── popup.html
└── popup.js
```

5. The extension will be installed and ready to use in your browser toolbar.

### <a name="ForMozillaFirefox"></a> 🦊 For Mozilla Firefox

1. Open **Mozilla Firefox** and navigate to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**.
3. Select the `manifest.json` file inside the `firefox/` directory:

```text
firefox/
└── manifest.json
```

4. The extension is now loaded and active.

---

### <a name="PrivacySafety"></a> 🛡️ Privacy & Safety

- **No Data Harvesting:** The extension does not collect, log, or share your browsing history, personal data, or translated contents.
- **Direct Communication:** Translation requests are sent directly from your browser to Google Translate servers.
- **Local In-Memory Cache:** Cached translations exist only within the active browser session memory and are never sent to external servers.

---

> [!WARNING]
> Machine translations are automated and may occasionally contain inaccuracies. Translations are powered by Google Translate services.

---

### <a name="Copyright2026"></a> Copyright © 2026

Thank you for using Translate. For inquiries or collaboration, please contact:  
hamzabellouchcontact@gmail.com

Stay connected and follow us on:  
[WhatsApp](https://whatsapp.com/channel/0029Vb7MArw0LKZMpjjqOk2P) | [Facebook](https://facebook.com/hamzabellouch1) | [Instagram](https://instagram.com/hamzabellouch0) | [Twitter](https://twitter.com/hamzabellouch0) | [Telegram](https://t.me/hammzabellouch) | [LinkedIn](https://www.linkedin.com/in/hamzabellouch)
