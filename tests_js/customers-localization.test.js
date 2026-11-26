/**
 * 客户列表（Customers）在英文界面不得漏出中文。
 *
 * 根因：列表行是动态 innerHTML，不会经过 i18n.js 的 _translateStaticHtml()，
 * 所以阶段/买家类型等存储为中文的值必须在实际渲染时就地翻译。
 * 这里同时钉住「存储值仍是中文」，避免有人把英文写回后端字段。
 */
const test = require('node:test');
const assert = require('node:assert');
const { SRC } = require('./_extract');

test('阶段显示值经 _stageLabel 翻译，存储值仍为中文', () => {
    assert.match(SRC, /function _stageLabel\(s\)[\s\S]*?langText\(v, _STAGE_EN\[v\]\)/);
    // 表格行与阶段筛选都不能直接 esc(stage)
    assert.doesNotMatch(SRC, /<span class="stage-tx">' \+ esc\(stage\)/);
    assert.match(SRC, /<span class="stage-tx">' \+ esc\(_stageLabel\(stage\)\)/);
    assert.match(SRC, /'询盘': _stageLabel\('询盘'\)/);
    // 后端约定：阶段值固定中文
    assert.match(SRC, /const _CRM_STAGES = \['询盘', '报价', '样品', '订单'\]/);
});

test('买家类型显示值经 _buyerLabel 翻译，存储值仍为中文', () => {
    assert.match(SRC, /function _buyerLabel\(v\)[\s\S]*?langText\(s, _BUYER_EN\[s\]\)/);
    assert.match(SRC, /esc\(buyer \? _buyerLabel\(buyer\) : '—'\)/);
    assert.match(SRC, />' \+ esc\(_buyerLabel\(v\)\) \+ '<\/option>'/);
    assert.match(SRC, /esc\(_buyerLabel\(e1\.buyer_type\)\)/);
    // 旧值写回保护仍在
    assert.match(SRC, /'Brand':'品牌商'/);
});

test('表头与空态不硬编码中文', () => {
    assert.doesNotMatch(SRC, /<th>客户 <span class="th-lbl">\/ CUSTOMER<\/th>/);
    assert.doesNotMatch(SRC, /<h2>暂无客户<\/h2>/);
    assert.match(SRC, /\$\{langText\('客户','Customer'\)\}/);
    assert.match(SRC, /\$\{langText\('订单总额','Order total'\)\}/);
});

test('联系人显示值翻译但存储值仍为中文', () => {
    assert.match(SRC, /function _contactLabel\(v\)[\s\S]*?langText\(s, _CONTACT_FUNC_EN\[s\]\)/);
    assert.match(SRC, /function _personName\(p, fallback\)[\s\S]*?未命名联系人/);
    assert.match(SRC, /esc\(dispName\)/);
    assert.match(SRC, /esc\(langText\('主','Main'\)\)/);
    assert.doesNotMatch(SRC, /<span class="zhu">主<\/span>/);
    assert.match(SRC, />' \+ esc\(_contactLabel\(f\)\) \+ '<\/option>'/);
    // 下拉 value 仍是后端认可的中文
    assert.match(SRC, /<option value="' \+ esc\(f\) \+ '"'/);
});

test('AR_TERMS 覆盖 Customers 动态行的中文键', () => {
    // 这些键经 langText() 使用；缺失时阿文界面会退化成英文。
    ['客户', '分级', '标签', '最近联系', '询盘', '报价', '样品', '搜索客户', '显示 ', '不关联客户'].forEach(function (k) {
        assert.match(SRC, new RegExp('"' + k + '": "'), 'AR_TERMS 缺少 ' + k);
    });
});

test('页脚 / 详情 / 画像区不再用语言三元分支直出中文', () => {
    assert.doesNotMatch(SRC, /currentLang === 'en' \? \('Showing '/);
    assert.match(SRC, /langText\('显示 ','Showing '\)/);
    assert.match(SRC, /langText\('邮件 ','Mail '\) \+ emailStatN/);
    assert.match(SRC, /langText\('最近','LATEST'\)/);
    assert.match(SRC, /langText\('已确认 ','Confirmed '\)/);
    assert.match(SRC, /langText\('报价中','Quote'\)/);
});

test('阶段下拉与详情 chip 都走翻译 helper', () => {
    // 三处 option：询盘卡、新建询盘、客户墙
    assert.match(SRC, /esc\(_stageLabel\(s\)\) \+ '<\/option>'/);
    assert.match(SRC, /\(wallSel === s \? ' selected' : ''\) \+ '>' \+ esc\(_stageLabel\(s\)\)/);
    assert.match(SRC, /'Stage · '\)[\s\S]{0,10}esc\(_stageLabel\(stage\)\)/);
    // ASSET PROFILE / Inquiries 卡片上的阶段 pill 也要翻译，不能直出存储值
    assert.match(SRC, /class="wc-name">' \+ esc\(inq\.title \|\| ''\) \+[\s\S]{0,120}esc\(_stageLabel\(st\)\)/);
});

test('画像分类弹窗下拉：显示翻译、存储值保留中文', () => {
    assert.match(SRC, /function _profileCatLabel\(cat\) \{[\s\S]{0,160}t\(_PROFILE_SEC_KEYS\[cat\] \|\| cat\)/);
    assert.match(SRC, /<option value="' \+ esc\(c\) \+ '"'[\s\S]{0,120}esc\(_profileCatLabel\(c\)\)/);
    // 语音画像里的客户下拉也不能直出中文占位项
    assert.match(SRC, /esc\(langText\('不关联客户','No customer'\)\)/);
});

test('Site Visit 动态文案全部有阿拉伯语译文（AR_TERMS）', () => {
    // Site Visit 整页 innerHTML 是运行时拼出来的，不经过 _translateStaticHtml；
    // langText(zh,en) 在阿文界面只查 AR_TERMS，缺一个键就会退化成英文。
    const fs = require('node:fs');
    const path = require('node:path');
    const cust = fs.readFileSync(path.join(__dirname, '..', 'static', 'js', 'customers.js'), 'utf8');
    const sv = cust.slice(cust.indexOf('function _vt('));
    const arBlock = SRC.slice(SRC.indexOf('var AR_TERMS'), SRC.indexOf('function langText'));
    const keys = new Set();
    const re = /(?:_vt|langText)\('([^']*)'\s*,\s*'[^']*'\)/g;
    let m;
    while ((m = re.exec(sv)) !== null) keys.add(m[1]);
    assert.ok(keys.size > 20, '应扫描到 Site Visit 的动态文案');
    Array.from(keys).sort().forEach(function (zh) {
        const escaped = zh.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        assert.match(arBlock, new RegExp('"' + escaped + '"\\s*:\\s*"[^"]+"'), 'AR_TERMS 缺少：' + zh);
    });
});
