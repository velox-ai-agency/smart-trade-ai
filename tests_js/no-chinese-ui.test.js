/**
 * 守卫：中文已从界面移除（2026-11-26）。
 * 产品只保留 English + Arabic；上游合并若把 zh 带回来，这里会红。
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'static');
const html = fs.readFileSync(path.join(root, 'trade_chat.html'), 'utf8');
const i18n = fs.readFileSync(path.join(root, 'js', 'i18n.js'), 'utf8');
const wait = fs.readFileSync(path.join(root, 'js', 'wait.js'), 'utf8');

test('语言选择器只有 English 和 العربية', () => {
    const select = html.match(/<select id="lang-select"[\s\S]*?<\/select>/);
    assert.ok(select, 'lang-select missing');
    const options = Array.from(select[0].matchAll(/<option value="([^"]+)"/g)).map((m) => m[1]);
    assert.deepEqual(options, ['en', 'ar']);
});

test('I18N 不含 zh 字典', () => {
    assert.ok(!i18n.includes('\n    zh: {'));
    assert.ok(!i18n.includes('I18N.zh'));
});

test('t() 缺失键时回落到英文', () => {
    assert.match(i18n, /\(I18N\.en && I18N\.en\[key\]\)/);
});

test('langText 非阿语时永远返回英文', () => {
    assert.match(i18n, /function langText\(zh, en\) \{[\s\S]{0,400}?return en;/);
});

test('旧的 zh 偏好会被迁移到英文', () => {
    assert.match(i18n, /if \(currentLang !== 'ar' && currentLang !== 'en'\) currentLang = 'en';/);
});

test('wait UI 不再回落到中文', () => {
    assert.ok(!/return 'zh'/.test(wait));
    assert.ok(!/currentLang : 'zh'/.test(wait));
});
