# Security Policy

## Supported Versions

The following versions of **Translate** are currently supported with security and stability updates.

| Version | Supported |
| -------- | --------- |
| 1.0.x (latest release) | ✅ |
| < 1.0.0 | ❌ |

---

## Reporting a Vulnerability

If you discover a security vulnerability, privacy issue, or potential data leak in **Translate**, please report it responsibly.

### Before Reporting

Please ensure that:

- The issue is reproducible.
- You are using the latest supported version of **Translate**.
- The issue is not caused by modified builds, unsupported browser forks, or conflicting third-party extensions.

### How to Report

You can report vulnerabilities through:

- **GitHub Issues** (for general non-sensitive bugs or security queries)
- **Email Contact:** `hamzabellouchcontact@gmail.com` (for sensitive vulnerabilities, security disclosures, or exploit details)

When submitting a report, please include:

- Browser name and version (e.g., Chrome 120, Firefox 125)
- Operating system and version
- Extension version (e.g., v1.0.0)
- Steps to reproduce the vulnerability
- Target webpage URL or sample HTML snippet (if relevant)
- Screenshots, logs, or console error messages
- A clear assessment of the potential security impact

### Response Policy

Security reports are reviewed as quickly as possible.

If a report is confirmed:

- The vulnerability will be investigated and patched promptly.
- A fix will be included in the next update release.
- Credit will be given to the reporter upon request.

If a report cannot be reproduced, lacks sufficient information, or is determined not to pose a security risk, it will be closed with an explanation.

---

## Security & Architecture Notes

**Translate** operates within the browser sandbox to provide webpage translation:

- **Permissions Model:** The extension requests only necessary permissions (`storage`, `activeTab`, `scripting`, `contextMenus`, and translation host permissions) required to translate webpages.
- **No Remote Code Execution:** All extension logic is packaged locally in accordance with Manifest V3 standards. No remote scripts are evaluated or injected.
- **Data Privacy:** Page content is processed locally and transmitted directly to official Google Translate endpoints. No intermediary servers, analytics trackers, or user telemetry exist in this extension.
- **DOM Sanitization:** Content script safely modifies text nodes using `TreeWalker` and preserves original markup without injecting malicious executable scripts into the host page context.

Security and user privacy are foundational priorities for this project.
