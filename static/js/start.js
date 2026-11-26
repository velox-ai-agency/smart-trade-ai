// ═════════════════════ START ONBOARDING UI ═════════════════════
/**
 * /api/start onboarding UI.
 *
 * Requests go through api() when present: api.js builds every request with
 * X-Company-ID taken from the global `currentCompanyId` declared in state.js.
 * The id is never hardcoded. When api() is unavailable (unit tests / raw
 * fallback) the same header is built explicitly from the active company id,
 * and no private request is issued at all when no company is selected.
 *
 * Only one question is rendered per turn. Confirm is sent only on an explicit
 * click. Staged edits never mutate the last confirmed profile until Apply.
 */
(function (root, factory) {
    'use strict';
    var exportsObj = factory(root);
    if (typeof module !== 'undefined' && module.exports) module.exports = exportsObj;
    else root.StartOnboarding = exportsObj;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
    'use strict';

    var BASE = '/api/start';
    var BASICS = ['name', 'country', 'activity', 'products', 'markets'];
    var DETAIL_KEYS = [
        'specifications', 'moq', 'capacity', 'lead_times', 'pricing',
        'payment_terms', 'shipping_terms', 'buyer_preferences',
        'previous_markets', 'correspondence_preferences', 'signature'
    ];
    var DOC_TYPES = ['certificate_of_origin', 'invoice', 'packing_list', 'bill_of_lading'];

    // confirmedProfile is a snapshot taken at /confirm. Staging, cancelling or
    // rendering edits must never touch it — only /edit/apply replaces it.
    var state = {
        status: 'idle',           // idle|loading|question|review|edit|done|no_company|error
        profile: null,
        confirmedProfile: null,
        question: null,
        review: null,
        staged: null,
        nextAction: null,
        details: [],
        credentials: [],
        shipments: [],
        reusable: null,
        detailReason: null,
        notice: null,
        error: null
    };

    function defaultDeps() {
        var coId = null;
        try { coId = (typeof currentCompanyId !== 'undefined') ? currentCompanyId : null; } catch (_) {}
        if (!coId && root && root.currentCompanyId) coId = root.currentCompanyId;
        var apiFn = null;
        try { apiFn = (typeof api !== 'undefined' && typeof api === 'function') ? api : null; } catch (_) {}
        if (!apiFn && root && typeof root.api === 'function') apiFn = root.api;
        var fetchFn = null;
        try { fetchFn = (typeof fetch !== 'undefined') ? fetch : null; } catch (_) {}
        if (!fetchFn && root && typeof root.fetch === 'function') fetchFn = root.fetch;
        var toastFn = null;
        try { toastFn = (typeof toast !== 'undefined') ? toast : null; } catch (_) {}
        var tFn = null;
        try { tFn = (typeof t !== 'undefined') ? t : null; } catch (_) {}
        var escFn = null;
        try { escFn = (typeof esc !== 'undefined') ? esc : null; } catch (_) {}
        var tok = null;
        try { tok = (typeof TOKEN !== 'undefined') ? TOKEN : null; } catch (_) {}
        var lang = 'en';
        try { lang = (typeof currentLang !== 'undefined') ? currentLang : 'en'; } catch (_) {}
        return {
            getCompanyId: function () { return coId; },
            api: apiFn,
            fetch: fetchFn ? function (u, o) { return fetchFn(u, o); } : null,
            token: tok,
            t: tFn || function (k) { return k; },
            toast: toastFn || function () {},
            esc: escFn || null,
            lang: lang,
            getElementById: (typeof document !== 'undefined') ? function (id) { return document.getElementById(id); } : null
        };
    }

    function copy(o) {
        if (o === null || o === undefined) return o;
        try { return JSON.parse(JSON.stringify(o)); } catch (_) { return o; }
    }
    function tr(d, key, params) {
        try { return d.t(key, params); } catch (_) { return key; }
    }
    function escText(d, s) {
        var v = (s === null || s === undefined) ? '' : String(s);
        if (typeof d.esc === 'function') { try { return d.esc(v); } catch (_) {} }
        return v.replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function sameValue(a, b) {
        if (Array.isArray(a) || Array.isArray(b)) {
            return JSON.stringify(a === undefined ? null : a) === JSON.stringify(b === undefined ? null : b);
        }
        return String(a === undefined ? '' : a) === String(b === undefined ? '' : b);
    }

    /** Every private request passes through here; refuses to run without a company. */
    function request(method, suffix, body, deps) {
        var d = deps || defaultDeps();
        var companyId = d.getCompanyId();
        if (companyId === null || companyId === undefined || companyId === '') {
            var err = new Error(tr(d, 'start.no_company'));
            err.code = 'NO_COMPANY';
            return Promise.reject(err);
        }
        var path = BASE + suffix;
        if (typeof d.api === 'function') {
            // api.js injects X-Company-ID from the very same currentCompanyId.
            return Promise.resolve(d.api(method, path, body));
        }
        if (typeof d.fetch !== 'function') return Promise.reject(new Error('fetch unavailable'));
        var headers = { 'Content-Type': 'application/json', 'X-Company-ID': String(companyId) };
        if (d.token) headers['X-Hermes-Session-Token'] = d.token;
        var opts = { method: method, headers: headers };
        if (body !== undefined && body !== null) opts.body = JSON.stringify(body);
        return Promise.resolve(d.fetch(path, opts)).then(function (r) {
            if (!r || r.ok === false) {
                var e = new Error('Request failed');
                e.status = r && r.status;
                throw e;
            }
            return r.json ? r.json() : null;
        });
    }

    function basicsOf(profile) {
        var p = profile || {};
        var b = p.basics || p;
        var out = {};
        BASICS.forEach(function (k) { if (b[k] !== undefined && b[k] !== null) out[k] = b[k]; });
        return out;
    }

    /** The review step is deliberately limited to basics — no optional details. */
    function reviewBasics(profile) { return basicsOf(profile); }

    function adopt(data) {
        data = data || {};
        if (Object.prototype.hasOwnProperty.call(data, 'profile')) {
            state.profile = data.profile ? copy(data.profile) : null;
        }
        if (data.question !== undefined) state.question = data.question || null;
        if (data.review !== undefined) state.review = data.review || null;
        if (data.next_action !== undefined) state.nextAction = data.next_action || null;
        state.notice = data.notice || state.notice;
        return state;
    }

    function determineStatus() {
        if (state.question) return 'question';
        if (state.staged) return 'edit';
        if (state.review || state.nextAction) return 'review';
        if (state.profile) return 'review';
        return 'idle';
    }

    function settleError(e, d) {
        state.status = 'error';
        state.error = (e && e.message) || tr(d, 'start.error');
        render(d);
        return state;
    }

    // ── public flow actions ──────────────────────────────────────────────
    function openStart(deps) {
        var d = deps || defaultDeps();
        showShell(d);
        var cid = d.getCompanyId();
        if (cid === null || cid === undefined || cid === '') {
            state.status = 'no_company';
            state.error = tr(d, 'start.no_company');
            render(d);
            return Promise.resolve(state);
        }
        state.status = 'loading';
        state.error = null;
        render(d);
        return request('GET', '/state', null, d)
            .then(function (data) {
                adopt(data);
                state.status = determineStatus();
                render(d);
                return state;
            })
            .catch(function (e) { return settleError(e, d); });
    }

    function start(deps) {
        var d = deps || defaultDeps();
        state.status = 'loading';
        render(d);
        return request('POST', '/start', {}, d)
            .then(function (data) {
                adopt(data);
                state.status = determineStatus();
                render(d);
                return state;
            })
            .catch(function (e) { return settleError(e, d); });
    }

    /** One field per turn. skip:true is sent (with no value) for Skip. */
    function answer(field, value, skip, deps) {
        var d = deps || defaultDeps();
        var body = { field: field };
        if (skip) body.skip = true;
        else body.value = value;
        return request('POST', '/answer', body, d)
            .then(function (data) {
                adopt(data);
                // A single question per turn: replace, never accumulate.
                state.question = data && data.question ? data.question : null;
                state.review = (data && data.review) ? data.review : null;
                state.status = state.question ? 'question' : (state.review || state.profile ? 'review' : determineStatus());
                render(d);
                return state;
            })
            .catch(function (e) { return settleError(e, d); });
    }

    /** Confirm is sent ONLY when the user explicitly clicks Confirm. */
    function confirm(deps) {
        var d = deps || defaultDeps();
        return request('POST', '/confirm', { approve: true }, d)
            .then(function (data) {
                adopt(data);
                if (data && data.profile) state.confirmedProfile = copy(data.profile);
                state.staged = null;
                state.review = (data && data.review) ? data.review : state.review;
                return fetchNextAction(d).then(function () {
                    state.status = 'done';
                    render(d);
                    return state;
                });
            })
            .catch(function (e) { return settleError(e, d); });
    }

    function fetchNextAction(deps) {
        var d = deps || defaultDeps();
        return request('GET', '/next-action', null, d)
            .then(function (data) {
                // Exactly one suggestion, taken from the GET endpoint.
                state.nextAction = (data && (data.next_action || data.kind)) ? (data.next_action || data) : null;
                return state.nextAction;
            })
            .catch(function () { state.nextAction = null; return null; });
    }

    function stageEdit(changes, deps) {
        var d = deps || defaultDeps();
        if (!changes || !Object.keys(changes).length) {
            state.notice = tr(d, 'start.no_changes');
            render(d);
            return Promise.resolve(state);
        }
        return request('POST', '/edit/stage', { changes: changes }, d)
            .then(function (data) {
                data = data || {};
                state.staged = {
                    token: data.token,
                    summary: data.summary,
                    base_version: data.base_version,
                    profile_unchanged: !!data.profile_unchanged
                };
                state.status = 'edit';
                state.notice = null;
                render(d);
                return state.staged;
            })
            .catch(function (e) { return settleError(e, d); });
    }

    function applyEdit(deps) {
        var d = deps || defaultDeps();
        if (!state.staged || !state.staged.token) return Promise.resolve(state);
        return request('POST', '/edit/apply', { token: state.staged.token }, d)
            .then(function (data) {
                if (data && data.profile) {
                    state.profile = copy(data.profile);
                    state.confirmedProfile = copy(data.profile);
                }
                state.staged = null;
                state.review = (data && data.review) ? data.review : state.review;
                state.notice = tr(d, 'start.edit_applied');
                state.status = 'review';
                render(d);
                return state;
            })
            .catch(function (e) { return settleError(e, d); });
    }

    function cancelEdit(deps) {
        var d = deps || defaultDeps();
        if (!state.staged || !state.staged.token) return Promise.resolve(state);
        var token = state.staged.token;
        return request('POST', '/edit/cancel', { token: token }, d)
            .then(function () {
                state.staged = null;
                // The confirmed profile was never touched by the staged edit.
                state.profile = copy(state.confirmedProfile || state.profile);
                state.notice = tr(d, 'start.edit_cancelled');
                state.status = 'review';
                render(d);
                return state;
            })
            .catch(function (e) { return settleError(e, d); });
    }

    function addDetail(key, value, reason, deps) {
        var d = deps || defaultDeps();
        if (DETAIL_KEYS.indexOf(key) === -1) {
            state.error = tr(d, 'start.detail_bad_key');
            render(d);
            return Promise.resolve(state);
        }
        if (!String(reason === undefined || reason === null ? '' : reason).trim()) {
            state.error = tr(d, 'start.detail_reason_required');
            render(d);
            return Promise.resolve(state);
        }
        return request('POST', '/details', { key: key, value: value, reason: reason }, d)
            .then(function (data) {
                data = data || {};
                state.details.push({ key: key, value: value, reason: reason });
                // Explain why it is needed: prefer the API reason, else the user's.
                state.detailReason = data.reason || reason;
                state.error = null;
                render(d);
                return state;
            })
            .catch(function (e) { return settleError(e, d); });
    }

    function addCredential(claim, deps) {
        var d = deps || defaultDeps();
        if (!String(claim === undefined || claim === null ? '' : claim).trim()) return Promise.resolve(state);
        return request('POST', '/credential', { claim: claim }, d)
            .then(function (data) {
                state.credentials.push({ claim: claim, result: data });
                render(d);
                return state;
            })
            .catch(function (e) { return settleError(e, d); });
    }

    function addShipmentDocument(doc, deps) {
        var d = deps || defaultDeps();
        doc = doc || {};
        if (DOC_TYPES.indexOf(doc.doc_type) === -1) {
            state.error = tr(d, 'start.shipment_bad_type');
            render(d);
            return Promise.resolve(state);
        }
        return request('POST', '/shipment-document', {
            shipment_ref: doc.shipment_ref,
            doc_type: doc.doc_type,
            file_name: doc.file_name,
            note: doc.note
        }, d).then(function (data) {
            state.shipments.push({ doc: doc, result: data });
            render(d);
            return state;
        }).catch(function (e) { return settleError(e, d); });
    }

    function fetchReusable(deps) {
        var d = deps || defaultDeps();
        return request('GET', '/reusable', null, d).then(function (data) {
            state.reusable = data;
            render(d);
            return data;
        }).catch(function () { return null; });
    }

    // ── next action: fill the chat draft, never send it ──────────────────
    function marketResearchPrompt(d) {
        var b = basicsOf(state.profile);
        var products = Array.isArray(b.products) ? b.products.join(', ') : (b.products || '');
        var markets = Array.isArray(b.markets) ? b.markets.join(', ') : (b.markets || '');
        return tr(d, 'start.next.chat_prompt', { products: products, markets: markets });
    }

    function taskPrompt(d, na) {
        if (na.prompt || na.task_prompt) return String(na.prompt || na.task_prompt);
        var id = na.id || na.task_id || (na.task && na.task.id);
        // Reuse the exact prompt of the task template when it is available.
        if (id && typeof getAllTemplates === 'function') {
            try {
                var templates = getAllTemplates();
                for (var i = 0; i < templates.length; i++) {
                    if (templates[i].id === id && templates[i].prompt) return templates[i].prompt;
                }
            } catch (_) {}
        }
        var b = basicsOf(state.profile);
        var products = Array.isArray(b.products) ? b.products.join(', ') : (b.products || '');
        var markets = Array.isArray(b.markets) ? b.markets.join(', ') : (b.markets || '');
        return tr(d, 'start.next.task_prompt', {
            label: na.label || id || 'task', products: products, markets: markets
        });
    }

    function fillDraft(prompt, deps) {
        var d = deps || defaultDeps();
        if (typeof d.fillDraft === 'function') return d.fillDraft(prompt);
        var input = null;
        if (typeof currentChatContainer !== 'undefined' && currentChatContainer && currentChatContainer.querySelector) {
            input = currentChatContainer.querySelector('#msg-input');
        }
        if (!input && typeof document !== 'undefined') {
            input = document.querySelector('#msg-input') || document.getElementById('msg-input');
        }
        if (!input) return null;
        input.value = prompt;
        // Same convention as wizard.js/views.js: set the draft and stop.
        if (typeof _chatInputChanged === 'function') _chatInputChanged(input);
        return prompt;
    }

    function applyNextAction(deps) {
        var d = deps || defaultDeps();
        var na = state.nextAction;
        if (!na) return null;
        var prompt = null;
        if (na.kind === 'task') {
            if (!na.task_exists) return null; // no button is rendered in this case
            prompt = taskPrompt(d, na);
        } else if (na.kind === 'chat') {
            prompt = marketResearchPrompt(d);
        } else {
            return null;
        }
        return fillDraft(prompt, d); // deliberately NO sendMsg()/auto-submit
    }

    // ── rendering ────────────────────────────────────────────────────────
    /**
     * Created at runtime rather than as a static HTML skeleton: ui.js's
     * _removeDynamicModals() only protects a fixed whitelist of skeleton ids.
     * Recreate defensively in case another modal flow removed the node.
     */
    function ensureShell() {
        if (typeof document === 'undefined') return null;
        var modal = document.getElementById('start-modal');
        if (modal) return modal;
        var el = document.createElement('div');
        el.className = 'modal-backdrop hidden';
        el.id = 'start-modal';
        el.innerHTML = '<div class="modal wide" id="start-modal-inner" dir="ltr">' +
            '<h3 id="start-modal-title"></h3>' +
            '<div id="start-modal-body"></div>' +
            '<div id="start-modal-extra"></div>' +
            '<div class="form-actions" id="start-modal-actions"></div></div>';
        var parent = document.body || document.documentElement;
        if (parent) parent.appendChild(el);
        return el;
    }

    function showShell(d) {
        if (typeof document === 'undefined') return null;
        var modal = ensureShell();
        if (!modal) return null;
        var inner = document.getElementById('start-modal-inner');
        if (inner) inner.setAttribute('dir', d.lang === 'ar' ? 'rtl' : 'ltr');
        if (typeof showModal === 'function') showModal('start-modal');
        else modal.classList.remove('hidden');
        return modal;
    }

    function renderQuestion(d) {
        var q = state.question || {};
        var field = q.field || '';
        var text = q.text || q.prompt || tr(d, 'start.question.' + field) || field;
        return '<p class="start-question">' + escText(d, text) + '</p>' +
            '<div class="form-group"><input type="text" id="start-answer" placeholder="' +
            escText(d, tr(d, 'start.answer_ph')) + '"></div>';
    }

    function renderQuestionActions(d) {
        return '<button class="btn" data-start-act="skip">' + escText(d, tr(d, 'start.skip')) + '</button>' +
            '<button class="btn btn-primary" data-start-act="answer">' + escText(d, tr(d, 'start.send')) + '</button>';
    }

    function renderReview(d) {
        var b = reviewBasics(state.profile); // basics only — no optional detail fields
        var html = '<p class="start-hint">' + escText(d, tr(d, 'start.review_hint')) + '</p>';
        BASICS.forEach(function (k) {
            var raw = b[k];
            var val = Array.isArray(raw) ? raw.join(', ') : raw;
            html += '<div class="form-group"><label>' + escText(d, tr(d, 'start.field.' + k)) + '</label>' +
                '<input type="text" id="start-edit-' + k + '" value="' +
                escText(d, val === undefined || val === null ? '' : val) + '"></div>';
        });
        return html;
    }

    function renderReviewActions(d) {
        return '<button class="btn" data-start-act="edit">' + escText(d, tr(d, 'start.correct')) + '</button>' +
            '<button class="btn btn-primary" data-start-act="confirm">' + escText(d, tr(d, 'start.confirm')) + '</button>';
    }

    function renderEdit(d) {
        var s = state.staged || {};
        return '<p class="start-hint">' + escText(d, tr(d, 'start.edit_hint')) + '</p>' +
            '<pre class="start-diff">' + escText(d, s.summary || '') + '</pre>' +
            '<p class="start-token">' + escText(d, tr(d, 'start.edit_token')) + ': ' + escText(d, s.token || '') + '</p>';
    }

    function renderEditActions(d) {
        return '<button class="btn" data-start-act="cancel">' + escText(d, tr(d, 'start.cancel')) + '</button>' +
            '<button class="btn btn-primary" data-start-act="apply">' + escText(d, tr(d, 'start.apply')) + '</button>';
    }

    function renderNext(d) {
        var na = state.nextAction;
        if (!na) return '';
        var html = '<p class="start-hint">' + escText(d, tr(d, 'start.next_hint')) + '</p>';
        if (na.kind === 'task' && na.task_exists) {
            html += '<button class="btn" data-start-act="next">' + escText(d, tr(d, 'start.next_task')) + '</button>';
        } else if (na.kind === 'chat') {
            html += '<button class="btn" data-start-act="next">' + escText(d, tr(d, 'start.next_chat')) + '</button>';
        }
        return html;
    }

    function renderPanels(d) {
        var html = '<details class="start-panel"><summary>' + escText(d, tr(d, 'start.detail_title')) + '</summary>' +
            '<div class="form-group"><label>' + escText(d, tr(d, 'start.detail_key')) + '</label><select id="start-detail-key">' +
            DETAIL_KEYS.map(function (k) {
                return '<option value="' + escText(d, k) + '">' + escText(d, tr(d, 'start.detail.' + k)) + '</option>';
            }).join('') + '</select></div>' +
            '<div class="form-group"><label>' + escText(d, tr(d, 'start.detail_value')) + '</label>' +
            '<input type="text" id="start-detail-value"></div>' +
            '<div class="form-group"><label>' + escText(d, tr(d, 'start.detail_reason')) + '</label>' +
            '<input type="text" id="start-detail-reason"></div>' +
            '<button class="btn" id="start-detail-submit" data-start-act="detail-add" disabled>' +
            escText(d, tr(d, 'start.detail_add')) + '</button>';
        if (state.detailReason) {
            html += '<p class="start-reason">' + escText(d, tr(d, 'start.detail_why', { reason: state.detailReason })) + '</p>';
        }
        state.details.forEach(function (x) {
            html += '<p class="start-item">' + escText(d, tr(d, 'start.detail.' + x.key)) + ': ' +
                escText(d, x.value === undefined || x.value === null ? '' : x.value) + '</p>';
        });
        html += '</details>';

        html += '<details class="start-panel"><summary>' + escText(d, tr(d, 'start.credential_title')) + '</summary>' +
            '<div class="form-group"><label>' + escText(d, tr(d, 'start.credential_claim')) + '</label>' +
            '<input type="text" id="start-credential-claim"></div>' +
            '<button class="btn" data-start-act="credential-add">' + escText(d, tr(d, 'start.credential_add')) + '</button>' +
            '<p class="start-warning">' + escText(d, tr(d, 'start.credential_unverified')) + '</p>';
        state.credentials.forEach(function (x) {
            html += '<p class="start-item">' + escText(d, x.claim) + ' — ' +
                escText(d, tr(d, 'start.credential_unverified')) + '</p>';
        });
        html += '</details>';

        html += '<details class="start-panel"><summary>' + escText(d, tr(d, 'start.shipment_title')) + '</summary>' +
            '<p class="start-warning">' + escText(d, tr(d, 'start.shipment_warning')) + '</p>' +
            '<div class="form-group"><label>' + escText(d, tr(d, 'start.shipment_ref')) + '</label>' +
            '<input type="text" id="start-ship-ref"></div>' +
            '<div class="form-group"><label>' + escText(d, tr(d, 'start.shipment_doctype')) + '</label><select id="start-doc-type">' +
            DOC_TYPES.map(function (k) {
                return '<option value="' + escText(d, k) + '">' + escText(d, tr(d, 'start.doc.' + k)) + '</option>';
            }).join('') + '</select></div>' +
            '<div class="form-group"><label>' + escText(d, tr(d, 'start.shipment_file')) + '</label>' +
            '<input type="text" id="start-doc-file"></div>' +
            '<div class="form-group"><label>' + escText(d, tr(d, 'start.shipment_note')) + '</label>' +
            '<input type="text" id="start-doc-note"></div>' +
            '<button class="btn" data-start-act="shipment-add">' + escText(d, tr(d, 'start.shipment_add')) + '</button>';
        state.shipments.forEach(function (x) {
            html += '<p class="start-item">' + escText(d, x.doc.shipment_ref) + ' / ' +
                escText(d, x.doc.doc_type) + ' / ' + escText(d, x.doc.file_name) + '</p>';
        });
        html += '</details>';

        html += '<details class="start-panel"><summary>' + escText(d, tr(d, 'start.reusable_title')) + '</summary>' +
            '<div id="start-reusable">' + escText(d, state.reusable ? JSON.stringify(state.reusable) : tr(d, 'start.empty_reusable')) +
            '</div><button class="btn" data-start-act="reusable">' + escText(d, tr(d, 'start.reusable_load')) + '</button></details>';
        return html;
    }

    function render(d) {
        if (typeof document === 'undefined') return;
        ensureShell();
        var title = document.getElementById('start-modal-title');
        var body = document.getElementById('start-modal-body');
        var extra = document.getElementById('start-modal-extra');
        var actions = document.getElementById('start-modal-actions');
        if (!title || !body || !actions) return;
        var inner = document.getElementById('start-modal-inner');
        if (inner) inner.setAttribute('dir', d.lang === 'ar' ? 'rtl' : 'ltr');
        title.textContent = tr(d, 'start.title');
        var html = '';
        var acts = '';
        if (state.status === 'no_company') {
            html = '<p class="start-error">' + escText(d, state.error || tr(d, 'start.no_company')) + '</p>';
        } else if (state.status === 'error') {
            html = '<p class="start-error">' + escText(d, tr(d, 'start.error', { msg: state.error || '' })) + '</p>';
        } else if (state.status === 'loading') {
            html = '<p class="start-hint">' + escText(d, tr(d, 'start.loading')) + '</p>';
        } else if (state.status === 'question') {
            html = renderQuestion(d);
            acts = renderQuestionActions(d);
        } else if (state.status === 'edit') {
            html = renderEdit(d);
            acts = renderEditActions(d);
        } else if (state.status === 'review') {
            html = renderReview(d);
            acts = renderReviewActions(d);
        } else if (state.status === 'done') {
            html = '<p class="start-hint">' + escText(d, tr(d, 'start.done')) + '</p>' + renderNext(d);
            acts = '<button class="btn" data-start-act="close">' + escText(d, tr(d, 'start.close')) + '</button>';
        } else {
            html = '<p class="start-hint">' + escText(d, tr(d, 'start.intro')) + '</p>';
            acts = '<button class="btn btn-primary" data-start-act="begin">' + escText(d, tr(d, 'start.begin')) + '</button>'
                + '<button class="btn" data-start-act="close">' + escText(d, tr(d, 'start.cancel')) + '</button>';
        }
        if (state.notice && state.status !== 'no_company') {
            html = '<p class="start-notice">' + escText(d, state.notice) + '</p>' + html;
        }
        // 任何一步都允许退出：只有 Begin/Confirm 的对话框会把人困在里面
        if (state.status === 'question' || state.status === 'review' || state.status === 'edit') {
            acts += '<button class="btn" data-start-act="close">' + escText(d, tr(d, 'start.cancel')) + '</button>';
        }
        body.innerHTML = html;
        actions.innerHTML = acts;
        if (extra) extra.innerHTML = renderPanels(d);
    }

    function collectChanged(d) {
        var base = basicsOf(state.confirmedProfile || state.profile);
        var changes = {};
        BASICS.forEach(function (k) {
            var el = d.getElementById ? d.getElementById('start-edit-' + k) : null;
            if (!el) return;
            var val = el.value;
            if (k === 'products' || k === 'markets') {
                var raw = String(val || '').trim();
                // 'undecided' is a valid string value for markets, not a list.
                if (raw.toLowerCase() === 'undecided') val = 'undecided';
                else val = raw.split(',').map(function (x) { return x.trim(); }).filter(Boolean);
            }
            if (!sameValue(val, base[k])) changes[k] = val;
        });
        return changes;
    }

    function closeStart(deps) {
        var d = deps || defaultDeps();
        if (typeof hideModal === 'function') hideModal('start-modal');
        else if (typeof document !== 'undefined') {
            var modal = document.getElementById('start-modal');
            if (modal) modal.classList.add('hidden');
        }
        render(d);
    }

    function refreshStartI18n() {
        if (typeof document === 'undefined') return;
        var d = defaultDeps();
        var btn = document.getElementById('start-btn');
        if (btn) {
            btn.setAttribute('title', tr(d, 'start.button'));
            btn.setAttribute('data-tip', tr(d, 'start.button'));
        }
        var label = document.querySelector('#start-btn .start-btn-label');
        if (label) label.textContent = tr(d, 'start.button');
        var modal = ensureShell();
        if (modal && !modal.classList.contains('hidden')) render(d);
    }

    function bindDelegation() {
        if (typeof document === 'undefined') return;
        var modal = ensureShell();
        if (!modal || modal.dataset.startBound) return;
        modal.dataset.startBound = '1';
        modal.addEventListener('click', function (ev) {
            var el = ev.target && ev.target.closest ? ev.target.closest('[data-start-act]') : null;
            if (!el) return;
            var act = el.getAttribute('data-start-act');
            var d = defaultDeps();
            var field, input, v;
            if (act === 'begin') start(d);
            else if (act === 'answer') {
                field = state.question && state.question.field;
                input = document.getElementById('start-answer');
                if (field) answer(field, input ? input.value : '', false, d);
            } else if (act === 'skip') {
                field = state.question && state.question.field;
                if (field) answer(field, undefined, true, d);
            } else if (act === 'confirm') confirm(d);
            else if (act === 'edit') stageEdit(collectChanged(d), d);
            else if (act === 'apply') applyEdit(d);
            else if (act === 'cancel') cancelEdit(d);
            else if (act === 'next') applyNextAction(d);
            else if (act === 'detail-add') {
                v = document.getElementById('start-detail-value');
                var reason = document.getElementById('start-detail-reason');
                var keyEl = document.getElementById('start-detail-key');
                addDetail(keyEl ? keyEl.value : '', v ? v.value : '', reason ? reason.value : '', d);
            } else if (act === 'credential-add') {
                input = document.getElementById('start-credential-claim');
                addCredential(input ? input.value : '', d);
            } else if (act === 'shipment-add') {
                addShipmentDocument({
                    shipment_ref: (document.getElementById('start-ship-ref') || {}).value,
                    doc_type: (document.getElementById('start-doc-type') || {}).value,
                    file_name: (document.getElementById('start-doc-file') || {}).value,
                    note: (document.getElementById('start-doc-note') || {}).value
                }, d);
            } else if (act === 'reusable') fetchReusable(d);
            else if (act === 'close') closeStart(d);
        });
        modal.addEventListener('input', function (ev) {
            if (ev.target && ev.target.id === 'start-detail-reason') {
                var btn = document.getElementById('start-detail-submit');
                if (btn) btn.disabled = !String(ev.target.value || '').trim();
            }
        });
    }

    function boot() {
        if (typeof document === 'undefined') return;
        var btn = document.getElementById('start-btn');
        if (btn && !btn.dataset.startBound) {
            btn.dataset.startBound = '1';
            btn.addEventListener('click', function () { openStart(); });
        }
        bindDelegation();
        refreshStartI18n();
    }
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
        else boot();
    }

    // i18n.js calls refreshStartI18n() after every language switch; expose it
    // globally so the open modal (and the button label) re-render immediately.
    if (root) root.refreshStartI18n = refreshStartI18n;

    return {
        BASE: BASE,
        BASICS: BASICS,
        DETAIL_KEYS: DETAIL_KEYS,
        DOC_TYPES: DOC_TYPES,
        openStart: openStart,
        start: start,
        answer: answer,
        confirm: confirm,
        fetchNextAction: fetchNextAction,
        stageEdit: stageEdit,
        applyEdit: applyEdit,
        cancelEdit: cancelEdit,
        addDetail: addDetail,
        addCredential: addCredential,
        addShipmentDocument: addShipmentDocument,
        fetchReusable: fetchReusable,
        applyNextAction: applyNextAction,
        marketResearchPrompt: marketResearchPrompt,
        ensureShell: ensureShell,
        reviewBasics: reviewBasics,
        collectChanged: collectChanged,
        request: request,
        refreshStartI18n: refreshStartI18n,
        getState: function () { return copy(state); },
        getConfirmedProfile: function () { return copy(state.confirmedProfile); }
    };
});
