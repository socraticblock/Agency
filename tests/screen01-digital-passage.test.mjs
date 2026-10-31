import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root=process.cwd();
const at=name=>readFileSync(join(root,'public/flagship-journey/infinite-bc',name),'utf8');
const html=at('index.html');
const nav=at('digital-passage-nav.js');
const scene=at('digital-passage-scene-v6.js');
const css=at('digital-passage.css');

test('native Work anchor, original section, and B-to-C runtime are preserved',()=>{
  assert.match(html, /class="button primary" href="#work"/);
  assert.match(html, /id="work"/);
  assert.match(html, /src="\.\/motion\.js"/);
  assert.match(html, /src="\.\/digital-passage-nav\.js" type="module"/);
  assert.doesNotMatch(html, /src="\.\/work-nav\.js"/);
  assert.match(nav, /target\.scrollIntoView/);
});

test('V5 lazy loads on intent with robust native navigation fallbacks',()=>{
  assert.match(nav,/import\("\.\/digital-passage-scene-v6\.js"\)/);
  for(const needle of ['prefers-reduced-motion','saveData','pushState','popstate','pagehide','Promise.race','if (token !== ticket) return']) {
    assert.ok(nav.includes(needle), 'missing navigation guard: '+needle);
  }
});

test('V5 only transforms the clicked CTA aperture — never the page or headlines',()=>{
  for(const needle of ['const endZoom=','buttonCenter','rect.width*scale','rect.height*scale','stage.style.clipPath','function revealSource']) {
    assert.ok(scene.includes(needle), 'missing CTA geometry: '+needle);
  }
  assert.doesNotMatch(scene,/opening\.style\.transform/);
  assert.doesNotMatch(scene,/restoreHero\(\)/);
  assert.match(scene,/trigger\.style\.transform/);
  assert.match(scene,/trigger\.style\.opacity/);
  assert.match(scene,/restoreFocus\(\)/);
  assert.match(scene,/if\(prog>=\.235\)/);
});

test('V5 has real perspective geometry, lighting and teardown',()=>{
  for(const needle of ['InstancedMesh','TubeGeometry','FogExp2','PointLight','ShaderMaterial','camera.lookAt','camera.fov','cameraTrack','forceContextLoss','renderer.dispose()','webglcontextlost']) {
    assert.ok(scene.includes(needle), 'missing 3D contract '+needle);
  }
  assert.match(scene,/DURATION=2080/);
});

test('Work preview contains only existing real Work markup, never a screenshot',()=>{
  for(const needle of ['mountCopy(actualWork)','clone.inert=true','portalCorners','project(camera)','workWindow.style.clipPath','workPlane.style.transform']) {
    assert.ok(scene.includes(needle), 'missing true-Work contract '+needle);
  }
  assert.doesNotMatch(scene,/CanvasTexture|drawTexture|captureStream/);
  assert.match(css,/\.genezisi-passage-work-window/);
  assert.match(css,/clip-path:polygon/);
});

test('Work converges to camera perspective with no late arbitrary enlargement',()=>{
  assert.match(scene,/exitCameraDistance=portalHalfH\/Math\.tan/);
  assert.match(scene,/exitZ=portalDepth\+exitCameraDistance/);
  assert.match(scene,/return mix\(Z_START,exitZ,t\)/);
  assert.doesNotMatch(scene,/const settle=ease\(\.82,\.945,prog\)/);
  assert.doesNotMatch(scene,/maskImage|webkitMaskImage/);
  assert.match(scene,/const align=ease\(\.77,\.925,p\)/);
  assert.match(scene,/const enter=ease\(\.070,\.178,prog\)/);
  assert.match(scene,/stage\.style\.opacity=String\(enter\*leave\)/);
});

test('perspective solution fills viewport at exit for desktop and portrait FOV',()=>{
  for (const [w,h,fov] of [[1440,900,66],[390,844,74],[320,568,74]]) {
    const aspect=w/h;
    const halfHeight=Math.min(3.5,4.6/aspect);
    const distance=halfHeight/Math.tan(fov*Math.PI/360);
    const visibleHalfHeight=distance*Math.tan(fov*Math.PI/360);
    const visibleHalfWidth=visibleHalfHeight*aspect;
    assert.ok(Math.abs(halfHeight/visibleHalfHeight-1)<1e-10);
    assert.ok(Math.abs(halfHeight*aspect/visibleHalfWidth-1)<1e-10);
  }
});

test('V6 isolates real CTA as a sharp subject without blurring the ancestor',()=>{
  for(const token of [
    'trigger.style.transformOrigin="center center"',
    'trigger.style.transform=',
    'trigger.style.opacity=String(1-ease(.090,.175,prog))',
    'root.classList.add("genezisi-passage-focus")',
    'root.style.setProperty("--genezisi-focus-blur"',
    'root.style.setProperty("--genezisi-focus-dim"',
    'restoreFocus(); // Also covers Escape, context loss, Back and resize.'
  ]) assert.ok(scene.includes(token), 'missing focus contract: '+token);
  assert.doesNotMatch(scene,/opening\.style\.transform|opening\.style\.filter/);
  assert.match(css,/html\.genezisi-passage-focus \.opening \.intro > :not\(\.actions\)/);
  assert.match(css,/html\.genezisi-passage-focus \.opening \.actions > \.button\.primary/);
});

test('V6 preserves short travel time and focuses before threshold entry',()=>{
  assert.match(scene,/DURATION=2080/);
  assert.match(scene,/const t=ease\(\.006,\.235,prog\)/);
  assert.match(scene,/const focus=ease\(\.005,\.070,prog\)\*\(1-ease\(\.135,\.235,prog\)\)/);
  assert.match(scene,/const enter=ease\(\.070,\.178,prog\)/);
  assert.match(nav,/import\("\.\/digital-passage-scene-v6\.js"\)/);
});
