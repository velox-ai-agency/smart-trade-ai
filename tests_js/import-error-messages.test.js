/**
 * CSV import failures must be readable: the backend returns Chinese 400
 * details and api() used to show them in a 3-second, auto-dismissing toast.
 * Users saw a Chinese flash they could not read or translate.
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
        '文件编码不是 UTF-8，请用 Excel 另存为 CSV UTF-8',
        'CSV 中没有有效数据（至少需要 name 列）',
        'CSV 文件为空或缺少表头',
    ]) {
        const msg = localize(detail);
        assert.doesNotMatch(msg, /[\u4e00-\u9fff]/, `untranslated detail: ${detail}`);
        assert.notEqual(msg, detail, `detail was not mapped: ${detail}`);
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
