/* ═══════════════════════════════════════════
   Arbiter LE — Department Registry
   Add a new agency by adding one entry here.
═══════════════════════════════════════════ */

const DEPARTMENT_REGISTRY = [
  {
    id: 'mtpd',
    name: 'Marlborough Township Police Department',
    shortName: 'MTPD',
    badge: 'assets/mtpd-badge.png',
    supabaseUrl: 'https://lkikznncbpfcmgnnyigj.supabase.co',
    supabaseKey: 'sb_publishable_fGl4ckmfmd-j2n6O8TkWLA_1tjOdJe6',
    department: 'js/departments/mtpd.js',
  },
  // ── Add new agencies below ────────────────
  // {
  //   id: 'springfield-pd',
  //   name: 'Springfield Police Department',
  //   shortName: 'SPD',
  //   badge: 'assets/spd-badge.png',
  //   supabaseUrl: 'https://xxxxx.supabase.co',
  //   supabaseKey: 'sb_publishable_xxxxx',
  //   department: 'js/departments/springfield-pd.js',
  // },
];

/* ── Active department (set after login screen selection) ── */
let ACTIVE_DEPARTMENT = null;

function getDepartment(id) {
  return DEPARTMENT_REGISTRY.find(d => d.id === id) || null;
}

function setActiveDepartment(id) {
  const dept = getDepartment(id);
  if (!dept) return false;
  ACTIVE_DEPARTMENT = dept;
  return true;
}
