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
    scheduleStart: new Date('2026-06-01T00:00:00'), // Monday — Week 1 opens
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
