/**
 * Arbiter LE — Daily Health Check (EGPD)
 * Checkly Browser Check (Playwright)
 *
 * Paste this into Checkly → Browser Checks → New Check
 * Set schedule: Daily at 8:00 AM
 * Set alert: Email to your address on any failure
 *
 * Requires the EGPD health-check account to exist on EGPD's Supabase
 * project (see healthcheck-setup-egpd.sql). The 'healthcheck' badge and
 * the @arbiterle.com email are both auto-excluded from every EGPD admin
 * view by isPlatformAccount() — the bot never appears in the roster.
 */

const { chromium } = require('playwright');

const BASE_URL   = 'https://egpd.arbiterle.com';
const TEST_EMAIL = 'healthcheck@arbiterle.com';
const TEST_PASS  = 'REPLACE_WITH_HEALTHCHECK_PASSWORD';

(async () => {
  const browser = await chromium.launch();
  const page    = await browser.newPage();

  // ── Check 1: Site loads ──────────────────────────────
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  const title = await page.title();
  if (!title.includes('Arbiter LE')) {
    throw new Error(`Check 1 FAILED: Page title unexpected — "${title}"`);
  }

  // ── Check 1b: Correct department served ──────────────
  // Confirms the EGPD subdomain is branded as EGPD (catches routing/DNS
  // serving the wrong department's content on this host).
  const heading = await page.$eval('.login-header h1', el => el.innerText).catch(() => '');
  if (!/east greenville/i.test(heading)) {
    throw new Error(`Check 1b FAILED: Login does not show EGPD branding — "${heading}"`);
  }

  // ── Check 2: Login form present ─────────────────────
  const emailField = await page.$('#login-user');
  const passField  = await page.$('#login-pass');
  if (!emailField || !passField) {
    throw new Error('Check 2 FAILED: Login form fields not found');
  }

  // ── Check 3: Login succeeds ──────────────────────────
  await page.fill('#login-user', TEST_EMAIL);
  await page.fill('#login-pass', TEST_PASS);
  await page.click('#btn-login');

  await page.waitForSelector('#screen-officer.active', { timeout: 10000 })
    .catch(() => { throw new Error('Check 3 FAILED: Login did not reach officer dashboard'); });

  // ── Check 4: All 12 modules present ─────────────────
  await page.waitForSelector('.module-card', { timeout: 5000 });
  const moduleCount = await page.$$eval('.module-card', cards => cards.length);
  if (moduleCount < 12) {
    throw new Error(`Check 4 FAILED: Expected 12 modules, found ${moduleCount}`);
  }

  // ── Check 5: First AVAILABLE module opens ────────────
  // Click the first unlocked module's start button (schedule-safe — skips
  // any module still showing "Opens <date>").
  const startBtn = await page.$('.module-card:not(.locked) .btn-module:not([disabled])');
  if (!startBtn) {
    throw new Error('Check 5 FAILED: No unlocked module available to open');
  }
  await startBtn.click();
  await page.waitForSelector('#screen-module.active', { timeout: 5000 })
    .catch(() => { throw new Error('Check 5 FAILED: Module screen did not load'); });

  const moduleContent = await page.$eval('#module-content-body', el => el.innerText.length)
    .catch(() => 0);
  if (moduleContent < 100) {
    throw new Error(`Check 5 FAILED: Module content too short (${moduleContent} chars)`);
  }

  // ── All checks passed ────────────────────────────────
  console.log(`✅ EGPD — all checks passed — ${new Date().toISOString()}`);

  await browser.close();
})();
