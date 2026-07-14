#!/usr/bin/env node
/* ──────────────────────────────────────────────────────────────────────
   Answer-key extraction & server-side grading build.

   Quiz answer keys must never ship in client JS. This script:
     1. Loads every registered department's modules (vm, same as the
        smoke test) and extracts { correct, feedback } per question into
        _dev/answer-keys/<dept>.json  (canonical, never deployed — _dev
        is in .vercelignore).
     2. Strips the `correct:` and `feedback:` lines from the client
        module files under js/modules/.
     3. Reloads the stripped files and PROVES the module data is
        byte-identical to the original minus exactly those two fields —
        any other difference restores the originals and aborts.
     4. Regenerates the marker block in api/grade.js from the JSON keys
        plus each department's Supabase URL/anon key from the registry,
        and each department's unlock schedule (scheduleStart + cadence +
        per-module weekNumber) so the grader can enforce module lock
        dates server-side.

   Authoring workflow: author a module WITH correct/feedback inline as
   always, then run this script before shipping. Already-stripped files
   are fine — existing JSON keys are reused (idempotent).

   Usage:  node _dev/build-answer-keys.js
   Exit:   0 = extracted/verified/generated, 1 = failure (originals kept)
   ────────────────────────────────────────────────────────────────────── */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const KEYS_DIR = path.join(__dirname, 'answer-keys');
const GRADE_FILE = path.join(ROOT, 'api/grade.js');

const CORRECT_LINE  = /^\s*correct:\s*[0-3]\s*,?\s*$/;
const FEEDBACK_LINE = /^\s*feedback:\s*(['"]).*\1\s*,?\s*$/;

function die(msg) { console.error('✗ ' + msg); process.exit(1); }

function loadRegistry() {
  const ctx = { window: { location: { hostname: '', search: '' } },
                document: { documentElement: { setAttribute() {} }, querySelectorAll: () => [] } };
  ctx.globalThis = ctx; vm.createContext(ctx);
  const src = fs.readFileSync(path.join(ROOT, 'js/departments/registry.js'), 'utf8');
  vm.runInContext(src + ';globalThis.__REG = DEPARTMENT_REGISTRY;', ctx);
  return ctx.__REG;
}

function buildModules(dept) {
  let src = '';
  for (const rel of dept.moduleScripts) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) die(`${dept.subdomain}: missing moduleScript ${rel}`);
    src += fs.readFileSync(abs, 'utf8') + '\n';
  }
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(src + ';globalThis.__M = MODULES;', ctx);
  return ctx.__M;
}

// Deep-copy module data with correct/feedback removed from every question —
// the "expected" shape of the client payload after stripping.
function withoutKeys(modules) {
  const copy = JSON.parse(JSON.stringify(modules));
  copy.forEach(m => {
    for (const setName of ['questions', 'supervisorQuestions']) {
      if (Array.isArray(m[setName])) m[setName].forEach(q => { delete q.correct; delete q.feedback; });
    }
  });
  return copy;
}

function extractKeys(dept, modules, existing) {
  const out = {};
  modules.forEach(m => {
    out[m.id] = {};
    for (const [setName, trackName] of [['questions', 'patrol'], ['supervisorQuestions', 'supervisor']]) {
      const qs = m[setName];
      if (!Array.isArray(qs)) continue;
      const keys = qs.map((q, i) => {
        if (typeof q.correct === 'number' && typeof q.feedback === 'string') {
          return { c: q.correct, f: q.feedback };
        }
        // Already stripped — the canonical JSON must already have this key.
        const prior = existing && existing[m.id] && existing[m.id][trackName] && existing[m.id][trackName][i];
        if (!prior || typeof prior.c !== 'number' || typeof prior.f !== 'string') {
          die(`${dept}: ${m.id} ${trackName} Q${i + 1} has no inline key and no existing JSON key — cannot grade this question`);
        }
        return prior;
      });
      out[m.id][trackName] = keys;
    }
  });
  return out;
}

function stripFile(abs) {
  const before = fs.readFileSync(abs, 'utf8');
  const kept = [];
  let removedC = 0, removedF = 0;
  for (const line of before.split('\n')) {
    if (CORRECT_LINE.test(line))       { removedC++; continue; }
    if (FEEDBACK_LINE.test(line))      { removedF++; continue; }
    kept.push(line);
  }
  return { before, after: kept.join('\n'), removedC, removedF };
}

/* ── main ── */
fs.mkdirSync(KEYS_DIR, { recursive: true });
const registry = loadRegistry();
console.log(`Answer-key build — ${registry.length} department(s): ${registry.map(d => d.subdomain).join(', ')}`);

const allKeys = {};
const allSched = {};      // per-dept unlock schedule for server-side lock dates
const backups = [];       // [{abs, before}] for rollback
let totalRemoved = 0;

