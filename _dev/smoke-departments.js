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

// Every module id seen, mapped to the department(s) that define it. Used to
// guarantee no two departments share an id (which would let a shared-engine
// fallback keyed by id serve one agency's content to another).
const idOwners = {};

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
  // Client questions carry the prompt and options ONLY. Grading data lives
  // server-side (api/grade.js, built from _dev/answer-keys/) — a `correct`
  // or `feedback` field here means an answer key is shipping to the browser.
  return q && q.scenario && q.text && Array.isArray(q.options) && q.options.length === 4 &&
         !('correct' in q) && !('feedback' in q);
}

function checkDepartment(dept) {
  const tag = dept.subdomain;
  console.log(`\n▸ ${dept.shortName} (${tag})`);
  if (!Array.isArray(dept.moduleScripts) || !dept.moduleScripts.length)
    return fail(tag, 'registry entry has no moduleScripts array');
  if (typeof dept.features !== 'object' || dept.features === null)
    fail(tag, 'registry entry has no features object');
  if (!dept.badge || !fs.existsSync(path.join(ROOT, dept.badge)))
    fail(tag, `badge asset missing on disk: ${dept.badge || '(none declared)'} — Vercel/Linux is case-sensitive, match the path exactly`);
  // Duck-typed: the registry evaluates in a vm context, so its Date is a
  // different realm's constructor and instanceof would always be false here.
  if (!dept.scheduleStart || typeof dept.scheduleStart.getTime !== 'function' || isNaN(dept.scheduleStart.getTime()))
    fail(tag, 'scheduleStart is missing or not a valid Date — the schedule engine cannot compute unlock/due dates');

  const M = buildModules(dept);
  if (!M) return;
  if (!Array.isArray(M) || !M.length) return fail(tag, 'MODULES did not build');

  const wantsSup = !!(dept.features && dept.features.supervisorTrack);
  let supCount = 0;
  M.forEach(m => {
    if (!m.id || !m.title || typeof m.weekNumber !== 'number') fail(tag, `module missing id/title/weekNumber: ${m.id || '?'}`);
    if (m.id) (idOwners[m.id] = idOwners[m.id] || []).push(tag);
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
// The earlier guard only caught quoted literals ('mtpd'), so it missed the
// report-header branding ("MTPD Training Compliance Report") and the 'mtpd_'
// localStorage prefixes. This one strips comments and any explicitly
// allow-listed region, then flags ANY remaining bare department token in
// live code.
function checkSharedPurity() {
  console.log('\n▸ shared-engine purity (no hardcoded department names)');
  ['js/app.js', 'js/config.js'].forEach(rel => {
    let src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    // Drop allow-listed regions FIRST (documented tech debt, fenced by
    // /* SMOKE-ALLOW-DEPT-NAMES:start */ … /* SMOKE-ALLOW-DEPT-NAMES:end */),
    // then strip comments — a department name in prose is fine; in live code it isn't.
    src = src.replace(/\/\*\s*SMOKE-ALLOW-DEPT-NAMES:start[\s\S]*?SMOKE-ALLOW-DEPT-NAMES:end\s*\*\//g, '');
    src = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1');
    const hits = src.match(/\b(?:egpd|mtpd)\b/gi);
    if (hits) fail('shared', `${rel} hardcodes a department name (${[...new Set(hits.map(h => h.toLowerCase()))].join(', ')}) in live code — derive it from ACTIVE_DEPARTMENT / registry data instead`);
    else console.log(`  ✓ ${rel} has no hardcoded department names in live code`);
  });
}

// No two departments may share a module id. Shared-engine fallbacks keyed by id
// (e.g. getDebriefLegalSummary's per-topic summaries) would otherwise serve one
// agency's content to another — a cross-agency confidentiality break.
function checkIdCollisions() {
  console.log('\n▸ cross-department module-id uniqueness');
  let clean = true;
  Object.entries(idOwners).forEach(([id, depts]) => {
    const uniq = [...new Set(depts)];
    if (uniq.length > 1) {
      clean = false;
      fail('ids', `module id '${id}' is defined by more than one department (${uniq.join(', ')}) — namespace ids per department so shared-engine fallbacks can't leak content across agencies`);
    }
  });
  if (clean) console.log('  ✓ every module id belongs to exactly one department');
}

// Behavior guard: a top-level function defined in a shared engine file but
// never referenced anywhere (HTML handlers, listeners, or other JS) is dead
// code that silently breaks a user flow. This is the failure mode behind the
// 6/25 Altomare bug — loadOfficerCompletions was defined but never called, so
// officers' saved progress never loaded. Structure checks can't see it; this can.
function checkWiring() {
  console.log('\n▸ engine wiring (no defined-but-never-called functions)');
  // Reference corpus: index.html (inline onclick handlers) + every .js the
  // browser loads. A name that appears only once across all of it = only its
  // own declaration, i.e. nothing ever calls it.
  const jsFiles = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.js')) jsFiles.push(p);
    }
  })(path.join(ROOT, 'js'));
  const corpus = [path.join(ROOT, 'index.html'), ...jsFiles]
    .filter(fs.existsSync).map(f => fs.readFileSync(f, 'utf8')).join('\n')
    // strip comments so a name mentioned only in prose can't mask dead code
    .replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1');

  let clean = true;
  ['js/app.js', 'js/config.js'].forEach(rel => {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const re = /^(?:async\s+)?function\s+([A-Za-z0-9_$]+)/gm; // top-level decls only (column 0)
    let m;
    while ((m = re.exec(src))) {
      const name = m[1];
      const refs = (corpus.match(new RegExp('\\b' + name.replace(/\$/g, '\\$') + '\\b', 'g')) || []).length;
      if (refs < 2) { clean = false; fail('wiring', `${rel}: function ${name}() is defined but never called — wire it into a code path or remove it`); }
    }
  });
  if (clean) console.log('  ✓ every top-level function in app.js & config.js is referenced');
}

// Server-side grading integrity: no answer key may ship in client JS, every
// question must have a grading entry in _dev/answer-keys/<dept>.json, and the
// generated block in api/grade.js must be in sync with those JSONs (a stale
// grade.js silently mis-grades — run `node _dev/build-answer-keys.js`).
function checkAnswerKeys(registry) {
  console.log('\n▸ server-side grading (no answer keys in client JS)');

  // 1. Raw-source guard — catches a reintroduced key even in dead code.
  const offenders = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.js')) {
        const src = fs.readFileSync(p, 'utf8');
        if (/^\s*(correct|feedback):/m.test(src)) offenders.push(path.relative(ROOT, p));
      }
    }
  })(path.join(ROOT, 'js/modules'));
  if (offenders.length) fail('keys', `answer-key fields found in client JS: ${offenders.join(', ')} — run node _dev/build-answer-keys.js`);
  else console.log('  ✓ no correct/feedback fields anywhere under js/modules/');

  // 2. Every question has a server-side key of the right shape.
  let gradeData = null, deptAuth = null, deptSched = null;
  try {
    const gradeSrc = fs.readFileSync(path.join(ROOT, 'api/grade.js'), 'utf8');
    gradeData = JSON.parse(/const GRADE_DATA = (.*);/.exec(gradeSrc)[1]);
    deptAuth  = JSON.parse(/const DEPT_AUTH = (.*);/.exec(gradeSrc)[1]);
    deptSched = JSON.parse(/const DEPT_SCHEDULE = (.*);/.exec(gradeSrc)[1]);
  } catch (e) { return fail('keys', `could not parse GRADE_DATA/DEPT_AUTH/DEPT_SCHEDULE from api/grade.js: ${e.message}`); }

  // 3. DEPT_AUTH must mirror the registry exactly. A registry URL/key edit
  // without re-running the builder would leave the grader verifying officer
  // JWTs against the WRONG Supabase project — every grade would 401.
  registry.forEach(dept => {
    const a = deptAuth[dept.subdomain];
    if (!a || a.url !== dept.supabaseUrl || a.anonKey !== dept.supabaseKey)
      fail(dept.subdomain, 'api/grade.js DEPT_AUTH is out of sync with registry.js (supabaseUrl/supabaseKey) — run node _dev/build-answer-keys.js');
  });

  registry.forEach(dept => {
    const tag = dept.subdomain;
    const jsonPath = path.join(__dirname, 'answer-keys', `${tag}.json`);
    if (!fs.existsSync(jsonPath)) return fail(tag, `missing _dev/answer-keys/${tag}.json`);
    const keys = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    if (JSON.stringify(gradeData[tag]) !== JSON.stringify(keys))
      return fail(tag, 'api/grade.js grading block is out of sync with the answer-key JSON — run node _dev/build-answer-keys.js');
    const M = buildModules(dept);
    if (!M) return;

    // 4. DEPT_SCHEDULE must mirror the registry + this department's MODULES.
    // The grader enforces unlock dates from it — stale schedule data would
    // either let officers grade locked modules early or lock out open ones.
    const s = deptSched && deptSched[tag];
    if (!s) fail(tag, 'api/grade.js DEPT_SCHEDULE is missing this department — run node _dev/build-answer-keys.js');
    else {
      const wantUnlock = (dept.cadence && dept.cadence.unlockEveryDays) || 7;
      if (s.start !== dept.scheduleStart.toISOString() || s.unlockEveryDays !== wantUnlock)
        fail(tag, 'api/grade.js DEPT_SCHEDULE start/cadence is out of sync with registry.js — run node _dev/build-answer-keys.js');
      const wantWeeks = {};
      M.forEach(m => { wantWeeks[m.id] = m.weekNumber; });
      if (JSON.stringify(s.weeks) !== JSON.stringify(wantWeeks))
        fail(tag, 'api/grade.js DEPT_SCHEDULE week map is out of sync with MODULES — run node _dev/build-answer-keys.js');
    }

    let checked = 0;
    M.forEach(m => {
      for (const [setName, trackName] of [['questions', 'patrol'], ['supervisorQuestions', 'supervisor']]) {
        if (!Array.isArray(m[setName])) continue;
        const k = keys[m.id] && keys[m.id][trackName];
        if (!k || k.length !== m[setName].length)
          return fail(tag, `${m.id} ${trackName}: ${m[setName].length} questions but ${k ? k.length : 0} server-side keys`);
        k.forEach((e, i) => {
          if (!e || typeof e.c !== 'number' || e.c < 0 || e.c > 3 || typeof e.f !== 'string' || !e.f)
            fail(tag, `${m.id} ${trackName} Q${i + 1}: malformed server-side key`);
        });
        checked += k.length;
      }
    });
    console.log(`  ✓ ${tag}: ${checked} questions all keyed server-side, grade.js keys + unlock schedule in sync`);
  });
}

