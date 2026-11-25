// ═════════════════════ INIT ═════════════════════
document.addEventListener('DOMContentLoaded', async () => {
    // 初始化语言
    initLang();
    // S-01 特效 / 图标 / 顶栏时钟（不依赖公司状态，尽早挂上）
    if (typeof initFxBackground === 'function') initFxBackground();

    // Hermes 版本过旧 → 只显示升级面板，不再走公司/聊天初始化：那些功能此刻全都
    // 依赖 Hermes，走下去只会让用户在坏掉的界面上乱点
    if (await checkHermesCompatOrShowPanel()) return;

    // 检测是否刚完成系统升级（页面 reload 后显示 toast）
    try {
        if (sessionStorage.getItem('_trade_upgrade_done')) {
            sessionStorage.removeItem('_trade_upgrade_done');
            setTimeout(() => toast('✅ 系统更新完成！'), 500);
        }
    } catch(_) {}

    // 本地构建无许可证门禁：直接恢复所有入口的可见性。
    _applyLicenseGates();

    try {
        await loadCompanies();
    } catch(e) {
        console.error('Init loadCompanies failed:', e);
    }
    const savedCid = loadSavedCid();
    if (savedCid && companies.find(c => c.id === savedCid)) {
        currentCompanyId = savedCid;
    } else if (companies.length === 1) {
        currentCompanyId = companies[0].id;
    }

    // 检测重启前保存的浏览状态（避免 hard reload 丢失阅读位置）
    const reloadState = _restoreReloadState();

    if (currentCompanyId) {
        saveState();
        loadUsageToday();
        const sel = $('company-select');
        if (sel) sel.value = currentCompanyId;
        // 首个公司 + 引导未完成 → 显示新手引导
        if (companies.length === 1 && !isOnboardingCompleted()) {
            showOnboardingGuide();
            startCronPolling();
            startVersionCheck();
            return;
        }
        // 恢复之前的视图或默认打开今日简报（所有入口均可直接访问）
        let restoreView = reloadState?.view || 'chat';
        let restoreCtx = reloadState?.chatCtx || 'daily';
        let restoreName = reloadState?.chatName || '今日简报';
        navToView(restoreView, restoreCtx, restoreName);
        // 恢复滚动位置（等 DOM 渲染完成后）
        if (reloadState?.scrollY > 0) {
            setTimeout(() => { window.scrollTo({ top: reloadState.scrollY, behavior: 'instant' }); }, 200);
        }
        startCronPolling();
        startVersionCheck();
    } else {
        renderNoCompanyPage();
    }
});

// 页面关闭时清理轮询
window.addEventListener('beforeunload', () => { stopCronPolling(); stopVersionCheck(); });

function renderNoCompanyPage() {
    // 清除视图缓存
    for (const key in viewCache) {
        viewCache[key].element.remove();
        delete viewCache[key];
    }
    // 「创建公司」与「导入公司数据」均可用；导入不再受许可证限制。
    const importBtn = '<button data-act="showImportCompanyDialog">' + btnIcon('upload') + ' 导入已有公司数据</button>';
    _replaceMainContent('<div class="empty-state"><div class="empty-icon">🏢</div>'
        + '<h2>请先选择或创建公司</h2><p>Trade AI 为多公司隔离架构</p>'
        + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">'
        + '<button data-act="showAddCompanyModal">' + btnIcon('plus') + ' 创建公司</button>'
        + importBtn
        + '</div></div>');
}

