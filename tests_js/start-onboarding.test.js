/**
 * START onboarding UI tests — zero dependencies (node:test only, no jsdom).
 *
 * static/js/start.js is written as a UMD-ish module: in Node it exports its
 * functions and never boots the DOM layer, so every flow can be driven with a
 * stubbed api()/fetch and an injected chat-draft filler.
 *
 * Run: node --test tests_js/start-onboarding.test.js
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const START_JS = path.join(__dirname, '..', 'static', 'js', 'start.js');
const I18N_JS = path.join(__dirname, '..', 'static', 'js', 'i18n.js');
const HTML = path.join(__dirname, '..', 'static', 'trade_chat.html');

function fresh() {
    delete require.cache[require.resolve(START_JS)];
    return require(START_JS);
}

const identity = (k, params) => {
    let s = k;
    if (params) for (const pk in params) s = s.split('{' + pk + '}').join(params[pk]);
    return s;
};

/** Evaluate the real i18n.js once so tests use actual English strings. */
function loadEnglishT() {
    const vm = require('node:vm');
    const ctx = { currentLang: 'en', console };
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(I18N_JS, 'utf8') + '\n;globalThis.__T = t;', ctx);
    return ctx.__T;
}
const EN_T = loadEnglishT();

function makeDeps(opts) {
    opts = opts || {};
    const calls = [];
    const drafts = [];
    const sends = [];
    const answers = (opts.answers || []).slice();
    const apiStub = (method, pathName, body) => {
        calls.push({
            method,
            path: pathName,
            body: body === undefined || body === null ? body : JSON.parse(JSON.stringify(body))
        });
        if (pathName === '/api/start/state') return Promise.resolve(opts.state || { profile: { basics: {} }, question: { field: 'basics.name' } });
        if (pathName === '/api/start/start') return Promise.resolve(opts.started || { question: { field: 'basics.name' } });
        if (pathName === '/api/start/answer') return Promise.resolve(answers.shift() || {});
        if (pathName === '/api/start/confirm') {
            return Promise.resolve(opts.confirm || { profile: opts.confirmedProfile || { basics: { name: 'Acme' } }, review: {} });
        }
        if (pathName === '/api/start/next-action') return Promise.resolve(opts.nextAction || { kind: 'chat' });
        if (pathName === '/api/start/edit/stage') return Promise.resolve({ token: 'tok-123', summary: 'name: Acme -> Other', base_version: 3, profile_unchanged: true });
        if (pathName === '/api/start/edit/apply') return Promise.resolve({ profile: opts.appliedProfile || { basics: { name: 'Other' } } });
        if (pathName === '/api/start/edit/cancel') return Promise.resolve({ ok: true });
        if (pathName === '/api/start/details') return Promise.resolve({ reason: opts.apiReason || 'Needed for quotation' });
        if (pathName === '/api/start/credential') return Promise.resolve({ ok: true });
        if (pathName === '/api/start/shipment-document') return Promise.resolve({ ok: true });
        if (pathName === '/api/start/reusable') return Promise.resolve({ items: [] });
        return Promise.resolve({});
    };
    return {
        calls, drafts, sends,
        deps: {
            getCompanyId: () => (opts.companyId === undefined ? 7 : opts.companyId),
            api: apiStub,
            fetch: opts.fetch || null,
            token: 'test-token',
            t: opts.t || EN_T,
            toast: () => {},
            lang: opts.lang || 'en',
            fillDraft: (p) => { drafts.push(p); return p; },
            sendMsg: () => { sends.push(1); },
            getElementById: opts.getElementById || null
        }
    };
}

const fullProfile = () => ({
    basics: {
        name: 'Acme Trading', country: 'Egypt', activity: 'Manufacturer',
        products: ['valves', 'pumps'], markets: 'undecided'
    },
    specifications: 'DN15-DN200'
});

