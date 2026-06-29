/* ═══════════════════════════════════════════
   Arbiter LE — Configuration & State
═══════════════════════════════════════════ */

/* ── Schedule Engine ────────────────────── */
// Schedule start AND cadence are per-department data, defined in
// js/departments/registry.js — never branch the engine on subdomain.
// A module unlocks every `unlockEveryDays`; due dates run in periods of
// `duePeriodDays`, with `modulesPerPeriod` modules sharing each due date;
// `bufferPeriods` periods of grace before status flips to overdue.

function deptCadence() {
  // Safe legacy default (weekly unlock, biweekly paired due) for any
  // department that predates the per-department cadence field.
  return (ACTIVE_DEPARTMENT && ACTIVE_DEPARTMENT.cadence) || {
    unlockEveryDays: 7, duePeriodDays: 14, modulesPerPeriod: 2, bufferPeriods: 1,
  };
}

function getModuleDueDate(weekNumber) {
  // Due date for a 1-based module number, per the department's cadence.
  const c = deptCadence();
  const dueIndex = Math.ceil(weekNumber / c.modulesPerPeriod);
  const d = new Date(ACTIVE_DEPARTMENT.scheduleStart);
  d.setDate(d.getDate() + dueIndex * c.duePeriodDays);
  d.setHours(23, 59, 59, 0);
  return d;
}

function getModuleBufferEnd(weekNumber) {
  const c = deptCadence();
  const dueIndex = Math.ceil(weekNumber / c.modulesPerPeriod);
  const d = new Date(ACTIVE_DEPARTMENT.scheduleStart);
  d.setDate(d.getDate() + (dueIndex + c.bufferPeriods) * c.duePeriodDays);
  d.setHours(23, 59, 59, 0);
  return d;
}

function getModuleSchedule(weekNumber) {
  const now       = new Date();
  const dueDate   = getModuleDueDate(weekNumber);
  const bufferEnd = getModuleBufferEnd(weekNumber);

  const fmt = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const daysUntil = d => Math.ceil((d - now) / 86400000);

  if (now <= dueDate) {
    const days = daysUntil(dueDate);
    if (days <= 2) {
      return { label: days === 0 ? 'Due Today' : `Due in ${days} day${days!==1?'s':''}`, class: 'overdue', status: 'due-soon', dueDate };
    }
    return { label: `Due ${fmt(dueDate)}`, class: 'pending', status: 'upcoming', dueDate };
  } else if (now <= bufferEnd) {
    const days = daysUntil(bufferEnd);
    return { label: `Buffer — ${days}d left`, class: 'overdue', status: 'buffer', dueDate: bufferEnd };
  } else {
    return { label: 'Overdue', class: 'overdue', status: 'overdue', dueDate };
  }
}

