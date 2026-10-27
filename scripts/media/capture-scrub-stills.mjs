#!/usr/bin/env node
/**
 * Capture stills of the scroll-scrub layer at several scroll positions.
 *
 * The evidence for the scrub is that the CANVAS changes as the page scrolls.
 * These stills are the visual record of that: the page is scrolled to a
 * position, the layer is given a moment to fetch and draw its frame, and the
 * viewport is captured.
 *
 * Run: node scripts/media/capture-scrub-stills.mjs <base-url> <out-dir>
 */

import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";

const require = createRequire(import.meta.url);
const PW = require("/home/socraticblock/.hermes/hermes-agent/node_modules/playwright");
const CHROME = "/home/socraticblock/.hermes/tools/chromium-1208/chrome-linux64/chrome";

const BASE = process.argv[2] || "http://127.0.0.1:3311";
const OUT = process.argv[3] || "/tmp/scrub-stills";
const LAYER = process.argv[4];
mkdirSync(OUT, { recursive: true });

const browser = await PW.chromium.launch({
  executablePath: CHROME,
  args: ["--hide-scrollbars", "--disable-gpu", "--force-device-scale-factor=1"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(
  `${BASE}/en/scroll-preview${LAYER ? `?layer=${LAYER}` : ""}`,
  { waitUntil: "load", timeout: 60000 },
);
await page.waitForTimeout(2500);

const pageHeight = await page.evaluate(() => document.body.scrollHeight);
const positions = [0, 0.25, 0.5, 0.75, 1].map((f) =>
  Math.round((pageHeight - 900) * f),
);

for (const [i, y] of positions.entries()) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(1800);
  const path = `${OUT}/scrub-${String(i).padStart(2, "0")}.png`;
  await page.screenshot({ path });
  console.log("captured", path, "at scrollY", y);
}

await browser.close();
console.log("done");
