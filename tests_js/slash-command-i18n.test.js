const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const chat = fs.readFileSync(path.join(root, 'static/js/chat.js'), 'utf8');
const skills = fs.readFileSync(path.join(root, 'static/js/skills.js'), 'utf8');
const i18n = fs.readFileSync(path.join(root, 'static/js/i18n.js'), 'utf8');

const ids = [...skills.matchAll(/\{n:"([^"]+)"/g)].map(m => m[1]);
const groups = [...skills.matchAll(/\{g:"([^"]+)"\}/g)].map(m => m[1]);
const han = /[\u4e00-\u9fff]/;

test('slash command map exists and covers every user-facing skill', () => {
    const start = chat.indexOf('const SKILL_CMD_EN = {');
    assert.ok(start >= 0, 'SKILL_CMD_EN missing');
    const open = chat.indexOf('{', start);
    const close = chat.indexOf('};', open);
    assert.ok(close > open, 'SKILL_CMD_EN not terminated');
    const map = new Function('return (' + chat.slice(open, close + 1) + ')')();
    assert.equal(ids.length, 47, 'expected 47 skills in help list');
    ids.forEach(function (id) {
        assert.ok(map[id], 'missing command for ' + id);
        assert.ok(!han.test(map[id]), 'Chinese trigger leaked into slash insert for ' + id);
        assert.match(map[id], /^[a-z][a-z0-9 ]*$/, 'not a lowercase English trigger: ' + id);
    });
});

test('slash dropdown renders localized description and group', () => {
    assert.match(chat, /_skillText\('skills\.' \+ it\.n \+ '\.d', it\.d \|\| ''\)/);
    assert.match(chat, /_skillText\('skills\.group\.' \+ row\.group, row\.group\)/);
    assert.match(chat, /insert: \(SKILL_CMD_EN\[it\.n\] \|\| it\.n\) \+ ' '/);
    assert.doesNotMatch(chat, /const trig = String\(it\.t/);
});

test('localized help keys exist in both languages', () => {
    ids.forEach(function (id) {
        ['d', 't'].forEach(function (suffix) {
            const key = 'skills.' + id + '.' + suffix;
            const count = i18n.split(key).length - 1;
            assert.ok(count >= 2, key + ' present in <2 dictionaries (got ' + count + ')');
        });
    });
    groups.forEach(function (g) {
        const key = 'skills.group.' + g;
        const count = i18n.split(key).length - 1;
        assert.ok(count >= 2, key + ' present in <2 dictionaries (got ' + count + ')');
    });
});
