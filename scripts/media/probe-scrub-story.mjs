#!/usr/bin/env node
/**
 * Probe the FOREGROUND story across the scroll, not just the background layer.
 *
 * The scrub is only right if the DOM story and the footage advance together.
 * This reads the opacity of every story panel at each scroll position and
 * reports which are visible, so a panel that never appears (or stays stuck)
 * is caught rather than assumed.
 *
 * Run: node scripts/media/probe-scrub-story.mjs <base-url>
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const PW = require("/home/socraticblock/.hermes/hermes-agent/node_modules/playwright");
const CHROME = "/home/socraticblock/.hermes/tools/chromium-1208/chrome-linux64/chrome";

const BASE = process.argv[2] || "http://127.0.0.1:3311";

const browser = await PW.chromium.launch({
  executablePath: CHROME,
  args: ["--hide-scrollbars", "--disable-gpu", "--force-device-scale-factor=1"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/en/scroll-preview`, { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(2500);

const height = await page.evaluate(() => document.body.scrollHeight);
const STEPS = 8;

for (let i = 0; i <= STEPS; i++) {
  const y = Math.round((height - 900) * (i / STEPS));
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(1000);

  const r = await page.evaluate(() => {
    const names = [
      "intro",
      "surface",
      "enquiry",
      "system",
      "action",
      "owner",
      "resolved",
    ];
    const visible = [];
    for (const n of names) {
      const el = document.querySelector(`[data-hero-${n}]`);
      if (!el) continue;
      const cs = getComputedStyle(el);
      const op = parseFloat(cs.opacity);
      if (op > 0.05) visible.push(`${n}:${op.toFixed(2)}`);
    }
    // The signal's drawn path length, from its stroke-dashoffset.
    const active = document.querySelector("[data-signal-active]");
    const review = document.querySelector("[data-review-active]");
    const off = active
      ? parseFloat(active.getAttribute("stroke-dashoffset") ?? "1")
      : 1;
    const roff = review
      ? parseFloat(review.getAttribute("stroke-dashoffset") ?? "1")
      : 1;
    const canvas = document.querySelector(".scrubbg__canvas");
    let mean = null;
    if (canvas) {
      const d = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
      let s = 0;
      let n = 0;
      for (let p = 0; p < d.length; p += 4 * 997) {
        s += 0.2126 * d[p] + 0.7152 * d[p + 1] + 0.0722 * d[p + 2];
        n++;
      }
      mean = Number((s / n).toFixed(2));
    }
    return { visible, off, roff, mean };
  });

  console.log(
    `step ${i} y=${y} canvas=${r.mean} panels=[${r.visible.join(" ") || "none"}] ` +
      `route=${(1 - r.off).toFixed(2)} review=${(1 - r.roff).toFixed(2)}`,
  );
}

await browser.close();
