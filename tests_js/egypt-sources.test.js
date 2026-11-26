const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'skills', 'egypt-export-sources');

test('egypt-export-sources scaffolding exists with the required guardrails', () => {
    const file = path.join(root, 'SKILL.md');
    assert.ok(fs.existsSync(file), 'SKILL.md missing');
    const md = fs.readFileSync(file, 'utf8');
    ['Nafeza', 'GOEIC', 'Central Bank of Egypt', 'Direction', 'Destination', 'HS code', 'transport mode', 'never invent'].forEach(function (term) {
        assert.ok(md.toLowerCase().includes(term.toLowerCase()), 'missing: ' + term);
    });
    assert.ok(/ACI|CargoX/.test(md), 'must distinguish import-side ACI/CargoX');
});
