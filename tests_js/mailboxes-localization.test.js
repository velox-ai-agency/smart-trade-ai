/**
 * Mailboxes 连接指南必须在 EN/AR 界面显示对应语言。
 * 中文原文保留为 zh 默认；预设服务器与后端绑定值不受影响。
 */
const test = require('node:test');
const assert = require('node:assert');
const { SRC } = require('./_extract');

test('Mailboxes 指南提供 EN/AR 全文并按当前语言选择', () => {
    assert.match(SRC, /const MAILBOX_GUIDE_EN = \{/);
    assert.match(SRC, /const MAILBOX_GUIDE_AR = \{/);
    assert.match(SRC, /function _mailboxGuide\(\)[\s\S]*?MAILBOX_GUIDE_AR[\s\S]*?MAILBOX_GUIDE_EN[\s\S]*?return MAILBOX_GUIDE;/);
    assert.match(SRC, /_mailboxGuide\(\)\.intro/);
    assert.match(SRC, /_mailboxGuide\(\)\[s\.key\]/);
    assert.match(SRC, /_mailboxGuide\(\)\.faq/);
});

test('指南七个段落三种语言齐全', () => {
    for (const name of ['MAILBOX_GUIDE_EN', 'MAILBOX_GUIDE_AR']) {
        const start = SRC.indexOf('const ' + name + ' = {');
        assert.ok(start >= 0, name + ' missing');
        const end = SRC.indexOf('\n};', start);
        const block = SRC.slice(start, end);
        for (const key of ['"intro"', '"126"', '"163"', '"qq"', '"gmail"', '"custom"', '"faq"']) {
            assert.ok(block.includes(key), name + ' missing ' + key);
        }
    }
});

test('不再显示「仅中文」提示且手风琴标题本地化', () => {
    const mailboxesSrc = require('fs').readFileSync(require('path').join(__dirname, '../static/js/mailboxes.js'), 'utf8');
    assert.doesNotMatch(mailboxesSrc, /const enTip = currentLang === 'en'/);
    assert.doesNotMatch(mailboxesSrc, /mailbox\.guide_en_tip/);
    // 删除提示后必须保留字符串拼接，否则面板只剩标题
    assert.match(mailboxesSrc, /\+\s*`\s*\n\s*<div class="mailbox-guide-block"/);
    assert.match(SRC, /key: '126', title: currentLang === 'ar' \? 'بريد 126' : '126 Mail'/);
    assert.match(SRC, /key: 'qq', title: currentLang === 'ar' \? 'بريد QQ' : 'QQ Mail'/);
});

test('阿文指南不含中文产品名残留', () => {
    const start = SRC.indexOf('const MAILBOX_GUIDE_AR = {');
    const end = SRC.indexOf('\n};', start);
    assert.ok(!/[\u4e00-\u9fff]/.test(SRC.slice(start, end)), 'AR guide still contains Chinese');
});

test('IMAP 预设服务器值保持英文/数字（存储契约）', () => {
    assert.match(SRC, /'126': \{ host: 'imap\.126\.com', port: 993 \}/);
    assert.match(SRC, /'gmail': \{ host: 'imap\.gmail\.com', port: 993 \}/);
});
