/**
 * 本地构建不再按许可证切换视图：导入/导出入口默认可见，
 * 没有 402 付费拦截，也没有聚焦时重新判定许可证的监听器。
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { SRC } = require('./_extract');

const ROOT = path.join(__dirname, '..');
const HTML = fs.readFileSync(path.join(ROOT, 'static', 'trade_chat.html'), 'utf8');
const INIT_JS = fs.readFileSync(path.join(ROOT, 'static', 'js', 'init.js'), 'utf8');

test('HTML 中付费入口默认可见', () => {
    const paid = HTML.match(/data-paid/g) || [];
    assert.ok(paid.length > 0, '没有找到 data-paid 入口');
    for (const id of ['import-company-row']) {
        const m = new RegExp(`<[^>]*id="${id}"[^>]*>`).exec(HTML);
        assert.ok(m, `缺少 #${id}`);
        assert.ok(!/\bhidden\b/.test(m[0]), `#${id} 不应默认隐藏`);
    }
    const tags = HTML.match(/<[^>]*\bdata-paid\b[^>]*>/g) || [];
    for (const tag of tags) {
        assert.ok(!/\bhidden\b/.test(tag), `data-paid 元素不应默认隐藏: ${tag}`);
    }
});

test('init.js 不再等待许可证状态或重新校验', () => {
    assert.ok(!/loadLicenseStatus/.test(INIT_JS), 'init.js 仍调用 loadLicenseStatus');
    assert.ok(!/visibilitychange/.test(INIT_JS), 'init.js 仍有 visibilitychange 许可证重检');
    assert.ok(!/showActivateModal/.test(INIT_JS), 'init.js 仍注册激活弹窗');
    assert.ok(!/doActivate/.test(INIT_JS), 'init.js 仍注册 doActivate');
});

test('前端不再有付费专属拦截文案与 402 激活分支', () => {
    assert.ok(!/license\.paid_only/.test(SRC), '仍存在付费专属拦截');
    assert.ok(!/status === 402/.test(SRC), '仍存在 402 分支');
});
