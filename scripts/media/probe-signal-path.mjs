#!/usr/bin/env node
/**
 * Is the main signal route actually drawing?
 *
 * The story probe showed `route=0.00` at every scroll position while the
 * review branch went to 1.00 — so either the route's dashoffset never
 * changes, or the attribute IS changing and something else hides it.
 *
 * This reads the attribute AND the computed style at each step. If the
 * attribute moves but the computed style does not, a CSS rule is overriding
 * the presentation attribute.
 *
 * Run: node scripts/media/probe-signal-path.mjs <base-url>
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
  await page.waitForTimeout(900);

  const r = await page.evaluate(() => {
    const read = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return { missing: true };
      const cs = getComputedStyle(el);
      return {
        attr: el.getAttribute("stroke-dashoffset"),
        computed: cs.strokeDashoffset,
        dasharray: cs.strokeDasharray,
        opacity: cs.opacity,
        visibility: cs.visibility,
        stroke: cs.stroke,
        pathLength: el.getAttribute("pathLength"),
      };
    };
    return {
      active: read("[data-signal-active]"),
      review: read("[data-review-active]"),
      base: read("[data-signal-path]"),
    };
  });

  const fmt = (o) =>
    o.missing
      ? "MISSING"
      : `attr=${o.attr} computed=${o.computed} op=${o.opacity} vis=${o.visibility}`;
  console.log(`step ${i} y=${y}`);
  console.log(`   active : ${fmt(r.active)}`);
  console.log(`   review : ${fmt(r.review)}`);
  console.log(`   base   : ${fmt(r.base)}`);
}

await browser.close();
