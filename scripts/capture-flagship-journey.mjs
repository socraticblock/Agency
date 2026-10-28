/**
 * Optional, explicitly run: capture genuine public website pages for the
 * Genezisi flagship tour. No third-party screenshot service or browser library.
 * Node 22+ (built-in WebSocket), a local Chrome/Chromium executable, network access.
 *
 * Run from repository root:
 *   node scripts/capture-flagship-journey.mjs
 *   CHROME_BIN=/path/to/chrome node scripts/capture-flagship-journey.mjs
 *
 * Only public URLs on the allowlist are captured. Review every generated image
 * before committing; do not capture private/personal data or authenticated UI.
 */
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'public/flagship-journey/captures');
const browserBin = process.env.CHROME_BIN || process.env.CHROMIUM_BIN || 'chromium';
const sources = [
  ['tk-counsel-full.png', 'https://tkcounsel.com/'],
  ['socraticblock-full.png', 'https://www.socraticblock.com/'],
];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function capture(name, url) {
  const profile = await mkdtemp(path.join(os.tmpdir(), 'genezisi-capture-'));
  const proc = spawn(browserBin, ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars', '--no-first-run', '--disable-background-networking', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
  const pending = new Map(); let socket;
  try {
    let port;
    for (let i = 0; i < 100; i++) {
      if (proc.exitCode !== null) throw new Error('Chromium exited before opening DevTools');
      try { port = Number((await readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]); break; }
      catch { await sleep(100); }
    }
    if (!port) throw new Error('Chrome DevTools port unavailable');
    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const target = targets.find(x => x.type === 'page');
    if (!target?.webSocketDebuggerUrl) throw new Error('No browser page target');
    socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true });
      socket.addEventListener('error', reject, { once: true });
    });
    socket.addEventListener('message', e => {
      const message = JSON.parse(e.data);
      if (!message.id) return;
      const p = pending.get(message.id); if (!p) return;
      pending.delete(message.id);
      if (message.error) p.reject(new Error(message.error.message));
      else p.resolve(message.result);
    });
    let id = 0;
    const cdp = (method, params = {}) => new Promise((resolve, reject) => {
      const key = ++id; pending.set(key, { resolve, reject });
      socket.send(JSON.stringify({ id: key, method, params }));
    });
    await cdp('Page.enable');
    await cdp('Runtime.enable');
    await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    const navigation = await cdp('Page.navigate', { url });
    if (navigation.errorText) throw new Error(navigation.errorText);
    // Public content only, blank profile. Allow page fonts/images to settle.
    for (let i = 0; i < 45; i++) {
      const ready = await cdp('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true });
      if (ready.result.value === 'complete') break;
      await sleep(300);
    }
    await cdp('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true, returnByValue: true });
    await sleep(900);
    const metrics = await cdp('Page.getLayoutMetrics');
    const height = Math.ceil(metrics.cssContentSize.height);
    if (height < 650 || height > 16000) throw new Error(`Unexpected page height ${height}; review before capture`);
    const { data } = await cdp('Page.captureScreenshot', {
      format: 'png', fromSurface: true, captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: 1440, height, scale: 1 },
    });
    const bytes = Buffer.from(data, 'base64');
    if (bytes.length < 25000) throw new Error('Suspiciously small screenshot; inspect site or browser policy');
    await mkdir(output, { recursive: true });
    await writeFile(path.join(output, name), bytes);
    console.log(`${name}: ${height}px tall, ${(bytes.length / 1024 / 1024).toFixed(2)} MiB`);
  } finally {
    if (socket && socket.readyState === WebSocket.OPEN) socket.close();
    proc.kill('SIGTERM');
    await sleep(250);
    if (proc.exitCode === null) proc.kill('SIGKILL');
    await rm(profile, { recursive: true, force: true });
  }
}
for (const [name, url] of sources) {
  try { await capture(name, url); }
  catch (error) { console.error(`${name}: ${error.message}`); process.exitCode = 1; }
}