// Decision Intelligence — records an officer's FIRST run through a module's
// scenario as anonymous, aggregate-only choice data for command staff.
//
// Model (decided with Andrew 2026-11-19):
//  - Aggregate only. The stored choice rows carry no officer identity,
//    timestamp, or sequence — see _database/<dept>/2026-11-19-<dept>-
//    decision-intelligence.sql. The officer is used here only to enforce
//    "first run only" and is never written next to a choice.
//  - First run only. record_scenario_run() (one transaction, service role)
//    refuses a run if the officer already has a completion for the module
//    or already contributed a run; this endpoint answers the same either way.
//
// Security properties (mirror api/grade.js + api/content.js):
//  - Department comes from the request HOST, never the body.
//  - The caller's JWT is verified against that department's own project and
//    the caller must have an officers row there (read with their own JWT).
//  - Every submitted choice is checked against DECISION_INDEX (built from the
//    department's own module scripts by _dev/build-content.js); its quality
//    is taken from the index, never from the client.
//  - Platform accounts (owner preview, health check, ADMIN-*, @arbiterle.com)
//    are never counted — mirrors isPlatformAccount() in js/app.js.
//  - Writes use SUPABASE_SERVICE_KEY_<DEPT> from Vercel env, never source.
//  - Always answers 204 on a valid request (recorded or skipped) so the
//    response never tells a client whether a run was counted.

import { DEPT_AUTH, DECISION_INDEX } from './_bundle/departments.js';

const ID_RE = /^[A-Za-z0-9_-]{1,80}$/;
const MAX_CHOICES = 20;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  res.setHeader('Cache-Control', 'no-store');

  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '')
    .toLowerCase().split(':')[0];
  const m = /^([a-z0-9-]+)\.arbiterle\.com$/.exec(host);
  const dept = m && m[1];
  if (!dept || !DEPT_AUTH[dept] || !DECISION_INDEX[dept]) {
    return res.status(403).json({ error: 'Unknown department host' });
  }

  // ── Validate the payload against this department's own scenarios ──
  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const { moduleId, track, scenarioKey, choices } = body;
  if (!ID_RE.test(String(moduleId || '')) || !['patrol', 'supervisor'].includes(track) ||
      !['scenario', 'scenario2', 'supervisorScenario'].includes(scenarioKey) ||
      !Array.isArray(choices) || choices.length === 0 || choices.length > MAX_CHOICES) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const nodes = DECISION_INDEX[dept][moduleId] && DECISION_INDEX[dept][moduleId][scenarioKey];
  if (!nodes) return res.status(400).json({ error: 'Invalid request' });
  // The supervisor scenario belongs to the supervisor track and vice versa.
  if ((scenarioKey === 'supervisorScenario') !== (track === 'supervisor')) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const seen = new Set();
  const rows = [];
  for (const c of choices) {
    const nodeId = c && String(c.nodeId || '');
    const idx = c && c.optionIndex;
    const qualities = ID_RE.test(nodeId) && nodes[nodeId];
    if (!qualities || !Number.isInteger(idx) || idx < 0 || idx >= qualities.length || seen.has(nodeId)) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    seen.add(nodeId);
    rows.push({ node_id: nodeId, option_index: idx, quality: qualities[idx] });
  }

  // ── Identify the caller (their own JWT, their own officers row) ──
  const auth = String(req.headers.authorization || '');
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Sign in required' });
  const { url, anonKey } = DEPT_AUTH[dept];
  let officer;
  try {
    const u = await fetch(url + '/auth/v1/user', {
      headers: { apikey: anonKey, authorization: 'Bearer ' + token }, signal: AbortSignal.timeout(8000) });
    if (!u.ok) return res.status(401).json({ error: 'Sign in required' });
    const user = await u.json();
    if (!user || !user.id) return res.status(401).json({ error: 'Sign in required' });
    const o = await fetch(url + '/rest/v1/officers?auth_uid=eq.' + encodeURIComponent(user.id) +
      '&select=badge_number,email,track,can_preview&limit=1',
      { headers: { apikey: anonKey, authorization: 'Bearer ' + token }, signal: AbortSignal.timeout(8000) });
    if (!o.ok) return res.status(502).json({ error: 'Could not verify account' });
    const list = await o.json();
    officer = Array.isArray(list) && list[0];
    if (!officer) return res.status(403).json({ error: 'No officer record for this account' });
  } catch (e) {
    console.error('decisions: verification failed —', e && e.message);
    return res.status(502).json({ error: 'Could not verify session' });
  }

  // A patrol officer cannot submit supervisor-track data and vice versa.
  if ((officer.track || 'patrol') !== track) return res.status(204).end();
  if (isPlatformAccount(officer)) return res.status(204).end();

  // ── Record (first run only — enforced inside the transaction) ──
  const svcKey = process.env['SUPABASE_SERVICE_KEY_' + dept.toUpperCase().replace(/-/g, '_')];
  if (!svcKey) {
    console.error('decisions: missing service key for', dept);
    return res.status(503).json({ error: 'Recording unavailable' });
  }
  try {
    const r = await fetch(url + '/rest/v1/rpc/record_scenario_run', {
      method: 'POST',
      headers: { apikey: svcKey, authorization: 'Bearer ' + svcKey, 'content-type': 'application/json' },
      body: JSON.stringify({ p_badge: officer.badge_number, p_module: moduleId, p_track: track,
                             p_scenario: scenarioKey, p_choices: rows }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      console.error('decisions: record failed —', r.status, (await r.text()).slice(0, 200));
      return res.status(502).json({ error: 'Could not record' });
    }
  } catch (e) {
    console.error('decisions: record error —', e && e.message);
    return res.status(502).json({ error: 'Could not record' });
  }
  return res.status(204).end();
}

function isPlatformAccount(o) {
  const badge = String(o.badge_number || '');
  if (o.can_preview === true) return true;
  if (badge === 'healthcheck' || badge === 'PREVIEW' || badge.startsWith('ADMIN-')) return true;
  return String(o.email || '').toLowerCase().endsWith('@arbiterle.com');
}
