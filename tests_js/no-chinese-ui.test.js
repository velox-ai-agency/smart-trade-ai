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

/**
 * 守卫：中文不得作为「直接显示的字符串」出现在界面代码里。
 *
 * 2026-11-26 实测漏出的三处：等待面板标题（chat.js 传字面量给 TradeWait）、
 * 工具名标签（TOOL_NAMES 的值直接 textContent）、标签页标题。中文只允许当
 * langText()/t()/uiTerm() 的查表 key，或写在注释里。
 */
test('面向用户的字符串不能是裸中文', () => {
    const jsDir = path.join(root, 'js');
    const sinks = ['toast(', 'textContent', 'innerHTML', 'title:', 'placeholder', 'alert(', 'confirm('];
    const wrappers = ['langText(', 'uiTerm(', 'tr(', 'JS_TERMS', 'AR_TERMS', 'I18N', "t('", 't("'];
    const cjk = /[\u4e00-\u9fff]/;
    const offenders = [];
    for (const name of fs.readdirSync(jsDir).filter((f) => f.endsWith('.js') && f !== 'i18n.js')) {
        const lines = fs.readFileSync(path.join(jsDir, name), 'utf8').split('\n');
        let inBlock = false;
        lines.forEach((line, i) => {
            // 注释里的中文不算问题：跳过 // 行和 /* … */ 之间的整段
            let raw = line;
            if (inBlock) {
                const end = raw.indexOf('*/');
                if (end === -1) return;
                raw = raw.slice(end + 2);
                inBlock = false;
            }
            const start = raw.indexOf('/*');
            if (start !== -1) {
                const end = raw.indexOf('*/', start + 2);
                if (end === -1) { inBlock = true; raw = raw.slice(0, start); }
                else raw = raw.slice(0, start) + raw.slice(end + 2);
            }
            const code = raw.split('//')[0];
            if (!cjk.test(code)) return;
            if (!sinks.some((s) => code.includes(s))) return;
            if (wrappers.some((w) => code.includes(w))) return;
            offenders.push(`${name}:${i + 1}: ${code.trim().slice(0, 90)}`);
        });
    }
    assert.deepEqual(offenders, [], '裸中文会直接显示给用户：\n' + offenders.join('\n'));
});