test('one question per turn; Skip sends skip:true with no value; no early confirm', async () => {
    const S = fresh();
    const f = makeDeps({
        state: { profile: { basics: {} }, question: { field: 'basics.name', text: 'Company name?' } },
        answers: [
            { profile: { basics: { name: 'Acme' } }, question: { field: 'basics.country', text: 'Country?' } },
            { profile: { basics: { name: 'Acme', country: 'Egypt' } }, question: { field: 'basics.activity', text: 'Activity?' } }
        ]
    });
    await S.openStart(f.deps);
    assert.equal(S.getState().status, 'question');
    assert.equal(S.getState().question.field, 'basics.name');
    assert.equal(S.getState().question.text, 'Company name?');

    await S.answer('basics.name', 'Acme', false, f.deps);
    assert.equal(S.getState().question.field, 'basics.country', 'only the returned question is shown');
    assert.equal(S.getState().question.text, 'Country?');

    await S.answer('basics.country', undefined, true, f.deps);
    const skip = f.calls.find(c => c.path === '/api/start/answer' && c.body && c.body.field === 'basics.country');
    assert.ok(skip, 'skip answer must be posted');
    assert.equal(skip.body.skip, true);
    assert.ok(!('value' in skip.body), 'skip must not carry a value');
    assert.equal(S.getState().question.field, 'basics.activity');
    assert.ok(!f.calls.some(c => c.path === '/api/start/confirm'), 'confirm never fires implicitly');
});

test('review shows basics only; Confirm requires an explicit click', async () => {
    const S = fresh();
    const f = makeDeps({
        state: { profile: fullProfile(), review: { ok: true } }
    });
    await S.openStart(f.deps);
    assert.equal(S.getState().status, 'review');

    const basics = S.reviewBasics(S.getState().profile);
    assert.deepEqual(Object.keys(basics).sort(), ['activity', 'country', 'markets', 'name', 'products']);
    assert.ok(!('specifications' in basics), 'optional detail must never appear in review');
    assert.equal(basics.markets, 'undecided', 'undecided is a valid market value');
    assert.ok(!f.calls.some(c => c.path === '/api/start/confirm'));

    await S.confirm(f.deps);
    const confirms = f.calls.filter(c => c.path === '/api/start/confirm');
    assert.equal(confirms.length, 1, 'exactly one confirm on explicit click');
    assert.deepEqual(confirms[0].body, { approve: true });
    assert.ok(f.calls.some(c => c.method === 'GET' && c.path === '/api/start/next-action'));
});

test('staged edit keeps the confirmed profile until Apply; Cancel preserves it', async () => {
    const S = fresh();
    const f = makeDeps({ state: { profile: fullProfile(), review: { ok: true } }, confirmedProfile: fullProfile() });
    await S.openStart(f.deps);
    await S.confirm(f.deps);
    const original = S.getConfirmedProfile();

    await S.stageEdit({ 'basics.name': 'Other Name' }, f.deps);
    assert.equal(S.getState().status, 'edit');
    assert.equal(S.getState().staged.token, 'tok-123');
    assert.deepEqual(S.getConfirmedProfile(), original, 'staging must not change confirmed profile');
    assert.deepEqual(S.getState().profile, original, 'staging must not change displayed profile');
    assert.ok(!f.calls.some(c => c.path === '/api/start/edit/apply'), 'no implicit apply');

    await S.cancelEdit(f.deps);
    assert.equal(S.getState().staged, null);
    assert.deepEqual(S.getConfirmedProfile(), original, 'cancel preserves original');
    assert.deepEqual(S.getState().profile, original);
    assert.match(S.getState().notice, /preserved/);
    assert.ok(f.calls.some(c => c.path === '/api/start/edit/cancel' && c.body.token === 'tok-123'));
    assert.ok(!f.calls.some(c => c.path === '/api/start/edit/apply'));
});

test('next action of kind task fills the chat draft only — never sends', async () => {
    const S = fresh();
    const f = makeDeps({
        state: { profile: fullProfile(), review: { ok: true } },
        confirmedProfile: fullProfile(),
        nextAction: { kind: 'task', task_exists: true, prompt: 'RUN THIS TASK' }
    });
    await S.openStart(f.deps);
    await S.confirm(f.deps);
    assert.equal(S.getState().nextAction.kind, 'task');
    const prompt = S.applyNextAction(f.deps);
    assert.equal(prompt, 'RUN THIS TASK');
    assert.deepEqual(f.drafts, ['RUN THIS TASK']);
    assert.equal(f.sends.length, 0);
    assert.ok(!f.calls.some(c => c.method === 'POST' && /send|chat/i.test(c.path)), 'no chat send request');
});