try {
  for (const dept of registry) {
    const tag = dept.subdomain;
    const jsonPath = path.join(KEYS_DIR, `${tag}.json`);
    const existing = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : null;

    // 1. Snapshot with keys, extract keys, compute expected client shape.
    const original = buildModules(dept);
    const keys = extractKeys(tag, original, existing);
    const expected = JSON.stringify(withoutKeys(original));

    // 2. Strip client files.
    let removedC = 0, removedF = 0;
    for (const rel of dept.moduleScripts) {
      const abs = path.join(ROOT, rel);
      const r = stripFile(abs);
      if (r.after !== r.before) {
        backups.push({ abs, before: r.before });
        fs.writeFileSync(abs, r.after);
        removedC += r.removedC; removedF += r.removedF;
      }
    }
    if (removedC !== removedF) die(`${tag}: removed ${removedC} correct lines but ${removedF} feedback lines — file format drifted, aborting`);

    // 3. Reload and PROVE nothing but the keys changed.
    const stripped = buildModules(dept);
    stripped.forEach(m => {
      for (const setName of ['questions', 'supervisorQuestions']) {
        if (!Array.isArray(m[setName])) continue;
        m[setName].forEach((q, i) => {
          if ('correct' in q || 'feedback' in q) die(`${tag}: ${m.id} ${setName} Q${i + 1} still carries a key after strip`);
        });
      }
    });
    if (JSON.stringify(stripped) !== expected) die(`${tag}: stripped modules differ from original beyond the removed keys — aborting`);

    // 4. Keys complete? Every question must have a grading entry.
    stripped.forEach(m => {
      for (const [setName, trackName] of [['questions', 'patrol'], ['supervisorQuestions', 'supervisor']]) {
        if (!Array.isArray(m[setName])) continue;
        const k = keys[m.id] && keys[m.id][trackName];
        if (!k || k.length !== m[setName].length) die(`${tag}: ${m.id} ${trackName} key count ${k ? k.length : 0} != question count ${m[setName].length}`);
      }
    });

    // Unlock schedule for the server-side lock gate. Mirrors the client
    // engine: getModuleOpenDate() = scheduleStart + (week-1)*unlockEveryDays,
    // with deptCadence()'s legacy default of 7 when cadence is absent.
    if (!dept.scheduleStart || typeof dept.scheduleStart.toISOString !== 'function' || isNaN(dept.scheduleStart.getTime())) {
      die(`${tag}: scheduleStart missing/invalid in registry.js — cannot build server-side lock dates`);
    }
    const weeks = {};
    original.forEach(m => {
      if (typeof m.weekNumber !== 'number') die(`${tag}: ${m.id} has no weekNumber — cannot compute its unlock date`);
      weeks[m.id] = m.weekNumber;
    });
    allSched[tag] = {
      start: dept.scheduleStart.toISOString(),
      unlockEveryDays: (dept.cadence && dept.cadence.unlockEveryDays) || 7,
      weeks,
    };

    fs.writeFileSync(jsonPath, JSON.stringify(keys, null, 1) + '\n');
    allKeys[tag] = keys;
    totalRemoved += removedC;
    console.log(`  ✓ ${tag}: ${Object.keys(keys).length} modules keyed · ${removedC} inline keys stripped · verified identical minus keys`);
  }
} catch (e) {
  // Restore every file we touched, then re-throw.
  for (const b of backups) fs.writeFileSync(b.abs, b.before);
  console.error('Restored original module files after failure.');
  throw e;
}

/* 5. Regenerate the marker block in api/grade.js */
const auth = {};
registry.forEach(d => { auth[d.subdomain] = { url: d.supabaseUrl, anonKey: d.supabaseKey }; });
const block =
  '/* __GRADE_DATA_START__ */\n' +
  '// AUTO-GENERATED by _dev/build-answer-keys.js — do not edit by hand.\n' +
  `const GRADE_DATA = ${JSON.stringify(allKeys)};\n` +
  `const DEPT_AUTH = ${JSON.stringify(auth)};\n` +
  `const DEPT_SCHEDULE = ${JSON.stringify(allSched)};\n` +
  '/* __GRADE_DATA_END__ */';
const gradeSrc = fs.readFileSync(GRADE_FILE, 'utf8');
const re = /\/\* __GRADE_DATA_START__ \*\/[\s\S]*?\/\* __GRADE_DATA_END__ \*\//;
if (!re.test(gradeSrc)) die('api/grade.js is missing the __GRADE_DATA__ marker block');
fs.writeFileSync(GRADE_FILE, gradeSrc.replace(re, block));

console.log(`\nGenerated api/grade.js grading block (${Object.keys(allKeys).length} departments) — ${totalRemoved} inline keys now server-side only.`);
console.log('ALL DEPARTMENTS KEYED ✓');
