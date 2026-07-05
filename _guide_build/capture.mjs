/* Headless-Chrome screenshot capture for the EGPD user guide.
   Drives the locally-served platform over the DevTools Protocol,
   injects DEMO state only (no Supabase writes), renders each screen,
   and saves a PNG per screen. Build-time tool — not deployed. */

import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const APP_URL = 'http://localhost:3000/?dept=egpd';
const OUT = fileURLToPath(new URL('./screens/', import.meta.url));
const PORT = 9333;
const W = 1280, H = 900, SCALE = 2;

mkdirSync(OUT, { recursive: true });

// ── base demo state (safe, in-memory, no DB writes) ──────────────
const BASE_SETUP = `
  window.saveCompletionToSupabase = function(){ return Promise.resolve(); };
  ACTIVE_DEPARTMENT.scheduleStart = new Date('2026-05-11T00:00:00');
  currentUser = { id:'EGPD-DEMO', name:'Ofc. M. Reyes', rank:'Patrol Officer', role:'officer', track:'patrol', badge:'EGPD-204', email:'m.reyes@example.gov' };
  USERS['EGPD-DEMO'] = Object.assign({}, currentUser);
  completionData['EGPD-DEMO'] = {
    'egpd-search-seizure': { attempts:1, passed:true, bestScore:92, score:92, scores:[92], date:'2026-05-19', correct:11, total:12, time:'14:22' },
    'egpd-use-of-force':   { attempts:2, passed:true, bestScore:88, score:88, scores:[64,88], date:'2026-05-31', correct:14, total:16, time:'18:05' },
    'egpd-report-writing': { attempts:1, passed:true, bestScore:100, score:100, scores:[100], date:'2026-06-07', correct:10, total:10, time:'11:40' }
  };
  previewTrackOverride = null;
  ['officer-name-display','module-officer-name','scenario-officer-name','quiz-officer-name','debrief-officer-name'].forEach(function(id){ var e=document.getElementById(id); if(e) e.textContent=currentUser.name; });
  var b=document.getElementById('officer-badge-display'); if(b) b.textContent='Badge #'+currentUser.badge;
  var tm=document.getElementById('officer-tab-modules'); if(tm) tm.classList.remove('hidden');
  var tp=document.getElementById('officer-tab-progress'); if(tp) tp.classList.add('hidden');
  document.querySelectorAll('.officer-tab').forEach(function(t){t.classList.remove('active'); if(/module/i.test(t.textContent)) t.classList.add('active');});
`;

// fictional roster for admin views (sample data only)
const ADMIN_SETUP = `
  currentUser = { id:'ADMIN-DEMO', name:'Administrator', rank:'Command Staff', role:'admin', track:'supervisor', badge:'EGPD-001', email:'admin@example.gov' };
  previewTrackOverride = null;
  delete USERS['EGPD-DEMO']; delete completionData['EGPD-DEMO'];
  var roster = [
    ['EGPD-204','Ofc. M. Reyes','Patrol Officer',  {1:[92,1],2:[88,2],3:[100,1],4:[84,1]}],
    ['EGPD-211','Ofc. T. Alvarez','Patrol Officer', {1:[78,1],2:[91,1],3:[88,1]}],
    ['EGPD-188','Sgt. K. Doyle','Sergeant',         {1:[95,1],2:[97,1],3:[100,1],4:[92,1],5:[89,1],6:[94,1]}],
    ['EGPD-220','Ofc. P. Nowak','Patrol Officer',   {1:[71,1],2:[58,3]}],
    ['EGPD-233','Ofc. D. Burke','Patrol Officer',   {1:[100,1]}]
  ];
  var ids = MODULES.map(function(m){return m.id;});
  roster.forEach(function(r){
    var badge=r[0], name=r[1], rank=r[2], comps=r[3];
    USERS[badge] = { id:badge, name:name, rank:rank, role:'officer', track:'patrol', badge:badge, email:badge.toLowerCase()+'@example.gov' };
    completionData[badge] = {};
    Object.keys(comps).forEach(function(wk){
      var idx=parseInt(wk,10)-1; if(idx<0||idx>=ids.length) return;
      var sc=comps[wk][0], att=comps[wk][1];
      var passed = sc>=70; var remediation = !passed && att>=3;
      completionData[badge][ids[idx]] = { attempts:att, passed:passed, bestScore:sc, score:sc, scores:[sc], remediation:remediation, date:'2026-06-0'+((idx%7)+1), correct:Math.round(sc/10), total:10, time:'12:30' };
    });
  });
`;

