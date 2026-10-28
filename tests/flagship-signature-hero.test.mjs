import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = path.join(root, "public/flagship-journey");
const html = readFileSync(path.join(site, "index.html"), "utf8");
const css = readFileSync(path.join(site, "signature-hero.css"), "utf8");
const js = readFileSync(path.join(site, "journey.js"), "utf8");
const hero = html.split('<div class="hero-journey"')[1]?.split('<section class="work-intro"')[0];

test("full flagship remains intact behind the new signature hero", () => {
  assert.ok(hero, "expected the complete hero section");
  for (const section of ["work", "tk-counsel", "socraticblock", "fornward", "intelligence", "services", "contact"]) {
    assert.match(html, new RegExp('id="' + section + '"'));
  }
  assert.match(html, /href="\.\/signature-hero\.css"/);
  assert.match(html, /Your website/);
  assert.match(hero, /Real work\./);
});

test("each system scene exists once and the narrative uses one stage model", () => {
  for (const id of ["signatureSurface", "signatureRequest", "signatureAutomation", "signatureAgent", "signatureReview", "signatureOutcome"]) {
    assert.equal((html.match(new RegExp('id="' + id + '"', "g")) ?? []).length, 1, id);
    assert.ok(js.includes("#" + id), id + " must be scroll-controlled");
  }
  for (const id of ["signaturePhase", "signatureCounter", "signatureStoryTitle", "signatureStoryDetail"]) {
    assert.equal((html.match(new RegExp('id="' + id + '"', "g")) ?? []).length, 1, id);
    assert.ok(js.includes("#" + id), id + " must be synchronized");
  }
  assert.match(js, /journey\.dataset\.signaturePhase/);
  assert.equal((js.match(/const narrative=\[/g) ?? []).length, 1);
});

test("fictional system actions are not represented as externally completed", () => {
  assert.match(hero, /NO LIVE ACTIONS|No message was actually sent/i);
  assert.match(hero, /Notification prepared, not sent/);
  assert.match(hero, /Calendar creation and outbound messages are disabled/);
  assert.match(hero, /Owner approval simulated/);
  assert.match(hero, /approved draft is ready for manual delivery/);
  assert.doesNotMatch(hero, /TKCOUNSEL\.COM/);
});

test("reduced-motion and mobile modes have intentional fallbacks", () => {
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css, /@media\(max-width:760px\)/);
  assert.match(css, /@media\(max-width:390px\)/);
  assert.match(css, /\.signature-surface\{opacity:1!important/);
  assert.match(css, /\.signature-storyline\{top:16%/);
  assert.match(html, /signature-accessible-summary/);
});

test("site choreography parses as JavaScript", () => {
  execFileSync(process.execPath, ["--check", path.join(site, "journey.js")], { stdio: "pipe" });
});
