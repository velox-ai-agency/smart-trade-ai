/**
 * Backend failures must be readable in the UI language. The backend now
 * emits English details (Chinese removed 2026-11-26); localizeApiError maps
 * the known English literals to Arabic when the UI runs in Arabic, and
 * unknown details pass through untouched so nothing is ever hidden.
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { SRC, JS_DIR } = require('./_extract');

const i18n = fs.readFileSync(path.join(JS_DIR, 'i18n.js'), 'utf8');
const api = fs.readFileSync(path.join(JS_DIR, 'api.js'), 'utf8');

function loadLocalizer(lang) {
    const fnStart = i18n.indexOf('function localizeApiError');
    assert.notEqual(fnStart, -1, 'i18n.js must define localizeApiError()');
    const mapStart = i18n.lastIndexOf('const API_ERROR_L10N', fnStart);
    assert.ok(mapStart !== -1 && mapStart < fnStart);
    const nextFn = i18n.indexOf('\nfunction ', fnStart + 10);
    const code = i18n.slice(mapStart, nextFn > fnStart ? nextFn : undefined);
    return new Function('langText', code + '\nreturn localizeApiError;')(
        (zh, en) => (lang === 'en' ? en : zh),
    );
}

test('backend CSV errors are shown in English instead of Chinese', () => {
    const localize = loadLocalizer('en');
    for (const detail of [
        'File is not UTF-8 encoded. In Excel use "Save As → CSV UTF-8 (Comma delimited)" and import again.',
        'CSV is empty or has no header row',
        'Failed to parse the CSV format',
    ]) {
        const msg = localize(detail);
        assert.notEqual(msg, detail, `detail was not mapped: ${detail}`);
    }
});

test('dynamic CSV row detail keeps the detected-headers hint in English', () => {
    const localize = loadLocalizer('en');
    const msg = localize('No valid rows found. The CSV needs a "name" column; detected headers: company_title, tel');
    assert.match(msg, /No valid rows found/);
    assert.match(msg, /detected headers: company_title, tel/);
});

test('Arabic UI maps the same backend details to Arabic (via AR_TERMS)', () => {
    const ar = fs.readFileSync(path.join(JS_DIR, 'i18n.js'), 'utf8');
    for (const key of [
        'Failed to parse the CSV format',
        'Company data import/export is a paid feature — activate your license to use it.',
        'Currency must be 3 uppercase letters (e.g. USD/EUR).',
    ]) {
        assert.ok(ar.includes(JSON.stringify(key)), `AR_TERMS must carry: ${key}`);
    }
});

test('unknown backend errors pass through unchanged', () => {
    const localize = loadLocalizer('en');
    assert.equal(localize('Something unexpected'), 'Something unexpected');
});

test('CSV import asks api() for a sticky, localized error toast', () => {
    const start = SRC.indexOf('async function bulkImportCustomers()');
    const stop = SRC.indexOf('\nasync function ', start + 10);
    const body = SRC.slice(start, stop);
    assert.match(body, /\/api\/trade\/customers\/bulk[^\n]*\{ sticky: true \}/,
        'import must request sticky error toasts');
    assert.match(api, /toast\(msg, \{sticky: sticky \|\|/,
        'api() must honour the sticky option for 4xx errors too');
    assert.match(api, /localizeApiError\(/,
        'api() must localize backend detail strings before toasting');
});
