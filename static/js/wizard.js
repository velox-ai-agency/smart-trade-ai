// ═════════════════════ 客户开发向导 (b2b-customer-finder) ═════════════════════
let _wizardStep = 0;            // 0=hidden, 1=product, 2=market, 3=type, 4=running, 5=results
let _wizardAnswers = { product: '', market: '', customerType: '' };
let _wizardStreamCtl = null;
let _wizardResponse = '';

function isOnboardingCompleted() {
    try { return localStorage.getItem('_onboarding_completed') === '1'; } catch(_) { return false; }
}

// ═════════════════════ 客户开发向导 UI ═════════════════════
function showWizardInLeadView() {
    // 在 lead 聊天上下文中显示客户开发向导卡片。
    // 每个栏目都缓存了一份聊天 DOM（id 相同），必须限定在当前视图内查找，
    // 否则卡片会插进隐藏的「今日简报」那一份里。
    var scope = (typeof currentChatContainer !== 'undefined' && currentChatContainer) || document;
    var msgs = scope.querySelector('#chat-messages');
    if (!msgs) return;
    // 空态不一定存在（有历史消息时会被移除），不依赖它
    var empty = msgs.querySelector('#chat-empty');
    if (empty) empty.style.display = 'none';
    // 移除已有向导卡片
    var old = msgs.querySelector('#wizard-card');
    if (old) old.remove();
    _wizardStep = 1;
    var card = document.createElement('div');
    card.id = 'wizard-card';
    card.innerHTML = wizardRenderStep1();
    msgs.appendChild(card);
    setTimeout(function() {
        var inp = card.querySelector('#wizard-product-input');
        if (inp) inp.focus();
    }, 200);
}

function wizardRenderStep1() {
    var step = langText('卖什么', 'WHAT YOU SELL');
    var next1 = langText('卖到哪', 'WHERE TO');
    var next2 = langText('找谁', 'WHO TO');
    return `<div class="onboarding-card" style="margin:0 auto;max-width:580px;">
        <div class="onboarding-step-indicator">
            <span class="onb-step active">● ${esc(step)}</span><span class="onb-step-arrow">→</span>
            <span class="onb-step">○ ${esc(next1)}</span><span class="onb-step-arrow">→</span>
            <span class="onb-step">○ ${esc(next2)}</span>
        </div>
        <h2 class="onboarding-title" style="font-size:20px;">${esc(langText('先告诉我：你卖什么产品？', 'First: what do you sell?'))}</h2>
        <p style="text-align:center;color:var(--text-secondary);font-size:14px;margin-bottom:16px;">
            ${esc(langText('随便说就行，“LED灯”“五金”“纺织品”都可以', 'Plain words are fine — "LED lights", "hardware", "textiles".'))}</p>
        <div class="onboarding-input-row">
            <input type="text" id="wizard-product-input" placeholder="${esc(langText('例如：LED工矿灯、不锈钢螺丝、全棉T恤...', 'e.g. LED high-bay light, stainless screws, cotton T-shirts…'))}"
                class="onboarding-text-input"
                data-enter="wizardNext" autofocus />
        </div>
        <button class="btn btn-primary btn-lg" data-act="wizardNext">${esc(langText('下一步：卖到哪里去？ →', 'Next: where do you sell? →'))}</button>
        <div class="onboarding-skip" style="display:flex;justify-content:flex-end;">
            <a data-act="wizardClose" title="${esc(langText('跳过向导', 'Skip the wizard'))}">${esc(langText('跳过向导', 'Skip'))}</a>
        </div>
    </div>`;
}

