/* Marketing-site screenshots of a FICTIONAL "Sample Police Department".
   Build-time tool — not deployed (_guide_build is in .vercelignore); the
   output images go to Marketing/shots/ and ARE public.

   Rules (Andrew, 2026-11-19):
   - No real agency's branding, roster, or training content. Department
     content is never loaded: MODULES, the roster, the decision data, and the
     orders below are all invented sample data, and every image on the site
     is labeled "Sample data".
   - Sample orders are titled "Sample PD G.O. …" so no one mistakes them for
     a real agency's directives.
   Needs the dev server from .claude/launch.json ("static-preview", :4173). */

import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const APP_URL = 'http://localhost:4173/?dept=mtpd'; // shell only; no content is loaded
const OUT = fileURLToPath(new URL('../Marketing/shots/', import.meta.url));
const PORT = 9341;
const W = 1280, H = 820, SCALE = 2;
mkdirSync(OUT, { recursive: true });

// ── fictional department, modules, roster ────────────────────────
const SAMPLE = `
  stopAllTimers();
  window.MODULES = window.MODULES || [];
  ACTIVE_DEPARTMENT.displayName = 'Sample Police Department';
  ACTIVE_DEPARTMENT.shortName = 'Sample PD';
  ACTIVE_DEPARTMENT.name = 'Sample Police Department';
  ACTIVE_DEPARTMENT.scheduleStart = new Date('2026-08-03T00:00:00');
  ACTIVE_DEPARTMENT.features = Object.assign({}, ACTIVE_DEPARTMENT.features, { decisionInsights: true, refresher: false, dueDateReminders: true });
  document.querySelectorAll('.nav-brand img').forEach(function(i){ i.src = 'assets/arbiter-seal.png'; i.alt = 'Sample PD'; });
  document.querySelectorAll('.nav-brand .brand-text span').forEach(function(e){ e.textContent = 'Sample Police Department'; });
  _refresherState = 'done';
  var dec = function(n, q, opts){ return { type:'decision', decisionNumber:n, question:q, options: opts.map(function(o){ return { text:o[0], shortLabel:o[0], quality:o[1], next:'end' }; }) }; };
  MODULES.length = 0;
  [
    ['s-search',   'Search & Seizure',              'Constitutional Law', 'Warrant requirements, consent, and documenting the basis for every search.'],
    ['s-force',    'Use of Force',                  'Use of Force',       'Objective reasonableness, de-escalation, and force reporting under department policy.'],
    ['s-reports',  'Report Writing',                'Documentation',      'Facts over conclusions: narratives that hold up in review and in court.'],
    ['s-crisis',   'Crisis Intervention',           'Crisis Response',    'Recognizing crisis, slowing the encounter down, and documenting the outcome.'],
    ['s-dv',       'Domestic Violence Response',    'Domestic Violence',  'Scene safety, victim notifications, and required documentation.'],
    ['s-pursuit',  'Vehicle Pursuits',              'Traffic & Pursuits', 'Initiation, continuous risk evaluation, and termination criteria.'],
    ['s-evidence', 'Evidence & Chain of Custody',   'Investigations',     'Documenting in place, packaging, and an unbroken chain.'],
    ['s-wellness', 'Officer Wellness',              'Wellness',           'Recognizing stress injury and knowing where to turn.']
  ].forEach(function(r, i){ MODULES.push({ id:r[0], title:r[1], category:r[2], description:r[3], duration:'15–20 min', weekNumber:i+1, questions:[] }); });
  var M = function(id){ return MODULES.find(function(m){ return m.id===id; }); };
  M('s-reports').scenario  = { title:'Sample scenario', location:'Sample', totalDecisions:1, nodes:{ d1: dec(1, 'Your use-of-force report is due before end of shift. How do you write the narrative?', [['Specific actions, sequence, and times','good'],['Conclusions only — "subject resisted"','bad'],['Short summary; details only if asked','risky'],['Partner writes it for both officers','bad']]) } };
  M('s-evidence').scenario = { title:'Sample scenario', location:'Sample', totalDecisions:1, nodes:{ d2: dec(2, 'You find a knife in the yard at a disturbance call. What do you do first?', [['Photograph and note it in place','good'],['Bag it right away to protect it','bad'],['Leave it for the detective unit','risky']]) } };
  M('s-crisis').scenario   = { title:'Sample scenario', location:'Sample', totalDecisions:1, nodes:{ d1: dec(1, 'The subject is agitated but not threatening anyone. What is your first move?', [['Slow down, create space, speak calmly','good'],['Give firm commands right away','risky'],['Wait in the car for backup','neutral']]) } };
`;