test('backend-shaped task action (id + label, no prompt) also fills draft only', async () => {
    const S = fresh();
    const f = makeDeps({
        state: { profile: fullProfile(), review: { ok: true } },
        confirmedProfile: fullProfile(),
        nextAction: { kind: 'task', id: 'customer-dev', label: 'Customer Development', task_exists: true }
    });
    await S.openStart(f.deps);
    await S.confirm(f.deps);
    const prompt = S.applyNextAction(f.deps);
    assert.ok(prompt.includes('Customer Development'), 'uses the action label');
    assert.ok(prompt.includes('valves, pumps'), 'uses confirmed basics');
    assert.deepEqual(f.drafts, [prompt]);
    assert.equal(f.sends.length, 0);
});

test('empty staged edit is rejected locally (backend requires non-empty changes)', async () => {
    const S = fresh();
    const f = makeDeps({ state: { profile: fullProfile(), review: { ok: true } } });
    await S.openStart(f.deps);
    await S.stageEdit({}, f.deps);
    assert.ok(!f.calls.some(c => c.path === '/api/start/edit/stage'));
    assert.equal(S.getState().status, 'review');
    assert.ok(S.getState().notice);
});

test('GET /state with no draft shows the intro, not a stale profile', async () => {
    const S = fresh();
    const f = makeDeps({ state: { profile: null, question: null } });
    await S.openStart(f.deps);
    assert.equal(S.getState().status, 'idle');
    assert.deepEqual(S.getState().profile, null);
});

test('task with task_exists=false produces no button and no draft', async () => {
    const S = fresh();
    const f = makeDeps({
        state: { profile: fullProfile(), review: { ok: true } },
        nextAction: { kind: 'task', task_exists: false, prompt: 'SHOULD NOT APPEAR' }
    });
    await S.openStart(f.deps);
    await S.confirm(f.deps);
    assert.equal(S.applyNextAction(f.deps), null);
    assert.deepEqual(f.drafts, []);
});

test('next action of kind chat fills a b2b-market-analysis draft only', async () => {
    const S = fresh();
    const f = makeDeps({
        state: { profile: fullProfile(), review: { ok: true } },
        confirmedProfile: fullProfile(),
        nextAction: { kind: 'chat' }
    });
    await S.openStart(f.deps);
    await S.confirm(f.deps);
    const prompt = S.applyNextAction(f.deps);
    assert.ok(prompt.includes('b2b-market-analysis'), 'uses the market-analysis skill');
    assert.ok(prompt.includes('valves, pumps'), 'carries the profile products');
    assert.deepEqual(f.drafts, [prompt]);
    assert.equal(f.sends.length, 0);
});

test('Correct sends only changed basics as {changes}', async () => {
    const S = fresh();
    const inputs = {
        name: 'Other Trading', country: 'Egypt', activity: 'Manufacturer',
        products: 'valves, pumps', markets: 'undecided'
    };
    const f = makeDeps({
        state: { profile: fullProfile(), review: { ok: true } },
        confirmedProfile: fullProfile(),
        getElementById: (id) => {
            const k = id.replace('start-edit-', '');
            return inputs[k] !== undefined ? { value: inputs[k] } : null;
        }
    });
    await S.openStart(f.deps);
    await S.confirm(f.deps);
    const changes = S.collectChanged(f.deps);
    assert.deepEqual(changes, { name: 'Other Trading' });
    await S.stageEdit(changes, f.deps);
    const staged = f.calls.find(c => c.path === '/api/start/edit/stage');
    assert.deepEqual(staged.body, { changes: { name: 'Other Trading' } });
    assert.deepEqual(S.getConfirmedProfile(), fullProfile());
});

test('no company id: no private request is made', async () => {
    const S = fresh();
    const f = makeDeps({ companyId: null });
    await S.openStart(f.deps);
    assert.equal(S.getState().status, 'no_company');
    assert.equal(f.calls.length, 0, 'GET /state must not run without a company');
    await assert.rejects(() => S.request('GET', '/state', null, f.deps), (e) => e.code === 'NO_COMPANY');
});

