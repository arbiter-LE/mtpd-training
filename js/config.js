/* ═══════════════════════════════════════════
   Arbiter LE — Configuration & State
═══════════════════════════════════════════ */

/* ── Schedule Engine ────────────────────── */
// Schedule start is per-department, defined in js/departments/registry.js.
// Each module unlocks at the start of its week; due by that Sunday.
// One week buffer before status flips to overdue.

function getSundayOfWeek(weekNumber) {
  // Returns the due date for a given 1-based week number.
  // Modules are due twice a month — every two weeks.
  // Weeks 1-2 share a due date, weeks 3-4 share one, etc.
  const biweeklyPeriod = Math.ceil(weekNumber / 2);
  const d = new Date(ACTIVE_DEPARTMENT.scheduleStart);
  d.setDate(d.getDate() + (biweeklyPeriod * 14));
  d.setHours(23, 59, 59, 0);
  return d;
}

function getModuleSchedule(weekNumber) {
  const now       = new Date();
  const dueSunday = getSundayOfWeek(weekNumber);
  const bufferEnd = getSundayOfWeek(weekNumber + 2); // two-week buffer

  const fmt = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const daysUntil = d => Math.ceil((d - now) / 86400000);

  if (now <= dueSunday) {
    const days = daysUntil(dueSunday);
    if (days <= 2) {
      return { label: days === 0 ? 'Due Today' : `Due in ${days} day${days!==1?'s':''}`, class: 'overdue', status: 'due-soon', dueDate: dueSunday };
    }
    return { label: `Due ${fmt(dueSunday)}`, class: 'pending', status: 'upcoming', dueDate: dueSunday };
  } else if (now <= bufferEnd) {
    const days = daysUntil(bufferEnd);
    return { label: `Buffer — ${days}d left`, class: 'overdue', status: 'buffer', dueDate: bufferEnd };
  } else {
    return { label: 'Overdue', class: 'overdue', status: 'overdue', dueDate: dueSunday };
  }
}

function getModuleOpenDate(weekNumber) {
  // A module unlocks at the start of its week (weekNumber - 1 weeks after scheduleStart)
  const d = new Date(ACTIVE_DEPARTMENT.scheduleStart);
  d.setDate(d.getDate() + (weekNumber - 1) * 7);
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
let currentModule   = null;
let moduleTimer     = null;
let quizTimer       = null;
let moduleSeconds   = 0;
let quizSeconds     = 0;
let currentQuizIdx  = 0;
let quizAnswered    = false;
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
    await _sb.from('completions').upsert({
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
  } catch(e) { console.warn('ALE: save failed —', e); }
}

/* Load completions for one officer from Supabase */
async function loadOfficerCompletions(badgeNumber) {
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

/* Load ALL officers + completions for admin dashboard */
async function loadAllDataForAdmin() {
  try {
    const { data: officerRows } = await _sb.from('officers').select('*');
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
    const { data: compRows } = await _sb.from('completions').select('*');
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
  } catch(e) { console.warn('ALE: admin load failed —', e); }
}

