/* Render leave-behind.html -> PDF via headless Chrome (DevTools Page.printToPDF).
   Build-time tool — client-facing leave-behind, review before sending.
   Output lands at repo root as the dated chief leave-behind. */
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HTML = pathToFileURL(fileURLToPath(new URL('./leave-behind.html', import.meta.url))).href;
const OUT = fileURLToPath(new URL('../2026-07-10-arbiter-le-chief-leave-behind.pdf', import.meta.url));
const PORT = 9351;

let msgId = 0; const pending = new Map();
function attach(ws){ ws.addEventListener('message', e => { const m = JSON.parse(e.data.toString()); if (m.id && pending.has(m.id)){ const {resolve,reject,method}=pending.get(m.id); pending.delete(m.id); m.error?reject(new Error(method+': '+m.error.message)):resolve(m.result);} }); }
function send(ws, method, params={}){ const id=++msgId; return new Promise((resolve,reject)=>{ pending.set(id,{resolve,reject,method}); ws.send(JSON.stringify({id,method,params})); }); }

async function getPageTarget(){
  for (let i=0;i<40;i++){ try{ const r=await fetch(`http://127.0.0.1:${PORT}/json`); const list=await r.json(); const p=list.find(t=>t.type==='page'&&t.webSocketDebuggerUrl); if(p) return p; }catch{} await sleep(250);}
  throw new Error('no page target');
}

const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--user-data-dir=/tmp/leavebehind-pdf-${Date.now()}`, HTML], { stdio:'ignore' });
process.on('exit', ()=>chrome.kill());

const target = await getPageTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r,j)=>{ ws.onopen=r; ws.onerror=j; });
attach(ws);
await send(ws,'Page.enable');
await sleep(1200);

const footer = `<div style="font-size:8px;width:100%;padding:0 0.5in;color:#5a7a92;display:flex;justify-content:space-between;align-items:center;font-family:Arial">
  <span>arbiterle.com &nbsp;·&nbsp; andrew@arbiterle.com</span>
  <span style="letter-spacing:1px">FOR AGENCY USE — PRICING SUBJECT TO CHANGE</span>
  <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
</div>`;
const header = `<div></div>`;

const { data } = await send(ws,'Page.printToPDF',{
  printBackground:true, paperWidth:8.5, paperHeight:11,
  marginTop:0.45, marginBottom:0.6, marginLeft:0.5, marginRight:0.5,
  displayHeaderFooter:true, headerTemplate:header, footerTemplate:footer,
  preferCSSPageSize:false
});
writeFileSync(OUT, Buffer.from(data,'base64'));
ws.close(); chrome.kill();
console.log('PDF -> '+OUT);
