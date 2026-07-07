/* ═══════════════════════════════════════════
   Arbiter LE — Department Registry
   Each agency maps to its subdomain.
   Add a new agency by adding one entry here.
═══════════════════════════════════════════ */

const DEPARTMENT_REGISTRY = [
  {
    subdomain: 'mtpd',          // mtpd.arbiterle.com
    name: 'Marlborough Township Police Department',
    shortName: 'MTPD',
    displayName: 'Marlborough Township PD',
    badge: 'assets/mtpd-badge.png',
    supabaseUrl: 'https://lkikznncbpfcmgnnyigj.supabase.co',
    supabaseKey: 'sb_publishable_fGl4ckmfmd-j2n6O8TkWLA_1tjOdJe6',
    scheduleStart: new Date('2026-06-24T00:00:00'), // Relaunch — Module 1 opens (voluntary lab)
    // Biweekly unlock, monthly due (new standard 2026-07): a module unlocks
    // every 14 days; each month's pair shares a month-end due date, with one
    // 30-day grace period before "overdue". EGPD's live pilot cadence is
    // locked and unaffected.
    cadence: { unlockEveryDays: 14, duePeriodDays: 30, modulesPerPeriod: 2, bufferPeriods: 1 },
    // Content scripts for this department, loaded in order by index.html.
    // They define the same globals (MODULES, SCENARIO_*, get*Questions);
    // only the active department's scripts load per page.
    moduleScripts: [
      'js/modules/mtpd/scenarios-mtpd.js',
      'js/modules/mtpd/module-mtpd-1.js',    // reading consts + supervisor variants, per module
      'js/modules/mtpd/module-mtpd-2.js',
      'js/modules/mtpd/module-mtpd-3.js',
      'js/modules/mtpd/module-mtpd-4.js',
      'js/modules/mtpd/module-mtpd-5.js',
      'js/modules/mtpd/module-mtpd-6.js',
      'js/modules/mtpd/module-mtpd-7.js',
      'js/modules/mtpd/module-mtpd-8.js',
      'js/modules/mtpd/module-mtpd-9.js',
      'js/modules/mtpd/module-mtpd-10.js',
      'js/modules/mtpd/module-mtpd-11.js',
      'js/modules/mtpd/module-mtpd-12.js',
      'js/modules/mtpd/modules-mtpd.js',     // builds MODULES from the consts above
    ],
    // Per-department capability flags. Shared code branches on these, never
    // on the subdomain. Absent/false = the feature is off for this department.
    features: { supervisorTrack: true },     // MTPD: supervisor reading + graded quiz (all 12)
  },
  // ── Add new agencies below ────────────────
  {
    subdomain: 'egpd', // egpd.arbiterle.com
    name: 'East Greenville Police Department',
    shortName: 'EGPD',
    displayName: 'East Greenville PD',
    badge: 'assets/egpd-badge.png',
    supabaseUrl: 'https://kczrylxnrzkcwgivlqrs.supabase.co',
    supabaseKey: 'sb_publishable_W9kN8bhnwKwMCwKv5zu5GA_xhiq-vXR',
    scheduleStart: new Date('2026-06-17T00:00:00'), // Requested go-live per onboarding packet
    // Pilot cadence (locked — live since June 17): a module unlocks weekly, but
    // modules are due in biweekly pairs (M1+M2 share a due date, etc.).
    cadence: { unlockEveryDays: 7, duePeriodDays: 14, modulesPerPeriod: 2, bufferPeriods: 1 },
    moduleScripts: [
      'js/modules/egpd/module-egpd-1.js',
      'js/modules/egpd/module-egpd-2.js',
      'js/modules/egpd/module-egpd-3.js',
      'js/modules/egpd/module-egpd-4.js',
      'js/modules/egpd/module-egpd-5.js',
      'js/modules/egpd/module-egpd-6.js',
      'js/modules/egpd/module-egpd-7.js',
      'js/modules/egpd/module-egpd-8.js',
      'js/modules/egpd/module-egpd-9.js',
      'js/modules/egpd/module-egpd-10.js',
      'js/modules/egpd/module-egpd-11.js',
      'js/modules/egpd/module-egpd-12.js',
      'js/modules/egpd/modules-egpd.js',   // builds MODULES from the above
    ],
    features: { supervisorTrack: true },   // EGPD: supervisor reading + graded quiz
  },
];

/* ── Active department (resolved from hostname on load) ── */
let ACTIVE_DEPARTMENT = null;

function resolveDepartmentFromHostname() {
  const hostname = window.location.hostname; // e.g. "mtpd.arbiterle.com"
  const subdomain = hostname.split('.')[0];  // e.g. "mtpd"

  // Local dev — ?dept=egpd overrides; defaults to first department
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const deptParam = new URLSearchParams(window.location.search).get('dept');
    ACTIVE_DEPARTMENT = DEPARTMENT_REGISTRY.find(d => d.subdomain === deptParam)
      || DEPARTMENT_REGISTRY[0];
  } else {
    ACTIVE_DEPARTMENT = DEPARTMENT_REGISTRY.find(d => d.subdomain === subdomain) || null;
  }

  // Per-department visual theme: sets html[data-theme="<subdomain>"], which
  // applies that agency's token overrides in styles.css. No attribute = MTPD
  // default (:root). Each new agency gets a theme block keyed to its subdomain.
  if (ACTIVE_DEPARTMENT) {
    document.documentElement.setAttribute('data-theme', ACTIVE_DEPARTMENT.subdomain);
  }
  return ACTIVE_DEPARTMENT;
}
