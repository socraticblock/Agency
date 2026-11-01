import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const base=join(process.cwd(),'public/flagship-journey/infinite-bc');
const at=name=>readFileSync(join(base,name),'utf8');
const html=at('index.html');
const css=at('card-03.css');
const card2=at('card-02.css');
const card4=at('card-04.css');
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
    'const story=smooth(.500,.548,p)',
    'const first=smooth(.512,.560,p),second=smooth(.548,.596,p),third=smooth(.584,.632,p)',
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
  // Card 3 is still approaching until p=.56. Its story begins BEFORE
  // then; completed panels hold until the unchanged C fold begins at .647.
  const sm=(a,b,p)=>{const t=Math.max(0,Math.min(1,(p-a)/(b-a)));return t*t*(3-2*t)};
  const states=p=>[sm(.512,.560,p),sm(.548,.596,p),sm(.584,.632,p)];
  const headline=p=>sm(.500,.548,p);
  assert.deepEqual(states(.505),[0,0,0]);
  assert.ok(headline(.51)>0&&states(.51)[0]===0);
  assert.ok(headline(.52)>0&&states(.52)[0]>0&&states(.52)[0]<1);
  assert.ok(states(.54)[0]>0&&states(.54)[1]===0&&states(.54)[2]===0);
  assert.ok(states(.554)[0]>0&&states(.554)[1]>0&&states(.554)[2]===0);
  assert.ok(states(.59)[0]===1&&states(.59)[1]>0&&states(.59)[2]>0);
  assert.ok(states(.608)[0]===1&&states(.608)[1]===1&&states(.608)[2]>0);
  assert.deepEqual(states(.634),[1,1,1]);
  assert.deepEqual(states(.646),[1,1,1]);
  // No autoplay or timing history: a backward scroll restores the exact pose.
  for(const p of [.646,.60,.54,.52,.60,.634]) {
    const snapshot=states(p);
    assert.deepEqual(states(p),snapshot);
  }
  assert.ok(motion.includes("root.style.setProperty('--c3Progress',String(smooth(.512,.632,p)))"));
  for(const token of [
    "'--c3FirstRise',(16*(1-first))",
    "'--c3SecondRise',(16*(1-second))",
    "'--c3ThirdRise',(16*(1-third))"
  ]) assert.ok(motion.includes(token),'missing restrained stage rise: '+token);
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

