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
            langText: (zh, en) => (lang === 'en' ? en : zh),
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

test('中文界面仍保留中文模板名', () => {
    const names = templatesFor('zh').map(x => x.name);
    assert.ok(names.includes('每周复盘报告'));
});