const OFFICER = `
  currentUser = { id:'SPD-114', name:'Ofc. J. Carter', rank:'Patrol Officer', role:'officer', track:'patrol', badge:'SPD-114', email:'sample@example.gov' };
  completionData['SPD-114'] = {
    's-search': { attempts:1, passed:true, bestScore:92, score:92, date:'2026-08-12', time:'14:20' },
    's-force':  { attempts:2, passed:true, bestScore:88, score:88, date:'2026-08-26', time:'17:05' }
  };
  ['officer-name-display','module-officer-name','scenario-officer-name','quiz-officer-name','debrief-officer-name'].forEach(function(id){ var e=document.getElementById(id); if(e) e.textContent=currentUser.name; });
  document.getElementById('officer-badge-display').textContent = 'Badge #SPD-114';
`;

const ADMIN = `
  currentUser = { id:'SPD-001', name:'Chief R. Sample', rank:'Chief of Police', role:'admin', track:'supervisor', badge:'SPD-001', email:'chief@example.gov' };
  Object.keys(USERS).forEach(function(k){ delete USERS[k]; });
  var roster = [
    ['SPD-114','Ofc. J. Carter','Patrol Officer',   [92,88,95,90,84,91,89]],
    ['SPD-121','Ofc. A. Moreno','Patrol Officer',   [85,79,91,88,90,86]],
    ['SPD-108','Sgt. L. Brennan','Sergeant',        [97,95,100,93,96,94,98,92]],
    ['SPD-130','Ofc. T. Nguyen','Patrol Officer',   [81,74,88,90]],
    ['SPD-126','Cpl. D. Walsh','Corporal',          [90,93,87,91,89,95,92]],
    ['SPD-133','Ofc. K. Price','Patrol Officer',    [78,62,85]],
    ['SPD-117','Ofc. M. Ortiz','Patrol Officer',    [94,90,92,88,91]],
    ['SPD-139','Ofc. B. Hale','Patrol Officer',     [88,84]],
    ['SPD-102','Lt. S. Romano','Lieutenant',        [96,98,94,97,95,99,93,96]]
  ];
  roster.forEach(function(r){
    USERS[r[0]] = { id:r[0], name:r[1], rank:r[2], role:'officer', track:'patrol', badge:r[0], email:r[0].toLowerCase()+'@example.gov' };
    completionData[r[0]] = {};
    r[3].forEach(function(sc, i){ var m = MODULES[i]; completionData[r[0]][m.id] = { attempts: sc>=70?1:2, passed: sc>=70, bestScore:sc, score:sc, remediation:false, date:'2026-'+(i<4?'09':'10')+'-'+String(4+i*3).padStart(2,'0'), time:'15:10' }; });
  });
  document.getElementById('admin-name-display').textContent = currentUser.name;
  document.getElementById('admin-rank-display').textContent = currentUser.rank;
  // Sample citations: fictional "Sample PD G.O." titles only.
  var cites = document.getElementById('dept-citations');
  document.querySelectorAll('#admin-tab-citations .cite-module-section').forEach(function(e){ e.remove(); });
  var go = { 1:['Sample PD G.O. 1.2 — Searches and Seizures','Sample PD G.O. 1.4 — Consent Documentation'], 2:['Sample PD G.O. 2.1 — Use of Force','Sample PD G.O. 2.3 — Force Reporting'], 3:['Sample PD G.O. 3.4 — Report Submission'], 4:['Sample PD G.O. 5.4 — De-escalation'], 5:['Sample PD G.O. 4.13 — Domestic Violence'], 6:['Sample PD G.O. 4.02 — Vehicle Pursuits'], 7:['Sample PD G.O. 3.05 — Property and Evidence'], 8:['Sample PD G.O. 6.1 — Peer Support'] };
  cites.insertAdjacentHTML('beforebegin', MODULES.map(function(m){ return '<div class="cite-module-section"><div class="cite-module-header">Module '+m.weekNumber+' — '+m.title+'</div><table class="cite-table"><tbody>'+(go[m.weekNumber]||[]).map(function(t){ return '<tr data-type="go"><td class="cite-name">'+t+'</td><td></td><td></td></tr>'; }).join('')+'</tbody></table></div>'; }).join(''));
  // Sample aggregate decision data (what decision_insights() would return).
  var rows = [
    ['s-reports','d1',[[0,'good',4],[1,'bad',3],[2,'risky',2],[3,'bad',0]],9],
    ['s-evidence','d2',[[0,'good',6],[1,'bad',2],[2,'risky',1]],9],
    ['s-crisis','d1',[[0,'good',8],[1,'risky',1],[2,'neutral',0]],9]
  ];
  var data = [];
  rows.forEach(function(r){ r[2].forEach(function(o){ if (o[2] > 0) data.push({ module_id:r[0], track:'patrol', scenario_key:'scenario', node_id:r[1], option_index:o[0], quality:o[1], chose:o[2], reached:r[3] }); }); });
  _sb.rpc = function(){ return Promise.resolve({ data: data, error: null }); };
`;

