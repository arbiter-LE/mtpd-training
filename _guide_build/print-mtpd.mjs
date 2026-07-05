/* Render guide-mtpd.html -> PDF. Build-time tool — not deployed.
   MTPD (navy/steel/gold default theme).

   NB: this uses Chrome's command-line `--print-to-pdf` rather than the CDP
   Page.printToPDF call. On recent Chrome (149+/macOS) the CDP path hangs
   indefinitely (compositor never returns the PDF), while the CLI path is
   reliable. Trade-off: no CDP custom header/footer, so page numbering is
   omitted — the cover and document footer live in the HTML itself. */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HTML = pathToFileURL(fileURLToPath(new URL('./guide-mtpd.html', import.meta.url))).href;
const OUT = fileURLToPath(new URL('./MTPD-Training-Platform-User-Guide.pdf', import.meta.url));

const child = spawn(CHROME, [
  '--headless=new', '--no-first-run', '--no-default-browser-check',
  `--user-data-dir=/tmp/mtpd-pdf-${Date.now()}`,
  '--no-pdf-header-footer',
  `--print-to-pdf=${OUT}`,
  HTML
], { stdio: 'ignore' });

const code = await new Promise(res => child.on('exit', res));
if (!(existsSync(OUT) && statSync(OUT).size > 0)) {
  console.error(`FAILED (chrome exit ${code}) — no PDF written`);
  process.exit(1);
}

// Stamp the running footer (the CLI print path can't add one itself).
const STAMP = fileURLToPath(new URL('./stamp-footer.py', import.meta.url));
spawnSync('python3', [STAMP, OUT, 'Arbiter LE  ·  Marlborough Township PD — Training Platform User Guide'], { stdio: 'inherit' });

console.log(`PDF -> ${OUT} (${(statSync(OUT).size/1024/1024).toFixed(1)} MB)`);
process.exit(0);
