/**
 * Customers → Import CSV must touch only the Import button.
 *
 * Regression: bulkImportCustomers() used `fileInput.nextElementSibling`,
 * which is the "New customer" button, and overwrote its label with
 * "Import upload" after every import. The completion toast was also
 * hard-coded Chinese in an otherwise English UI.
 */
const test = require('node:test');
const assert = require('node:assert');
const { SRC } = require('./_extract');

function loadBulkImport() {
    const start = SRC.indexOf('async function bulkImportCustomers()');
    assert.notEqual(start, -1, 'bulkImportCustomers() must exist in static/js');
    const stop = SRC.indexOf('\nasync function ', start + 10);
    assert.ok(stop > start, 'bulkImportCustomers() must end before the next function');
    return new Function(
        'document', '$', 'FormData', 'TradeWait', 'api', 'toast',
        'loadCustomersData', 'renderCustomersTable', 'currentView',
        'allCustomers', 'btnIcon', 'langText', 'currentCompanyId',
        SRC.slice(start, stop) + '\nreturn bulkImportCustomers;',
    );
}

function setup() {
    const origNew = '＋ New customer';
    const origImport = '<svg></svg> Import CSV';
    const buttons = {
        'cust-import-btn': { id: 'cust-import-btn', innerHTML: origImport, disabled: false },
        'cust-new-btn': { id: 'cust-new-btn', innerHTML: origNew, disabled: false },
    };
    const fileInput = {
        id: 'cust-bulk-file', files: [{ name: 'leads.csv' }], value: 'leads.csv',
        nextElementSibling: buttons['cust-new-btn'],
    };
    const document = { getElementById: id => ({ 'cust-bulk-file': fileInput, ...buttons })[id] };
    const calls = [];
    const toasts = [];
    const make = loadBulkImport();
    const run = make(
        document, document.getElementById.bind(document),
        class { constructor() { this.parts = {}; } append(k, v) { this.parts[k] = v; } },
        { inline() { return null; } },
        async (method, path, body) => { calls.push({ method, path, body }); return { created: 2, skipped: 0 }; },
        msg => toasts.push(msg),
        async () => {}, () => {}, 'customers', [],
        () => '', (zh, en) => en, 2,
    );
    return { run, buttons, fileInput, calls, toasts, origImport, origNew };
}

test('import CSV posts FormData and leaves New customer button untouched', async () => {
    const ctx = setup();
    await ctx.run();
    assert.equal(ctx.calls.length, 1);
    assert.equal(ctx.calls[0].method, 'POST');
    assert.equal(ctx.calls[0].path, '/api/trade/customers/bulk');
    assert.equal(ctx.calls[0].body.parts.file.name, 'leads.csv');
    assert.equal(ctx.buttons['cust-new-btn'].innerHTML, ctx.origNew,
        'New customer button must not be repurposed as the import button');
    assert.equal(ctx.buttons['cust-import-btn'].innerHTML, ctx.origImport,
        'Import button label must be restored after upload');
    assert.equal(ctx.fileInput.value, '');
});

test('import completion toast is localized, not Chinese-only', async () => {
    const ctx = setup();
    await ctx.run();
    assert.equal(ctx.toasts.length, 1);
    assert.doesNotMatch(ctx.toasts[0], /[\u4e00-\u9fff]/);
    assert.match(ctx.toasts[0], /2/);
});