const TAB = (name) => `
  document.querySelectorAll('.admin-tab').forEach(function(t){ t.classList.remove('active'); });
  ['compliance','modules','citations','feedback','insights'].forEach(function(t){ var e=document.getElementById('admin-tab-'+t); if(e) e.classList.toggle('hidden', t!=='${name}'); });
  var btn = [].find.call(document.querySelectorAll('.admin-tab'), function(t){ return t.getAttribute('aria-controls')==='admin-tab-${name}'; }); if (btn) btn.classList.add('active');
`;

const SCREENS = [
  { name: 'officer-dashboard', setup: `${SAMPLE} ${OFFICER} showOfficerDashboard(); window.scrollTo(0,0);` },
  { name: 'command-roster', setup: `${SAMPLE} ${ADMIN} showScreen('screen-admin'); renderAdminDashboard(); window.scrollTo(0,0);` },
  { name: 'decision-insights', setup: `${SAMPLE} ${ADMIN} showScreen('screen-admin'); renderAdminDashboard(); ${TAB('insights')} renderDecisionInsights(); setTimeout(function(){ window.scrollTo(0, document.getElementById('admin-tab-insights').getBoundingClientRect().top + scrollY - 92); }, 150);` },
  { name: 'evidence-packet', setup: `${SAMPLE} ${ADMIN} showScreen('screen-admin'); renderAdminDashboard(); openEvidenceModal();
      document.getElementById('evidence-from').value='2026-08-03'; document.getElementById('evidence-to').value='2026-11-19';
      var html=''; window.open=function(){ return { document: { write:function(h){ html+=h; }, close:function(){} } }; }; openEvidencePacket();
      html = html.replace('window.onload = function () { window.print(); };','');
      document.open(); document.write(html); document.close(); window.scrollTo(0,0);` },
];

// ── CDP plumbing (same approach as capture.mjs) ──────────────────
let msgId = 0; const pending = new Map();
function attach(ws) { ws.addEventListener('message', (e) => { const m = JSON.parse(e.data.toString()); if (m.id && pending.has(m.id)) { const { resolve, reject, method } = pending.get(m.id); pending.delete(m.id); m.error ? reject(new Error(method + ': ' + m.error.message)) : resolve(m.result); } }); }
function send(ws, method, params = {}) { const id = ++msgId; return new Promise((resolve, reject) => { pending.set(id, { resolve, reject, method }); ws.send(JSON.stringify({ id, method, params })); }); }
async function getPageTarget() { for (let i = 0; i < 40; i++) { try { const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); const p = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl); if (p) return p; } catch {} await sleep(250); } throw new Error('No page target from Chrome'); }

const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', `--user-data-dir=/tmp/arb-mkt-${Date.now()}`, `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore', detached: true });
chrome.unref();
process.on('exit', () => { try { process.kill(-chrome.pid); } catch {} });

const ws = new WebSocket((await getPageTarget()).webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
attach(ws);
await send(ws, 'Page.enable'); await send(ws, 'Runtime.enable');
await send(ws, 'Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: SCALE, mobile: false });

for (const s of SCREENS) {
  // Fresh page per screen: the packet screen replaces the document.
  await send(ws, 'Page.navigate', { url: APP_URL });
  for (let i = 0; i < 60; i++) {
    const r = await send(ws, 'Runtime.evaluate', { expression: `typeof renderAdminDashboard==='function' && typeof _sb!=='undefined' && !!_sb`, returnByValue: true });
    if (r.result.value) break; await sleep(250);
  }
  const res = await send(ws, 'Runtime.evaluate', { expression: `(function(){ try { ${s.setup} return 'ok'; } catch(e){ return 'ERR: '+e.message; } })()`, returnByValue: true });
  await sleep(900);
  // Clip at the current scroll position (clip coordinates are page coordinates).
  const sy = (await send(ws, 'Runtime.evaluate', { expression: 'window.scrollY', returnByValue: true })).result.value || 0;
  const shot = await send(ws, 'Page.captureScreenshot', { format: 'png', clip: { x: 0, y: sy, width: W, height: H, scale: 1 } });
  writeFileSync(OUT + s.name + '.png', Buffer.from(shot.data, 'base64'));
  console.log(`${s.name}  ->  ${res.result.value}`);
}
ws.close(); chrome.kill();

// Web-weight output: 1600px-wide JPEG (crisp on retina at the site's ~800px column).
for (const f of readdirSync(OUT).filter(n => n.endsWith('.png'))) {
  const src = OUT + f, dst = OUT + f.replace(/\.png$/, '.jpg');
  execFileSync('/usr/bin/sips', ['-Z', '1600', '-s', 'format', 'jpeg', '-s', 'formatOptions', '82', src, '--out', dst], { stdio: 'ignore' });
  unlinkSync(src);
}
console.log('DONE  -> ' + OUT);