function getModuleOpenDate(weekNumber) {
  // A module unlocks `unlockEveryDays` after the previous one.
  const c = deptCadence();
  const d = new Date(ACTIVE_DEPARTMENT.scheduleStart);
  d.setDate(d.getDate() + (weekNumber - 1) * c.unlockEveryDays);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isModuleAvailable(module) {
  // Admins can always preview any module
  if (currentUser && currentUser.role === 'admin') return true;
  // Officers: available once the open date has passed
  return new Date() >= getModuleOpenDate(module.weekNumber);
}

/* ── State ──────────────────────────────── */
let currentUser     = null;
// Admin-only preview override: when an admin sets a track via the
// "Viewing as" toggle, the content resolver uses it instead of the
// admin's own track. null = use the logged-in user's real track,
// so non-admin supervisors and admins-with-a-track are unaffected.
let previewTrackOverride = null;
let currentModule   = null;
let moduleTimer     = null;
let quizTimer       = null;
let moduleSeconds   = 0;
let quizSeconds     = 0;
let currentQuizIdx  = 0;
let quizAnswered    = false;   // true once the answer is committed (Submit pressed)
let quizSelectedIdx = null;    // the option chosen but not yet committed — changeable
let quizCorrect     = 0;
let quizTotal       = 0;

// Scenario state
let scenarioPath    = [];   // [{question, choiceText, outcomeLabel, quality, legal}]
let currentNode     = null;
let currentNodeId   = null;
let pendingNext     = null; // next node id after consequence is shown
let scenarioDecisionCount = 0;
let scenarioTotalDecisions = 0;

/* ── Users ──────────────────────────────── */
/* Populated from Supabase on admin login via loadAllDataForAdmin() */
const USERS = {};

const completionData = {};

// Set true when the admin data load fails, so the dashboard can show a clear
// error instead of rendering an empty/0%/NaN view that looks like "no training."
let adminDataError = false;

// localStorage keys must be scoped to the active department — the shared engine
// serves every agency, so a bare 'mtpd_' prefix mislabels every other agency's
// browser state. Derive the prefix from the resolved subdomain.
function deptKey(suffix) {
  const sub = (typeof ACTIVE_DEPARTMENT !== 'undefined' && ACTIVE_DEPARTMENT && ACTIVE_DEPARTMENT.subdomain)
    ? ACTIVE_DEPARTMENT.subdomain : 'dept';
  return sub + '_' + suffix;
}

/* ══════════════════════════════════════════
   DATABASE CONFIGURATION
   ── Supabase (permanent records):
      1. Create a free account at supabase.com
      2. Paste your project URL and anon key below
      3. Records will write to the cloud automatically
   ── Until then, localStorage keeps records in
      this browser on this device.
══════════════════════════════════════════ */
// Supabase client — must be created at script load, NOT on
// DOMContentLoaded: app.js registers auth listeners at its own
// top level, which runs before DOMContentLoaded fires. Deferring
// this left _sb null there, killing session restore and every
// top-level statement below the listener registration.
let _sb = null;
const _dept = resolveDepartmentFromHostname();
if (_dept) {
  _sb = supabase.createClient(_dept.supabaseUrl, _dept.supabaseKey);
}

/* ── DOM-dependent department branding ── */
document.addEventListener('DOMContentLoaded', function() {
  if (!_dept) {
    // Unknown subdomain — show a generic error on the login card
    const card = document.querySelector('.login-card');
    if (card) card.innerHTML = '<p style="color:#f08090;text-align:center;padding:24px">Department not recognized.<br/>Contact your administrator.</p>';
    return;
  }

  // Update nav badge + name if present
  document.querySelectorAll('.nav-brand img').forEach(img => {
    img.src = _dept.badge;
    img.alt = _dept.shortName;
  });
  document.querySelectorAll('.nav-brand .brand-text span').forEach(el => {
    el.textContent = _dept.displayName || _dept.shortName;
  });
});

const STORAGE_KEY = 'arbiter_le_training_v1';

/* Save one officer\'s module completion to Supabase */
async function saveCompletionToSupabase(badgeNumber, modId, record) {
  try {
    const mod = MODULES.find(m => m.id === modId);
    const { error } = await _sb.from('completions').upsert({
      badge_number:   badgeNumber,
      module_id:      modId,
      module_title:   mod ? mod.title : modId,
      attempts:       record.attempts,
      passed:         record.passed,
      best_score:     record.bestScore,
      last_score:     record.score,
      scores:         record.scores,
      correct:        record.correct,
      total:          record.total,
      time_taken:     record.time,
      remediation:    record.remediation,
      completed_date: record.date,
      updated_at:     new Date().toISOString()
    }, { onConflict: 'badge_number,module_id' });
    if (error) console.warn('ALE: save rejected —', error.message, error.code);
    return { error: error || null };
  } catch(e) {
    console.warn('ALE: save failed —', e);
    return { error: e };
  }
}

/* ── Offline-safe completion queue ───────────
   A passed module must never vanish on a network blip. completionData is
   in-memory only and re-read from Supabase on next load, so a failed save
   would be lost. queuePendingCompletion() stashes a failed save locally;
   flushPendingCompletions() retries the queue on the next load. */
function queuePendingCompletion(badgeNumber, modId, record) {
  try {
    const key = deptKey('pending_completions');
    const q = JSON.parse(localStorage.getItem(key) || '[]');
    // De-dupe on badge+module — the latest record for a module wins.
    const next = q.filter(e => !(e.badge === badgeNumber && e.modId === modId));
    next.push({ badge: badgeNumber, modId, record, queuedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(next));
  } catch(e) { console.warn('ALE: could not queue completion —', e); }
}

async function flushPendingCompletions() {
  const key = deptKey('pending_completions');
  let q;
  try { q = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e) { return; }
  if (!Array.isArray(q) || !q.length) return;
  const remaining = [];
  for (const e of q) {
    const { error } = await saveCompletionToSupabase(e.badge, e.modId, e.record);
    if (error) remaining.push(e); // still failing (e.g. offline, or RLS) — keep it
  }
  try { localStorage.setItem(key, JSON.stringify(remaining)); } catch(_) {}
}

/* Load completions for one officer from Supabase */
async function loadOfficerCompletions(badgeNumber) {
  // Push any saves that failed earlier before reading fresh server state, so a
  // previously-lost pass shows up the moment connectivity returns.
  await flushPendingCompletions();
  try {
    const { data, error } = await _sb.from('completions')
      .select('*').eq('badge_number', badgeNumber);
    if (error || !data) return;
    if (!completionData[badgeNumber]) completionData[badgeNumber] = {};
    data.forEach(row => {
      completionData[badgeNumber][row.module_id] = {
        attempts:    row.attempts,
        passed:      row.passed,
        bestScore:   row.best_score,
        score:       row.last_score,
        scores:      row.scores || [],
        correct:     row.correct,
        total:       row.total,
        time:        row.time_taken,
        date:        row.completed_date,
        remediation: row.remediation
      };
    });
  } catch(e) { console.warn('ALE: load failed —', e); }
}

/* Load ALL officers + completions for admin dashboard.
   Returns false (and sets adminDataError) on failure so the caller can show a
   clear error — never let a failed load render as an empty, all-zero roster. */
async function loadAllDataForAdmin() {
  adminDataError = false;
  try {
    const { data: officerRows, error: offErr } = await _sb.from('officers').select('*');
    if (offErr) throw offErr;
    if (officerRows) {
      officerRows.forEach(o => {
        USERS[o.badge_number] = {
          password: '__hashed__',
          role:  o.role,
          name:  o.name,
          badge: o.badge_number,
          rank:  o.rank,
          email: o.email
        };
        if (!completionData[o.badge_number]) completionData[o.badge_number] = {};
      });
    }
    const { data: compRows, error: compErr } = await _sb.from('completions').select('*');
    if (compErr) throw compErr;
    if (compRows) {
      compRows.forEach(row => {
        if (!completionData[row.badge_number]) completionData[row.badge_number] = {};
        completionData[row.badge_number][row.module_id] = {
          attempts:    row.attempts,
          passed:      row.passed,
          bestScore:   row.best_score,
          score:       row.last_score,
          scores:      row.scores || [],
          correct:     row.correct,
          total:       row.total,
          time:        row.time_taken,
          date:        row.completed_date,
          remediation: row.remediation
        };
      });
    }
    return true;
  } catch(e) {
    console.warn('ALE: admin load failed —', e);
    adminDataError = true;
    return false;
  }
}

