import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root=process.cwd();
const at=name=>readFileSync(join(root,'public/flagship-journey/infinite-bc',name),'utf8');
const html=at('index.html');
const nav=at('digital-passage-nav.js');
const scene=at('digital-passage-scene-v6-5.js');
const css=at('digital-passage.css');

test('native CTA and Work DOM, and B-to-C motion runtime remain unchanged',()=>{
  assert.match(html,/class="button primary" href="#work"/);
  assert.match(html,/id="work"/);
  assert.match(html,/src="\.\/motion\.js"/);
  assert.match(html,/src="\.\/digital-passage-nav\.js" type="module"/);
  assert.doesNotMatch(html,/src="\.\/work-nav\.js"/);
});

test('current V6.5 module is loaded on intent; navigation safely degrades',()=>{
  assert.match(nav,/import\("\.\/digital-passage-scene-v6-5\.js"\)/);
  for(const item of ['prefers-reduced-motion','saveData','pushState','popstate','pagehide','Promise.race','if (token !== ticket) return']) {
    assert.ok(nav.includes(item), 'missing fallback '+item);
  }
});

test('V6.5 uses an actual camera and a 3D doorway matched to clicked CTA',()=>{
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

test('V6.5 mask is derived from the same rounded world-space doorway geometry',()=>{
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
    const cxCTA=w===1440?262:w===1920?260:w===390?110:90;
    const cyCTA=h===900?619:h===1080?720:h===844?650:432;
    const projected=[],k=h/(2*.48*Math.tan(fov*Math.PI/360));
    for(const [cx,cy,deg] of [
      [hw-radius,hh-radius,0],[-hw+radius,hh-radius,90],
      [-hw+radius,-hh+radius,180],[hw-radius,-hh+radius,270]
    ]){
      for(let step=0;step<=8;step++){
        const a=(deg+step*90/8)*Math.PI/180;
        projected.push([cxCTA+(cx+Math.cos(a)*radius)*k,
                        cyCTA-(cy+Math.sin(a)*radius)*k]);
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


test('V6.5 camera flies diagonally toward fixed CTA with zero screen-position drift',()=>{
  assert.match(scene,/const approachXFactor=\(baseW\*\.5-buttonCenter\.x\)\*worldPerPixelPerDepth/);
  assert.match(scene,/const approachYFactor=\(buttonCenter\.y-baseH\*\.5\)\*worldPerPixelPerDepth/);
  assert.match(scene,/const cameraX=approachXFactor\*d/);
  assert.match(scene,/const cameraY=approachYFactor\*d/);
  assert.doesNotMatch(scene,/const cx=mix\(buttonCenter\.x,baseW\*\.5/);
  assert.doesNotMatch(scene,/const cy=mix\(buttonCenter\.y,baseH\*\.5/);
  for(const v of [
    {w:1440,h:900,cx:262,cy:619,bw:210,bh:48,fov:71},
    {w:390,h:844,cx:110,cy:650,bw:170,bh:44,fov:79},
    {w:320,h:568,cx:90,cy:432,bw:148,bh:42,fov:79},
  ]){
    const tan=Math.tan(v.fov*Math.PI/360);
    const dStart=1.7*v.h/(2*tan*v.bh);
    const xFactor=(v.w*.5-v.cx)*2*tan/v.h;
    const yFactor=(v.cy-v.h*.5)*2*tan/v.h;
    let previousX=Math.abs(xFactor*dStart),previousY=Math.abs(yFactor*dStart);
    for(let i=0;i<=50;i++){
      const distance=dStart+(.48-dStart)*i/50;
      const cameraX=xFactor*distance;
      const cameraY=yFactor*distance;
      const wpp=2*distance*tan/v.h;
      const screenX=v.w*.5-cameraX/wpp;
      const screenY=v.h*.5+cameraY/wpp;
      assert.ok(Math.abs(screenX-v.cx)<1e-8,'CTA must not travel horizontally');
      assert.ok(Math.abs(screenY-v.cy)<1e-8,'CTA must not travel vertically');
      assert.ok(Math.abs(cameraX)<=previousX+1e-8,
        'physical camera X should approach target axis');
      assert.ok(Math.abs(cameraY)<=previousY+1e-8,
        'physical camera Y should approach target axis');
      previousX=Math.abs(cameraX);previousY=Math.abs(cameraY);
    }
  }
});

test('camera XY bridge is continuous in value and velocity at threshold and rejoins tunnel',()=>{
  assert.match(scene,/function cameraBridge\(prog\)/);
  assert.match(scene,/const bridgeEnd=\.39,bridgeSpan=bridgeEnd-thresholdAt/);
  assert.match(scene,/approachXFactor\*velocityAtThreshold,0,u,bridgeSpan/);
  assert.match(scene,/approachYFactor\*velocityAtThreshold,0,u,bridgeSpan/);
  assert.match(scene,/camera\.position\.set\(lateral\*\(1-align\)\+bridge\.x/);
  assert.match(scene,/if\(p<bridgeEnd\)camera\.lookAt/);
  const h=(a,b,v0,v1,t,span)=>{
    const t2=t*t,t3=t2*t;
    return (2*t3-3*t2+1)*a+(t3-2*t2+t)*v0*span+
      (-2*t3+3*t2)*b+(t3-t2)*v1*span;
  };
  for(const v of [{w:1440,h:900,cx:262,cy:619},{w:390,h:844,cx:110,cy:650}]){
    const fov=v.w<700?79:71,tan=Math.tan(fov*Math.PI/360);
    const xFactor=(v.w*.5-v.cx)*2*tan/v.h;
    const yFactor=(v.cy-v.h*.5)*2*tan/v.h;
    const x0=xFactor*.48,y0=yFactor*.48,velocity=-24.2,span=.39-.235,dt=1e-6;
    for(const [factor,start] of [[xFactor,x0],[yFactor,y0]]){
      const slope=factor*velocity;
      const bridge=(p)=>h(start,0,slope,0,p/span,span);
      assert.ok(Math.abs(bridge(0)-start)<1e-10);
      assert.ok(Math.abs(bridge(span))<1e-10);
      const nearVelocity=(bridge(dt)-bridge(0))/dt;
      assert.ok(Math.abs(nearVelocity-slope)<.0015,
        'bridge must match physical lateral velocity at entrance');
      const endVelocity=(bridge(span)-bridge(span-dt))/dt;
      assert.ok(Math.abs(endVelocity)<.0015,
        'bridge must end at zero, handing off to the original tunnel');
    }
  }
});

test('subtle background parallax is isolated, capped and restored',()=>{
  for(const token of [
    'const parallaxLayers=[',
    '".opening .intro > h1"',
    '".opening .interface-wrap"',
    'originalTranslate:el.style.translate',
    'Math.max(-9,Math.min(9,',
    'function parallaxAt(prog)',
    'item.el.style.translate=',
    'item.el.style.translate=item.originalTranslate',
    'parallaxAt(prog)'
  ])assert.ok(scene.includes(token),'missing reversible parallax '+token);
  assert.doesNotMatch(scene,/trigger\.style\.translate/);
  assert.doesNotMatch(scene,/opening\.style\.transform/);
  assert.match(scene,/const originalCTAOpacity=trigger\.style\.opacity/);
  assert.match(scene,/trigger\.style\.opacity=originalCTAOpacity/);
  assert.match(scene,/DURATION=2080/);
});


test('V6.5 changes only the late optical Work approach, not the CTA entry',()=>{
  for(const marker of [
    'const workSettleStart=.68',
    'function cameraTrackBase(prog)',
    'if(prog<=workSettleStart)return cameraTrackBase(prog)',
    'const fraction=hermiteDepth(workFractionStart,1,workFractionVelocity,0,',
    'return portalDepth+exitCameraDistance*',
    'halfRad(finalFov)/(fraction*halfRad(passageFov(prog)))',
    'function passageFov(prog)',
    'const cameraX=approachXFactor*d',
    'const cameraY=approachYFactor*d',
    'const bridgeEnd=.39',
    'const thresholdDistance=.48'
  ])assert.ok(scene.includes(marker),'missing controlled optical camera '+marker);
  assert.match(nav,/import\("\.\/digital-passage-scene-v6-5\.js"\)/);
  assert.doesNotMatch(scene,/workPlane\.style\.transform=.*ease/);
  assert.match(scene,/DURATION=2080/);
});

test('projected Work growth starts C1-matched and approaches full viewport smoothly',()=>{
  const hermite=(a,b,v0,v1,u,span)=>{
    const t=Math.max(0,Math.min(1,u)),t2=t*t,t3=t2*t;
    return (2*t3-3*t2+1)*a+(t3-2*t2+t)*v0*span+
      (-2*t3+3*t2)*b+(t3-t2)*v1*span;
  };
  for(const v of [
    {w:1906,h:966,ctaH:48,fov:71},
    {w:1440,h:900,ctaH:48,fov:71},
    {w:390,h:844,ctaH:44,fov:79},
    {w:320,h:568,ctaH:42,fov:79}
  ]){
    const exitAt=.925,pivot=.68,entranceZ=-7.25;
    const portalDepth=-129;
    const finalFov=v.fov-5;
    const halfRad=deg=>Math.tan(deg*Math.PI/360);
    const ease=(a,b,p)=>{const t=Math.max(0,Math.min(1,(p-a)/(b-a)));return t*t*(3-2*t)};
    const fov=p=>v.fov-5*ease(.67,exitAt,p);
    const cameraDist=1.7*v.h/(2*halfRad(v.fov)*v.ctaH);
    const z0=entranceZ+cameraDist,z1=entranceZ+.48;
    const workHalfHeight=Math.min(3.5,4.6/(v.w/v.h));
    const exitDist=workHalfHeight/halfRad(finalFov);
    const z2=portalDepth+exitDist;
    const va=-Math.min(1.08*(z0-z1)/(.235-.006),.78*(z1-z2)/(exitAt-.235));
    const base=p=>{
      if(p<=.006)return z0;
      if(p<.235)return hermite(z0,z1,0,va,(p-.006)/(.235-.006),.235-.006);
      if(p<exitAt)return hermite(z1,z2,va,0,(p-.235)/(exitAt-.235),exitAt-.235);
      return z2;
    };
    const apparent=(z,p)=>exitDist/(z-portalDepth)*halfRad(finalFov)/halfRad(fov(p));
    const s0=apparent(base(pivot),pivot),eps=.0001;
    const v0=(apparent(base(pivot+eps),pivot+eps)-apparent(base(pivot-eps),pivot-eps))/(2*eps);
    const fraction=p=>p<=pivot?apparent(base(p),p):
      hermite(s0,1,v0,0,(p-pivot)/(exitAt-pivot),exitAt-pivot);
    const track=p=>p<=pivot?base(p):
      p>=exitAt?z2:portalDepth+exitDist*halfRad(finalFov)/(fraction(p)*halfRad(fov(p)));
    assert.ok(Math.abs(track(pivot)-base(pivot))<1e-7,'preserve position at settle start');
    const slopeLeft=(track(pivot)-track(pivot-.00001))/.00001;
    const slopeRight=(track(pivot+.00001)-track(pivot))/.00001;
    assert.ok(Math.abs(slopeLeft-slopeRight)<.25,
      'avoid a visual camera-speed kink at settle start');
    assert.ok(Math.abs(track(exitAt)-z2)<1e-8,'exact optical destination');
    let old=track(pivot);
    for(let i=1;i<=500;i++){
      const next=track(pivot+(exitAt-pivot)*i/500);
      assert.ok(next<=old+1e-6,'camera must never reverse in Work tunnel');
      old=next;
    }
    assert.ok(fraction(.80)>apparent(base(.80),.80)+.15,
      'Work should occupy more of viewport before the final beat');
    assert.ok(fraction(.85)>.75,'Work is mostly in view before the final beat');
    assert.ok(Math.abs(fraction(exitAt)-1)<1e-10);
  }
});

test('soft corner vignette persists through arrival but never stains real Work',()=>{
  for(const marker of [
    'genezisi-passage-arrival-vignette',
    'arrivalVignette.style.opacity=String(arrive*dissolve)',
    'const arrive=ease(.70,.83,prog)',
    'const dissolve=1-ease(.925,1,prog)',
    'arrivalVignette.style.opacity="0"',
    'stage.style.opacity=String(enter*leave)'
  ])assert.ok(scene.includes(marker),'missing vignette handoff: '+marker);
  assert.match(css,/\.genezisi-passage-v6-5 \.genezisi-passage-arrival-vignette/);
  assert.match(css,/pointer-events: none/);
  assert.match(css,/ellipse 76% 84%/);
  assert.doesNotMatch(css,/#work\s*\{[^}]*filter:/);
  // Fade is bounded; at the end, the overlay must be fully transparent.
  const ease=(a,b,p)=>{const t=Math.max(0,Math.min(1,(p-a)/(b-a)));return t*t*(3-2*t)};
  const alpha=p=>ease(.70,.83,p)*(1-ease(.925,1,p));
  assert.ok(alpha(.90)>.99);
  assert.ok(alpha(.96)>0&&alpha(.96)<1);
  assert.equal(alpha(1),0);
});
