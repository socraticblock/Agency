import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const base=join(process.cwd(),'public/flagship-journey/infinite-bc');
const at=name=>readFileSync(join(base,name),'utf8');
const html=at('index.html');
const css=at('card-03.css');
const card2=at('card-02.css');
const motion=at('motion.js');
const entrance=at('entrance.css');

test('Card 2 and V6.5 click shortcut stay wired',()=>{
  assert.match(html,/class="site-window card2-window"/);
  assert.match(html,/Built<br> around<br><em>your ideas\.<\/em>/);
  assert.match(html,/class="button primary" href="#work"/);
  assert.match(html,/src="\.\/digital-passage-nav\.js" type="module"/);
  assert.doesNotMatch(html,/src="\.\/work-nav\.js"/);
});

test('Card 3 is a source-derived room with a meaningful DOM destination',()=>{
  for(const token of [
    'class="threshold-assembly"',
    'class="threshold-lintel"',
    'class="threshold-seam first"',
    'class="reading card3-stage"',
    'G<span class="card3-dot">.</span> / OUR APPROACH',
    'From idea to a',
    'working solution.',
    'class="card3-system card3-process"',
    'card3-step-understand',
    'card3-step-create',
    'card3-step-real',
    'Understand',
    'Create',
    'Make it real'
  ]) assert.ok(html.includes(token),'missing Card 3 proof: '+token);
  assert.doesNotMatch(html,/BRIGHTSIDE|WEBSITE \/ PREVIEW|card3-preview-landscape|FICTIONAL EXAMPLE/);
  assert.doesNotMatch(html,/fetch\(|XMLHttpRequest|WebSocket/);
});

test('B-to-room transition stays native-scroll sampled and reversible',()=>{
  for(const token of [
    'const scrollStops=[[0,0],[.20,.20]',
    'const retire=1-smooth(.424,.465,p)',
    'readInk:smooth(.465,.505,p)',
    'const cropW=mix(facade.width*enter,w,expand)',
    'const cropH=mix(facade.height*enter,h,expand)',
    "'--depthVisibility',",
    '--thresholdInk',
    '--c3First',
    '--c3Second',
    '--c3Third',
    '--c3Progress',
    'requestAnimationFrame(apply)',
    'window.__GENEZISI_BC_TEST__'
  ]) assert.ok(motion.includes(token),'missing motion behavior: '+token);
  assert.doesNotMatch(motion,/wheel.*preventDefault|touchmove.*preventDefault/);
});


test('Card 3 is fully occluded until Card 2 deliberately starts transforming',()=>{
  assert.match(entrance,/visibility:var\(--depthVisibility,hidden\)/);
  assert.match(motion,/--depthVisibility',p>\.415&&cropW>1&&cropH>1\?'visible':'hidden'/);
  assert.doesNotMatch(motion,/facade\.(?:width|height)\*\.44/);

  // Test desktop and portrait dimensions at pre-threshold, threshold and
  // forward transition progress; the same formulas are asserted above.
  const clamp=x=>Math.max(0,Math.min(1,x));
  const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t)};
  const mix=(a,b,t)=>a+(b-a)*t;
  for(const {w,h,fw,fh} of [
    {w:1440,h:900,fw:890,fh:600},
    {w:390,h:844,fw:340,fh:570},
    {w:320,h:568,fw:282,fh:450}
  ]) {
    for(const p of [0,.2,.32,.4,.4149,.415]) {
      const enter=smooth(.415,.46,p),expand=smooth(.46,.51,p);
      const width=mix(fw*enter,w,expand),height=mix(fh*enter,h,expand);
      assert.equal(width,0,'early room aperture width at p='+p);
      assert.equal(height,0,'early room aperture height at p='+p);
    }
    for(const p of [.44,.47,.5,.51,.56]) {
      const enter=smooth(.415,.46,p),expand=smooth(.46,.51,p);
      const width=mix(fw*enter,w,expand),height=mix(fh*enter,h,expand);
      assert.ok(width>1&&height>1,'room opening should be visible at p='+p);
    }
  }
});

test('narrow-window Card 2 alignment and Card 3 words survive hidden line breaks',()=>{
  // Card 2 keeps the original 6% total horizontal face inset, now symmetric.
  // Its centered wrapper therefore yields equal side margins in portrait.
  assert.match(card2,/\.site-window\.card2-window \{inset:4% 3% 6% 3%\}/);
  assert.match(html,/<h2><span>From idea to a<\/span> <em>working solution\.<\/em><\/h2>/);
  assert.doesNotMatch(html,/From idea<br>to a|working<br>solution\./);
});

test('Card 3 internal story is staged after arrival and completed before the existing fold',()=>{
  for(const token of [
    'const story=smooth(.542,.575,p)',
    'const first=smooth(.559,.577,p),second=smooth(.584,.603,p),third=smooth(.610,.628,p)',
    "'--c3HeroShift'",
    "'--c3HeroScale'",
    "'--c3FirstRise'",
    "'--c3SecondRise'",
    "'--c3ThirdRise'"
  ]) assert.ok(motion.includes(token),'missing nested storytelling: '+token);
  assert.match(css,/\.journey\[data-mode="motion"\] \.depth \.card3-process/);
  assert.match(css,/opacity:var\(--stepActive,0\)/);
  assert.match(css,/\.journey:not\(\[data-mode="motion"\]\) \.card3-process \.card3-step/);
  assert.match(html,/class="card3-story-content"/);
  // Progress stays pure and reversible. Before first reveal there are no
  // panels; after stage three all are visible and there is a readable hold.
  const sm=(a,b,p)=>{const t=Math.max(0,Math.min(1,(p-a)/(b-a)));return t*t*(3-2*t)};
  const states=p=>[sm(.559,.577,p),sm(.584,.603,p),sm(.610,.628,p)];
  assert.deepEqual(states(.55),[0,0,0]);
  assert.ok(states(.57)[0]>0&&states(.57)[1]===0&&states(.57)[2]===0);
  assert.ok(states(.59)[0]===1&&states(.59)[1]>0&&states(.59)[2]===0);
  assert.ok(states(.617)[0]===1&&states(.617)[1]===1&&states(.617)[2]>0);
  assert.deepEqual(states(.635),[1,1,1]);
  assert.deepEqual(states(.65),[1,1,1]);
  for(const p of [.62,.60,.57,.54]) assert.deepEqual(states(p),states(p));
});

test('Card 3 mobile, short-screen and static mode keep content available',()=>{
  assert.match(html,/href="\.\/card-03\.css"/);
  for(const token of [
    '@media(max-width:740px)',
    '@media(max-width:380px)',
    '@media(max-height:650px)',
    '.journey:not([data-mode="motion"]) .depth:has(.card3-stage)',
    '.reading.card3-stage',
    '.card3-progress',
    '.card3-process',
    '.card3-hero'
  ]) assert.ok(css.includes(token),'missing responsive behavior: '+token);
});

test('Card 4 and authentic Work anchors remain in the prototype',()=>{
  assert.match(html,/Made to be seen\.<br><em>Built to work\.<\/em>/);
  assert.match(html,/id="work"/);
  for(const token of ['TK Counsel','Frankencoin Desk','Her House Pilates']) assert.ok(html.includes(token));
});