// Answer-pattern guard: an officer must not be able to pass a quiz by always
// picking the same letter, or always the wordiest option. For each module+track
// set, fail if the correct answer sits in ONE position — or is the longest
// option — in more than 60% of questions (the pass line is 70%, and balanced
// content runs ~25%). This is the regression backstop for the 2026-07-22
// platform-wide fix; see _database/HANDOFF-2026-07-22-length-tell-fix.md and
// the _dev/length-tell-*.js / reposition-answers.js tooling.
function checkAnswerPatterns(registry) {
  console.log('\n▸ quiz answer-pattern integrity (no "pick B" / "pick the longest" tell)');
  const THRESH = 0.6;
  let clean = true;
  registry.forEach(dept => {
    const tag = dept.subdomain;
    const jsonPath = path.join(__dirname, 'answer-keys', `${tag}.json`);
    if (!fs.existsSync(jsonPath)) return; // checkAnswerKeys already reports a missing key file
    const keys = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const M = buildModules(dept);
    if (!M) return;
    M.forEach(m => {
      for (const [setName, trackName] of [['questions', 'patrol'], ['supervisorQuestions', 'supervisor']]) {
        const set = m[setName];
        if (!Array.isArray(set) || !set.length) continue;
        const k = keys[m.id] && keys[m.id][trackName];
        if (!Array.isArray(k) || k.length !== set.length) continue; // shape mismatches handled by checkAnswerKeys
        const N = set.length, pos = [0, 0, 0, 0];
        let longest = 0;
        set.forEach((q, i) => {
          const c = k[i].c;
          pos[c]++;
          const lens = q.options.map(o => (o || '').length);
          if (lens.indexOf(Math.max(...lens)) === c) longest++;
        });
        const maxPos = Math.max(...pos);
        if (maxPos / N > THRESH) {
          clean = false;
          fail(tag, `${m.id} ${trackName}: correct answer is "${'ABCD'[pos.indexOf(maxPos)]}" in ${maxPos}/${N} questions — an officer could pass by always picking that letter; vary the correct-answer position (tool: _dev/reposition-answers.js)`);
        }
        if (longest / N > THRESH) {
          clean = false;
          fail(tag, `${m.id} ${trackName}: correct answer is the longest option in ${longest}/${N} questions — an officer could pass by picking the wordiest; length-balance the distractors (tool: _dev/length-tell-dump.js / length-tell-apply.js)`);
        }
      }
    });
  });
  if (clean) console.log('  ✓ every set holds correct-position and correct-is-longest under 60% (both were exploitable platform-wide before 2026-07-22)');
}

console.log('Multi-tenant smoke test — building every registered department\n' + '─'.repeat(60));
const registry = loadRegistry();
console.log(`Registry: ${registry.length} department(s) — ${registry.map(d => d.subdomain).join(', ')}`);
registry.forEach(checkDepartment);
checkIdCollisions();
checkSharedPurity();
checkWiring();
checkAnswerKeys(registry);
checkAnswerPatterns(registry);

console.log('\n' + '─'.repeat(60));
if (failures === 0) { console.log('ALL DEPARTMENTS PASS ✓'); process.exit(0); }
console.log(`${failures} FAILURE(S) ✗`); process.exit(1);
