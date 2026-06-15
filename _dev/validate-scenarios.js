#!/usr/bin/env node
/* ──────────────────────────────────────────────────────────────────────
   Scenario graph validator — run before shipping any scenario change.

   For every department in the registry, builds MODULES and validates each
   scenario graph it carries (scenario, scenario2, supervisorScenario):
   node shapes, that every `next` / option target exists, that every path
   terminates at a `debrief`, and that there are no dead ends or orphans.

   Usage:  node _dev/validate-scenarios.js
   ────────────────────────────────────────────────────────────────────── */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

let failures = 0;
const fail = (where, msg) => { failures++; console.log(`  ✗ [${where}] ${msg}`); };
const OUTCOMES = new Set(['outcome-good', 'outcome-bad', 'outcome-neutral']);

function loadRegistry() {
  const ctx = { window: { location: { hostname: '', search: '' } },
                document: { documentElement: { setAttribute() {} }, querySelectorAll: () => [] } };
  ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/departments/registry.js'), 'utf8') +
    ';globalThis.__REG = DEPARTMENT_REGISTRY;', ctx);
  return ctx.__REG;
}
function buildModules(dept) {
  let src = '';
  for (const rel of dept.moduleScripts) src += fs.readFileSync(path.join(ROOT, rel), 'utf8') + '\n';
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(src + ';globalThis.__M = MODULES;', ctx);
  return ctx.__M;
}

function validateScenario(tag, scen) {
  if (!scen.nodes || !scen.nodes.start) return fail(tag, 'no nodes/start');
  if (!scen.title || !scen.location) fail(tag, 'missing title/location');
  if (typeof scen.totalDecisions !== 'number') fail(tag, 'missing totalDecisions');
  const start = scen.nodes.start;
  if (start.type !== 'scene') fail(tag, 'start is not a scene');
  if (!start.time || !start.weather || !start.unit) fail(tag, 'start scene missing time/weather/unit (header would render undefined)');

  const ids = Object.keys(scen.nodes);
  const exists = id => ids.includes(id);
  let maxDecision = 0;

  for (const id of ids) {
    const n = scen.nodes[id];
    if (n.type === 'scene') {
      if (!Array.isArray(n.narrative)) fail(tag, `${id}: scene missing narrative[]`);
      if (!n.next || !exists(n.next)) fail(tag, `${id}: scene next "${n.next}" missing`);
    } else if (n.type === 'decision') {
      if (typeof n.decisionNumber !== 'number') fail(tag, `${id}: decision missing decisionNumber`);
      else maxDecision = Math.max(maxDecision, n.decisionNumber);
      if (!n.situation || !n.question) fail(tag, `${id}: decision missing situation/question`);
      if (!Array.isArray(n.options) || n.options.length < 2) fail(tag, `${id}: decision needs >=2 options`);
      else n.options.forEach((o, i) => {
        if (!o.text) fail(tag, `${id} opt${i+1}: missing text`);
        if (!o.shortLabel) fail(tag, `${id} opt${i+1}: missing shortLabel`);
        if (!o.quality) fail(tag, `${id} opt${i+1}: missing quality`);
        if (!o.next || !exists(o.next)) fail(tag, `${id} opt${i+1}: next "${o.next}" missing`);
      });
    } else if (n.type === 'consequence') {
      if (!OUTCOMES.has(n.outcomeClass)) fail(tag, `${id}: bad outcomeClass "${n.outcomeClass}"`);
      if (!n.outcomeLabel || !n.heading) fail(tag, `${id}: consequence missing outcomeLabel/heading`);
      if (!Array.isArray(n.narrative)) fail(tag, `${id}: consequence missing narrative[]`);
      if (!n.next || !exists(n.next)) fail(tag, `${id}: consequence next "${n.next}" missing`);
    } else if (n.type === 'debrief') {
      /* terminal */
    } else fail(tag, `${id}: unknown node type "${n.type}"`);
  }

  if (maxDecision !== scen.totalDecisions) fail(tag, `totalDecisions ${scen.totalDecisions} != max decisionNumber ${maxDecision}`);

  // Reachability from start; every path must hit a debrief; flag orphans.
  const seen = new Set(); const stack = ['start']; let reachedDebrief = false;
  while (stack.length) {
    const id = stack.pop(); if (seen.has(id) || !scen.nodes[id]) continue; seen.add(id);
    const n = scen.nodes[id];
    if (n.type === 'debrief') { reachedDebrief = true; continue; }
    if (n.type === 'decision') n.options.forEach(o => o.next && stack.push(o.next));
    else if (n.next) stack.push(n.next);
  }
  if (!reachedDebrief) fail(tag, 'no debrief reachable from start');
  const orphans = ids.filter(id => !seen.has(id));
  if (orphans.length) fail(tag, `unreachable node(s): ${orphans.join(', ')}`);
}

console.log('Scenario graph validator\n' + '─'.repeat(60));
const registry = loadRegistry();
let scenarioCount = 0;
registry.forEach(dept => {
  console.log(`\n▸ ${dept.shortName}`);
  const M = buildModules(dept);
  M.forEach(m => {
    [['scenario', m.scenario], ['scenario2', m.scenario2], ['supervisorScenario', m.supervisorScenario]]
      .forEach(([slot, scen]) => {
        if (!scen) return;
        scenarioCount++;
        const before = failures;
        validateScenario(`${m.id}:${slot}`, scen);
        if (failures === before) console.log(`  ✓ ${m.id} · ${slot} (${Object.keys(scen.nodes).length} nodes, ${scen.totalDecisions} decisions)`);
      });
  });
});

console.log('\n' + '─'.repeat(60));
console.log(`${scenarioCount} scenario graph(s) checked`);
if (failures === 0) { console.log('ALL SCENARIOS VALID ✓'); process.exit(0); }
console.log(`${failures} PROBLEM(S) ✗`); process.exit(1);
