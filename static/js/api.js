// ═════════════════════ API ═════════════════════
let _authRecovering = false;

// 把请求体里 id 类字段的空字符串规范化为 null，避免后端 422 int_parsing
function normalizeBody(body) {
    if (!body || typeof body !== 'object') return body;
    var out = {};
    var idFields = ['library_id', 'customer_id', 'company_id'];
    for (var k in body) {
        if (body[k] === '' && (idFields.indexOf(k) >= 0 || /(^|_)(id|ids)$/i.test(k))) {
            out[k] = null;
        } else {
            out[k] = body[k];
        }
    }
    return out;
}

// 401 自动恢复：token 失效（服务重启）→ 重取新 token；公司缺失 → 重载公司列表
async function recoverAuth(method, path, body) {
    if (_authRecovering) return null;
    _authRecovering = true;
    try {
        // 服务重启后旧页面 token 失效：重新拉取 /trade 提取新 token
        var fresh = await fetch('/trade?_=' + Date.now(), { cache: 'no-store' });
        if (fresh.ok) {
            var html = await fresh.text();
            var m = html.match(/(?:const|let|var)\s+TOKEN\s*=\s*"([^"]+)"/);
            if (m && m[1] && m[1] !== TOKEN) {
                TOKEN = m[1];
                var retry = await api(method, path, body);
                if (retry !== null) return retry;
            }
        }
        // token 没变 → 可能是 X-Company-ID 缺失/失效 → 重载公司
        var prevCid = currentCompanyId;
        currentCompanyId = null;
        await loadCompanies();
        if (prevCid && !companies.find(function(c) { return c.id === prevCid; })) {
            toast(t('toast.no_company'));
            return null;
        }
        if (currentCompanyId) {
            var retry2 = await api(method, path, body);
            if (retry2 !== null) return retry2;
        }
        return null;
    } catch (e) {
        return null;
    } finally {
        _authRecovering = false;
    }
}

// #region api-opts —— 这段被 tests_js/api-opts.test.js 按标记整体抽取测试，勿删标记
// 构造请求选项：鉴权头 + body 编码。
// FormData（文件上传）必须原样透传且不设 Content-Type —— 否则会丢掉 multipart 的 boundary。
function _buildApiOpts(method, body, token, companyId, extraHeaders) {
    const opts = { method: method, headers: {} };
    if (token) opts.headers['X-Hermes-Session-Token'] = token;
    if (companyId) opts.headers['X-Company-ID'] = String(companyId);
    // 需要额外 header 的端点（如删除公司要 X-Confirm-Delete）走这里
    if (extraHeaders) Object.assign(opts.headers, extraHeaders);
    if (body instanceof FormData) {
        opts.body = body;
    } else if (body) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(normalizeBody(body));
    }
    return opts;
}
// #endregion api-opts

async function api(method, path, body, extraHeaders, options) {
    // options.silent：轮询等后台刷新失败时不弹 toast（仍返回 null，调用方自己决定）
    const silent = !!(options && options.silent);
    // options.onStatus(status)：把 HTTP 状态码交给调用方（如备忘录只在 403
    // 时计失败，网络错/500/429 不计）
    const onStatus = options && options.onStatus;
    const opts = _buildApiOpts(method, body, TOKEN, currentCompanyId, extraHeaders);
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 120000);
    opts.signal = ctrl.signal;
    try {
        const r = await fetch(path, opts);
        clearTimeout(tid);
        if (!r.ok) {
            if (onStatus) onStatus(r.status);
            const err = await r.json().catch(() => ({}));
            const msg = err.detail || `请求失败 (${r.status})`;
            if (r.status === 401) {
                // 自动恢复一次：重取 token / 重载公司
                const recovered = await recoverAuth(method, path, body);
                if (recovered !== null) return recovered;
                if (!silent) toast(t('toast.no_company'));
            }
            else if (r.status === 404) { if (!silent) toast(msg); }
            else if (r.status === 409) { if (!silent) toast(msg); }
            // 5xx / 429 是「用户需要看清原因」的失败，常驻显示
            else if (!silent) toast(msg, {sticky: r.status >= 500 || r.status === 429});
            return null;
        }
        return r.json();
    } catch(e) {
        clearTimeout(tid);
        if (e.name === 'AbortError') { if (!silent) toast(t('toast.request_timeout')); return null; }
        throw e;
    }
}

