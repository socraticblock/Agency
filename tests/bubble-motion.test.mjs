// Run with: node --experimental-strip-types tests/bubble-motion.test.mjs
import assert from 'node:assert/strict';
import test from 'node:test';
import { clamp, springStep, contourPoints, contourPath, morphContour, geometryProgress, contentOpacity, bubbleDetailOpacity, SHAPE_POINTS } from '../src/app/[locale]/experiments/bubble-morph/bubbleMotion.ts';

const from = { left: 130, top: 180, width: 260, height: 260 };
const to = { left: 24, top: 20, width: 780, height: 690 };
const approx = (a,b,eps=.02) => assert.ok(Math.abs(a-b)<eps,`${a} should be within ${eps} of ${b}`);

test('damped spring begins at rest, overshoots slightly, and settles', () => {
  approx(springStep(0),0);
  const samples=Array.from({length:110},(_,i)=>springStep(i/100));
  const peak=Math.max(...samples);
  assert.ok(peak>1.008 && peak<1.04,`overshoot must remain controlled: ${peak}`);
  approx(springStep(1),1,.001);
});

test('matching contour sampling is smooth and finite',()=>{
  const circle=contourPoints(from,2), squircle=contourPoints(to,6.8);
  assert.equal(circle.length,SHAPE_POINTS);
  assert.equal(squircle.length,SHAPE_POINTS);
  assert.equal((contourPath(circle).match(/ Q /g)||[]).length,SHAPE_POINTS);
  assert.ok(circle.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)));
  assert.ok(squircle.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)));
});

test('open and reverse morph have continuous matching endpoints',()=>{
  for(const opening of [true,false]) {
    const init=morphContour(opening?from:to,opening?to:from,0,opening);
    const expected=contourPoints(opening?from:to,opening?2:6.8);
    init.forEach((p,i)=>{approx(p.x,expected[i].x,.001);approx(p.y,expected[i].y,.001)});
    const final=morphContour(opening?from:to,opening?to:from,1.06,opening);
    const expectedFinal=contourPoints(opening?to:from,opening?6.8:2);
    final.forEach((p,i)=>{approx(p.x,expectedFinal[i].x,.03);approx(p.y,expectedFinal[i].y,.03)});
  }
});

test('content waits for enough area and fades before close shrinks',()=>{
  assert.equal(contentOpacity(0,false,0),1);
  assert.equal(contentOpacity(0,true,0),0);
  assert.equal(contentOpacity(.45,true,.12),0);
  assert.ok(contentOpacity(1,true,.4)>.3);
  assert.equal(contentOpacity(1,true,1),1);
  assert.ok(contentOpacity(.5,false,.12)<.4);
  approx(contentOpacity(1,false,.2),0);
});

test('tiny and extreme viewport shapes remain finite',()=>{
  for(const dimensions of [[320,650],[390,844],[1440,900],[1918,1116]]){
    const [w,h]=dimensions;
    const dest={left:12,top:12,width:w-24,height:h-24};
    for(const time of [.01,.1,.25,.5,1]){
      const p=morphContour(from,dest,time,true);
      assert.ok(p.every(pt=>Number.isFinite(pt.x)&&Number.isFinite(pt.y)));
    }
  }
  assert.equal(clamp(1.2),1);
  approx(geometryProgress(1.1),1,.001);
});

test('closing explanation clears before the silhouette contracts; opening does not wait for the final frame', () => {
  assert.ok(contentOpacity(0.8, true, .34) > .25, 'readable content begins during expansion');
  assert.equal(contentOpacity(0.6, false, .13), 0, 'card copy clears in the first 130ms of closing');
  assert.equal(contentOpacity(1, false, 0), 1, 'closing starts without a flash');
});

test('React clipping follows the same generated contour as fill and rim', async () => {
  const { readFileSync } = await import('node:fs');
  const source = readFileSync(new URL('../src/app/[locale]/experiments/bubble-morph/BubbleMorphStudy.tsx', import.meta.url), 'utf8');
  assert.match(source, /clipRef\.current\?\.setAttribute\("d", path\)/);
  assert.match(source, /shape\.setAttribute\("d", path\)/);
  assert.match(source, /light\.setAttribute\("d", path\)/);
  assert.match(source, /id="genezisi-bubble-copy-clip"/);
  assert.match(source, /clipPath: "url\(#genezisi-bubble-copy-clip\)"/);
  assert.match(source, /ghostOpacity = bubbleDetailOpacity\(normalized, opening\)/);
  assert.match(source, /resetMembraneRef\.current\(index\)/);
});

test('bubble details return progressively before the final close handoff', () => {
  assert.equal(bubbleDetailOpacity(1, false), 0);
  assert.equal(bubbleDetailOpacity(0, false), 1);
  assert.ok(bubbleDetailOpacity(.16, false) > 0 && bubbleDetailOpacity(.16, false) < 1);
  assert.equal(bubbleDetailOpacity(0, true), 1);
  assert.equal(bubbleDetailOpacity(.24, true), 0);
});

test('travelling heading copies original font metrics instead of line-box scaling', async () => {
  const { readFileSync } = await import('node:fs');
  const source = readFileSync(new URL('../src/app/[locale]/experiments/bubble-morph/BubbleMorphStudy.tsx', import.meta.url), 'utf8');
  assert.match(source,/session\.sourceFontSize \/ session\.targetFontSize/);
  assert.match(source,/title\.style\.lineHeight/);
  assert.match(source,/title\.style\.letterSpacing/);
  assert.match(source,/bubbleDetailOpacity\(normalized, opening\)/);
});
test('scrollbar gutter stays reserved while card scroll lock toggles', async () => {
  const { readFileSync } = await import('node:fs');
  const source = readFileSync(new URL('../src/app/[locale]/experiments/bubble-morph/BubbleMorphStudy.tsx', import.meta.url), 'utf8');
  assert.match(source, /root\.style\.scrollbarGutter = "stable"/);
  assert.match(source, /root\.style\.scrollbarGutter = previousGutter/);
  assert.match(source, /useLayoutEffect\(\(\) => \{\s*if \(active === null\) return;\s*const body = document\.body;/);
  assert.match(source, /body\.style\.overflow = "hidden"/);
  assert.match(source, /body\.style\.overflow = previousOverflow/);
  assert.match(source, /\}, \[active\]\);/);
});
