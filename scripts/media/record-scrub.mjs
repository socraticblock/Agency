#!/usr/bin/env node
/**
 * Record the scroll-scrub hero as a video.
 *
 * This is the artifact the owner can actually WATCH: the real page, the real
 * DOM panels, the real scroll, the real layer. Not the layer alone.
 *
 * It is an EMULATED viewport (headless Chromium at a desktop size), so it is
 * evidence of the choreography, not of device performance.
 *
 * Run: node scripts/media/record-scrub.mjs <base-url> <out-file> [layer]
 */

import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const require = createRequire(import.meta.url);
const PW = require("/home/socraticblock/.hermes/hermes-agent/node_modules/playwright");
const CHROME = "/home/socraticblock/.hermes/tools/chromium-1208/chrome-linux64/chrome";

const BASE = process.argv[2] || "http://127.0.0.1:3311";
const OUT = process.argv[3] || "/tmp/scrub-recording.webm";
const LAYER = process.argv[4];
mkdirSync(dirname(OUT), { recursive: true });

const URL = `${BASE}/en/scroll-preview${LAYER ? `?layer=${LAYER}` : ""}`;

const browser = await PW.chromium.launch({
  executablePath: CHROME,
  args: ["--hide-scrollbars", "--disable-gpu", "--force-device-scale-factor=1"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 810 },
  recordVideo: { dir: dirname(OUT), size: { width: 1440, height: 810 } },
});
const page = await context.newPage();

await page.goto(URL, { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(3000);

const height = await page.evaluate(() => document.body.scrollHeight);
const max = height - 810;
console.log("page height", height, "scrollable", max);

// Scroll with REAL input, not window.scrollTo.
//
// A programmatic scrollTo moves the DOM but does not reliably produce a new
// compositor frame, and Playwright's video encoder only records painted
// frames: the recording came out FROZEN on a single state while the page
// itself was demonstrably changing. mouse.wheel() dispatches real input
// events, which do produce frames — so the video matches what a reader sees.
await page.mouse.move(720, 400);
const STEPS = 26;
for (let i = 0; i <= STEPS; i++) {
  await page.mouse.wheel(0, Math.ceil(max / STEPS));
  await page.waitForTimeout(420);
}
// Hold on the resolution frame.
await page.waitForTimeout(1500);

await context.close();
await browser.close();

const { readdirSync } = await import("node:fs");
const dir = dirname(OUT);
const files = readdirSync(dir).filter((f) => f.endsWith(".webm"));
const newest = files
  .map((f) => ({ f, t: require("node:fs").statSync(`${dir}/${f}`).mtimeMs }))
  .sort((a, b) => b.t - a.t)[0];
console.log("recorded:", newest.f);
console.log("OUTPUT:", `${dir}/${newest.f}`);