// ── 许可证 ──

// #region license-gate (本地构建：始终开放)
// 原来的试用期/激活门禁已移除。所有入口默认可见，所有判定一律返回「允许」。
let _licenseActivated = true;
let _licenseGateUnknown = false;

function _isPaidDestination(view, chatCtx) {
    // 兼容旧调用方；本地构建不再区分付费/免费入口，永远返回 false。
    return false;
}

function _licenseGateAllowsPaid() {
    return true;
}

/** 兼容旧调用方：只负责把可能被旧 HTML 隐藏的入口恢复显示。 */
function _applyLicenseGates() {
    document.querySelectorAll('[data-paid]').forEach(el => el.classList.remove('hidden'));
    const row = document.getElementById('import-company-row');
    if (row) row.classList.remove('hidden');
    const modal = document.getElementById('company-modal');
    if (modal && !modal.classList.contains('hidden') && typeof loadCompanyListUI === 'function') {
        loadCompanyListUI();
    }
}
// #endregion license-gate

// ── 重启协调 ──
// 清理前端运行时缓存，但保留用户上下文（trade_cid 让重启后不必重新选公司）
function _clearRuntimeCaches() {
    try {
        // 清理视图缓存（DOM 引用 + 渲染状态），强制重启后重新拉取
        if (typeof viewCache === 'object') {
            for (const k of Object.keys(viewCache)) delete viewCache[k];
        }
        // 仅清理与服务端 schema 强耦合的会话状态，保留 trade_cid（公司选择）
        const preserveKeys = new Set(['trade_cid', '_trade_reload_state']);
        const ssKeys = [];
        for (let i = 0; i < sessionStorage.length; i++) ssKeys.push(sessionStorage.key(i));
        ssKeys.forEach(k => { if (!preserveKeys.has(k)) sessionStorage.removeItem(k); });
    } catch(_) { /* sessionStorage 在隐私模式下可能抛错，忽略 */ }
}

// ── 重启前状态保存 / 恢复（避免 hard reload 丢失阅读位置）──────────

function _saveReloadState() {
    try {
        const state = {
            view: currentView || 'chat',
            scrollY: window.scrollY || document.documentElement.scrollTop || 0,
            chatCtx: currentView === 'chat' ? (currentChatContext || '') : '',
            chatName: currentView === 'chat' ? (currentChatName || '') : '',
            ts: Date.now(),
        };
        sessionStorage.setItem('_trade_reload_state', JSON.stringify(state));
    } catch(_) {}
}

function _restoreReloadState() {
    try {
        const raw = sessionStorage.getItem('_trade_reload_state');
        if (!raw) return null;
        sessionStorage.removeItem('_trade_reload_state');
        const state = JSON.parse(raw);
        // 超过 5 分钟的旧状态丢弃（可能是残留）
        if (Date.now() - state.ts > 300000) return null;
        return state;
    } catch(_) { return null; }
}

