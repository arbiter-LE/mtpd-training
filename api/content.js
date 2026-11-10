// Department training content, delivered only to a signed-in officer.
//
// Module content (reading, scenarios, questions, supervisor overlays) and
// each agency's reference content (citations + glossary entries quoting its
// orders) used to be public static files under js/modules/ — fetchable by
// anyone, and one agency's host even served another agency's files. They
// now ship only inside this function (bundled into api/_bundle/ by
// `node _dev/build-content.js`; js/modules/ is in .vercelignore).
//
// Security properties (mirror api/grade.js):
//  - Department is derived from the request HOST, never the query or body —
//    an officer on egpd.arbiterle.com can only ever receive EGPD content.
//  - The caller's Supabase JWT is verified against that department's own
//    project, and the caller must have an officers row there (read with
//    their own JWT under RLS). A bare auth account with no officer record —
//    e.g. a self sign-up — gets nothing.
//  - Fails closed: no token, bad token, no officer row, or an auth outage
//    all return an error, never content.
//  - Responses are private (never stored by a shared cache) and carry an
//    ETag so a returning officer's browser revalidates instead of
//    re-downloading the full bundle.

import { CONTENT, DEPT_AUTH } from './_bundle/departments.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  res.setHeader('Cache-Control', 'private, no-cache');
  res.setHeader('Vary', 'Authorization');

  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '')
    .toLowerCase().split(':')[0];
  const hostMatch = /^([a-z0-9-]+)\.arbiterle\.com$/.exec(host);
  const dept = hostMatch && hostMatch[1];
  if (!dept || !CONTENT[dept] || !DEPT_AUTH[dept]) {
    return res.status(403).json({ error: 'Unknown department host' });
  }

  const authHeader = String(req.headers.authorization || '');
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Sign in required' });

  const { url, anonKey } = DEPT_AUTH[dept];
  const headers = { apikey: anonKey, authorization: 'Bearer ' + token };
  let authUid = null;
  try {
    const authResp = await fetch(url + '/auth/v1/user', { headers, signal: AbortSignal.timeout(8000) });
    if (!authResp.ok) return res.status(401).json({ error: 'Sign in required' });
    const user = await authResp.json();
    authUid = user && user.id;
    if (!authUid) return res.status(401).json({ error: 'Sign in required' });

    const offResp = await fetch(
      url + '/rest/v1/officers?auth_uid=eq.' + encodeURIComponent(authUid) + '&select=badge_number&limit=1',
      { headers, signal: AbortSignal.timeout(8000) });
    if (!offResp.ok) return res.status(502).json({ error: 'Could not verify account access' });
    const rows = await offResp.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(403).json({ error: 'No officer record for this account' });
    }
  } catch (e) {
    console.error('content: verification failed —', e && e.message);
    return res.status(502).json({ error: 'Could not verify session' });
  }

  const bundle = CONTENT[dept];
  const etag = '"' + bundle.version + '"';
  res.setHeader('ETag', etag);
  if (String(req.headers['if-none-match'] || '') === etag) {
    return res.status(304).end();
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(200).send(bundle.body);
}
