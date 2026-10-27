#!/usr/bin/env node
/**
 * Pure-logic tests for the scroll-scrub frame layer.
 *
 * The frame index is arithmetic on scroll progress, so it is testable without
 * a browser. This checks the three things that would silently break the
 * scrub: the index mapping, the LRU bound, and the nearest-frame fallback
 * that stops the canvas going blank on a fast flick.
 *
 * Run: node scripts/media/test-scrub-frames.mjs
 */

const COUNT = 96;

/** Mirrors ScrubFrames.tsx. */
function indexFor(p, count) {
  return Math.max(0, Math.min(count - 1, Math.round(p * (count - 1))));
}

let failures = 0;
function check(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) {
    failures++;
    console.log(`  FAIL ${name}: got ${JSON.stringify(actual)}, want ${JSON.stringify(expected)}`);
  } else {
    console.log(`  ok   ${name}`);
  }
}

console.log("index mapping");
check("progress 0 -> first frame", indexFor(0, COUNT), 0);
check("progress 1 -> last frame", indexFor(1, COUNT), COUNT - 1);
check("progress 0.5 -> middle", indexFor(0.5, COUNT), 48);
check("progress beyond 1 is clamped", indexFor(1.4, COUNT), COUNT - 1);
check("progress below 0 is clamped", indexFor(-0.2, COUNT), 0);

console.log("monotonicity (a scroll can never jump backwards)");
let mono = true;
let prev = indexFor(0, COUNT);
for (let p = 0; p <= 1.0001; p += 0.001) {
  const i = indexFor(p, COUNT);
  if (i < prev) mono = false;
  prev = i;
}
check("index never decreases as progress increases", mono, true);

console.log("every frame is reachable (no gaps in the mapping)");
const seen = new Set();
for (let p = 0; p <= 1; p += 1 / (COUNT * 4)) seen.add(indexFor(p, COUNT));
check("all 96 frames reachable", seen.size, COUNT);

console.log("nearest-frame fallback");
function nearest(cache, target, count) {
  if (cache.has(target)) return target;
  for (let d = 1; d < count; d++) {
    if (cache.has(target - d)) return target - d;
    if (cache.has(target + d)) return target + d;
  }
  return -1;
}
check("exact hit", nearest(new Set([10]), 10, COUNT), 10);
check("falls back backwards", nearest(new Set([8]), 10, COUNT), 8);
check("falls back forwards", nearest(new Set([12]), 10, COUNT), 12);
check("empty cache yields -1 (never a wrong frame)", nearest(new Set(), 10, COUNT), -1);

console.log("LRU bound");
const LRU_SIZE = 16;
const cache = new Map();
for (let i = 0; i < 40; i++) {
  cache.set(i, { close() {} });
  while (cache.size > LRU_SIZE) {
    const oldest = cache.keys().next().value;
    cache.delete(oldest);
  }
}
check("cache never exceeds the LRU size", cache.size <= LRU_SIZE, true);
check("cache is exactly at the bound", cache.size, LRU_SIZE);
check("the newest frame survives", cache.has(39), true);
check("the oldest frame was evicted", cache.has(0), false);

console.log("decoded memory budget");
const decodedBytes = LRU_SIZE * 960 * 540 * 4;
console.log(`  LRU of ${LRU_SIZE} frames at 960x540 RGBA = ${Math.round(decodedBytes / 1e6)} MB`);
console.log(`  the old runtime cache was 90 frames = ${Math.round((90 * 960 * 540 * 4) / 1e6)} MB`);

console.log(failures === 0 ? "\nALL PASS" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
