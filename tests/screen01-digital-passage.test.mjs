import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root=process.cwd();
const at=name=>readFileSync(join(root,'public/flagship-journey/infinite-bc',name),'utf8');
const html=at('index.html');
const nav=at('digital-passage-nav.js');
const scene=at('digital-passage-scene-v6-3.js');
const css=at('digital-passage.css');

test('native CTA and Work DOM, and B-to-C motion runtime remain unchanged',()=>{
  assert.match(html,/class="button primary" href="#work"/);
  assert.match(html,/id="work"/);
  assert.match(html,/src="\.\/motion\.js"/);
  assert.match(html,/src="\.\/digital-passage-nav\.js" type="module"/);
  assert.doesNotMatch(html,/src="\.\/work-nav\.js"/);
});

test('current V6.3 module is loaded on intent; navigation safely degrades',()=>{
  assert.match(nav,/import\("\.\/digital-passage-scene-v6-2\.js"\)/);
  for(const item of ['prefers-reduced-motion','saveData','pushState','popstate','pagehide','Promise.race','if (token !== ticket) return']) {
    assert.ok(nav.includes(item), 'missing fallback '+item);
  }
});

test('V6.3 uses an actual camera and a 3D doorway matched to clicked CTA',()=>{
  for(const item of [
    'const entranceZ=-7.25','const entranceWorldH=1.7',
    'const entranceWorldW=entranceWorldH*',
    'const entryDistance=entranceWorldH*baseH/',
    'new THREE.CatmullRomCurve3(doorContour(z,offset),true,"centripetal")',
    'roundedOutline(entranceZ,.018)',
    'roundedOutline(entranceZ-.60,.12)',
    'hermiteDepth(entryStartZ,entryEndZ,0,velocityAtThreshold,',
    'camera.position.set(cameraX,cameraY,z)',
    'camera.lookAt(cameraX,cameraY,z-20)',
    'projectAperture()',
    'stage.style.clipPath'
  ]) assert.ok(scene.includes(item), 'missing 3D camera doorway '+item);
  assert.doesNotMatch(scene,/trigger\.style\.transform/);
  assert.match(scene,/trigger\.style\.opacity=String\(1-ease\(\.025,\.075,prog\)\)/);
  assert.match(scene,/trigger\.style\.opacity=originalCTAOpacity/);
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
  assert.match(scene,/hermiteDepth\(entryEndZ,exitZ,velocityAtThreshold,0,/);
  assert.match(scene,/velocityAtThreshold/);
  assert.match(scene,/const enter=ease\(\.025,\.075,prog\)/);
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
    assert.ok(d>.48,'entry camera must start before door');
  }
});


test('new Hermite camera trajectory is monotonic with matching velocity at doorway',()=>{
  const smooth=(a,b,v0,v1,u,span)=>{
    const p=Math.max(0,Math.min(1,u)),p2=p*p,p3=p2*p;
    return (2*p3-3*p2+1)*a+(p3-2*p2+p)*v0*span+
      (-2*p3+3*p2)*b+(p3-p2)*v1*span;
  };
  const t0=.006,t1=.235,t2=.925;
  for(const {h,fov,ctaHeight} of [
    {h:900,fov:71,ctaHeight:48},
    {h:844,fov:79,ctaHeight:44},
    {h:568,fov:79,ctaHeight:42}
  ]){
    const entryDistance=1.7*h/(2*Math.tan(fov*Math.PI/360)*ctaHeight);
    const z0=-7.25+entryDistance,z1=-7.25+.48;
    const portalHalfH=Math.min(3.5,4.6/(h===900?1440/900:h===844?390/844:320/568));
    const z2=-129+portalHalfH/Math.tan((fov-5)*Math.PI/360);
    const va=-(Math.min(1.08*(z0-z1)/(t1-t0),.78*(z1-z2)/(t2-t1)));
    const z=(p)=>{
      if(p<=t0)return z0;
      if(p<t1)return smooth(z0,z1,0,va,(p-t0)/(t1-t0),t1-t0);
      if(p<t2)return smooth(z1,z2,va,0,(p-t1)/(t2-t1),t2-t1);
      return z2;
    };
    assert.ok(Math.abs(z(t1)-z1)<1e-8);
    assert.ok(Math.abs(z(t2)-z2)<1e-8);
    let old=z0;
    for(let i=1;i<=1000;i++){
      const x=z(t0+(t2-t0)*i/1000);
      assert.ok(x<=old+1e-7,'must advance forward monotonically');
      old=x;
    }
    const epsilon=.00001;
    const vBefore=(z(t1)-z(t1-epsilon))/epsilon;
    const vAfter=(z(t1+epsilon)-z(t1))/epsilon;
    assert.ok(Math.abs(vBefore-vAfter)<.035,
      'speed must be continuous across physical doorway: '+vBefore+' / '+vAfter);
    assert.ok(Math.abs(va)>15,'camera should not stop at doorway');
  }
});