// #region delegated-actions —— 内联事件迁移（O-17 第二步），勿删标记
// 目标：把 on* 属性替换成 data-*，用委托监听执行；为最终移除 CSP
// unsafe-inline 做准备。data-act 只接受全局函数名 + 数据属性参数，
// 不解析表达式、不 eval，避免把注入的 HTML 变成任意代码执行。
(function () {
    function _coerce(value) {
        // 纯数字（含负数）按 number 传，其余保持字符串
        return /^-?\d+(?:\.\d+)?$/.test(value) ? Number(value) : value;
    }

    function _baseArgs(el) {
        var args = [];
        if (el.dataset.args) {
            try {
                var parsed = JSON.parse(el.dataset.args);
                if (Array.isArray(parsed)) args = parsed;
            } catch (e) { args = []; }
        }
        ['arg', 'arg2', 'arg3'].forEach(function (key) {
            if (el.dataset[key] !== undefined) args.push(_coerce(el.dataset[key]));
        });
        if (el.dataset.from === 'this' || el.dataset.appendThis === '1') args.push(el);
        if (el.dataset.appendValue === '1') args.push(el.value);
        return args;
    }

    function _clickArgs(el, ev) {
        var args = [];
        if (el.dataset.event === '1') {
            // 传合成事件：currentTarget/target 都指向按钮本身（委托监听里
            // 原生 event.currentTarget 是 document，会让按钮忙态挂错对象）。
            // O-新17：preventDefault/stopPropagation 必须转发到真实事件 ——
            // 否则 <a href="#"> 的默认跳转（挂 # + 滚回顶部）拦不住。
            args.push({
                currentTarget: el, target: el,
                preventDefault: function () { if (ev && ev.preventDefault) ev.preventDefault(); },
                stopPropagation: function () { if (ev && ev.stopPropagation) ev.stopPropagation(); },
            });
        }
        if (el.dataset.value === '1') args.push(el.value);
        return args.concat(_baseArgs(el));
    }

    var SPECIAL = {
        closeBackdrop: function (el) {
            var box = el.closest && el.closest('.modal-backdrop');
            if (box) box.remove();
        },
        copySelf: function (el) {
            navigator.clipboard.writeText(el.textContent);
            toast(t('toast.copied'));
        },
        removeById: function (el) {
            var node = document.getElementById(el.dataset.arg || '');
            if (node) node.remove();
        },
        toastArg: function (el) {
            if (el.dataset.arg) toast(el.dataset.arg);
        },
    };

    // S1：只认界面里真实出现的动作名，绝不执行 window[任意字符串]
    var ALLOWED_ACTS = new Set([
        '_chatInputChanged',
        '_chatInputKeydown',
        '_custGoPage',
        '_visitSelect',
        'addOrderItemRow',
        'autoSlug',
        'batchCreateCronTasks',
        'bindMailbox',
        'bulkImportCustomers',
        'clearAllCronTasks',
        'clearChat',
        'closeBackdrop',
        'closeCustomerDetail',
        'copySelf',
        'copySkillTrigger',
        'createCompany',
        'createLibrary',
        'deleteCompany',
        'deleteConversation',
        'deleteCustomTemplate',
        'deleteOrder',
        'doRestartTrade',
        'doTradeUpdate',
        'editTemplatePrompt',
        'exportCompany',
        'filterConversations',
        'filterCustomers',
        'hideModal',
        'linkCustomerLib',
        'loadActiveCronJobs',
        'navToView',
        'onChatLibraryChange',
        'onCompanyChange',
        'onCopilotConsentChange',
        'onMailboxFormDirty',
        'onMailboxPresetChange',
        'onTemplateTimeChange',
        'onboardingFinish',
        'onboardingGoToStep2',
        'onboardingSaveAndContinue',
        'onboardingSkip',
        'onboardingStartOSINT',
        'onboardingStopOSINT',
        'openCustomerWall',
        'openFollowUpModal',
        'pullMailbox',
        'removeById',
        'removeOrderItemRow',
        'restartOnboarding',
        'runActiveJob',
        'runSingleTemplate',
        'saveCompanyIdentity',
        'saveCopilotSettings',
        'saveCustomTemplate',
        'saveCustomer',
        'saveCustomerDetail',
        'saveOrder',
        'sendMsg',
        'showAddCompanyModal',
        'showAddCustomTemplateModal',
        'showAddLibraryModal',
        'showConversationDetail',
        'showCopilotSettings',
        'showCustomerEditModal',
        'showImportCompanyDialog',
        'showOrderEditModal',
        'showOrderModal',
        'showSkillsHelp',
        'showUpgradeHelp',
        'switchLang',
        'switchModalTab',
        'testMailboxConnection',
        'toastArg',
        'toggleCustomerStar',
        'toggleOverdueFilter',
        'toggleStarredFilter',
        'toggleWallStar',
        'unbindMailbox',
        'unlinkCustomerLib',
        'updateMailboxSecret',
        'updateSkills',
        'wizardBack',
        'wizardClose',
        'wizardLaunch',
        'wizardNext',
        'wizardSelectType',
    ]);

    function _run(el, ev) {
        // 模型/历史消息内部永远不执行 UI 动作（S1：防提示注入）
        if (el.closest && el.closest('.msg-body')) return;
        if (el.dataset.stop === '1' && ev && ev.stopPropagation) ev.stopPropagation();
        var act = el.dataset.act || '';
        if (!act) return;
        if (!SPECIAL[act] && !ALLOWED_ACTS.has(act)) {
            console.warn('[trade] 未登记的动作，已忽略:', act);
            return;
        }
        if (el.dataset.pre) {
            if (!ALLOWED_ACTS.has(el.dataset.pre)) return;
            var preFn = window[el.dataset.pre];
            if (typeof preFn === 'function') preFn();
        }
        if (SPECIAL[act]) { SPECIAL[act](el); return; }
        var fn = window[act];
        if (typeof fn !== 'function') {
            console.warn('[trade] 未找到动作函数:', act);
            return;
        }
        fn.apply(el, _clickArgs(el, ev));
    }

    document.addEventListener('click', function (ev) {
        var el = ev.target && ev.target.closest && ev.target.closest('[data-act],[data-stop]');
        if (el) _run(el, ev);
    });
    document.addEventListener('change', function (ev) {
        var el = ev.target && ev.target.closest && ev.target.closest('[data-onchange]');
        if (!el) return;
        if ((el.closest && el.closest('.msg-body')) || !ALLOWED_ACTS.has(el.dataset.onchange)) return;
        var fn = window[el.dataset.onchange];
        if (typeof fn !== 'function') return;
        var args = _baseArgs(el);
        if (el.dataset.appendValue === '1' || args.length === 0) args.push(el.value);
        fn.apply(el, args);
    });
    document.addEventListener('input', function (ev) {
        var el = ev.target && ev.target.closest && ev.target.closest('[data-oninput]');
        if (!el) return;
        if ((el.closest && el.closest('.msg-body')) || !ALLOWED_ACTS.has(el.dataset.oninput)) return;
        var fn = window[el.dataset.oninput];
        if (typeof fn === 'function') fn(el);
    });
    document.addEventListener('keydown', function (ev) {
        var el = ev.target && ev.target.closest && ev.target.closest('[data-enter],[data-keydown]');
        if (!el) return;
        if (el.closest && el.closest('.msg-body')) return;
        if (el.dataset.enter && ev.key === 'Enter' && ALLOWED_ACTS.has(el.dataset.enter)) {
            var enterFn = window[el.dataset.enter];
            if (typeof enterFn === 'function') enterFn(ev);
        }
        if (el.dataset.keydown && ALLOWED_ACTS.has(el.dataset.keydown)) {
            var keyFn = window[el.dataset.keydown];
            if (typeof keyFn === 'function') keyFn(ev);
        }
    });
})();
// #endregion delegated-actions