// 通过 /api/status 的 started_at 时间戳检测进程是否已重启，然后 hard-reload
// 不依赖 DOWN→UP 序列：新进程启动快时 DOWN 瞬间无法捕捉
//
// maxSeconds：兜底等待秒数，默认 120（重启场景足够）。
// **重建运行环境必须传更大的值** —— 那一步要建 venv + 装全部依赖，5~10 分钟是常态，
// 用默认的 2 分钟会在真正成功之前就报「超时」，把用户吓去手动折腾。
async function _waitForRestartAndReload(onTimeout, maxSeconds) {
    let attempts = 0;
    const maxAttempts = maxSeconds || 120;   // 每 1 秒一次轮询
    // 保存当前 started_at，重启后新进程的时间戳会不同
    let oldStartedAt = -1;  // -1 = 无法获取（旧服务无此字段 / 请求失败）
    try {
        const r0 = await fetch('/api/status?_=' + Date.now(), { cache: 'no-store' });
        if (r0.ok) {
            const d0 = await r0.json();
            // 旧服务可能无此字段 → 存 -1，只要能获取到新值就视为重启成功
            oldStartedAt = (typeof d0.started_at === 'number') ? d0.started_at : -1;
        }
    } catch(_) {}

    console.log('[重启] 开始轮询 /api/status (old started_at=' + oldStartedAt + ') ...');
    const tick = async () => {
        attempts++;
        try {
            const r = await fetch('/api/status?_=' + Date.now(), { cache: 'no-store' });
            if (r.ok) {
                const d = await r.json();
                const cur = (typeof d.started_at === 'number') ? d.started_at : -1;
                // 检测到重启：started_at 从旧值变为新值（-1→数值也算）
                if (cur > 0 && cur !== oldStartedAt) {
                    console.log('[重启] 第 ' + attempts + ' 次 — 检测到新进程 (started_at=' + cur + ')，刷新页面');
                    _saveReloadState();  // 保存当前浏览位置，reload 后恢复
                    _clearRuntimeCaches();
                    try { sessionStorage.removeItem('_upgrade_in_progress'); } catch(_) {}
                    location.href = '/trade?_=' + Date.now();
                    return;
                }
            }
        } catch(_) { /* 旧进程已下线但新进程未就绪，继续等 */ }
        if (attempts >= maxAttempts) {
            console.error('[重启] 超时 (' + maxAttempts + ' 次轮询)，请手动刷新');
            toast(t('sys.restart_timeout'));
            if (typeof onTimeout === 'function') onTimeout();
            return;
        }
        setTimeout(tick, 1000);
    };
    setTimeout(tick, 500);
}

/**
 * 切换侧边栏按钮的「忙」态：忙时图标换成沙漏并禁用，闲时恢复原图标。
 *
 * 图标化之后不能再沿用旧写法（把 textContent 设成「更新中…」这样的文字）——
 * 那会把按钮上的图标直接抹掉，恢复时还得重新知道原图标长什么样。
 * 原图标记在 dataset 里，连续多次 busy 也不会把沙漏本身记成原图标。
 */
function _setBtnBusy(btn, busy) {
    if (!btn) return;
    if (busy) {
        // 存 innerHTML 而不是 textContent：图标按钮的 textContent 是空串，恢复时会把图标抹掉
        if (btn.dataset.idleHtml === undefined) btn.dataset.idleHtml = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = (typeof iconHtml === 'function')
            ? '<span class="i i-20 spin" style="--i:url(\'/static/icons/lucide-refresh-cw.svg\')"></span>'
            : '…';
    } else {
        btn.disabled = false;
        if (btn.dataset.idleHtml !== undefined) btn.innerHTML = btn.dataset.idleHtml;
    }
}

/** 长等待的内联样式（只用于系统更新/重启/Skills 更新这三处，不替换 _setBtnBusy）。 */
function _setBtnWait(btn, en, zh) {
    if (!btn) return function () {};
    if (typeof TradeWait !== 'undefined') {
        try { return TradeWait.inline(btn, { en: en, zh: zh }); } catch (e) { /* 回落 */ }
    }
    const prev = btn.innerHTML;
    const wasDisabled = btn.disabled;
    btn.disabled = true;
    btn.innerHTML = (typeof iconHtml === 'function')
        ? '<span class="i i-20 spin" style="--i:url(\'/static/icons/lucide-refresh-cw.svg\')"></span>'
        : '…';
    return function () { btn.disabled = wasDisabled; btn.innerHTML = prev; };
}

// ── 今日 token 用量（只提示，不拦截）──
/**
 * 刷新侧栏底部的「今日已用 X / 上限」。
 *
 * 审计 P1-16 的额度提示，按用户要求**不做拦截**：超过上限只把文字标红，
 * 聊天照常执行。用裸 fetch 而不是 api()：失败时不该弹 toast 打扰聊天。
 */
async function loadUsageToday() {
    const el = $('usage-today');
    if (!el) return;
    if (!currentCompanyId) { el.hidden = true; return; }
    try {
        // 加时间戳 + no-store：额度会变，浏览器缓存旧响应会让升级后仍显示旧阈值
        const opts = _buildApiOpts('GET', null, TOKEN, currentCompanyId);
        opts.cache = 'no-store';
        const r = await fetch('/api/trade/usage/today?_=' + Date.now(), opts);
        if (!r.ok) { el.hidden = true; return; }
        const d = await r.json();
        const used = Number(d.used) || 0;
        const limit = Number(d.limit) || 0;
        const fmt = n => Number(n).toLocaleString('en-US');
        el.hidden = false;
        el.classList.toggle('over', !!d.exceeded);
        el.classList.toggle('warn', !d.exceeded && limit > 0 && used >= limit * 0.8);
        if (d.exceeded) {
            el.textContent = t('usage.over').replace('{used}', fmt(used)).replace('{limit}', fmt(limit));
        } else if (limit > 0) {
            el.textContent = t('usage.today').replace('{used}', fmt(used)).replace('{limit}', fmt(limit));
        } else {
            el.textContent = t('usage.unlimited').replace('{used}', fmt(used));
        }
    } catch(_) {
        el.hidden = true;
    }
}

