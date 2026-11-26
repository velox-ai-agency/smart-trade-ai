const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'static/trade_chat.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'static/trade_chat.css'), 'utf8');
const skills = fs.readFileSync(path.join(root, 'static/js/skills.js'), 'utf8');

function fnBody(name) {
    const start = skills.indexOf('function ' + name + '(');
    assert.ok(start >= 0, 'function missing: ' + name);
    const open = skills.indexOf('{', start);
    let depth = 0;
    for (let i = open; i < skills.length; i++) {
        if (skills[i] === '{') depth++;
        if (skills[i] === '}') { depth--; if (depth === 0) return skills.slice(start, i + 1); }
    }
    assert.fail('unterminated function: ' + name);
}

test('skills reference modal is wide', () => {
    assert.ok(html.includes('class="modal wide skills-help-modal"'));
    assert.ok(!html.includes('max-width:800px'), 'old narrow modal width still present');
    assert.ok(css.includes('.modal.wide.skills-help-modal { width: min(1200px, 96vw); max-width: 1200px;'));
    assert.ok(!/\.skills-help-modal\s*\{[^}]*width:/.test(css.replace('.modal.wide.skills-help-modal', 'X')), 'selector must outrank .modal.wide');
});

test('skills reference content uses a responsive multi-column grid with wrapping text', () => {
    const body = fnBody('showSkillsHelp');
    assert.ok(body.includes('class="skills-help-grid"'));
    assert.ok(css.includes('repeat(auto-fill, minmax(340px, 1fr))'));
    assert.ok(!body.includes('white-space:nowrap'), 'trigger text still forced onto one line');
    assert.ok(body.includes('overflow-wrap:anywhere'));
    assert.ok(body.includes('data-act="copySkillTrigger"'), 'click-to-copy must be preserved');
});