function wizardRenderStep2() {
    var step = langText('卖什么', 'WHAT YOU SELL');
    var step2 = langText('卖到哪', 'WHERE TO');
    var step3 = langText('找谁', 'WHO TO');
    return `<div class="onboarding-card" style="margin:0 auto;max-width:580px;">
        <div class="onboarding-step-indicator">
            <span class="onb-step done">✓ ${esc(step)}</span><span class="onb-step-arrow">→</span>
            <span class="onb-step active">● ${esc(step2)}</span><span class="onb-step-arrow">→</span>
            <span class="onb-step">○ ${esc(step3)}</span>
        </div>
        <h2 class="onboarding-title" style="font-size:20px;">${esc(langText('想卖到哪个国家或地区？', 'Which country or region do you want to sell to?'))}</h2>
        <p style="text-align:center;color:var(--text-secondary);font-size:14px;margin-bottom:16px;">
            ${esc(langText('比如“德国”“美国”“中东”“东南亚”，可以写多个', 'e.g. Germany, USA, the Middle East, Southeast Asia — several are fine.'))}</p>
        <div class="onboarding-input-row">
            <input type="text" id="wizard-market-input" placeholder="${esc(langText('例如：德国、美国、中东...', 'e.g. Germany, USA, Middle East…'))}"
                class="onboarding-text-input"
                data-enter="wizardNext" autofocus />
        </div>
        <button class="btn btn-primary btn-lg" data-act="wizardNext">${esc(langText('下一步：找什么类型？ →', 'Next: which buyer type? →'))}</button>
        <div class="onboarding-skip" style="display:flex;justify-content:space-between;">
            <a data-act="wizardBack">${esc(langText('← 返回修改', '← Back'))}</a>
            <a data-act="wizardClose">${esc(langText('跳过向导', 'Skip'))}</a>
        </div>
    </div>`;
}

function wizardRenderStep3() {
    var step = langText('卖什么', 'WHAT YOU SELL');
    var step2 = langText('卖到哪', 'WHERE TO');
    var step3 = langText('找谁', 'WHO TO');
    return `<div class="onboarding-card" style="margin:0 auto;max-width:580px;">
        <div class="onboarding-step-indicator">
            <span class="onb-step done">✓ ${esc(step)}</span><span class="onb-step-arrow">→</span>
            <span class="onb-step done">✓ ${esc(step2)}</span><span class="onb-step-arrow">→</span>
            <span class="onb-step active">● ${esc(step3)}</span>
        </div>
        <h2 class="onboarding-title" style="font-size:20px;">${esc(langText('想找什么类型的客户？', 'Which buyer type are you after?'))}</h2>
        <div class="wizard-choice-row">
            <button class="wizard-choice-btn" data-act="wizardSelectType" data-arg="distributor" data-from="this">
                <span class="wc-icon">📦</span>
                <div class="wc-text">
                    <div class="wc-title">${esc(langText('批发商 / 分销商', 'Wholesaler / Distributor'))}</div>
                    <div class="wc-desc">${esc(langText('大量采购再分销到本地市场', 'Buys in volume and resells locally'))}</div>
                </div>
            </button>
            <button class="wizard-choice-btn" data-act="wizardSelectType" data-arg="oem" data-from="this">
                <span class="wc-icon">🏭</span>
                <div class="wc-text">
                    <div class="wc-title">${esc(langText('品牌商 / OEM 工厂', 'Brand / OEM factory'))}</div>
                    <div class="wc-desc">${esc(langText('贴牌生产，长期大单', 'Private label, large long-term orders'))}</div>
                </div>
            </button>
            <button class="wizard-choice-btn" data-act="wizardSelectType" data-arg="retailer" data-from="this">
                <span class="wc-icon">🏪</span>
                <div class="wc-text">
                    <div class="wc-title">${esc(langText('零售商 / 连锁店', 'Retailer / Chain store'))}</div>
                    <div class="wc-desc">${esc(langText('小批量多频次采购', 'Small orders, frequent reorders'))}</div>
                </div>
            </button>
            <button class="wizard-choice-btn" data-act="wizardSelectType" data-arg="any" data-from="this">
                <span class="wc-icon">🌍</span>
                <div class="wc-text">
                    <div class="wc-title">${esc(langText('都行，帮我一起找', 'Any — find them all'))}</div>
                    <div class="wc-desc">${esc(langText('让 AI 自动判断最合适的类型', 'Let the AI pick the best fit'))}</div>
                </div>
            </button>
        </div>
        <button class="btn btn-primary btn-lg wizard-launch-btn" id="wizard-launch-btn" disabled
            data-act="wizardLaunch">${btnIcon('target')} ${esc(langText('开始找客户！', 'Find customers'))}</button>
        <div class="onboarding-skip" style="display:flex;justify-content:space-between;">
            <a data-act="wizardBack">${esc(langText('← 返回修改', '← Back'))}</a>
            <a data-act="wizardClose">${esc(langText('跳过向导', 'Skip'))}</a>
        </div>
    </div>`;
}

