const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'static');
const html = fs.readFileSync(path.join(root, 'trade_chat.html'), 'utf8');
const i18n = fs.readFileSync(path.join(root, 'js', 'i18n.js'), 'utf8');
const state = fs.readFileSync(path.join(root, 'js', 'state.js'), 'utf8');

test('全部 langText 中文键在 AR_TERMS 中有译文', () => {
    const arBlock = i18n.slice(i18n.indexOf('var AR_TERMS'), i18n.indexOf('function langText'));
    const keys = new Set();
    const re = /langText\('([^']*)'\s*,\s*'[^']*'\)/g;
    for (const name of fs.readdirSync(path.join(root, 'js')).filter((f) => f.endsWith('.js') && f !== 'i18n.js')) {
        const src = fs.readFileSync(path.join(root, 'js', name), 'utf8');
        let m;
        while ((m = re.exec(src)) !== null) keys.add(m[1]);
    }
    assert.ok(keys.size > 100, '应扫描到足够多的 langText 键');
    Array.from(keys).sort().forEach(function (zh) {
        const escaped = zh.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        assert.match(arBlock, new RegExp('"' + escaped + '"\\s*:\\s*"[^"]+"'), 'AR_TERMS 缺少：' + zh);
    });
});

test('语言切换器默认 English', () => {
    assert.match(html, /<option value="en" selected>English<\/option>/);
    assert.match(state, /let currentLang = 'en'/);
    assert.match(i18n, /localStorage\.getItem\('trade_lang'\) \|\| 'en'/);
});

test('阿拉伯语启用 RTL 布局并加载 rtl.css', () => {
    assert.match(i18n, /document\.documentElement\.dir = currentLang === 'ar' \? 'rtl' : 'ltr'/);
    assert.match(i18n, /document\.documentElement\.lang = currentLang/);
    assert.match(html, /\/static\/rtl\.css/);
});
