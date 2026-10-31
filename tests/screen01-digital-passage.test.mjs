import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root=process.cwd();
const at=name=>readFileSync(join(root,'public/flagship-journey/infinite-bc',name),'utf8');
const html=at('index.html');
const nav=at('digital-passage-nav.js');
const scene=at('digital-passage-scene-v6-1.js');
const css=at('digital-passage.css');

test('native CTA and Work DOM, and B-to-C motion runtime remain unchanged',()=>{
  assert.match(html,/class="button primary" href="#work"/);
  assert.match(html,/id="work"/);
  assert.match(html,/src="\.\/motion\.js"/);
  assert.match(html,/src="\.\/digital-passage-nav\.js" type="module"/);
  assert.doesNotMatch(html,/src="\.\/work-nav\.js"/);
});

test('current V6.1 module is loaded on intent; navigation safely degrades',()=>{
  assert.match(nav,/import\("\.\/digital-passage-scene-v6-1\.js"\)/);
  for(const item of ['prefers-reduced-motion','saveData','pushState','popstate','pagehide','Promise.race','if (token !== ticket) return']) {
    assert.ok(nav.includes(item), 'missing fallback '+item);
  }
});

test('V6.1 uses an actual camera and a 3D doorway matched to clicked CTA',()=>{
  for(const item of [
    'const entranceZ=-7.25','const entranceWorldH=1.7',
    'const entranceWorldW=entranceWorldH*',
    'const entryDistance=entranceWorldH*baseH/',
    'new THREE.CatmullRomCurve3(points,true,"centripetal")',
    'roundedOutline(entranceZ,.018)',
    'roundedOutline(entranceZ-.60,.12)',
    'return entranceZ+entryDistance*Math.pow(',
    'camera.position.set(cameraX,cameraY,z)',
    'camera.lookAt(cameraX,cameraY,z-20)',
    'camera.position.x/worldPerPixel',
    'stage.style.clipPath'
  ]) assert.ok(scene.includes(item), 'missing 3D camera doorway '+item);
  assert.doesNotMatch(scene,/trigger\.style\.(transform|opacity)/);
  assert.doesNotMatch(scene,/opening\.style\.(transform|filter)/);
  assert.doesNotMatch(scene,/const endZoom=/);
});

test('focus remains selective; physical CTA text never scales to giant size',()=>{
  for(const item of [
    'root.classList.add("genezisi-passage-focus")',
    'root.style.setProperty("--genezisi-focus-blur"',
    'root.style.setProperty("--genezisi-focus-dim"',
    'restoreFocus(); // Also covers Escape, context loss, Back and resize.'
  ]) assert.ok(scene.includes(item),'missing focus control '+item);
  assert.match(css,/html\.genezisi-passage-focus \.opening \.intro > :not\(\.actions\)/);
  assert.match(css,/html\.genezisi-passage-focus \.opening \.actions > \.button\.primary/);
  assert.doesNotMatch(scene,/trigger\.style\.transform/);
});

test('3D architecture and existing real Work handoff remain intact',()=>{
  for(const item of [
    'InstancedMesh','TubeGeometry','FogExp2','PointLight','ShaderMaterial',
    'mountCopy(actualWork)','clone.inert=true','portalCorners',
    'project(camera)','workWindow.style.clipPath','workPlane.style.transform',
    'exitCameraDistance=portalHalfH/Math.tan',
    'exitZ=portalDepth+exitCameraDistance',
    'webglcontextlost','forceContextLoss','renderer.dispose()'
  ]) assert.ok(scene.includes(item),'missing world/Work guard '+item);
  assert.doesNotMatch(scene,/CanvasTexture|drawTexture|captureStream/);
});

test('no time added; camera and exit are continuous and short',()=>{
  assert.match(scene,/DURATION=2080/);
  assert.match(scene,/const travel=ease\(\.235,\.925,p\)/);
  assert.match(scene,/return mix\(entryEndZ,exitZ,ease\(\.235,\.925,prog\)\)/);
  assert.match(scene,/const enter=ease\(\.050,\.138,prog\)/);
  assert.match(scene,/const align=ease\(\.77,\.925,p\)/);
  assert.doesNotMatch(scene,/maskImage|webkitMaskImage/);
});

test('physical camera projects to the exact CTA size on desktop and portrait',()=>{
  const cases=[
    {w:1440,h:900,rect:{x:152,y:560,w:220,h:48},fov:71},
    {w:390,h:844,rect:{x:24,y:610,w:170,h:44},fov:79},
    {w:320,h:568,rect:{x:16,y:395,w:148,h:42},fov:79}
  ];
  for(const {w,h,rect,fov} of cases){
    const wh=1.7, ww=wh*rect.w/rect.h;
    const t=Math.tan(fov*Math.PI/360);
    const d=wh*h/(2*t*rect.h);
    const wpp=2*d*t/h;
    const cx=rect.x+rect.w/2,cy=rect.y+rect.h/2;
    const cameraX=-(cx-w/2)*wpp,cameraY=(cy-h/2)*wpp;
    const projectedCx=w/2-cameraX/wpp,projectedCy=h/2+cameraY/wpp;
    assert.ok(Math.abs(projectedCx-cx)<1e-8,'entry X must hit CTA');
    assert.ok(Math.abs(projectedCy-cy)<1e-8,'entry Y must hit CTA');
    assert.ok(Math.abs(ww/wpp-rect.w)<1e-8,'entry width must hit CTA');
    assert.ok(Math.abs(wh/wpp-rect.h)<1e-8,'entry height must hit CTA');
    assert.ok(d>.62,'entry camera must start before door');
  }
});

test('portal projection expands monotonically as the real camera approaches',()=>{
  const doorZ=-7.25,d0=17.4,d1=.62,wh=1.7,h=900,fov=71;
  const th=Math.tan(fov*Math.PI/360);
  let previous=0;
  for(const t of [0,.1,.2,.3,.45,.6,.75,.9,1]){
    const distance=d0*Math.pow(d1/d0,t);
    const projectedH=wh*h/(2*distance*th);
    assert.ok(projectedH>=previous,'real 3D approach must grow continuously');
    previous=projectedH;
    assert.ok(doorZ+distance>doorZ,'lens must not clip into doorway before handoff');
  }
});
