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
  assert.match(motion, /originalTravel=Math\.max\(1,3\.4\*scene\.offsetHeight\)/);
  assert.match(motion, /finalStart=Math\.min\(\.715\*originalTravel,\.99\*newTravel\)/);
  assert.match(motion, /originalStoryProgress\(distance\/originalTravel\)/);
  // Fully readable C at original raw .682; with 360svh release the
  // remaining physical scroll is 0.2812 of a viewport at stable heights.
  const remaining=(3.6-1)-.682*(4.4-1);
  assert.ok(remaining>.2 && remaining<.35);
});

test('Card 3 cannot disappear when browser caches a pre-integration motion controller', () => {
  // A previous production controller used the same static URL but never set
  // --depthVisibility. The new versioned src forces a fresh HTTP cache key.
  assert.match(home, /motion\.js\?hero=card3-aperture-mobile-2026-11-02/);
  assert.doesNotMatch(home, /src="\/flagship-journey\/infinite-bc\/motion\.js" strategy/);
  // If old JS still executes while a tab transitions across deployments,
  // depth falls back to visible, gated by the original clip-path/opacity.
  assert.match(css, /depth\{visibility:var\(--depthVisibility,visible\)\}/);
  const baseStyles = read('src/app/[locale]/_components/v2/scroll-journey.css');
  assert.match(baseStyles, /clip-path:inset\(var\(--depthTop,50%\)/);
  assert.match(baseStyles, /opacity:var\(--depthAlpha,0\)/);
  assert.match(motion, /root\.style\.setProperty\('--depthVisibility',p>\.415&&cropW>1&&cropH>1\?'visible':'hidden'\)/);
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

test('mobile viewport stays covered as the browser toolbar collapses', () => {
  assert.match(css, /@media \(max-width:740px\)\s*\{\s*\.genezisi-entry-home \.journey\[data-mode="motion"\] \{ height:360lvh; \}/);
  assert.match(css, /\.journey\[data-mode="motion"\] \.scene \{\s*height:100lvh;\s*min-height:100lvh;/);
  assert.match(motion, /newTravel=Math\.max\(1,root\.offsetHeight-scene\.offsetHeight\)/);
  assert.match(motion, /const h=scene\.offsetHeight/);
  assert.doesNotMatch(motion, /root\.offsetHeight-window\.innerHeight/);
  assert.match(motion, /const invalidate=\(\)=>\{metrics=null;dirty=true;queue\(\);\}/);
  assert.match(motion, /raw===lastRaw&&w===lastWidth&&h===lastHeight/);
});

test('scroll timeline is deterministic across browser toolbar height changes', () => {
  // Execute ONLY the pure timeline function from the checked-in controller.
  // Its original keyframes remain unchanged; native scroll remains untouched.
  const start = motion.indexOf(' const scrollStops=');
  const end = motion.indexOf(' const panelScaleFor=', start);
  assert.ok(start > 0 && end > start, 'scroll mapping must be present');
  const scene = { offsetHeight: 800 };
  const root = { offsetHeight: 2880 };
  const clamp = value => Math.max(0, Math.min(1, value));
  const mix = (a, b, t) => a + (b - a) * t;
  const timeline = Function('scene', 'root', 'window', 'clamp', 'mix', motion.slice(start, end) + '\nreturn storyProgress;');
  const browser = { innerHeight: 680 };
  const progress = timeline(scene, root, browser, clamp, mix);

  const before = Array.from({ length: 101 }, (_, i) => progress(i / 100));
  for (let i = 1; i < before.length; i++) {
    assert.ok(before[i] >= before[i - 1], 'scroll progress must be reversible/monotonic');
    assert.ok(before[i] - before[i - 1] < 0.07, 'no single-frame mapping jump');
  }
  assert.equal(progress(0), 0);
  assert.equal(progress(1), 1);
  // A browser bar can change window.innerHeight without changing CSS lvh;
  // scroll-to-progress must therefore keep its original mapping.
  browser.innerHeight = 800;
  const unchanged = Array.from({ length: 101 }, (_, i) => progress(i / 100));
  assert.deepEqual(unchanged, before);
});

test('Card 3 grows within the actual aperture on desktop and portrait mobile', () => {
  assert.match(motion, /const depthZ=fitReadingDepth\(/);
  assert.match(motion, /const inkStart=isMobile\?Math\.min\(145,readingWidth\*\.55\):190/);
  assert.match(motion, /const inkEnd=isMobile\?Math\.min\(260,readingWidth\*\.76\):350/);
  assert.doesNotMatch(motion, /const depthZ=isMobile\?v\.readZ:/);
  const start=motion.indexOf(' const fitReadingDepth=');
  const end=motion.indexOf(' // All scene state',start);
  assert.ok(start>0 && end>start,'aperture geometry must be isolated');
  const fit=Function(motion.slice(start,end)+'\nreturn fitReadingDepth;')();
  const z0=fit(-760,220,160,910,542);
  const z1=fit(-760,440,320,910,542);
  const z2=fit(-760,880,600,910,542);
  assert.ok(z0<z1 && z1<=z2,'Card 3 should grow as the opening grows');
  assert.ok(z2<=-760,'opening must never force the card past its authored camera depth');
  assert.equal(fit(-760,2000,1200,910,542),-760);
  // Portrait phone: the same perspective fit applies, but within a much
  // narrower card and its taller B doorway. The projected card must stay
  // within the crop at every sampled size, never jumping in or out.
  const phone=[ [80,120], [180,260], [280,440], [360,700] ];
  let last=-Infinity;
  for (const [w,h] of phone) {
    const z=fit(-760,w,h,335,542);
    const projectedW=335*900/(900-z);
    const projectedH=542*900/(900-z);
    assert.ok(z>=last, 'aperture expansion must not shrink the card');
    assert.ok(z<=-760, 'geometry must not exceed the authored depth pose');
    assert.ok(projectedW<=Math.max(0,w-20)+1 && projectedH<=Math.max(0,h-20)+1);
    last=z;
  }
  assert.equal(fit(-760,600,900,335,542),-760);
});