test('Card 4 headline is uncovered by C plane itself without delayed text timing',()=>{
  const entrance=at('entrance.css');
  assert.match(entrance,/clip-path:polygon\(\s*0 0,\s*var\(--cFrontTop,0%\) 0,\s*var\(--cFrontBottom,0%\) 100%,\s*0 100%\s*\)/);
  assert.match(entrance,/\.reveal \.c-center \.c-kicker,[\s\S]*?\.reveal \.c-center h2 \{\s*opacity:var\(--cHeadlineInk,0\)/);
  assert.ok(motion.includes("root.style.setProperty('--cEntranceScale','1')"));
  assert.ok(motion.includes("root.style.setProperty('--cHeadlineInk','1')"));
  assert.ok(motion.includes("root.style.setProperty('--cHeadlineRise','0px')"));
  assert.doesNotMatch(motion,/cTextBounds|getClientRects\(\)|inkSafe|earlyHeadline/);
  assert.match(motion,/const handoff=smooth\(\.658,\.706,p\)/);
  assert.match(motion,/const fold=smooth\(\.647,\.707,p\)/);
  assert.match(motion,/root\.style\.setProperty\('--cFrontTop',edgeTop\+'%'\)/);
  assert.match(motion,/root\.style\.setProperty\('--cFrontBottom',edgeBottom\+'%'\)/);
  const sm=(a,b,p)=>{const t=Math.max(0,Math.min(1,(p-a)/(b-a)));return t*t*(3-2*t)};
  const edge=p=>{
    const handoff=sm(.658,.706,p);
    const slant=8*4*handoff*(1-handoff);
    return [Math.max(0,Math.min(100,100*handoff+slant)),Math.max(0,Math.min(100,100*handoff-slant))];
  };
  assert.deepEqual(edge(.655),[0,0]);
  const mid=edge(.682);
  assert.ok(mid[0]>0&&mid[0]<100&&mid[1]>0&&mid[1]<100);
  assert.deepEqual(edge(.706),[100,100]);
  assert.deepEqual(edge(.682),mid);
  assert.deepEqual(edge(.655),[0,0]);
});

test('Card 4 releases quickly to genuine Selected Work without accelerating earlier scenes',()=>{
  const pageCss=at('styles.css');
  assert.match(pageCss,/\.journey\[data-mode="motion"\]\s*\{[\s\S]*?height:360svh/);
  assert.match(pageCss,/\.journey\[data-mode="motion"\] \.scene\s*\{\s*position:sticky/);
  assert.ok(motion.includes('const originalTravel=Math.max(1,4.4*scene.offsetHeight-window.innerHeight)'));
  assert.ok(motion.includes('const newTravel=Math.max(1,root.offsetHeight-window.innerHeight)'));
  assert.ok(motion.includes('const finalStart=Math.min(.715*originalTravel,.94*newTravel)'));
  assert.ok(motion.includes('return originalStoryProgress(distance/originalTravel)'));
  assert.ok(motion.includes('return mix(.76,1,clamp((distance-finalStart)/Math.max(1,newTravel-finalStart)))'));
  assert.match(html,/<\/section>\s*<\/div><\/div>\s*<section class="work-preview" id="work"/);

  const points=[[0,0],[.20,.20],[.24,.32],[.33,.415],[.42,.50],
    [.48,.56],[.505,.62],[.715,.76],[.93,.93],[1,1]];
  const original=x=>{
    for(let i=1;i<points.length;i++) {
      const [a,y0]=points[i-1],[b,y1]=points[i];
      if(x<=b)return y0+(y1-y0)*(x-a)/(b-a);
    }
    return 1;
  };
  const remapped=(distance,sceneH,windowH)=>{
    const oldDistance=4.4*sceneH-windowH,newDistance=3.6*sceneH-windowH;
    const end=Math.min(.715*oldDistance,.94*newDistance);
    if(distance<=end)return original(distance/oldDistance);
    return .76+.24*Math.max(0,Math.min(1,(distance-end)/(newDistance-end)));
  };
  for(const [sceneH,windowH] of [[900,900],[844,844],[720,780],[568,568]]) {
    const oldTotal=4.4*sceneH-windowH,newTotal=3.6*sceneH-windowH;
    const oldCompletion=.682*oldTotal; // p=.738: all supporting C ink is visible.
    const releaseAfter=(newTotal-oldCompletion)/sceneH;
    assert.ok(releaseAfter>=.15&&releaseAfter<.35,'Card 4 tail too short/long');
    for(const oldRaw of [0,.20,.24,.33,.42,.48,.505,.634,.682,.715]){
      const distance=oldRaw*oldTotal;
      assert.ok(Math.abs(remapped(distance,sceneH,windowH)-original(oldRaw))<1e-9,
        'preserved scene shifted at original raw '+oldRaw);
    }
    assert.equal(remapped(newTotal,sceneH,windowH),1,'release must complete at work');
    assert.equal(remapped(0,sceneH,windowH),0,'reverse to opening');
  }
});

test('Card 4 retains its closing headline, removes category repetition and preserves actual Work',()=>{
  const card=html.match(/<section class="reveal card4-resolution"[\s\S]*?<\/section>/)?.[0];
  assert.ok(card,'Card 4 missing');
  assert.match(card,/Made to be seen\.<br><em>Built to work\.<\/em>/);
  assert.doesNotMatch(card,/c-bands|c-description|Websites|Automation|AI systems|<a\b|SELECTED WORK/);
  assert.match(html,/href="\.\/card-04\.css"/);
  assert.match(card4,/\.reveal\.card4-resolution/);
  assert.match(card4,/@media\(max-width:740px\)/);
  assert.match(card4,/@media\(max-width:380px\)/);
  assert.match(card4,/@media\(max-height:650px\)/);
  assert.doesNotMatch(card4,/animation\s*:|transition\s*:/);
  assert.match(html,/<\/section>\s*<\/div><\/div>\s*<section class="work-preview" id="work"/);
  for(const token of ['TK Counsel','Frankencoin Desk','Her House Pilates']) assert.ok(html.includes(token));
});