// ── 系统更新 ──
let _pendingUpdateTarget = '';

/**
 * 更新前二次确认：展示当前版本 + 本次要安装的目标提交短 SHA。
 *
 * 目标 SHA 来自预览接口，并原样带到 /system/update —— 后端钉在这个提交上，
 * 保证"确认框看到的版本 = 实际安装的版本"（2026-10-28 口径）。
 * 预览失败时退回通用文案（确认本身不能因网络失败被跳过）。
 */
async function _confirmTradeUpdate() {
    let current = '';
    let target = '';
    _pendingUpdateTarget = '';
    try {
        const r = await fetch('/api/status?_=' + Date.now(), { cache: 'no-store' });
        if (r.ok) {
            const d = await r.json();
            current = d.version || '';
        }
    } catch(_) { /* 版本信息拿不到不影响确认 */ }
    try {
        const r = await fetch('/api/trade/system/update-preview?_=' + Date.now(), {
            cache: 'no-store',
            headers: {'X-Hermes-Session-Token': TOKEN},
        });
        if (r.ok) {
            const d = await r.json();
            if (d.ok && d.sha) {
                _pendingUpdateTarget = d.sha;
                target = d.short || d.sha.slice(0, 8);
            }
        }
    } catch(_) { /* 预览失败：后端会临场取 main，确认照常进行 */ }
    const msg = (current || target)
        ? t('sys.update_confirm_current')
            .replace('{current}', current || '?')
            .replace('{target}', target || '?')
        : t('sys.update_confirm');
    return confirm(msg);
}

/**
 * 更新完成后露出「重启」按钮（更新不再自动重启）。
 *
 * 为什么不自动重启：新代码起不来时旧服务还在，用户可以先看到更新结果、
 * 再决定何时重启；这是 audit P1-10 明确允许的替代方案。
 */
function _showRestartPrompt() {
    const rb = $('system-restart-btn');
    // 升级进行中绝不露出：此时重启会把升级打断，按钮必须等升级结束才出现
    if (rb && !_tradeUpdateInFlight) rb.hidden = false;
}

/**
 * 把升级失败结果拼成一段时间不会消失的提示文本。
 *
 * 后端返回 {error, errors, messages}：error 是给用户看的短句，messages 是
 * 逐步日志。只显示前半句时用户无法自助排查，所以附上日志最后几行。
 */
function _updateErrorText(resp) {
    const err = (resp && (resp.error || (resp.errors && resp.errors.join('; ')))) || '未知原因';
    let text = '❌ 更新失败：' + err;
    const msgs = (resp && resp.messages) || [];
    if (msgs.length) {
        // 最后 4 行足以定位（git / pip 的报错都在末尾），避免糊一屏
        text += '\n\n' + msgs.slice(-4).join('\n');
    }
    return text;
}

// 更新与重启必须串行：升级请求还在跑时点重启，watchdog 会把跑升级的进程
// 一起杀掉，pip 安装 / 模板同步 / 数据库检查全部中断
// （2026-11-11 实测：用户在 Step 3/7 点了重启，升级只做了一半）。
let _tradeUpdateInFlight = false;
// 升级前重启按钮是否已经可见（Hermes 升级等场景会提前露出）——
// 升级期间先收起，升级失败时按原样恢复。
let _restartPromptBeforeUpdate = false;

function _setUpdateInFlight(active) {
    _tradeUpdateInFlight = active;
    const rb = document.getElementById('system-restart-btn');
    if (!rb) return;
    rb.disabled = active;
    if (active) {
        // 升级期间收起重启按钮：它属于「升级完成后」的动作。提前露出来
        // 用户就会在升级途中点它，把升级线程一起杀掉（2026-11-11 实测）。
        _restartPromptBeforeUpdate = !rb.hidden;
        rb.hidden = true;
    } else if (_restartPromptBeforeUpdate) {
        rb.hidden = false;
        _restartPromptBeforeUpdate = false;
    }
}

