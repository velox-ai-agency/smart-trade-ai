/**
 * 守卫：主题切换与暗色主题。
 *
 * 钉四件事：
 *  1. 内联预绘脚本必须在首帧前按 localStorage 设置 data-theme（防闪白/闪黑）；
 *  2. 切换按钮要把 aria-label/title/data-tip/aria-pressed 一并更新 —— 漏掉
 *     aria-pressed 会让读屏器在暗色模式下报「切换到暗色主题」；
 *  3. dark 块必须覆盖 light 块定义的关键表面 token（bg/panel/ink/line），
 *     缺一个就会出现「半亮半暗」的面板；
 *  4. JS 生成的 HTML 不得再新增裸的浅色十六进制背景（#fff / #F9FAFB…），
 *     否则暗色模式里会出现白色补丁（2026-11-26 评分按钮实测）。
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'static');
const html = fs.readFileSync(path.join(root, 'trade_chat.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'trade_chat.css'), 'utf8');
const jsDir = path.join(root, 'js');

test('预绘脚本在首帧前设置 data-theme', () => {
    assert.match(html, /Apply the saved theme before first paint/);
    assert.match(html, /document\.documentElement\.setAttribute\('data-theme', read\(\)\)/);
    assert.match(html, /localStorage\.getItem\(KEY\)/);
});

test('切换按钮更新全部可达性属性', () => {
    assert.match(html, /refreshThemeToggle/);
    assert.match(html, /setAttribute\('aria-pressed', dark\?'true':'false'\)/);
    // i18n 在语言变化时也会刷新按钮文案
    const i18n = fs.readFileSync(path.join(root, 'js', 'i18n.js'), 'utf8');
    assert.match(i18n, /if \(typeof window\.refreshThemeToggle === 'function'\) window\.refreshThemeToggle\(\);/);
});

test('dark 块覆盖关键表面 token', () => {
    const dark = css.slice(css.indexOf('html[data-theme="dark"]'));
    const after = dark.indexOf('@media print') === -1 ? dark.length : dark.indexOf('@media print');
    const block = dark.slice(0, after);
    for (const token of ['--bg:', '--panel:', '--panel2:', '--ink:', '--muted:', '--line:', '--chip:',
                         '--text-primary:', '--border:', '--primary-subtle:', '--warning-subtle:',
                         '--success-subtle:']) {
        assert.ok(block.includes(token), `dark 块缺少 ${token}`);
    }
});

test('切换按钮的明暗图标互斥', () => {
    assert.match(css, /\.theme-toggle \.icon-sun \{ display: none; \}/);
    assert.match(css, /html\[data-theme="dark"\] \.theme-toggle \.icon-sun \{ display: block; \}/);
    assert.match(css, /html\[data-theme="dark"\] \.theme-toggle \.icon-moon \{ display: none; \}/);
});

test('实底按钮（primary/ink/accent 背景）的文字用 on-ink/on-accent，不用 on-dark', () => {
    // 2026-11-26 实测：dark 下 --primary 是浅色，文字若用 --on-dark（也是浅色）
    // 就是「浅底浅字」不可读。所有实底填充一律配 --on-ink / --on-accent。
    const lines = css.split('\n');
    const offenders = [];
    lines.forEach((line, i) => {
        if (!line.includes('var(--on-dark)')) return;
        if (/var\(--(?:primary|ink|accent)\b/.test(line) && /color:\s*var\(--on-dark\)/.test(line)) {
            offenders.push(`trade_chat.css:${i + 1}: ${line.trim().slice(0, 90)}`);
        }
    });
    assert.deepEqual(offenders, [], '实底背景配 on-dark 文字在暗色模式不可读：\n' + offenders.join('\n'));
});

test('用户消息气泡（--ink 实底）全文用 on-ink，含子元素', () => {
    // 2026-11-26 实测：气泡正文第二条规则把 * 全部涂成 --on-dark，
    // dark 下就是浅底浅字。规则必须与气泡底色（--ink）配 --on-ink。
    const block = css.match(/\.chat-main \.message\.user \.msg-body[^{]*\{[^}]*\}/g) || [];
    const hits = block.filter((b) => b.includes('color'));
    assert.ok(hits.length >= 2, '应有底色规则与文字继承规则两条');
    for (const h of hits) {
        assert.ok(h.includes('var(--on-ink)'), '用户气泡文字必须是 --on-ink：' + h.slice(0, 90));
        assert.ok(!h.includes('var(--on-dark)'), '用户气泡文字不得用 --on-dark：' + h.slice(0, 90));
    }
});

test('JS 生成的 HTML 不再新增裸浅色背景', () => {
    const bad = /background:\s*#(fff|FFF|f9fafb|F9FAFB|f3f4f6|F3F4F6|e5e7eb|E5E7EB)\b/;
    const offenders = [];
    for (const name of fs.readdirSync(jsDir).filter((f) => f.endsWith('.js') && f !== 'i18n.js')) {
        const src = fs.readFileSync(path.join(jsDir, name), 'utf8');
        if (bad.test(src)) offenders.push(name);
    }
    assert.deepEqual(offenders, [], '浅色硬编码背景在暗色模式会变成白斑: ' + offenders.join(', '));
});