function wizardNext() {
    if (_wizardStep === 1) {
        var inp = document.getElementById('wizard-product-input');
        _wizardAnswers.product = (inp?.value || '').trim();
        if (!_wizardAnswers.product) { toast(t('toast.wizard_product')); return; }
        _wizardStep = 2;
        updateWizardCard(wizardRenderStep2());
        setTimeout(function() { var el = document.getElementById('wizard-market-input'); if (el) el.focus(); }, 200);
    } else if (_wizardStep === 2) {
        var inp2 = document.getElementById('wizard-market-input');
        _wizardAnswers.market = (inp2?.value || '').trim();
        if (!_wizardAnswers.market) { toast(t('toast.wizard_market')); return; }
        _wizardStep = 3;
        updateWizardCard(wizardRenderStep3());
    }
}

function wizardBack() {
    if (_wizardStep === 2) {
        _wizardStep = 1;
        updateWizardCard(wizardRenderStep1());
        setTimeout(function() { var el = document.getElementById('wizard-product-input'); if (el) { el.value = _wizardAnswers.product; el.focus(); } }, 200);
    } else if (_wizardStep === 3) {
        _wizardStep = 2;
        updateWizardCard(wizardRenderStep2());
        setTimeout(function() { var el = document.getElementById('wizard-market-input'); if (el) { el.value = _wizardAnswers.market; el.focus(); } }, 200);
    }
}

function wizardSelectType(type, btn) {
    _wizardAnswers.customerType = type;
    document.querySelectorAll('.wizard-choice-btn').forEach(function(b) { b.classList.remove('selected'); });
    btn.classList.add('selected');
    var launch = document.getElementById('wizard-launch-btn');
    if (launch) { launch.disabled = false; launch.style.opacity = '1'; }
}

function updateWizardCard(html) {
    var card = document.getElementById('wizard-card');
    if (!card) return;
    var inner = card.querySelector('.onboarding-card');
    if (inner) inner.outerHTML = html;
    else card.innerHTML = html;
}

function wizardClose() {
    _wizardStep = 0; _wizardAnswers = { product: '', market: '', customerType: '' };
    var card = document.getElementById('wizard-card'); if (card) card.remove();
    var empty = document.getElementById('chat-empty'); if (empty) empty.style.display = '';
}

async function wizardLaunch() {
    var a = _wizardAnswers;
    var typeNames = {
        distributor: langText('批发商/分销商', 'wholesaler/distributor'),
        oem: langText('品牌商/OEM工厂', 'brand/OEM factory'),
        retailer: langText('零售商/连锁店', 'retailer/chain store'),
        any: langText('所有类型', 'any buyer type'),
    };
    var typeName = typeNames[a.customerType] || a.customerType;
    var promptText = langText('帮我找客户。产品=', 'Find customers for me. Product=')
        + a.product
        + langText('，市场=', ', market=') + a.market
        + langText('，客户类型=', ', buyer type=') + typeName;

    _wizardStep = 4;
    updateWizardCard(`<div class="onboarding-card" style="margin:0 auto;max-width:580px;text-align:center;">
        <div class="onboarding-icon">🔍</div>
        <h2 class="onboarding-title">${esc(langText('正在帮你找客户...', 'Finding customers…'))}</h2>
        <p style="text-align:center;color:var(--text-secondary);font-size:14px;margin-bottom:8px;">
            ${esc(langText('自动多通道搜索中，请稍候', 'Searching several channels — one moment.'))}</p>
        <div style="width:60px;height:4px;background:var(--border-light);border-radius:2px;margin:0 auto;overflow:hidden;">
            <div style="width:30%;height:100%;background:var(--primary);border-radius:2px;animation:wizardProgress 1.5s ease-in-out infinite;"></div>
        </div>
    </div>`);

    // 发送消息到聊天区
    var textarea = document.getElementById('msg-input');
    if (textarea) {
        textarea.value = promptText;
        // 移除向导卡片，用正常聊天流展示
        setTimeout(function() { wizardClose(); }, 500);
        setTimeout(function() { sendMsg(); }, 600);
    }
}

// O-17：进度条动画移到 trade_chat.css，避免运行时注入 <style> 被 CSP 拦截
function saveState() {
    if (currentCompanyId) sessionStorage.setItem('trade_cid', currentCompanyId);
    else sessionStorage.removeItem('trade_cid');
    sessionStorage.setItem('trade_view', currentView);
    if (currentChatContext) sessionStorage.setItem('trade_ctx', currentChatContext);
}
function loadSavedCid() { return parseInt(sessionStorage.getItem('trade_cid') || '0') || null; }

