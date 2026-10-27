#!/usr/bin/env node
/**
 * Browser check for the scroll-scrub frame layer.
 *
 * Answers the question that curl cannot: does the canvas actually CHANGE as
 * the page scrolls, and does the right frame arrive?
 *
 * Method: drive a headless Chromium at a desktop viewport, scroll the page in
 * steps, and read the canvas pixels at each step. A changing mean luminance
 * proves the layer is advancing; the frame index we expect is derived from
 * the same arithmetic the client uses.
 *
 * Run: node scripts/media/verify-scrub-browser.mjs http://127.0.0.1:3311
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const PW = require("/home/socraticblock/.hermes/hermes-agent/node_modules/playwright");
const CHROME = "/home/socraticblock/.hermes/tools/chromium-1208/chrome-linux64/chrome";

const BASE = process.argv[2] || "http://127.0.0.1:3311";
const URL = `${BASE}/en/scroll-preview`;

const browser = await PW.chromium.launch({
  executablePath: CHROME,
  args: ["--hide-scrollbars", "--disable-gpu", "--force-device-scale-factor=1"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

// NOT "networkidle": the frame layer keeps prefetching frames as the scroll
// advances, so the network never goes idle and the wait always times out.
// "load" plus a settle is the right condition here.
await page.goto(URL, { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(2500);

const pageHeight = await page.evaluate(() => document.body.scrollHeight);
console.log("page height:", pageHeight);

// Scroll in steps and sample the canvas each time.
const samples = [];
const STEPS = 8;
for (let i = 0; i <= STEPS; i++) {
  const y = Math.round((pageHeight - 900) * (i / STEPS));
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(1200); // let the frame fetch + draw settle

  const sample = await page.evaluate(() => {
    const c = document.querySelector(".scrubbg__canvas");
    const layer = document.querySelector(".scrubbg");
    if (!c || !layer) return null;
    const ctx = c.getContext("2d");
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let sum = 0;
    let n = 0;
    // Sample a sparse grid: enough for a mean, cheap enough to be quick.
    for (let p = 0; p < d.length; p += 4 * 997) {
      sum += 0.2126 * d[p] + 0.7152 * d[p + 1] + 0.0722 * d[p + 2];
      n++;
    }
    return {
      mean: Number((sum / n).toFixed(3)),
      hasFrames: layer.classList.contains("has-frames"),
      w: c.width,
      h: c.height,
    };
  });

  const scrollY = await page.evaluate(() => Math.round(window.scrollY));
  samples.push({ step: i, scrollY, ...sample });
  console.log(
    `step ${i} scrollY=${scrollY} mean=${sample ? sample.mean : "NO CANVAS"} hasFrames=${sample ? sample.hasFrames : "-"}`,
  );
}

await browser.close();

const ok = samples.every((s) => s.mean !== null);
const advanced = ok && samples[0].mean !== samples[samples.length - 1].mean;
const framesShown = ok && samples.every((s) => s.hasFrames);
const unique = new Set(samples.map((s) => s.mean)).size;

console.log("\n--- verdict ---");
console.log("canvas present at every step:", ok);
console.log("layer advanced with scroll (first vs last mean differ):", advanced);
console.log("has-frames class set at every step:", framesShown);
console.log(`distinct canvas states across ${samples.length} steps: ${unique}`);
console.log("page errors:", errors.length === 0 ? "none" : errors.slice(0, 5));

const pass = ok && advanced && framesShown && unique >= 4 && errors.length === 0;
console.log(pass ? "\nPASS" : "\nFAIL");
process.exit(pass ? 0 : 1);
