/**
 * Process sub-step cards: each business-process chat context renders an
 * ordered card (from /api/trade/processes/<context>); clicking a step only
 * PREFILLS the chat input — review, then send. Nothing auto-sends.
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { SRC, JS_DIR } = require('./_extract');

const chat = fs.readFileSync(path.join(JS_DIR, 'chat.js'), 'utf8');
const css = fs.readFileSync(path.join(JS_DIR, '..', 'trade_chat.css'), 'utf8');

test('process card: slot exists in chat view and is hidden until data arrives', () => {
    assert.match(chat, /<div class="proc-steps" id="proc-steps" hidden><\/div>/,
        'renderChatViewInto must include the hidden #proc-steps slot (non-daily only)');
    // daily keeps its own quick scenes; the slot must not be rendered there
    const slotIdx = chat.indexOf('${isDaily ? \'\' : \'<div class="proc-steps"');
    assert.ok(slotIdx > -1, 'slot is conditional on !isDaily');
});

test('process card: loads steps and never auto-sends', () => {
    assert.match(chat, /async function loadProcessSteps\(ctx, container\)/,
        'loadProcessSteps must exist');
    assert.match(chat, /\/api\/trade\/processes\/' \+ encodeURIComponent\(ctx\)/,
        'it must call the processes endpoint');
    // click handler wires to prefill, never to sendMsg
    const renderIdx = chat.indexOf('function _renderProcessSteps');
    const presetIdx = chat.indexOf('function applyProcessStepPreset');
    assert.ok(renderIdx > -1 && presetIdx > -1);
    const renderBody = chat.slice(renderIdx, chat.indexOf('function applyProcessStepPreset', renderIdx));
    assert.match(renderBody, /applyProcessStepPreset\(/, 'step click calls the prefill helper');
    assert.doesNotMatch(renderBody, /sendMsg|sendMessage/, 'rendering never triggers send');
});

test('process card: prefill sets input value + focus, does not send', () => {
    const start = chat.indexOf('function applyProcessStepPreset');
    const stop = chat.indexOf('\n// ── 待办', start);
    const body = chat.slice(start, stop);
    assert.match(body, /input\.value = prompt;/);
    assert.match(body, /input\.focus\(\);/);
    assert.doesNotMatch(body, /sendMsg\(|_sendMsg\(|sendMessage\(/);
    assert.match(body, /currentLang === 'ar' \? \(step\.prompt_ar \|\| step\.prompt_en\)/,
        'prompt must follow the UI language');
});

test('process card: collapse toggle keeps steps hidden when collapsed', () => {
    assert.match(chat, /classList\.toggle\('collapsed'\)/);
    assert.match(css, /\.proc-steps\.collapsed \.steps[\s\S]*?display: none;/);
});

test('process card: card CSS uses on-ink on filled surfaces (dark-theme rule)', () => {
    assert.match(css, /\.proc-steps \.step \.n[\s\S]*?color: var\(--on-ink/, 
        'numbered circle is a filled surface — text must be --on-ink');
});
