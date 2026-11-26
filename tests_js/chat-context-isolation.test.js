/**
 * Per-screen chat sessions: the browser must always filter history by the
 * active screen context, show which session is active, and allow exporting it.
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const chat = fs.readFileSync(path.join(ROOT, 'static/js/chat.js'), 'utf8');
const i18n = fs.readFileSync(path.join(ROOT, 'static/js/i18n.js'), 'utf8');
const init = fs.readFileSync(path.join(ROOT, 'static/js/init.js'), 'utf8');

test('loadChatHistory keeps context filter even when a library is selected', () => {
    const fn = chat.slice(
        chat.indexOf('async function loadChatHistory'),
        chat.indexOf('async function loadChatHistory') + 1200
    );
    assert.match(fn, /let params = `\?limit=30&context=\$\{ctx\}`/);
    assert.match(fn, /if \(currentLibraryId\) params \+= `&library_id=/);
    assert.doesNotMatch(fn, /\?library_id=\$\{currentLibraryId\}&limit=30/);
});

test('chat topbar exposes session tag and export action', () => {
    assert.match(chat, /data-act="exportChat"/);
    assert.match(chat, /id="chat-context-tag"/);
    assert.match(chat, /function _updateChatSessionTag\(\)/);
    assert.match(chat, /function exportChat\(\)/);
    assert.match(chat, /tag\.textContent = '🗂️ ' \+ \(t\('chat\.session'\)/);
});

test('exportChat is wired through the data-act dispatcher', () => {
    assert.match(init, /'exportChat',/);
});

test('session/export strings exist in all three languages', () => {
    for (const needle of [
        "'chat.export':'导出会话'",
        "'chat.export':'Export session'",
        'تصدير المحادثة',
    ]) {
        assert.ok(i18n.includes(needle), `missing i18n string: ${needle}`);
    }
    assert.equal((i18n.match(/'chat\.session':/g) || []).length, 2);
    assert.equal((i18n.match(/"chat\.session":/g) || []).length, 1);
});