// ── per-screen render steps ──────────────────────────────────────
const SCREENS = [
  { name: '01-login', setup: `showScreen('screen-login');` },
  { name: '02-forgot-password', setup: `
      showScreen('screen-login');
      document.getElementById('login-user').value='m.reyes@eastgreenvillepd.gov';
      var err=document.getElementById('login-error'); err.textContent='Reset link sent — check your email.'; err.style.color='var(--gold)';
  ` },
  { name: '03-reset-password', setup: `showScreen('screen-reset');` },
  { name: '04-officer-dashboard', setup: `${BASE_SETUP} showOfficerDashboard(); window.scrollTo(0,0);` },
  { name: '05-progress-tab', setup: `
      ${BASE_SETUP} showOfficerDashboard();
      document.querySelectorAll('.officer-tab').forEach(function(t){t.classList.remove('active'); if(/progress/i.test(t.textContent)) t.classList.add('active');});
      document.getElementById('officer-tab-modules').classList.add('hidden');
      document.getElementById('officer-tab-progress').classList.remove('hidden');
      renderProgressTable(); window.scrollTo(0,0);
  ` },
  { name: '06-module-reading', setup: `${BASE_SETUP} startModule('egpd-search-seizure'); window.scrollTo(0,0);` },
  { name: '07-scenario-scene', setup: `${BASE_SETUP} startScenario('egpd-search-seizure'); window.scrollTo(0,0);` },
  { name: '08-scenario-decision', setup: `
      ${BASE_SETUP} startScenario('egpd-search-seizure');
      var scen=currentModule._activeScenario||currentModule.scenario;
      var nextId=scen.nodes.start.next; renderScenarioNode(nextId);
      var n=scen.nodes[currentNodeId]; if(n && n.type!=='decision' && n.next){ renderScenarioNode(n.next); }
      window.scrollTo(0,0);
  ` },
  { name: '09-debrief', setup: `
      ${BASE_SETUP} startScenario('egpd-search-seizure');
      scenarioPath = [
        { decisionNumber:1, question:'', choiceText:'Secured the scene and requested a warrant', quality:'good', outcomeClass:'outcome-good' },
        { decisionNumber:2, question:'', choiceText:'Documented consent on the department form', quality:'good', outcomeClass:'outcome-good' },
        { decisionNumber:3, question:'', choiceText:'Extended the stop without new suspicion', quality:'bad', outcomeClass:'outcome-bad' }
      ];
      showDebrief(); window.scrollTo(0,0);
  ` },
  { name: '10-quiz-question', setup: `${BASE_SETUP} startQuiz('egpd-search-seizure'); window.scrollTo(0,0);` },
  { name: '11-quiz-feedback', setup: `
      ${BASE_SETUP} startQuiz('egpd-search-seizure');
      var q=activeQuestions(currentModule)[0]; selectAnswer(q.correct); window.scrollTo(0,0);
  ` },
  { name: '12-results-pass', setup: `
      ${BASE_SETUP} currentModule = MODULES.find(function(m){return m.id==='egpd-search-seizure';});
      quizCorrect=11; quizTotal=12; quizSeconds=862; currentQuizIdx=12;
      delete completionData['EGPD-DEMO']['egpd-search-seizure'];
      finishQuiz(); window.scrollTo(0,0);
  ` },
  { name: '13-reference-glossary', setup: `${BASE_SETUP} showOfficerDashboard(); openGlossary(); window.scrollTo(0,0);` },
  { name: '14-policy-modal', setup: `${BASE_SETUP} showOfficerDashboard(); openPolicyModal(); window.scrollTo(0,0);` },
  { name: '15-feedback-modal', setup: `${BASE_SETUP} showOfficerDashboard(); openFeedbackModal(); window.scrollTo(0,0);` },
  { name: '16-admin-dashboard', setup: `${BASE_SETUP} ${ADMIN_SETUP} showScreen('screen-admin'); renderAdminDashboard(); window.scrollTo(0,0);` },
  { name: '17-admin-modules', setup: `
      ${BASE_SETUP} ${ADMIN_SETUP} showScreen('screen-admin'); renderAdminDashboard();
      document.querySelectorAll('.admin-tab').forEach(function(t){t.classList.remove('active'); if(/module/i.test(t.textContent)) t.classList.add('active');});
      document.getElementById('admin-tab-compliance').classList.add('hidden');
      document.getElementById('admin-tab-citations').classList.add('hidden');
      document.getElementById('admin-tab-feedback').classList.add('hidden');
      document.getElementById('admin-tab-modules').classList.remove('hidden');
      window.scrollTo(0,0);
  ` }
];

