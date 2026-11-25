/**
 * 付费 UI 门禁兼容层：本地构建里所有入口始终显示、所有目的地始终允许。
 */
const test = require('node:test');
const assert = require('node:assert');
const { loadRegion } = require('./_extract');

function makeNode() {
    const classes = new Set(['hidden']);
    return {
        classes,
        classList: {
            toggle(name, force) {
                if (force) classes.add(name);
                else classes.delete(name);
            },
            contains: (name) => classes.has(name),
            add: (name) => classes.add(name),
            remove: (name) => classes.delete(name),
        },
    };
}

function loadGate() {
    const paidNodes = [makeNode(), makeNode(), makeNode()];
    const importRow = makeNode();
    const document = {
        querySelectorAll(selector) {
            return selector === '[data-paid]' ? paidNodes : [];
        },
        getElementById(id) {
            if (id === 'import-company-row') return importRow;
            return null;
        },
    };
    const api = loadRegion(
        'license-gate',
        `{
            apply: _applyLicenseGates,
            allows: _licenseGateAllowsPaid,
            isPaidDestination: _isPaidDestination,
            activated: _licenseActivated
        }`,
        { document, loadCompanyListUI: () => {} },
    );
    return { api, paidNodes, importRow };
}

test('默认状态就是已激活', () => {
    const { api } = loadGate();
    assert.strictEqual(api.activated, true);
    assert.strictEqual(api.allows(), true);
});

test('所有 [data-paid] 与导入入口显示', () => {
    const { api, paidNodes, importRow } = loadGate();
    api.apply();
    for (const node of paidNodes) assert.strictEqual(node.classes.has('hidden'), false);
    assert.strictEqual(importRow.classes.has('hidden'), false);
});

test('所有目的地都不是付费专属', () => {
    const { api } = loadGate();
    for (const view of ['customers', 'tasks', 'history', 'chat']) {
        assert.strictEqual(api.isPaidDestination(view, ''), false, view);
    }
    for (const ctx of ['docs', 'docgen', 'osint', 'daily', 'lead', 'platform']) {
        assert.strictEqual(api.isPaidDestination('chat', ctx), false, ctx);
    }
});
