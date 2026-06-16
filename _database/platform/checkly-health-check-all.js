/**
 * Arbiter LE — Daily Health Check (ALL AGENCIES, single check)
 * Checkly Browser Check (Playwright)
 *
 * Tests every live agency in ONE browser check so the whole platform is
 * monitored within a single-check plan. SUPERSEDES the two standalone
 * checks (checkly-health-check.js for MTPD, checkly-health-check-egpd.js
 * for EGPD) — deploy this one and delete those in Checkly.
 *
 * Each agency runs independently: a failure in one is recorded and the
 * others still run, so an MTPD outage never masks an EGPD problem. The
 * final error names exactly which agency/check broke.
 *
 * Paste into Checkly → Browser Checks → New Check.
 * Schedule: Daily (every 24h).  Alert: email on failure.
 * Fill in each agency's healthcheck password below (separate Supabase
 * projects — the passwords may differ).
 */

const { chromium } = require('playwright');

const TEST_EMAIL = 'healthcheck@arbiterle.com';

const AGENCIES = [
  {
    name:  'MTPD',
    url:   'https://mtpd.arbiterle.com',
    brand: /marlborough/i,
    pass:  'REPLACE_WITH_MTPD_HEALTHCHECK_PASSWORD',
  },
  {
    name:  'EGPD',
    url:   'https://egpd.arbiterle.com',
    brand: /east greenville/i,
    pass:  'REPLACE_WITH_EGPD_HEALTHCHECK_PASSWORD',
    // Week 1 unlocks 2026-06-17 00:00. Skip the module-open check until
    // then so the pre-launch "no unlocked module" state isn't a false
    // alert. 01:00Z = comfortably after the unlock boundary on the
    // (UTC) Checkly runner. Remove this line after launch if desired.
    moduleCheckFrom: '2026-06-17T01:00:00Z',
  },
];

async function checkAgency(browser, a) {
  const page = await browser.newPage();
  try {
    // 1 · Site loads
    await page.goto(a.url, { waitUntil: 'networkidle' });
    const title = await page.title();
    if (!title.includes('Arbiter LE')) throw new Error(`site title unexpected — "${title}"`);

    // 1b · Correct department served (catches routing/DNS mix-ups)
    const heading = await page.$eval('.login-header h1', el => el.innerText).catch(() => '');
    if (!a.brand.test(heading)) throw new Error(`wrong branding served — "${heading}"`);

    // 2 · Login form present
    if (!(await page.$('#login-user')) || !(await page.$('#login-pass'))) {
      throw new Error('login form fields not found');
    }

    // 3 · Login succeeds
    await page.fill('#login-user', TEST_EMAIL);
    await page.fill('#login-pass', a.pass);
    await page.click('#btn-login');
    await page.waitForSelector('#screen-officer.active', { timeout: 10000 })
      .catch(() => { throw new Error('login did not reach officer dashboard'); });

    // 4 · All 12 modules present
    await page.waitForSelector('.module-card', { timeout: 5000 });
    const moduleCount = await page.$$eval('.module-card', cards => cards.length);
    if (moduleCount < 12) throw new Error(`expected 12 modules, found ${moduleCount}`);

    // 5 · First unlocked module opens (schedule-aware)
    const liveYet = !a.moduleCheckFrom || new Date() >= new Date(a.moduleCheckFrom);
    if (!liveYet) {
      console.log(`  ${a.name}: pre-launch — module-open check skipped until ${a.moduleCheckFrom}`);
    } else {
      const startBtn = await page.$('.module-card:not(.locked) .btn-module:not([disabled])');
      if (!startBtn) throw new Error('no unlocked module available to open');
      await startBtn.click();
      await page.waitForSelector('#screen-module.active', { timeout: 5000 })
        .catch(() => { throw new Error('module screen did not load'); });
      const len = await page.$eval('#module-content-body', el => el.innerText.length).catch(() => 0);
      if (len < 100) throw new Error(`module content too short (${len} chars)`);
    }

    console.log(`✅ ${a.name} — all checks passed`);
    return null;
  } catch (e) {
    return `${a.name} — ${e.message}`;
  } finally {
    await page.close();
  }
}

(async () => {
  const browser = await chromium.launch();
  const failures = [];
  for (const a of AGENCIES) {
    const f = await checkAgency(browser, a);
    if (f) failures.push(f);
  }
  await browser.close();

  if (failures.length) {
    throw new Error(`Health check FAILED — ${failures.join('  |  ')}`);
  }
  console.log(`✅ All agencies passed — ${new Date().toISOString()}`);
})();