test('raw fallback builds X-Company-ID from the active company (never hardcoded)', async () => {
    const S = fresh();
    let seen = null;
    const fetchStub = (url, opts) => {
        seen = { url, opts };
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) });
    };
    await S.request('GET', '/reusable', null, { getCompanyId: () => 42, api: null, fetch: fetchStub, token: 'T' });
    assert.equal(seen.url, '/api/start/reusable');
    assert.equal(seen.opts.headers['X-Company-ID'], '42');
    assert.equal(seen.opts.headers['X-Hermes-Session-Token'], 'T');
});

test('detail requires a reason; API reason is shown; credential and shipment posts are shaped correctly', async () => {
    const S = fresh();
    const f = makeDeps({ state: { profile: fullProfile(), review: { ok: true } } });
    await S.openStart(f.deps);

    await S.addDetail('moq', '100', '', f.deps);
    assert.ok(!f.calls.some(c => c.path === '/api/start/details'), 'reason is required before submit');

    await S.addDetail('moq', '100', 'Needed for quotation', f.deps);
    const dc = f.calls.find(c => c.path === '/api/start/details');
    assert.deepEqual(dc.body, { key: 'moq', value: '100', reason: 'Needed for quotation' });
    assert.equal(S.getState().detailReason, 'Needed for quotation');

    await S.addCredential('ISO 9001', f.deps);
    assert.deepEqual(f.calls.find(c => c.path === '/api/start/credential').body, { claim: 'ISO 9001' });

    await S.addShipmentDocument({
        shipment_ref: 'SHP-1', doc_type: 'certificate_of_origin', file_name: 'co.pdf', note: 'batch 2'
    }, f.deps);
    assert.deepEqual(f.calls.find(c => c.path === '/api/start/shipment-document').body, {
        shipment_ref: 'SHP-1', doc_type: 'certificate_of_origin', file_name: 'co.pdf', note: 'batch 2'
    });
});

test('all start.* i18n keys exist in zh, en and ar; Arabic is real Arabic', () => {
    const src = fs.readFileSync(I18N_JS, 'utf8');
    const i = (marker) => src.indexOf(marker);
    const zh = src.slice(i('    zh: {'), i('    en: {'));
    const en = src.slice(i('    en: {'), i('    ar: {'));
    const ar = src.slice(i('    ar: {'), i('\n};'));
    const keys = (s) => new Set(Array.from(s.matchAll(/'(start\.[^']+)'\s*:/g), m => m[1]).sort());
    const zk = keys(zh), ek = keys(en), ak = keys(ar);
    assert.ok(zk.size > 40, `expected a full key set, got ${zk.size}`);
    assert.deepEqual([...ek], [...zk], 'English dictionary must have every start.* key');
    assert.deepEqual([...ak], [...zk], 'Arabic dictionary must have every start.* key');
    assert.ok(/[\u0600-\u06FF]{3,}/.test(src.slice(i("'start.button':'ابدأ'"), i("'start.button':'ابدأ'") + 200)),
        'start.* Arabic strings must be Arabic, not English/Chinese');
});

test('Start button is wired; modal is created at runtime (no static-whitelist conflict); script order is correct', () => {
    const html = fs.readFileSync(HTML, 'utf8');
    assert.ok(html.includes('id="start-btn"'), 'Start button present');
    // ui.js protects only a fixed whitelist of static skeletons — do not add one.
    assert.ok(!/class="modal-backdrop[^"]*"\s+id="start-modal"/.test(html),
        'start-modal must not be a static skeleton in HTML');
    const js = fs.readFileSync(START_JS, 'utf8');
    assert.ok(js.includes("el.id = 'start-modal'"), 'start.js creates the modal');
    assert.ok(js.includes("'modal-backdrop hidden'"), 'reuses the existing backdrop CSS class');
    assert.ok(js.includes('start-modal-inner'), 'RTL-capable inner element present');
    const i18nAt = html.indexOf('src="/static/js/i18n.js');
    const startAt = html.indexOf('src="/static/js/start.js');
    const wizardAt = html.indexOf('src="/static/js/wizard.js');
    assert.ok(i18nAt !== -1 && startAt > i18nAt, 'start.js loads after i18n.js');
    assert.ok(startAt !== -1 && wizardAt > startAt, 'start.js loads before the app bootstrap scripts');
});

test('start.js is syntax-valid', () => {
    const { execFileSync } = require('node:child_process');
    execFileSync(process.execPath, ['--check', START_JS], { stdio: 'pipe' });
});
