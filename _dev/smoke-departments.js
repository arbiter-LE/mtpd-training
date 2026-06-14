#!/usr/bin/env node
/* ──────────────────────────────────────────────────────────────────────
   Multi-tenant smoke test — run before shipping ANY change to a shared
   file (js/app.js, js/config.js, index.html, js/departments/registry.js).

   Loads every department declared in the registry exactly the way the
   browser does (its moduleScripts, in order), builds MODULES, and asserts
   the invariants that keep one department's content from breaking another.

   Usage:  node _dev/smoke-departments.js
   Exit:   0 = all departments pass, 1 = a failure (details printed)
   ────────────────────────────────────────────────────────────────────── */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

let failures = 0;
const fail = (dept, msg) => { failures++; console.log(`  ✗ [${dept}] ${msg}`); };

function loadRegistry() {
  // registry.js defines DEPARTMENT_REGISTRY at top level; its functions use
  // window/document but are not invoked at load. Stub just enough to eval.
  const ctx = { window: { location: { hostname: '', search: '' } },
                document: { documentElement: { setAttribute() {} }, querySelectorAll: () => [] } };
  ctx.globalThis = ctx; vm.createContext(ctx);
  const src = fs.readFileSync(path.join(ROOT, 'js/departments/registry.js'), 'utf8');
  vm.runInContext(src + ';globalThis.__REG = DEPARTMENT_REGISTRY;', ctx);
  return ctx.__REG;
}

function buildModules(dept) {
  // Load this department's scripts in order, exactly as index.html does.
  let src = '';
  for (const rel of dept.moduleScripts) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) { fail(dept.subdomain, `missing moduleScript: ${rel}`); return null; }
    src += fs.readFileSync(abs, 'utf8') + '\n';
  }
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
  try { vm.runInContext(src + ';globalThis.__M = MODULES;', ctx); }
  catch (e) { fail(dept.subdomain, `scripts threw on load: ${e.message}`); return null; }
  return ctx.__M;
}

function qOk(q) {
  return q && q.scenario && q.text && Array.isArray(q.options) && q.options.length === 4 &&
         typeof q.correct === 'number' && q.correct >= 0 && q.correct <= 3 && q.feedback;
}

function checkDepartment(dept) {
  const tag = dept.subdomain;
  console.log(`\n▸ ${dept.shortName} (${tag})`);
  if (!Array.isArray(dept.moduleScripts) || !dept.moduleScripts.length)
    return fail(tag, 'registry entry has no moduleScripts array');
  if (typeof dept.features !== 'object' || dept.features === null)
    fail(tag, 'registry entry has no features object');

  const M = buildModules(dept);
  if (!M) return;
  if (!Array.isArray(M) || !M.length) return fail(tag, 'MODULES did not build');

  const wantsSup = !!(dept.features && dept.features.supervisorTrack);
  let supCount = 0;
  M.forEach(m => {
    if (!m.id || !m.title || typeof m.weekNumber !== 'number') fail(tag, `module missing id/title/weekNumber: ${m.id || '?'}`);
    if (!Array.isArray(m.questions) || m.questions.length < 8) fail(tag, `${m.id}: patrol quiz < 8 questions`);
    if (m.supervisorContentHtml || m.supervisorQuestions) supCount++;

    if (wantsSup) {
      // Department declares the supervisor track → every module must carry it.
      if (!m.supervisorContentHtml) return fail(tag, `${m.id}: missing supervisorContentHtml`);
      if ((m.supervisorContentHtml.match(/btn-launch/g) || []).length !== 1) fail(tag, `${m.id}: supervisor reading btn-launch count != 1`);
      if (m.supervisorContentHtml.indexOf('Supervisor Focus') === -1) fail(tag, `${m.id}: supervisor overlay marker missing`);
      if (!Array.isArray(m.supervisorQuestions) || m.supervisorQuestions.length < 8) return fail(tag, `${m.id}: supervisor quiz < 8 questions`);
      m.supervisorQuestions.forEach((q, i) => { if (!qOk(q)) fail(tag, `${m.id}: malformed supervisor Q${i + 1}`); });
    }
  });

  if (wantsSup && supCount !== M.length) fail(tag, `declares supervisorTrack but only ${supCount}/${M.length} modules carry it`);
  if (!wantsSup && supCount !== 0) fail(tag, `does NOT declare supervisorTrack but ${supCount} module(s) carry supervisor content`);
  console.log(`  ✓ ${M.length} modules · patrol quizzes ok` + (wantsSup ? ` · supervisor track on all ${M.length}` : ` · no supervisor track (as declared)`));
}

// Shared engine must never hardcode a department. Branch on registry data.
function checkSharedPurity() {
  console.log('\n▸ shared-engine purity (no hardcoded subdomains)');
  ['js/app.js', 'js/config.js'].forEach(rel => {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const hits = src.match(/['"](?:egpd|mtpd)['"]/gi);
    if (hits) fail('shared', `${rel} references a department by name (${[...new Set(hits)].join(', ')}) — branch on ACTIVE_DEPARTMENT.features instead`);
    else console.log(`  ✓ ${rel} has no hardcoded department names`);
  });
}

console.log('Multi-tenant smoke test — building every registered department\n' + '─'.repeat(60));
const registry = loadRegistry();
console.log(`Registry: ${registry.length} department(s) — ${registry.map(d => d.subdomain).join(', ')}`);
registry.forEach(checkDepartment);
checkSharedPurity();

console.log('\n' + '─'.repeat(60));
if (failures === 0) { console.log('ALL DEPARTMENTS PASS ✓'); process.exit(0); }
console.log(`${failures} FAILURE(S) ✗`); process.exit(1);
