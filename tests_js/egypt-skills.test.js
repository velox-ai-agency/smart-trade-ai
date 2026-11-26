const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const skills = read('static/js/skills.js');
const i18n = read('static/js/i18n.js');
const chat = read('static/js/chat.js');
const html = read('static/trade_chat.html');

const EGYPT_IDS = ['b2b-egypt-pack', 'egypt-export-sources'];

function langBlock(name, next) {
    const start = i18n.indexOf('\n    ' + name + ': {');
    assert.ok(start >= 0, 'I18N.' + name + ' missing');
    const end = next ? i18n.indexOf('\n    ' + next + ': {', start) : i18n.indexOf('\n};', start);
    assert.ok(end > start);
    return i18n.slice(start, end);
}

test('Egypt packs are visible in the 47-skill help list', () => {
    const groups = Array.from(skills.matchAll(/\{g:"([^"]+)",items:/g)).map(m => m[1]);
    const items = Array.from(skills.matchAll(/\{n:"([^"]+)",d:"[^"]*",t:"[^"]*"\}/g)).map(m => m[1]);
    assert.equal(groups.length, 8);
    assert.equal(items.length, 47);
    assert.ok(groups.includes('Egypt'), 'Egypt group missing');
    for (const id of EGYPT_IDS) assert.ok(items.includes(id), 'missing skill: ' + id);
});

test('Egypt skills are localized in ZH/EN/AR', () => {
    for (const block of [langBlock('zh', 'en'), langBlock('en', 'ar'), langBlock('ar', null)]) {
        assert.ok(block.includes("'skills.group.Egypt'"), 'missing Egypt group key');
        for (const id of EGYPT_IDS) {
            assert.ok(block.includes("'skills." + id + ".d'"), 'missing description: ' + id);
            assert.ok(block.includes("'skills." + id + ".t'"), 'missing triggers: ' + id);
        }
    }
    assert.ok(i18n.includes('全部 47 个技能速查'));
    assert.ok(i18n.includes('All 47 Skills Reference'));
    assert.ok(html.includes('全部 47 个技能速查'));
});

test('slash commands insert English triggers for Egypt skills', () => {
    assert.ok(chat.includes("'b2b-egypt-pack': 'egypt pack'"));
    assert.ok(chat.includes("'egypt-export-sources': 'egypt export sources'"));
});
