#!/usr/bin/env node
/**
 * Which frame files does the browser actually request?
 *
 * Two scrub layers ship side by side (3D and flat). Aggregate canvas
 * luminance is close enough between them that a luminance comparison cannot
 * tell them apart — so this records the REQUESTED URLS, which are unambiguous.
 *
 * Run: node scripts/media/probe-layer-requests.mjs <base-url> [layer]
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const PW = require("/home/socraticblock/.hermes/hermes-agent/node_modules/playwright");
const CHROME = "/home/socraticblock/.hermes/tools/chromium-1208/chrome-linux64/chrome";

const BASE = process.argv[2] || "http://127.0.0.1:3311";
const LAYER = process.argv[3];
const URL = `${BASE}/en/scroll-preview${LAYER ? `?layer=${LAYER}` : ""}`;

const browser = await PW.chromium.launch({
  executablePath: CHROME,
  args: ["--hide-scrollbars", "--disable-gpu", "--force-device-scale-factor=1"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const requested = [];
page.on("request", (r) => {
  const u = r.url();
  if (u.includes("/media/scrub-frames")) requested.push(u.split("/media/")[1]);
});

await page.goto(URL, { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(2500);
const height = await page.evaluate(() => document.body.scrollHeight);
for (let i = 0; i <= 4; i++) {
  await page.evaluate((yy) => window.scrollTo(0, yy), Math.round((height - 900) * (i / 4)));
  await page.waitForTimeout(1200);
}

await browser.close();

const dirs = new Set(requested.map((u) => u.split("/")[0]));
console.log("url:", URL);
console.log("requested frame files:", requested.length);
console.log("directories used:", [...dirs].join(", ") || "(none)");
console.log("first 6:", requested.slice(0, 6).join(", "));
console.log("last 4:", requested.slice(-4).join(", "));

const expected = LAYER === "flat" ? "scrub-frames-flat" : "scrub-frames";
const ok = dirs.size === 1 && [...dirs][0] === expected;
console.log(ok ? `\nPASS (expected ${expected})` : `\nFAIL (expected ${expected})`);
process.exit(ok ? 0 : 1);
