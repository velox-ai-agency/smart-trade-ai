/**
 * 本地构建没有许可证状态条：不应存在「Trial N days left / Enter Activation Code」
 * 横幅、激活弹窗或隐藏付费入口的逻辑。
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { SRC } = require('./_extract');

const HTML = fs.readFileSync(
    path.join(__dirname, '..', 'static', 'trade_chat.html'), 'utf8',
);
const API_JS = fs.readFileSync(
    path.join(__dirname, '..', 'static', 'js', 'api.js'), 'utf8',
);

const REMOVED = [
    '_licenseBarText',
    '_licenseBarStyle',
    'LICENSE_EXPIRING_DAYS',
    'showLicenseExpired',
    'showActivateModal',
    'doActivate',
];

test('api.js 不再包含状态条/激活弹窗实现', () => {
    for (const symbol of REMOVED) {
        assert.ok(!SRC.includes(symbol), `仍存在已移除符号 ${symbol}`);
    }
    assert.ok(!API_JS.includes('license-bar'), 'api.js 仍引用 license-bar');
});

test('HTML 没有许可证横幅容器', () => {
    assert.ok(!HTML.includes('license-bar'), 'HTML 仍包含 license-bar 元素');
});

test('没有试用倒计时/输入激活码的界面文案', () => {
    const api = fs.readFileSync(
        path.join(__dirname, '..', 'static', 'js', 'api.js'), 'utf8',
    );
    assert.ok(!/days_left/.test(api), 'api.js 仍渲染剩余天数');
    assert.ok(!/activate_btn/.test(api), 'api.js 仍渲染激活按钮');
});
