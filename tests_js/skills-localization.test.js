const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skills = fs.readFileSync(path.join(root, 'static/js/skills.js'), 'utf8');
const i18n = fs.readFileSync(path.join(root, 'static/js/i18n.js'), 'utf8');

const groups = Array.from(skills.matchAll(/\{g:"([^"]+)",items:/g)).map(m => m[1]);
const items = Array.from(skills.matchAll(/\{n:"([^"]+)",d:"[^"]*",t:"[^"]*"\}/g)).map(m => m[1]);

function keysFor(langBlock) {
    return new Set(Array.from(langBlock.matchAll(/'skills\.([^']+)'\s*:/g)).map(m => m[1]));
}

// Slice each language block out of I18N by its header, up to the next header / end of object.
function langBlock(name, next) {
    const start = i18n.indexOf('\n    ' + name + ': {');
    assert.ok(start >= 0, 'I18N.' + name + ' missing');
    const end = next ? i18n.indexOf('\n    ' + next + ': {', start) : i18n.indexOf('\n};', start);
    assert.ok(end > start);
    return i18n.slice(start, end);
}

const zhKeys = keysFor(langBlock('zh', 'en'));
const enKeys = keysFor(langBlock('en', 'ar'));
const arKeys = keysFor(langBlock('ar', null));

test('技能帮助 45 项与 7 组在 ZH/EN/AR 三语中都有译文键', () => {
    assert.equal(groups.length, 7);
    assert.equal(items.length, 45);
    for (const set of [zhKeys, enKeys, arKeys]) {
        for (const g of groups) assert.ok(set.has('group.' + g), 'missing group key: ' + g);
        for (const n of items) {
            assert.ok(set.has(n + '.d'), 'missing description key: ' + n);
            assert.ok(set.has(n + '.t'), 'missing trigger key: ' + n);
        }
    }
});

test('技能帮助渲染使用 i18n 键，而不是直接输出中文', () => {
    assert.ok(/t\('skills\.group\.' \+ group\.g\)/.test(skills));
    assert.ok(/t\('skills\.' \+ sk\.n \+ '\.d'\)/.test(skills));
    assert.ok(/t\('skills\.' \+ sk\.n \+ '\.t'\)/.test(skills));
    assert.ok(!/\+ esc\(sk\.d\)/.test(skills));
    assert.ok(!/esc\(sk\.t\.split/.test(skills));
});

test('复制的触发词保持中文规范值，不随界面语言改变', () => {
    assert.ok(/data-arg2="' \+ esc\(firstTrigger\)/.test(skills));
    assert.ok(/var firstTrigger = sk\.t\.split\('、'\)\[0\]/.test(skills));
});