async function doTradeUpdate(e) {
    // 用 currentTarget 或回退到事件对象，再不行直接查 DOM
    const btn = (e && (e.currentTarget || e.target)) || document.querySelector('#system-update-btn');
    if (!btn) return;
    if (!(await _confirmTradeUpdate())) return;
    const restoreBtn = _setBtnWait(btn, 'UPDATING', '更新中');
    _setUpdateInFlight(true);
    toast(t('sys.updating_now'));
    var updateFailed = false;
    var restartScheduled = false;
    try {
        const resp = await api('POST', '/api/trade/system/update',
            {target_sha: _pendingUpdateTarget || null},
            {'X-Confirm-Update': 'yes'});
        if (!resp) {
            updateFailed = true;
        } else if (resp.ok) {
            restartScheduled = !!resp.restart_scheduled;
            // 更新结果展示实际安装的提交（与确认框里的目标一致）
            // 只显示用户在确认框里见过的 SHA；预览失败时宁可不显示
            const appliedShort = (_pendingUpdateTarget || '').slice(0, 8);
            const suffix = appliedShort ? '（目标 ' + appliedShort + '）' : '';
            if (restartScheduled) {
                toast(t('sys.update_done_restart') + suffix);
            } else {
                toast(t('sys.update_done') + suffix);
            }
            // 非致命步骤（skills 同步等）失败只算警告，不阻止升级，但必须让用户看见
            if (resp.warnings && resp.warnings.length) {
                toast('⚠️ 升级完成，但有 ' + resp.warnings.length + ' 项警告：' + resp.warnings.join('; '),
                    {sticky: true});
            }
        } else if (resp.error || (resp.errors && resp.errors.length)) {
            // 常驻提示：3 秒自动消失的 toast 用户根本看不清（2026-10-29 反馈）
            toast(_updateErrorText(resp), {sticky: true});
            updateFailed = true;
        } else {
            toast(t('sys.update_unknown'));
            updateFailed = true;
        }
    } catch(e) {
        toast(t('sys.update_network'));
        updateFailed = true;
    }
    if (updateFailed) {
        restoreBtn();
        _setUpdateInFlight(false);
        return;
    }
    if (!restartScheduled) {
        // 后端只更新不重启（audit P1-10）：露出重启按钮，让用户自己点
        restoreBtn();
        _setUpdateInFlight(false);
        _showRestartPrompt();
        return;
    }
    // 存入标记，页面 reload 后检测并显示 toast
    try { sessionStorage.setItem('_trade_upgrade_done', '1'); } catch(_) {}
    _setUpdateInFlight(false);
    _waitForRestartAndReload(() => {
        restoreBtn();
    });
}

// ── 数据备份 ──
async function doRestartTrade(e) {
    const btn = (e && (e.currentTarget || e.target)) || document.querySelector('#system-restart-btn');
    if (!btn) return;
    // 升级还在跑：重启会中断升级。后端同样会 409，这里提前拦下少一次往返。
    if (_tradeUpdateInFlight) {
        toast(t('sys.restart_busy_update'));
        return;
    }
    const restoreBtn = _setBtnWait(btn, 'RESTARTING', '重启中');
    toast(t('sys.restart_toast'));
    let triggered = true;
    try {
        const resp = await api('POST', '/api/trade/system/restart');
        if (resp && resp.ok) {
            toast(t('sys.restart_ok'));
        } else if (resp) {
            toast(t('sys.restart_fail') + (resp.error || ''));
            triggered = false;
        } else {
            // api() 已经 toast 过具体原因（如 409 更新中）；服务没动，
            // 不能空等重启 —— 否则 120 秒后再弹一条误导性的「重启超时」。
            triggered = false;
        }
    } catch(e) {
        // 连接被掐断通常说明重启已经开始了
        toast(t('sys.restart_wait'));
    }
    if (!triggered) {
        restoreBtn();
        return;
    }
    _waitForRestartAndReload(() => {
        restoreBtn();
    });
}

