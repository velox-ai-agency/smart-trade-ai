/**
 * Customers → Export CSV must carry the same auth headers as every other
 * /api/trade/* fetch. Without them the endpoint answers 401 "Invalid or
 * missing session token" and the UI only shows "Export failed".
 *
 * Regression: exportCustomers() originally called fetch() with `{}` headers.
 */
const test = require('node:test');
const assert = require('node:assert');
const { SRC } = require('./_extract');

function loadExportCustomers() {
    const start = SRC.indexOf('async function exportCustomers()');
    assert.notEqual(start, -1, 'exportCustomers() must exist in static/js');
    const stop = SRC.indexOf('\nasync function downloadCsvTemplate', start);
    assert.ok(stop > start, 'exportCustomers() must end before downloadCsvTemplate()');
    const code = SRC.slice(start, stop);
    return new Function(
        'TOKEN', 'currentCompanyId', 'fetch', 'document', 'URL', 'setTimeout', 'toast', 'langText',
        code + '\nreturn exportCustomers;',
    );
}

function makeFetch(calls) {
    return async function (url, opts) {
        calls.push({ url, opts });
        return { ok: true, blob: async () => ({}) };
    };
}

test('export CSV sends session token and active company headers', async () => {
    const calls = [];
    const makeExport = loadExportCustomers();
    const exportCustomers = makeExport(
        'test-token', 2, makeFetch(calls),
        {
            createElement: () => ({ click() {}, remove() {} }),
            body: { appendChild() {} },
        },
        { createObjectURL: () => 'blob:test', revokeObjectURL() {} },
        () => {},
        () => {},
        (en) => en,
    );
    await exportCustomers();
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, '/api/trade/customers/export');
    assert.equal(calls[0].opts.headers['X-Hermes-Session-Token'], 'test-token');
    assert.equal(calls[0].opts.headers['X-Company-ID'], '2');
});

test('export CSV keeps the authenticated fetch from being silently dropped', () => {
    const start = SRC.indexOf('async function exportCustomers()');
    const stop = SRC.indexOf('\nasync function downloadCsvTemplate', start);
    const code = SRC.slice(start, stop);
    assert.match(code, /X-Hermes-Session-Token/);
    assert.match(code, /X-Company-ID/);
});
