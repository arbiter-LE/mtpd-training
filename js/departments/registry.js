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
    badge: 'assets/mtpd-badge.png',
    supabaseUrl: 'https://lkikznncbpfcmgnnyigj.supabase.co',
    supabaseKey: 'sb_publishable_fGl4ckmfmd-j2n6O8TkWLA_1tjOdJe6',
  },
  // ── Add new agencies below ────────────────
  // {
  //   subdomain: 'springfield',   // springfield.arbiterle.com
  //   name: 'Springfield Police Department',
  //   shortName: 'SPD',
  //   badge: 'assets/spd-badge.png',
  //   supabaseUrl: 'https://xxxxx.supabase.co',
  //   supabaseKey: 'sb_publishable_xxxxx',
  // },
];

/* ── Active department (resolved from hostname on load) ── */
let ACTIVE_DEPARTMENT = null;

function resolveDepartmentFromHostname() {
  const hostname = window.location.hostname; // e.g. "mtpd.arbiterle.com"
  const subdomain = hostname.split('.')[0];  // e.g. "mtpd"

  // Local dev fallback — default to first department
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    ACTIVE_DEPARTMENT = DEPARTMENT_REGISTRY[0];
    return ACTIVE_DEPARTMENT;
  }

  ACTIVE_DEPARTMENT = DEPARTMENT_REGISTRY.find(d => d.subdomain === subdomain) || null;
  return ACTIVE_DEPARTMENT;
}
