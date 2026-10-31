import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root=process.cwd();
const at=name=>readFileSync(join(root,'public/flagship-journey/infinite-bc',name),'utf8');
const html=at('index.html');
const nav=at('digital-passage-nav.js');
const scene=at('digital-passage-scene-v2.js');

test('native Work anchor and actual destination remain the source of truth',()=>{
  assert.match(html, /class="button primary" href="#work"/);
  assert.match(html, /id="work"/);
  assert.match(nav, /target\.scrollIntoView/);
  assert.match(scene, /actual #work DOM/);
  assert.doesNotMatch(scene, /CanvasTexture|drawTexture|cloneNode|captureStream/);
});
test('new CTA is wired without changing B-C scroll runtime',()=>{
  assert.match(html, /src="\.\/motion\.js"/);
  assert.match(html, /src="\.\/digital-passage-nav\.js" type="module"/);
  assert.doesNotMatch(html, /src="\.\/work-nav\.js"/);
});
test('fallback, history, interrupted journeys and GPU cleanup are explicit',()=>{
  for(const needle of ['prefers-reduced-motion','saveData','pushState','popstate','pagehide','Promise.race']) {
    assert.ok(nav.includes(needle), 'missing navigation guard: '+needle);
  }
  for(const needle of ['webglcontextlost','function interrupt()','visibilitychange','dispose()','forceContextLoss','renderer.dispose()']) {
    assert.ok(scene.includes(needle), 'missing renderer guard: '+needle);
  }
});
test('3D scene includes actual geometry, camera translation, lighting and mobile treatment',()=>{
  for(const needle of ['InstancedMesh','TubeGeometry','FogExp2','PointLight','ShaderMaterial','camera.lookAt','camera.fov','small?']) {
    assert.ok(scene.includes(needle), 'missing scene element: '+needle);
  }
});

test('three-act direction and DOM aperture are explicit',()=>{
  for(const marker of ['ACT I','ACT II','ACT III','maskImage','webkitMaskImage','onCover()','cameraTrack','leaves','measureArrival']) {
    assert.ok(scene.includes(marker), 'missing art-direction beat '+marker);
  }
  assert.doesNotMatch(scene,/stage\.style\.opacity=/);
});
test('module is lazy, direct Work fallback exists, and stale Back does not force navigation',()=>{
  assert.match(nav,/import\("\.\/digital-passage-scene-v2\.js"\)/);
  assert.match(nav,/if \(token !== ticket\) return/);
  assert.match(nav,/genezisi-passage-pending/);
  assert.match(nav,/scene load timeout/i);
});
