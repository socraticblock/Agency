// Run with: node --experimental-strip-types --test tests/bubble-home-integration.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getBubbleCopy } from "../src/app/[locale]/experiments/bubble-morph/bubble.copy.ts";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const home = read("../src/app/[locale]/_components/SignalHeroPrototype.tsx");
const study = read("../src/app/[locale]/experiments/bubble-morph/BubbleMorphStudy.tsx");
const css = read("../src/app/[locale]/experiments/bubble-morph/BubbleMorphStudy.module.css");
const route = read("../src/app/[locale]/experiments/bubble-morph/page.tsx");

test("homepage order is opening → selected work → bubbles → founder", () => {
  const parts = [
    "<JourneyScenes locale={locale}",
    "<SelectedWork copy={copy} />",
    "<BubbleMorphStudy locale={locale} embedded />",
    "<FounderClose copy={copy}",
  ];
  const positions = parts.map(part => home.indexOf(part));
  assert.ok(positions.every(i => i >= 0), "all approved homepage blocks must appear");
  assert.ok(positions.every((pos,i) => !i || pos > positions[i-1]), "blocks must be in the correct order");
  assert.doesNotMatch(home, /<Capabilities\s/);
  assert.doesNotMatch(home, /<V2Lab\s/);
  assert.match(home, /<StudioHeader locale={locale}/);
});

test("homepage anchors remain and the capability section uses a subordinate heading", () => {
  assert.match(study, /id={embedded \? "capabilities" : undefined}/);
  assert.match(study, /embedded \? <h2 id="genezisi-capabilities-title"/);
  assert.match(study, /: <h1>{copy\.headlineLead}/);
  assert.match(study, /!embedded && <header/);
  assert.match(study, /!embedded && <footer/);
  assert.match(study, /embedded \? <p className={styles\.srOnly}/);
});

test("service content is substantial and localized across all three supported languages", () => {
  for (const locale of ["en", "ka", "nl"]) {
    const copy = getBubbleCopy(locale);
    assert.equal(copy.services.length,3);
    assert.ok(copy.headlineLead.trim() && copy.headlineEm.trim());
    assert.ok(copy.intro.length > 50);
    assert.ok(copy.close && copy.explore && copy.whatWeBuild && copy.whyItMatters);
    for (const [i, service] of copy.services.entries()) {
      assert.match(service.index, new RegExp("^0"+(i+1)));
      assert.ok(service.title.length >= 5);
      assert.ok(service.short.length > 20 && service.lead.length > 100);
      assert.equal(service.items.length, 4);
      assert.ok(service.items.every(v => v.length >= 9));
      assert.ok(service.result.length > 50);
    }
  }
  assert.notEqual(getBubbleCopy("en").headlineLead, getBubbleCopy("ka").headlineLead);
  assert.notEqual(getBubbleCopy("en").headlineLead, getBubbleCopy("nl").headlineLead);
});

test("portal sits above fixed navigation and preserves focus and scrollbar behavior", () => {
  assert.match(study, /createPortal\(/);
  assert.match(study, /setPortalHost\(document\.body\)/);
  assert.match(study, /className={styles\.portal} lang={locale}/);
  assert.match(css, /\.portal\s*\{/);
  assert.match(css, /z-index:1000/);
  assert.match(study, /root\.style\.scrollbarGutter = "stable"/);
  assert.match(study, /body\.style\.overflow = "hidden"/);
  assert.match(study, /aria-modal="true"/);
  assert.match(study, /ref={closeRef}/);
});

test("preview route remains separate, English-only, and noindexed", () => {
  assert.match(route, /if \(locale !== "en"\) notFound\(\)/);
  assert.match(route, /robots: \{ index: false/);
  assert.match(route, /return <BubbleMorphStudy \/>/);
});

test("localized layouts and reduced motion remain supported", () => {
  assert.match(css, /\.study\[lang="ka"\]/);
  assert.match(css, /\.portal\[lang="ka"\]/);
  assert.match(css, /@media\(max-width:820px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
