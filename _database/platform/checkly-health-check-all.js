/**
 * Arbiter LE — Daily Health Check (ALL AGENCIES, single check)  · v2 2026-11-19
 * Checkly Browser Check (Playwright)
 *
 * One check covers every live agency (Hobby plan budget: 1,000 browser
 * runs/month — runs are the cap, not the number of checks).
 *
 * What it proves, per agency (each agency runs independently; one agency's
 * failure never masks another's, and the final error names agency + step):
 *
 *   PUBLIC SURFACE (no sign-in, plain HTTP)
 *   P1  App serves 200 with the noindex header (subdomains stay out of search)
 *   P2  /api/content refuses an anonymous caller (401) — the content gate
 *   P3  Internal files 404: CLAUDE.md, legal registry, _database, and this
 *       department's raw module file under js/modules/ (must never be public)
 *
 *   OFFICER FLOW (real browser, the read-only healthcheck officer account)
 *   B1  Page title + this department's branding (catches routing/DNS mix-ups)
 *   B2  Sign-in reaches the officer dashboard; /api/content returns 200 for
 *       the signed-in officer (on failure, reports the on-screen error and
 *       the /api/content status instead of a vague timeout)
 *   B3  At least `minModules` module cards render
 *   B4  First unlocked module opens with real reading content
 *   B5  Sign Out returns to the login screen
 *   B6  No uncaught JavaScript errors on the page during the whole flow
 *
 *   TENANT ISOLATION
 *   T1  This officer's session token is REFUSED by every other agency's
 *       /api/content (one agency can never pull another agency's content)
 *
 *   PLATFORM
 *   M1  Marketing apex arbiterle.com serves 200
 *
 * Slow sign-in (> SLOW_LOGIN_MS) is logged as a warning, not a failure.
 * A screenshot is captured at the point of any browser failure.
 *
 * DEPLOY: paste into Checkly → "Arbiter LE Daily Health Check (All Agencies)"
 * → replace the script → put the two real passwords in. NEVER commit the real
 * passwords — this repo copy keeps the REPLACE_WITH_… placeholders.
 * Adding an agency: add one entry to AGENCIES (seed its healthcheck officer
 * account first — see _database/<dept>/healthcheck-setup-*.sql).
 */

const { chromium, request } = require('playwright');

const TEST_EMAIL     = 'healthcheck@arbiterle.com';
const SLOW_LOGIN_MS  = 8000;
const MARKETING_URL  = 'https://arbiterle.com';

const AGENCIES = [
  {
    name:       'MTPD',
    sub:        'mtpd',
    brand:      /marlborough/i,
    minModules: 12,
    pass:       'REPLACE_WITH_MTPD_HEALTHCHECK_PASSWORD',
  },
  {
    name:       'EGPD',
    sub:        'egpd',
    brand:      /east greenville/i,
    minModules: 12,
    pass:       'REPLACE_WITH_EGPD_HEALTHCHECK_PASSWORD',
  },
];

const urlOf = a => `https://${a.sub}.arbiterle.com`;

// Paths that must NEVER be publicly fetchable on any department host.
const mustBePrivate = a => [
  '/CLAUDE.md',
  '/_legal/citations-registry.md',
  '/_database/platform/checkly-health-check-all.js',
  `/js/modules/${a.sub}/modules-${a.sub}.js`,
];

// ── Public surface (HTTP only, no browser) ─────────────────────────────
async function checkPublic(api, a) {
  const fails = [];
  const base = urlOf(a);

  const home = await api.get(base + '/', { maxRedirects: 0 });
  if (home.status() !== 200) fails.push(`P1 app returned ${home.status()}`);
  else if (!/noindex/i.test(home.headers()['x-robots-tag'] || '')) fails.push('P1 noindex header missing');

  const anon = await api.get(base + '/api/content', { maxRedirects: 0 });
  if (anon.status() !== 401) fails.push(`P2 CONTENT GATE OPEN — anonymous /api/content returned ${anon.status()} (expected 401)`);

  for (const p of mustBePrivate(a)) {
    const r = await api.get(base + p, { maxRedirects: 0 });
    if (r.status() !== 404) fails.push(`P3 internal file exposed — ${p} returned ${r.status()}`);
  }
  return fails;
}

