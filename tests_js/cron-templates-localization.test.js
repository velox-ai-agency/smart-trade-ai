/**
 * Cron / 定时任务模板必须在语言初始化之后再决定文案。
 * 旧实现在脚本加载时（currentLang 仍是默认 zh）就固化 TASK_TEMPLATES，
 * 导致英文/阿文界面漏出中文模板名。
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { SRC, loadRegion } = require('./_extract');

function templatesFor(lang) {
    const ctx = loadRegion(
        'task-templates',
        '{ getAllTemplates }',
        {
            currentLang: lang,
            // 真实实现：阿文查 AR_TERMS（此处置为前缀以便断言），其它一律英文
            langText: (zh, en) => (lang === 'ar' ? 'AR:' + en : en),
            localStorage: { getItem: () => '[]' },
        }
    );
    return ctx.getAllTemplates();
}

test('模板不在脚本加载时固化为中文', () => {
    assert.match(SRC, /let TASK_TEMPLATES = null;/);
    assert.doesNotMatch(SRC, /let TASK_TEMPLATES = buildTaskTemplates\(\);/);
    assert.match(SRC, /if \(_taskTplLang !== currentLang\)[\s\S]{0,120}TASK_TEMPLATES = buildTaskTemplates\(\)/);
});

test('英文界面下全部模板名为英文', () => {
    const names = templatesFor('en').map(x => x.name);
    assert.ok(!names.some(n => /[\u4e00-\u9fff]/.test(n)), 'EN template names contain Chinese: ' + names.join(', '));
    assert.ok(names.includes('Weekly review report'));
});

test('已停用的中文语言回落为英文模板名', () => {
    const names = templatesFor('zh').map(x => x.name);
    assert.ok(!names.some(n => /[\u4e00-\u9fff]/.test(n)), '残留中文：' + names.join(', '));
    assert.ok(names.includes('Weekly review report'));
});

test('阿拉伯语界面不出现中文模板名', () => {
    const names = templatesFor('ar').map(x => x.name);
    assert.ok(!names.some(n => /[\u4e00-\u9fff]/.test(n)), '阿文界面残留中文：' + names.join(', '));
    assert.ok(names.every(n => n.startsWith('AR:')), names.join(', '));
});
