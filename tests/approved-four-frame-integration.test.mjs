import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const app = join(root, 'src/app/[locale]/_components');
const read = path => readFileSync(join(root, path), 'utf8');
const hero = read('src/app/[locale]/_components/v2/V2Hero.tsx');
const scenes = read('src/app/[locale]/_components/v2/JourneyScenes.tsx');
const home = read('src/app/[locale]/_components/SignalHeroPrototype.tsx');
const css = read('src/app/[locale]/_components/v2/approved-four-frame.css');
const motion = read('public/flagship-journey/infinite-bc/motion.js');

test('approved Card 2 is integrated rather than an English-only prototype', () => {
  assert.match(hero, /className="site-window card2-window"/);
  assert.match(hero, /card2-availability-short/);
  assert.match(hero, /card2-service/);
  assert.match(hero, /card2-mark/);
  assert.doesNotMatch(hero, /visualTop:|visualTitle:|visualExplore:/);
  for (const locale of ['en','ka','nl']) assert.match(hero, new RegExp('\\b'+locale+':\\s*\\{'));
});

test('Card 3 has its approved editorial story and three staged explanations', () => {
  for (const c of ['reading card3-stage','threshold-assembly','card3-story-content',
    'card3-step-understand','card3-step-create','card3-step-real','card3-progress']) {
    assert.ok(scenes.includes(c), 'missing Card 3: '+c);
  }
  assert.match(scenes, /first:"From idea to a",second:"working solution\."/);
  assert.doesNotMatch(scenes, /BRIGHTSIDE|c-bands|card3-preview-landscape/);
  for (const locale of ['en','ka','nl']) assert.match(scenes, new RegExp('\\b'+locale+':\\s*\\{'));
});

test('Card 4 has the accepted conclusion and no duplicate services or Work CTA', () => {
  assert.match(scenes, /reveal card4-resolution/);
  assert.match(scenes, /Made to be seen\./);
  assert.match(scenes, /Built to work\./);
  assert.doesNotMatch(scenes, /c-description|c-bands|closingRight|href="#work"/);
  assert.match(scenes, /card4-signature/);
});

test('actual Next.js work, navigation and locale remount lifecycle survive', () => {
  assert.match(home, /<SelectedWork copy=\{copy\} \/>/);
  assert.match(home, /<Capabilities copy=\{copy\} \/>/);
  assert.match(home, /<StudioHeader locale=\{locale\}/);
  assert.match(home, /<V2Lab copy=\{copy\} \/>/);
  assert.match(hero, /digital-passage-nav\.js/);
  assert.match(motion, /new MutationObserver\(boot\)/);
  assert.match(motion, /new AbortController\(\)/);
  assert.match(motion, /if\(!root\.isConnected/);
  assert.match(motion, /if\(home\)home\.dataset\.beat=raw>=\.999/);
});

test('Card 3 approach and Card 4 reveal reuse approved scroll geometry', () => {
  assert.match(motion, /const first=smooth\(\.512,\.560,p\),second=smooth\(\.548,\.596,p\),third=smooth\(\.584,\.632,p\)/);
  assert.match(motion, /--depthVisibility/);
  assert.match(motion, /--cHeadlineInk','1'/);
  assert.match(motion, /const handoff=smooth\(\.658,\.706,p\)/);
  assert.match(motion, /const fold=smooth\(\.647,\.707,p\)/);
  assert.doesNotMatch(motion, /earlyHeadline|inkSafe|cTextBounds/);
});

test('only the final Card 4 hold is shortened', () => {
  assert.match(css, /journey\[data-mode="motion"\]\{height:360svh\}/);
  assert.match(motion, /originalTravel=Math\.max\(1,4\.4\*scene\.offsetHeight-window\.innerHeight\)/);
  assert.match(motion, /finalStart=Math\.min\(\.715\*originalTravel,\.99\*newTravel\)/);
  assert.match(motion, /originalStoryProgress\(distance\/originalTravel\)/);
  // Fully readable C at original raw .682; with 360svh release the
  // remaining physical scroll is 0.2812 of a viewport at stable heights.
  const remaining=(3.6-1)-.682*(4.4-1);
  assert.ok(remaining>.2 && remaining<.35);
});

test('styles are scoped to the real homepage and safe without scroll motion', () => {
  assert.match(home, /approved-four-frame\.css/);
  assert.match(css, /\.genezisi-entry-home \.card3-story-content/);
  assert.match(css, /\.genezisi-entry-home \.reveal\.card4-resolution/);
  assert.match(css, /html\.bc-motion-ready \.genezisi-entry-home .*--depthVisibility/);
  assert.match(css, /\.genezisi-entry-home \.journey:not\(\[data-mode="motion"\]\)/);
  const opens=(css.match(/\{/g)||[]).length,closes=(css.match(/\}/g)||[]).length;
  assert.equal(opens,closes);
  assert.doesNotMatch(css, /@import|url\(['"]?https?:/);
});
