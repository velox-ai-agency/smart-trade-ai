# Repo recon — Trade AI Assistant localization (snapshot 2026-11-26)

> Dormant reference. The user cancelled the Egypt-market repositioning; this file only records what is currently changed in the repo so nobody re-does or loses it.

Repo: `/Users/h/.trade/foreign-trade-assistant` (git status at 2026-11-26),
overlay: `skills/b2b-egypt-pack/` (untracked, mirrored from `~/.hermes/skills/b2b-egypt-pack/`).

## Modified tracked files
- `static/js/i18n.js` — translation dictionaries/helpers; biggest file, touched 2026-11-26 01:39.
- `static/js/chat.js` — chat UI strings; 01:41.
- `static/js/customers.js` — Customers screen/dialog strings; 01:41. **Canonical stored values for stage/buyer type stay Chinese**; only display text is translated (`t()` / `langText()`), matching the existing backend data.
- `static/js/views.js` — shared views/selectors; 01:17.
- `static/js/mailboxes.js` — Mailboxes screen strings; 01:02.
- `static/trade_chat.html` — markup/data-lang-key attributes.

## New test files (untracked)
- `tests_js/cron-templates-localization.test.js`
- `tests_js/customers-localization.test.js`
- `tests_js/library-localization.test.js`
- `tests_js/mailboxes-localization.test.js`

## Modified tests
- `tests_js/inquiry-wall.test.js`, `tests_js/syntax-guard.test.js`, `tests_js/xss-guard.test.js`.

## Rule to preserve
Chinese inside hidden attributes (`data-stage`, `<option value>`) is expected and correct — it is stored data, not untranslated UI. Do not "fix" it by writing Chinese canonical values or by translating stored values. Change display text only, and bump the cache-busting version for changed assets.

## Verification to run after any further UI edit
Node syntax guards + the four localization tests listed above, then reload the UI in all three languages (EN / AR / ZH) and check Customers / Inquiries / Mailboxes / Library / Cron screens and their dialogs.