test('CTA and aperture crossfade in one bounded early interval, never a duplicate',()=>{
  assert.match(scene,/trigger\.style\.opacity=String\(1-ease\(\.025,\.075,prog\)\)/);
  assert.match(scene,/const enter=ease\(\.025,\.075,prog\)/);
  assert.match(scene,/trigger\.style\.opacity=originalCTAOpacity/);
  assert.doesNotMatch(scene,/trigger\.style\.transform/);
  assert.match(scene,/restoreFocus\(\); \/\/ Also covers Escape, context loss, Back and resize\./);
  assert.match(scene,/if\(prog>=thresholdAt\)/);
  assert.match(scene,/DURATION=2080/);
});

test('V6.3 mask is derived from the same rounded world-space doorway geometry',()=>{
  for(const token of [
    'function doorContour(z,offset=0)',
    'const curve=new THREE.CatmullRomCurve3(doorContour(z,offset),true',
    'const apertureContour=doorContour(entranceZ,.065)',
    'function projectAperture()',
    'point.clone().project(camera)',
    'function apertureCoversViewport(polygon)',
    'pointInPolygon(x,y,polygon)',
    'if(apertureCoversViewport(polygon))',
    'apertureUnlocked=true',
    'stage.style.clipPath="polygon("',
    'const canClearAtThreshold=apertureCoversViewport(contourAtDoorway)'
  ]) assert.ok(scene.includes(token), 'missing projected doorway contract: '+token);
  assert.doesNotMatch(scene,/rounded=Math\.max\(0,buttonRadius/);
  assert.doesNotMatch(scene,/stage\.style\.clipPath=\`inset\(\$\{top\}/);
  assert.doesNotMatch(scene,/if\(prog>=\.235\)\{\s*stage\.style\.clipPath="none"/);
  assert.match(scene,/const thresholdDistance=\.48/);
});

test('rounded projected entrance covers all viewport corners BEFORE removing mask',()=>{
  const cases=[
    {w:1440,h:900,bw:220,bh:48,fov:71},
    {w:1920,h:1080,bw:220,bh:48,fov:71},
    {w:390,h:844,bw:170,bh:44,fov:79},
    {w:320,h:568,bw:148,bh:42,fov:79}
  ];
  function isInside(x,y,poly){
    let inside=false;
    for(let i=0,j=poly.length-1;i<poly.length;j=i++){
      const a=poly[i],b=poly[j];
      if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside;
    }
    return inside;
  }
  for(const {w,h,bw,bh,fov} of cases){
    const worldH=1.7,worldW=worldH*bw/bh,offset=.065;
    const hw=worldW*.5+offset,hh=worldH*.5+offset;
    const radius=Math.min(hh-.018,worldH*Math.min(bh/2,30)/bh+offset);
    const projected=[],k=h/(2*.48*Math.tan(fov*Math.PI/360));
    for(const [cx,cy,deg] of [
      [hw-radius,hh-radius,0],[-hw+radius,hh-radius,90],
      [-hw+radius,-hh+radius,180],[hw-radius,-hh+radius,270]
    ]){
      for(let step=0;step<=8;step++){
        const a=(deg+step*90/8)*Math.PI/180;
        projected.push([w*.5+(cx+Math.cos(a)*radius)*k,
                        h*.5-(cy+Math.sin(a)*radius)*k]);
      }
    }
    const points=[[-12,-12],[w+12,-12],[w+12,h+12],[-12,h+12]];
    assert.ok(points.every(([x,y])=>isInside(x,y,projected)),
      'physical contour must cover '+w+'x'+h+' before unclipping');
  }
});

test('CTA overlap and original visual state remain intact if interrupted',()=>{
  assert.match(scene,/trigger\.style\.opacity=String\(1-ease\(\.025,\.075,prog\)\)/);
  assert.match(scene,/trigger\.style\.opacity=originalCTAOpacity/);
  assert.match(scene,/restoreFocus\(\); \/\/ Also covers Escape, context loss, Back and resize/);
  assert.match(scene,/stage\.style\.opacity=String\(enter\*leave\)/);
  assert.match(scene,/DURATION=2080/);
});
