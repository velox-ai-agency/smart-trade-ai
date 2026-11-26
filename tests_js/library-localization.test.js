/**
 * Library / Select Library 下拉与关联库列表在 EN/AR 不得漏出中文。
 * 库名是后端/文件系统标识，界面只翻译显示文本，option.value 保持原中文。
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { SRC } = require('./_extract');

test('内置库名有 EN/AR 显示映射且保留中文存储值', () => {
    assert.match(SRC, /function _libLabel\(name\)[\s\S]*?_LIB_LABEL_EN\[name\][\s\S]*?AR_TERMS\[name\]/);
    const i18n = fs.readFileSync(path.join(__dirname, '../static/js/i18n.js'), 'utf8');
    for (const zh of ['海关数据', '营销素材', '认证资质', '物流单据', '发票', '产品规格', '客户资料', '合同', '报价单']) {
        assert.ok(i18n.includes("'" + zh + "':") || i18n.includes('"' + zh + '":'), 'EN map missing ' + zh);
        assert.ok(new RegExp('"' + zh + '":\\s*"[^"]+"').test(i18n.slice(i18n.indexOf('var AR_TERMS'))), 'AR term missing ' + zh);
    }
    // 工作目录映射必须继续用中文，否则会找不到磁盘上的库目录
    assert.match(SRC, /const _WORK_SUBDIRS = \['报价单','合同','客户资料','产品规格','发票','物流单据','认证资质','营销素材','海关数据'\]/);
});

test('Select Library 下拉显示翻译文本但 value 仍是库标识', () => {
    assert.match(SRC, /unique\.map\(l => `<option value="\$\{l\.id\}">\$\{esc\(_libLabel\(l\.name\)\)\}<\/option>`\)/);
    assert.doesNotMatch(SRC, /unique\.map\(l => `<option value="\$\{l\.id\}">\$\{esc\(l\.name\)\}<\/option>`\)/);
});

test('客户详情里的关联库列表同样走翻译 helper', () => {
    const customers = fs.readFileSync(path.join(__dirname, '../static/js/customers.js'), 'utf8');
    assert.match(customers, /📄 \$\{esc\(_libLabel\(l\.name\)\)\}/);
    assert.match(customers, /allLibs\.filter\(l=>!linkedIds\.includes\(l\.id\)\)\.map\(l=>`<option value="\$\{l\.id\}">\$\{esc\(_libLabel\(l\.name\)\)\}<\/option>`\)/);
    assert.doesNotMatch(customers, /📄 \$\{esc\(l\.name\)\}/);
});