// ── CDP helpers ──────────────────────────────────────────────────
let msgId = 0;
const pending = new Map();
function attach(ws) {
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data.toString());
    if (m.id && pending.has(m.id)) {
      const { resolve, reject, method } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? reject(new Error(method + ': ' + m.error.message)) : resolve(m.result);
    }
  });
}
function send(ws, method, params = {}) {
  const id = ++msgId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject, method });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function getPageTarget() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json`);
      const list = await res.json();
      const page = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch {}
    await sleep(250);
  }
  throw new Error('No page target from Chrome');
}

// ── main ─────────────────────────────────────────────────────────
// NB: do NOT pass --disable-gpu here — with --headless=new on recent Chrome it
// deadlocks Page.captureScreenshot (compositor never commits a frame).
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`,
  '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  `--user-data-dir=/tmp/egpd-cdp-${Date.now()}`,
  `--window-size=${W},${H}`,
  APP_URL
], { stdio: 'ignore', detached: true });
chrome.unref();

process.on('exit', () => { try { process.kill(-chrome.pid); } catch {} });

const target = await getPageTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
attach(ws);

await send(ws, 'Page.enable');
await send(ws, 'Runtime.enable');
await send(ws, 'Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: SCALE, mobile: false });

// wait until app + content fully loaded
for (let i = 0; i < 60; i++) {
  const r = await send(ws, 'Runtime.evaluate', { expression: `(typeof MODULES!=='undefined' && MODULES.length>=12 && typeof showOfficerDashboard==='function') ? MODULES.length : 0`, returnByValue: true });
  if (r.result.value) break;
  await sleep(250);
}

const RESET = `['policy-modal-overlay','feedback-modal-overlay','glossary-overlay'].forEach(function(id){var e=document.getElementById(id); if(e) e.classList.remove('open');});`;

for (const s of SCREENS) {
  const evalRes = await send(ws, 'Runtime.evaluate', {
    expression: `(function(){ try { ${RESET} ${s.setup} return 'ok'; } catch(e){ return 'ERR: '+e.message; } })()`,
    returnByValue: true
  });
  await sleep(450); // allow render + transitions
  // clip scale stays 1 — the 2× retina factor already comes from the device-metrics
  // override above. (scale:SCALE here would multiply again → 4× / oversized files.)
  const shot = await send(ws, 'Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: W, height: H, scale: 1 } });
  writeFileSync(OUT + s.name + '.png', Buffer.from(shot.data, 'base64'));
  console.log(`${s.name}  ->  ${evalRes.result.value}`);
}

ws.close();
chrome.kill();

// Downscale the 2× retina captures to 1600px wide for a print-crisp but
// email-friendly PDF (keeps the final guide ~4 MB instead of ~8). sips ships
// with macOS; high-quality Lanczos resample.
for (const f of readdirSync(OUT).filter(n => n.endsWith('.png'))) {
  execFileSync('/usr/bin/sips', ['-Z', '1600', OUT + f], { stdio: 'ignore' });
}
console.log('DONE  -> ' + OUT);