// ── Officer flow (browser) ─────────────────────────────────────────────
// Returns { fails, token } — token is the signed-in officer's bearer token,
// captured from the /api/content request, for the tenant-isolation step.
async function checkBrowser(browser, a) {
  const fails = [];
  const context = await browser.newContext();
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push(e.message));

  let token = null;
  let contentStatus = null;
  page.on('request', r => {
    if (r.url().includes('/api/content')) {
      const h = r.headers().authorization || '';
      if (h.startsWith('Bearer ')) token = h.slice(7);
    }
  });
  page.on('response', r => { if (r.url().includes('/api/content')) contentStatus = r.status(); });

  let step = 'B1';
  try {
    // B1 · Site + branding
    await page.goto(urlOf(a), { waitUntil: 'networkidle', timeout: 20000 });
    const title = await page.title();
    if (!title.includes('Arbiter LE')) throw new Error(`site title unexpected — "${title}"`);
    const heading = await page.$eval('.login-header h1', el => el.innerText).catch(() => '');
    if (!a.brand.test(heading)) throw new Error(`wrong branding served — "${heading}"`);

    // B2 · Sign-in → dashboard, content delivered
    step = 'B2';
    if (!(await page.$('#login-user')) || !(await page.$('#login-pass'))) {
      throw new Error('login form fields not found');
    }
    await page.fill('#login-user', TEST_EMAIL);
    await page.fill('#login-pass', a.pass);
    const t0 = Date.now();
    await page.click('#btn-login');
    const reached = await page.waitForSelector('#screen-officer.active', { timeout: 15000 })
      .then(() => true).catch(() => false);
    if (!reached) {
      const onScreen = await page.$eval('#login-error', el => el.innerText.trim()).catch(() => '');
      const onAdmin = await page.$('#screen-admin.active');
      if (onAdmin) throw new Error('healthcheck account landed on ADMIN screen — it must be role officer');
      throw new Error(`sign-in did not reach officer dashboard` +
        (contentStatus !== null ? ` · /api/content ${contentStatus}` : ' · /api/content never called') +
        (onScreen ? ` · screen says "${onScreen}"` : ''));
    }
    const loginMs = Date.now() - t0;
    if (contentStatus !== 200 && contentStatus !== 304) {
      throw new Error(`/api/content returned ${contentStatus} for a signed-in officer`);
    }
    if (loginMs > SLOW_LOGIN_MS) console.log(`⚠️  ${a.name}: slow sign-in — ${loginMs} ms (budget ${SLOW_LOGIN_MS} ms)`);
    else console.log(`   ${a.name}: sign-in ${loginMs} ms`);

    // B3 · Module cards
    step = 'B3';
    await page.waitForSelector('.module-card', { timeout: 8000 });
    const moduleCount = await page.$$eval('.module-card', cards => cards.length);
    if (moduleCount < a.minModules) throw new Error(`expected ≥${a.minModules} modules, found ${moduleCount}`);

    // B4 · First unlocked module opens with real content
    step = 'B4';
    const startBtn = await page.$('.module-card:not(.locked) .btn-module:not([disabled])');
    if (!startBtn) throw new Error('no unlocked module available to open');
    await startBtn.click();
    await page.waitForSelector('#screen-module.active', { timeout: 8000 })
      .catch(() => { throw new Error('module screen did not load'); });
    const len = await page.$eval('#module-content-body', el => el.innerText.length).catch(() => 0);
    if (len < 100) throw new Error(`module content too short (${len} chars)`);

    // B5 · Sign out
    step = 'B5';
    await page.click('#screen-module .btn-logout');
    await page.waitForSelector('#screen-login.active', { timeout: 8000 })
      .catch(() => { throw new Error('Sign Out did not return to the login screen'); });

    // B6 · No uncaught JS errors
    step = 'B6';
    if (pageErrors.length) throw new Error(`uncaught JS error — ${pageErrors[0]}` +
      (pageErrors.length > 1 ? ` (+${pageErrors.length - 1} more)` : ''));
  } catch (e) {
    fails.push(`${step} ${e.message}`);
    await page.screenshot({ path: `fail-${a.sub}-${step}.png`, fullPage: true }).catch(() => {});
  } finally {
    await context.close();
  }
  return { fails, token };
}

// ── Tenant isolation ───────────────────────────────────────────────────
async function checkIsolation(api, a, token) {
  const fails = [];
  for (const other of AGENCIES) {
    if (other.sub === a.sub) continue;
    const r = await api.get(urlOf(other) + '/api/content', {
      headers: { authorization: 'Bearer ' + token }, maxRedirects: 0,
    });
    if (r.status() === 200 || r.status() === 304) {
      fails.push(`T1 CROSS-TENANT LEAK — ${a.name} officer token received ${other.name} content (${r.status()})`);
    }
  }
  return fails;
}

(async () => {
  const api = await request.newContext({ timeout: 15000 });
  const browser = await chromium.launch();
  const failures = [];

  for (const a of AGENCIES) {
    const pub = await checkPublic(api, a).catch(e => [`P* ${e.message}`]);
    const { fails: br, token } = await checkBrowser(browser, a);
    const iso = token ? await checkIsolation(api, a, token).catch(e => [`T1 ${e.message}`]) : [];
    if (!token && !br.length) iso.push('T1 skipped — no session token captured from /api/content');

    const all = [...pub, ...br, ...iso];
    if (all.length) all.forEach(f => failures.push(`${a.name} ${f}`));
    else console.log(`✅ ${a.name} — public surface, officer flow, tenant isolation all passed`);
  }

  // M1 · Marketing apex
  const m = await api.get(MARKETING_URL + '/').catch(() => null);
  if (!m || m.status() !== 200) failures.push(`MARKETING M1 arbiterle.com returned ${m ? m.status() : 'no response'}`);
  else console.log('✅ Marketing — arbiterle.com up');

  await browser.close();
  await api.dispose();

  if (failures.length) {
    throw new Error(`Health check FAILED (${failures.length}) — ${failures.join('  |  ')}`);
  }
  console.log(`✅ All agencies passed — ${new Date().toISOString()}`);
})();
