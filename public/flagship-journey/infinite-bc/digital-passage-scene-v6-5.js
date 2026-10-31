/**
 * GENEZISI / SCREEN 01 — THE DIGITAL PASSAGE : LOCKED CONCEPT / V6.5 — APPROVED CTA / OPTICAL WORK ARRIVAL
 * A world-space journey with distinct spatial chapters:
 * I. origin/ivory threshold; II. impossible structural nave;
 * III. an actual Work-derived DOM plane approaches through the tunnel, followed by architectural deconstruction and a seamless real #work arrival.
 *
 * No screenshot plane, copied headline, compulsory scroll story, or fake Work.
 * Three.js is dynamically imported by the existing CTA navigation.
 *
 * Proof-grade rendering, pending real-browser, device and founder review.
 */
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js";

const PI=Math.PI;
const clamp=(x)=>Math.max(0,Math.min(1,x));
const mix=(a,b,t)=>a+(b-a)*t;
function ease(a,b,p){const t=clamp((p-a)/(b-a));return t*t*(3-2*t);}
const C={
  nocturne:new THREE.Color("#06140f"),
  evergreen:new THREE.Color("#173327"),
  forest:new THREE.Color("#12392d"),
  cream:new THREE.Color("#e6ded2"),
  pale:new THREE.Color("#efdfb5"),
  mint:new THREE.Color("#9de9c8")
};
const Z_START=3.3, DURATION=2080;

export function createDigitalPassage({trigger,onCover,onFinish,onError}){
  let disposed=false,running=false,frame=0,started=0,p=0,ready=false;
  let lowFpsFrames=0,lastStamp=0;
  const rect=trigger.getBoundingClientRect();
  const baseW=window.innerWidth,baseH=window.innerHeight;
  let small=baseW<700;
  const debug=new URLSearchParams(location.search).has("passageDebug");
  const stage=document.createElement("div");
  stage.className="genezisi-passage genezisi-passage-v6-5";
  stage.setAttribute("aria-hidden","true");
  stage.innerHTML='<div class="genezisi-passage-work-window" aria-hidden="true"><div class="genezisi-passage-work-plane"></div></div><canvas class="genezisi-passage-canvas" aria-hidden="true"></canvas><div class="genezisi-passage-arrival-vignette" aria-hidden="true"></div><div class="genezisi-passage-atmosphere" aria-hidden="true"></div>';
  const workWindow=stage.querySelector(".genezisi-passage-work-window");
  const workPlane=stage.querySelector(".genezisi-passage-work-plane");
  const arrivalVignette=stage.querySelector(".genezisi-passage-arrival-vignette");
  // Lock the original site in place. The measured CTA *itself* becomes
  // the expanding visual aperture. Never transform the enclosing hero:
  // scaling the page made headlines enormous in V4.
  const buttonCenter={x:rect.left+rect.width*.5,y:rect.top+rect.height*.5};
  const root=document.documentElement;
  // The CTA stays stationary and remains sharp. Rather than scaling HTML,
  // its measured rectangle calibrates an actual perspective camera looking
  // through a world-space doorway at the same projected position.
  const entranceZ=-7.25;
  const entranceWorldH=1.7;
  const entranceWorldW=entranceWorldH*Math.max(1,rect.width)/Math.max(1,rect.height);
  const initialFov=small?79:71;
  const tanInitialHalfFov=Math.tan(THREE.MathUtils.degToRad(initialFov*.5));
  const entryDistance=entranceWorldH*baseH/(2*tanInitialHalfFov*Math.max(1,rect.height));
  // Sufficient overscan at the handoff for even tall portrait layouts:
  // the projected rounded opening must cover the viewport *before* unclipping.
  const thresholdDistance=.48;
  const entryEndZ=entranceZ+thresholdDistance;
  const originalBlur=root.style.getPropertyValue("--genezisi-focus-blur");
  const originalDim=root.style.getPropertyValue("--genezisi-focus-dim");
  const originalCTAOpacity=trigger.style.opacity;
  // Restrained background parallax supplies a depth cue without scaling the
  // hero, affecting the real CTA or changing any existing layout. Translate
  // is independent of the site's existing transform animations.
  const parallaxLayers=[
    ".site-nav",
    ".opening .intro > .eyebrow",
    ".opening .intro > h1",
    ".opening .intro > p.body",
    ".opening .interface-wrap",
    ".opening .opening-foot"
  ].map(selector=>document.querySelector(selector)).filter(Boolean).map(el=>{
    const r=el.getBoundingClientRect();
    return {
      el,
      originalTranslate:el.style.translate,
      dx:Math.max(-9,Math.min(9,(r.left+r.width*.5-buttonCenter.x)*.012)),
      dy:Math.max(-9,Math.min(9,(r.top+r.height*.5-buttonCenter.y)*.012))
    };
  });
  function parallaxAt(prog){
    // Background moves subtly away from the fixed CTA as our camera flies
    // toward it. No separate layer may travel more than nine screen pixels.
    const weight=ease(.006,.16,prog)*(1-ease(.19,thresholdAt,prog));
    for(const item of parallaxLayers){
      item.el.style.translate=`${(item.dx*weight).toFixed(2)}px ${(item.dy*weight).toFixed(2)}px`;
    }
  }
  function restoreFocus(){
    // The source button is hidden only while the 3D aperture has replaced
    // its pixels. Restore even for interrupted navigation/context loss.
    trigger.style.opacity=originalCTAOpacity;
    for(const item of parallaxLayers)item.el.style.translate=item.originalTranslate;
    if(originalBlur)root.style.setProperty("--genezisi-focus-blur",originalBlur);
    else root.style.removeProperty("--genezisi-focus-blur");
    if(originalDim)root.style.setProperty("--genezisi-focus-dim",originalDim);
    else root.style.removeProperty("--genezisi-focus-dim");
    root.classList.remove("genezisi-passage-focus");
  }
  // The approaching destination is cloned from the ACTUAL Work markup.
  // It is a temporary, inert optical preview, never invented project content.
  const actualWork=document.getElementById("work");
  if(actualWork){
    const mountCopy=source=>{
      const clone=source.cloneNode(true);
      for(const el of [clone,...clone.querySelectorAll("*")]){
        el.removeAttribute("id");
        el.removeAttribute("name");
        el.removeAttribute("aria-labelledby");
        el.removeAttribute("aria-describedby");
        if(el.matches("a,button,input,select,textarea,[tabindex]")){
          el.tabIndex=-1;
          el.setAttribute("aria-hidden","true");
        }
      }
      clone.inert=true;
      clone.style.scrollMarginTop="0";
      workPlane.appendChild(clone);
    };
    mountCopy(actualWork);
    const following=actualWork.nextElementSibling;
    if(following?.classList.contains("work-preview"))mountCopy(following);
  }
  const buttonRadius=Math.max(0,Math.min(rect.height/2,30));
  const initialClip=`inset(${rect.top}px ${baseW-rect.right}px ${baseH-rect.bottom}px ${rect.left}px round ${buttonRadius}px)`;
  // The destination is a single perspective plane behind the 3D structure,
  // not a viewport-sized sheet leaking white through every transparent pixel.
  const portalDepth=-129;
  // The distant Work plane must fit INSIDE the far architectural mouth.
  // A large viewport-sized quad leaks through the void between 3D beams.
  const portalHalfH=Math.min(3.5,4.6/(baseW/baseH));
  const portalHalfW=portalHalfH*(baseW/baseH);
  // At the end the projected Work rectangle exactly fits the camera view:
  // half-height = camera distance * tan(final vertical FOV / 2).
  const finalFov=small?74:66;
  const exitCameraDistance=portalHalfH/Math.tan(THREE.MathUtils.degToRad(finalFov*.5));
  const exitZ=portalDepth+exitCameraDistance;
  const portalCorners=[
    [-portalHalfW,portalHalfH],
    [portalHalfW,portalHalfH],
    [portalHalfW,-portalHalfH],
    [-portalHalfW,-portalHalfH]
  ];
  const canvas=stage.querySelector("canvas");
  let renderer;
  let initialDpr=Math.min(window.devicePixelRatio||1,small?1.12:1.5);
  try{
    renderer=new THREE.WebGLRenderer({
      canvas,antialias:!small,alpha:true,depth:true,stencil:false,
      powerPreference:"high-performance",preserveDrawingBuffer:false
    });
    renderer.setPixelRatio(initialDpr);
    renderer.setSize(baseW,baseH,false);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.25;
    renderer.setClearColor(C.nocturne,0);
  }catch(err){stage.remove();throw err;}
  const scene=new THREE.Scene();
  scene.background=null;
  scene.fog=new THREE.FogExp2(C.nocturne,small?.016:.0122);
  const camera=new THREE.PerspectiveCamera(small?79:71,baseW/baseH,.09,230);
  camera.position.set(0,0,Z_START);

  // Intentionally restrained real-time lights: emissive edge treatments
  // provide detail without a costly shadow-map/postprocessing stack.
  scene.add(new THREE.HemisphereLight(0x92d8bb,0x03100c,1.42));
  const headlamp=new THREE.PointLight(0xe6ead1,27,31,2);
  const mintLamp=new THREE.PointLight(0x75e9b4,33,32,2);
  const warmLamp=new THREE.PointLight(0xffc68a,19,32,2);
  scene.add(headlamp,mintLamp,warmLamp);

  const structure=new THREE.MeshStandardMaterial({
    color:0x123b2e,metalness:.32,roughness:.49,
    emissive:0x071c13,emissiveIntensity:.69,flatShading:true,
    side:THREE.DoubleSide
  });
  const shadowStructure=new THREE.MeshStandardMaterial({
    color:0x081e19,metalness:.16,roughness:.68,
    emissive:0x030b09,emissiveIntensity:.4,flatShading:true,
    side:THREE.DoubleSide
  });
  const shell=new THREE.MeshStandardMaterial({
    color:C.cream,metalness:.09,roughness:.7,
    emissive:0x251e13,emissiveIntensity:.10,
    side:THREE.DoubleSide
  });
  const polished=new THREE.MeshStandardMaterial({
    color:0x32674e,metalness:.59,roughness:.25,
    emissive:0x10382b,emissiveIntensity:.72,flatShading:true
  });
  const mint=new THREE.MeshBasicMaterial({
    color:C.mint,transparent:true,opacity:.64,
    blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false
  });
  const amber=new THREE.MeshBasicMaterial({
    color:0xf7dea7,transparent:true,opacity:.65,
    blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false
  });
  const unit=new THREE.BoxGeometry(1,1,1);
  const helper=new THREE.Object3D();
  const yAxis=new THREE.Vector3(0,1,0);
  const delta=new THREE.Vector3();

  function beam(group,from,to,width,depth,mat){
    const a=new THREE.Vector3(...from),b=new THREE.Vector3(...to);
    const mesh=new THREE.Mesh(unit,mat);
    delta.subVectors(b,a);
    mesh.position.copy(a).add(b).multiplyScalar(.5);
    mesh.quaternion.setFromUnitVectors(yAxis,delta.clone().normalize());
    mesh.scale.set(width,delta.length(),depth);
    mesh.frustumCulled=false;
    group.add(mesh);
    return mesh;
  }
  function slab(group,pos,size,mat,rot=[0,0,0]){
    const mesh=new THREE.Mesh(unit,mat);
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    mesh.scale.set(...size);
    mesh.frustumCulled=false;
    group.add(mesh);return mesh;
  }
  function filament(group,points,radius,material){
    const curve=new THREE.CatmullRomCurve3(points.map(a=>new THREE.Vector3(...a)));
    const mesh=new THREE.Mesh(
      new THREE.TubeGeometry(curve,Math.min(128,points.length*4),radius,4,false),
      material
    );
    mesh.frustumCulled=false;
    group.add(mesh);
    return mesh;
  }

  // ACT 0 — The clicked CTA is optically calibrated to this real 3D rim.
  // Its rounded aperture becomes a physically thickened architectural
  // threshold through which the same THREE.Camera actually travels.
  const buttonDoor=new THREE.Group();
  scene.add(buttonDoor);
  const doorCornerSteps=8;
  // Shared geometry source of truth for the visible 3D rim and the DOM matte.
  // In contrast to V6.2's ~0.36-unit corner, the radius actually matches
  // the CTA's pill radius when seen in projection.
  function doorContour(z,offset=0){
    const hw=entranceWorldW*.5+offset;
    const hh=entranceWorldH*.5+offset;
    const radius=Math.min(hh-.018,entranceWorldH*buttonRadius/Math.max(1,rect.height)+offset);
    const corners=[
      [hw-radius,hh-radius,0],
      [-hw+radius,hh-radius,90],
      [-hw+radius,-hh+radius,180],
      [hw-radius,-hh+radius,270]
    ];
    const points=[];
    for(const [cx,cy,deg] of corners){
      for(let step=0;step<=doorCornerSteps;step++){
        const angle=(deg+step*90/doorCornerSteps)*PI/180;
        points.push(new THREE.Vector3(
          cx+radius*Math.cos(angle),
          cy+radius*Math.sin(angle),
          z
        ));
      }
    }
    return points;
  }
  function roundedOutline(z,offset=0){
    const curve=new THREE.CatmullRomCurve3(doorContour(z,offset),true,"centripetal");
    const rim=new THREE.Mesh(new THREE.TubeGeometry(curve,112,.035,5,true),mint);
    buttonDoor.add(rim);
    return rim;
  }
  // The matte includes the physical outline and its 0.035-unit tube radius.
  const apertureContour=doorContour(entranceZ,.065);
  function projectAperture(){
    camera.updateMatrixWorld(true);
    return apertureContour.map(point=>{
      const p=point.clone().project(camera);
      return [(p.x*.5+.5)*baseW,(1-(p.y*.5+.5))*baseH];
    });
  }
  function pointInPolygon(x,y,polygon){
    let inside=false;
    for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
      const a=polygon[i],b=polygon[j];
      if((a[1]>y)!==(b[1]>y) &&
         x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]){
        inside=!inside;
      }
    }
    return inside;
  }
  function apertureCoversViewport(polygon){
    const margin=12;
    return [
      [-margin,-margin],[baseW+margin,-margin],
      [baseW+margin,baseH+margin],[-margin,baseH+margin]
    ].every(([x,y])=>pointInPolygon(x,y,polygon));
  }
  const contourAtDoorway=apertureContour.map(point=>{
    const d=thresholdDistance;
    const pixelsPerUnit=baseH/(2*d*tanInitialHalfFov);
    // At the physical threshold the doorway is still screen-anchored to
    // the original CTA, not artificially centered in the viewport.
    return [buttonCenter.x+point.x*pixelsPerUnit,buttonCenter.y-point.y*pixelsPerUnit];
  });
  // Expected physical coverage at the exact threshold. Source tests also
  // verify portrait and desktop cases. An exceptional unsupported geometry
  // fails gracefully through the existing onError/direct-Work fallback.
  const canClearAtThreshold=apertureCoversViewport(contourAtDoorway);
  let apertureUnlocked=false;
  roundedOutline(entranceZ,.018);
  roundedOutline(entranceZ-.60,.12);
  // Real connecting members give the CTA ring thickness in perspective.
  for(const x of [-1,1])for(const y of [-1,1]){
    beam(buttonDoor,[x*(entranceWorldW*.5-.24),y*(entranceWorldH*.5-.24),entranceZ],
      [x*(entranceWorldW*.5-.12),y*(entranceWorldH*.5-.12),entranceZ-.60],
      .048,.072,polished);
  }

  // ACT I — Ivory originates in the page itself. A single asymmetric
  // engineered monolith creates a dramatic threshold without hinged doors.
  // The camera must pass its physical near edge before the data nave appears.
  const threshold=new THREE.Group();
  const arch=new THREE.Group();
  threshold.add(arch);scene.add(threshold);
  beam(arch,[-4.9,-4.8,-5.3],[-3.4,5.7,-8.3],2.15,2.75,shell);
  slab(arch,[3.45,.95,-7.6],[1.28,9.8,3.4],structure,[0,-.18,.19]);
  beam(arch,[-4.1,4.65,-7.5],[2.9,5.15,-8.7],1.38,2.6,shell);
  beam(arch,[2.75,-4.4,-8.1],[4.85,4.05,-8.6],.48,1.55,polished);
  beam(arch,[-3.3,-4.7,-5.6],[-2.25,4.4,-8.3],.065,.12,amber);
  beam(arch,[2.72,-4.3,-7.8],[4.81,3.9,-8.3],.075,.11,mint);
  slab(arch,[-5.5,-.2,-8.8],[2.1,10.0,5.2],shadowStructure,[0,.11,-.12]);
  slab(arch,[5.6,3.1,-10.9],[2.4,8.4,4.9],shadowStructure,[0,.08,.19]);
  // Cream upper and lower bookends provide an identifiable exit silhouette.
  beam(arch,[-6,-5.25,-10],[-1.4,-5.55,-12],.36,2.2,shell);
  beam(arch,[2.2,5.5,-10],[6.2,5.85,-12],.37,2.3,shell);

  // ACT II — The Impossible Nave. Alternating asymmetrical buttresses
  // surround a large central void; changing spans, skew and rhythm avoid
  // mechanically repeated complete rectangular or decagonal tunnel frames.
  const nave=new THREE.Group();scene.add(nave);
  const naveRibs=new THREE.Group();nave.add(naveRibs);
  const chapterDepths=[-18,-27,-39,-54,-69,-83,-96];
  const chapters=[];
  function axis(i){
    return {x:.6*Math.sin(i*.66)-.19*Math.sin(i*1.3),
            y:.23*Math.sin(i*.46)};
  }
  chapterDepths.forEach((z,i)=>{
    const chapter=new THREE.Group();
    chapter.position.z=z;
    const center=axis(i);
    const width=i<=1?4.3:i<=3?6.6:i<=5?7.6:5.4;
    const height=i<=1?4.0:i<=3?6.9:i<=5?8.1:5.7;
    const lean=((i%2)?1:-1);
    chapter.position.x=center.x;
    chapter.position.y=center.y;
    chapter.rotation.z=lean*(.025+.014*i);
    // Each structural chapter has unequal left/right mass and a single
    // bridging cantilever. They are not closed "nested picture frames".
    beam(chapter,[-width,-height,0],
      [-width*.81,height*.76,-1.6],.33+.14*(i%3),1.2,structure);
    beam(chapter,[width*.95,-height*.67,-.6],
      [width*.86,height*.96,1.8],.27+.1*(i%2),1.0,structure);
    beam(chapter,[-width*.83,height*.83,-1.6],
      [width*.15,height*1.03,.9],.32,1.2,polished);
    slab(chapter,[-width*1.12,-height*.1,-.4],[1.75,height*1.5,2.8],
      shadowStructure,[.14,lean*.2,lean*.085]);
    slab(chapter,[width*1.13,height*.32,.6],[1.1,height*.72,3.25],
      shadowStructure,[-.1,-lean*.23,.12]);
    // Discontinuous luminous seams: integrated into geometry, never
    // arbitrary glowing outline around every object.
    beam(chapter,[-width*.83,height*.72,-1.56],
      [width*.04,height*.94,.84],.037,.052,i%3===0?amber:mint);
    beam(chapter,[width*.87,-height*.55,-.55],
      [width*.79,height*.80,1.75],.025,.065,mint);
    naveRibs.add(chapter);chapters.push(chapter);
  });

  // Ultra-large central void. Two massive suspended structural wings
  // form the signature mid-shot while the camera passes underneath.
  const wings=new THREE.Group();nave.add(wings);
  slab(wings,[-8.3,4.0,-53.0],[6.7,.7,22.0],structure,[.07,-.18,.14]);
  slab(wings,[8.9,-2.8,-65.5],[5.1,1.1,26],structure,[-.19,.28,-.12]);
  slab(wings,[-6.4,-7.4,-67.3],[4.2,.72,20],polished,[.11,.07,-.20]);
  slab(wings,[5.5,7.8,-54.5],[3.8,.75,19],shadowStructure,[.12,-.21,.19]);

  // A continuous code-like *flow*, not a literal Matrix code rain: curved
  // transmission filaments physically suspended through three-dimensional
  // space and illuminated by moving packets.
  const network=new THREE.Group();nave.add(network);
  const wires=[];
  for(let line=0;line<(small?14:23);line++){
    const theta=(line/(small?14:23))*PI*2+.11;
    const points=[];
    for(let k=0;k<=45;k++){
      const t=k/45;
      const z=-14-t*93;
      const swelling=4.1+3.0*Math.sin(PI*t)*Math.sin(PI*t);
      const turn=theta+.10*Math.sin(t*PI*3+line*.22);
      points.push([
        .5*Math.sin(t*PI*2)+swelling*Math.cos(turn),
        .21*Math.sin(5*t+line)+swelling*.78*Math.sin(turn),
        z
      ]);
    }
    wires.push(filament(network,points,line%7===0?.034:.012,
      line%6===0?amber:mint));
  }
  // Long physical light blades mark transitions between big spaces.
  const bladeGroup=new THREE.Group();nave.add(bladeGroup);
  const blades=[];
  for(let k=0;k<11;k++){
    const z=-23-k*6.8;
    const radius=6+1.6*Math.sin(k*.45);
    const a=k*2.399963229728653;
    const m=slab(bladeGroup,
      [Math.cos(a)*radius,Math.sin(a)*radius*.8,z],
      [k%3===0?.10:.046,2.4+k%4*1.1,.06],
      k%5===0?amber:mint,[.23*Math.sin(a),-.16*Math.cos(a),a]);
    blades.push(m);
  }

  // Slowly drifting luminous parcels: real world-space instances, no
  // fullscreen particles or browser text. Budget scales by viewport.
  const signalsCount=small?64:115;
  const signals=new THREE.InstancedMesh(
    new THREE.BoxGeometry(.033,.039,1.1),
    new THREE.MeshBasicMaterial({
      color:0xc4fbd5,transparent:true,opacity:.68,
      blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false
    }),
    signalsCount
  );
  signals.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  signals.frustumCulled=false;
  nave.add(signals);
  function signalsAt(time,prog){
    const t=time*.001;
    for(let i=0;i<signalsCount;i++){
      const path=((i*7)%23)/23*2*PI;
      const run=(i*3.75+t*(14+i%7))%99;
      const z=-13-run,along=run/99;
      const radius=4.1+2.8*Math.sin(PI*along)**2;
      helper.position.set(
        .5*Math.sin(along*2*PI)+radius*Math.cos(path+along*.1),
        radius*.78*Math.sin(path+along*.1),
        z
      );
      helper.rotation.set(0,0,0);
      helper.scale.set(1,1,1+(i%4)*.6);
      helper.updateMatrix();
      signals.setMatrixAt(i,helper.matrix);
    }
    signals.instanceMatrix.needsUpdate=true;
    signals.material.opacity=.36+.30*ease(.20,.55,prog);
  }

  // Purpose-built light sheets. Depth is provided by the world and fog,
  // not by a fullscreen "bloom" that may wash out the premium material.
  const veilMaterial=new THREE.ShaderMaterial({
    uniforms:{uClock:{value:0},uStrength:{value:.21}},
    vertexShader:/* glsl */ `
      varying vec2 vUv;
      void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}
    `,
    fragmentShader:/* glsl */ `
      varying vec2 vUv;
      uniform float uClock;
      uniform float uStrength;
      void main(){
        float center=pow(max(0.,1.-abs(vUv.x-.5)*2.),3.1);
        float edge=smoothstep(.02,.31,vUv.y)*(1.-smoothstep(.75,.98,vUv.y));
        float shimmer=.91+.09*sin(vUv.y*15.-uClock*1.9);
        gl_FragColor=vec4(.22,.78,.58,center*edge*shimmer*uStrength);
      }
    `,
    transparent:true,depthWrite:false,side:THREE.DoubleSide,
    blending:THREE.AdditiveBlending
  });
  const veils=[];
  for(let i=0;i<4;i++){
    const m=new THREE.Mesh(new THREE.PlaneGeometry(8.6,13.5),veilMaterial);
    m.position.set(i%2?-5.9:5.9,(i-1)*1.1,-32-i*19);
    m.rotation.y=(i%2?.34:-.34);
    nave.add(m);veils.push(m);
  }

  // ACT III — Resolution. These real spatial components slide out of the
  // arrival sightline; a mathematically controlled iris reveals the actual
  // already-scrolled Work DOM through the WebGL stage, not a copied texture.
  const resolution=new THREE.Group();
  resolution.position.z=-111;scene.add(resolution);
  const leaves=[];
  const endPieces=[
    {pos:[-5.4,0,0],size:[2.5,16,5],rot:[0,.1,.19],sign:-1},
    {pos:[5.4,0,0],size:[2.8,16,5],rot:[0,-.16,-.13],sign:1},
    {pos:[0,7.4,0],size:[15,1.8,4],rot:[-.11,0,-.05],sign:-1},
    {pos:[0,-7.7,0],size:[16,1.7,4],rot:[.15,0,.10],sign:1}
  ];
  for(let i=0;i<endPieces.length;i++){
    const a=endPieces[i],mesh=slab(resolution,a.pos,a.size,i%2?structure:polished,a.rot);
    leaves.push({mesh,base:mesh.position.clone(),sign:a.sign,idx:i});
  }
  beam(resolution,[-3.9,-4.1,.4],[-4.3,4.1,.4],.045,.11,amber);
  beam(resolution,[4.0,-4.4,.4],[4.3,4.2,.4],.04,.12,mint);

  // Final iris uses the actual Work geometry after source scroll.
  const work=document.getElementById("work");
  const landingHeading=work?.querySelector("h2");
  let arrival={x:baseW*.45,y:baseH*.48};
  function measureArrival(){
    if(!landingHeading)return;
    const r=landingHeading.getBoundingClientRect();
    arrival={
      x:Math.max(40,Math.min(baseW-40,r.left+r.width*.53)),
      y:Math.max(40,Math.min(baseH-40,r.top+r.height*.45))
    };
  }

  // One continuous easing curve. No artificial slowdowns at chapter boundaries.
  // Perspective dolly that begins with the actual button's screen geometry,
  // approaches a genuine world-space frame, and continues *through* it.
  // Monotonic depth avoids the fake near/far motion from earlier CSS scaling.
  // Continuous (C1) world-space movement at the actual threshold.
  // V6.1 eased to zero at p=.235 and began the next ease from zero,
  // creating a perceptible hesitation. Matched Hermite tangents remove it.
  const entryStartZ=entranceZ+entryDistance;
  const entryStart=.006,thresholdAt=.235,exitAt=.925;
  const entrySpan=thresholdAt-entryStart,passageSpan=exitAt-thresholdAt;
  const velocityAtThreshold=-Math.min(
    1.08*(entryStartZ-entryEndZ)/entrySpan,
    .78*(entryEndZ-exitZ)/passageSpan
  );
  function hermiteDepth(a,b,startVelocity,endVelocity,u,span){
    const t=clamp(u),t2=t*t,t3=t2*t;
    return (2*t3-3*t2+1)*a+(t3-2*t2+t)*startVelocity*span+
      (-2*t3+3*t2)*b+(t3-t2)*endVelocity*span;
  }
  // APPROVED V6.4 camera, unchanged through the CTA and most of the nave.
  function cameraTrackBase(prog){
    if(prog<=entryStart)return entryStartZ;
    if(prog<thresholdAt){
      return hermiteDepth(entryStartZ,entryEndZ,0,velocityAtThreshold,
        (prog-entryStart)/entrySpan,entrySpan);
    }
    if(prog<exitAt){
      return hermiteDepth(entryEndZ,exitZ,velocityAtThreshold,0,
        (prog-thresholdAt)/passageSpan,passageSpan);
    }
    return exitZ;
  }
  const workSettleStart=.68;
  const halfRad=deg=>Math.tan(THREE.MathUtils.degToRad(deg*.5));
  function passageFov(prog){
    return initialFov-5*ease(.67,exitAt,prog);
  }
  function apparentWorkFraction(z,prog){
    // Exact perspective occupancy, accounting for the changing camera FOV.
    return exitCameraDistance/(z-portalDepth)*
      halfRad(finalFov)/halfRad(passageFov(prog));
  }
  const workFractionStart=apparentWorkFraction(
    cameraTrackBase(workSettleStart),workSettleStart);
  const workDerivativeEpsilon=.0001;
  const workFractionVelocity=(
    apparentWorkFraction(cameraTrackBase(workSettleStart+workDerivativeEpsilon),
      workSettleStart+workDerivativeEpsilon)-
    apparentWorkFraction(cameraTrackBase(workSettleStart-workDerivativeEpsilon),
      workSettleStart-workDerivativeEpsilon)
  )/(2*workDerivativeEpsilon);
  function cameraTrack(prog){
    if(prog<=workSettleStart)return cameraTrackBase(prog);
    if(prog>=exitAt)return exitZ;
    // Instead of letting the last few metres suddenly magnify the Work
    // card, ease its SCREEN OCCUPANCY from the existing camera's size and
    // velocity. Solve the required real camera Z from perspective.
    // Position/velocity match at .68, Work fills at .925 with zero velocity.
    const span=exitAt-workSettleStart;
    const fullySmoothed=hermiteDepth(workFractionStart,1,workFractionVelocity,0,
      (prog-workSettleStart)/span,span);
    // Retain some of the approved original travel: a conservative 72%
    // optical correction, not a completely new accelerated finale.
    const original=apparentWorkFraction(cameraTrackBase(prog),prog);
    const fraction=mix(original,fullySmoothed,.72);
    return portalDepth+exitCameraDistance*
      halfRad(finalFov)/(fraction*halfRad(passageFov(prog)));
  }
  // The actual camera travels diagonally toward a stationary doorway.
  // As camera depth closes, its X/Y converge on the world-space CTA target;
  // meanwhile the doorway projects to the SAME original CTA pixel center.
  const worldPerPixelPerDepth=2*tanInitialHalfFov/baseH;
  const approachXFactor=(baseW*.5-buttonCenter.x)*worldPerPixelPerDepth;
  const approachYFactor=(buttonCenter.y-baseH*.5)*worldPerPixelPerDepth;
  const thresholdCameraX=approachXFactor*thresholdDistance;
  const thresholdCameraY=approachYFactor*thresholdDistance;
  const bridgeEnd=.39,bridgeSpan=bridgeEnd-thresholdAt;
  function cameraBridge(prog){
    const u=(prog-thresholdAt)/bridgeSpan;
    // Match lateral velocity at the threshold and converge to the
    // untouched passage camera rig before the tunnel's middle chapter.
    return {
      x:hermiteDepth(thresholdCameraX,0,
        approachXFactor*velocityAtThreshold,0,u,bridgeSpan),
      y:hermiteDepth(thresholdCameraY,0,
        approachYFactor*velocityAtThreshold,0,u,bridgeSpan)
    };
  }

  function revealSource(prog){
    // V6.3 owns one optical surface: both the 3D rim and the DOM matte
    // come from the same actual world-space contour and camera projection.
    // Release only after physical viewport coverage, never by a percent cut.
    if(!apertureUnlocked){
      if(prog>=thresholdAt){
        // Also handles debug seeking directly past the threshold or a frame
        // skip on a slow device; threshold coverage was solved separately.
        if(!canClearAtThreshold)
          throw new Error("CTA doorway cannot safely cover this viewport");
        apertureUnlocked=true;
        stage.style.clipPath="none";
      }else{
        const polygon=projectAperture();
        if(apertureCoversViewport(polygon)){
          apertureUnlocked=true;
          stage.style.clipPath="none";
        }else{
          stage.style.clipPath="polygon("+polygon.map(
            ([x,y])=>`${x.toFixed(2)}px ${y.toFixed(2)}px`
          ).join(",")+")";
        }
      }
    }
    if(prog>=thresholdAt){
      restoreFocus();
      return;
    }
    root.classList.add("genezisi-passage-focus");
    parallaxAt(prog);
    const focus=ease(.007,.072,prog)*(1-ease(.15,thresholdAt,prog));
    root.style.setProperty("--genezisi-focus-blur",`${(small?4.5:7.2)*focus}px`);
    root.style.setProperty("--genezisi-focus-dim",String(1-.14*focus));
    trigger.style.opacity=String(1-ease(.025,.075,prog));
  }
  let liveTop=0;
  function approachWork(prog){
    // No arbitrary final screen enlargement. The only driver of Work scale
    // is the SAME perspective projection that renders the architecture.
    // End camera position/FOV are solved to make the portal span exactly
    // one viewport, so the temporary DOM copy and real #work coincide.
    if(prog<.23){workWindow.style.opacity="0";return;}
    camera.updateMatrixWorld(true);
    const projected=portalCorners.map(([x,y])=>{
      const q=new THREE.Vector3(x,y,portalDepth).project(camera);
      return [(q.x*.5+.5)*baseW,(-q.y*.5+.5)*baseH];
    });
    const xmin=Math.min(...projected.map(q=>q[0]));
    const ymin=Math.min(...projected.map(q=>q[1]));
    const xmax=Math.max(...projected.map(q=>q[0]));
    const ymax=Math.max(...projected.map(q=>q[1]));
    const width=Math.max(1,xmax-xmin);
    const height=Math.max(1,ymax-ymin);
    // The target's existing 15px scroll-margin is not ignored at handoff.
    // Compensate gently only once the preview is almost viewport-sized.
    const yOffset=liveTop*ease(.87,.95,prog);
    const corners=projected.map(([x,y])=>[x,y+yOffset]);
    workWindow.style.opacity=String(ease(.23,.34,prog));
    workWindow.style.clipPath="polygon("+corners.map(([x,y])=>`${x}px ${y}px`).join(",")+")";
    workPlane.style.transform=`translate3d(${xmin}px,${ymin+yOffset}px,0) scale(${width/baseW},${height/baseH})`;
  }
  function revealWork(prog){
    // Preserve the approved entrance and the exact real-Work crossfade.
    const enter=ease(.025,.075,prog);
    const leave=1-ease(.955,1,prog);
    stage.style.opacity=String(enter*leave);
    // A restrained foreground vignette holds the Work card's softened
    // corners while it fills the screen, and dissipates entirely by the
    // first interactive frame. It never masks or modifies the real #work.
    const arrive=ease(.70,.83,prog);
    const dissolve=1-ease(.925,1,prog);
    arrivalVignette.style.opacity=String(arrive*dissolve);
  }

  function render(prog,now){
    if(disposed)return;
    p=clamp(prog);
    const travel=ease(.235,.925,p);
    const z=cameraTrack(p);
    const chapter=clamp(((-z)-8)/97);
    const drift=Math.sin(PI*travel);
    const lateral=.55*Math.sin(travel*PI*2.2)+.27*drift;
    const vertical=(.16+.31*Math.sin(travel*PI*1.5))*ease(.235,.35,p);
    const align=ease(.77,.925,p);
    if(p<thresholdAt){
      const d=Math.max(.01,z-entranceZ);
      // NO optical recenter: the physical doorway stays at buttonCenter
      // while the camera's own world-space X/Y and Z move toward its axis.
      const cameraX=approachXFactor*d;
      const cameraY=approachYFactor*d;
      camera.position.set(cameraX,cameraY,z);
      camera.lookAt(cameraX,cameraY,z-20);
      camera.fov=initialFov;
    }else{
      const bridge=cameraBridge(p);
      camera.position.set(lateral*(1-align)+bridge.x,
        vertical*(1-align)+bridge.y,z);
      const targetX=.54*Math.sin((chapter+.18)*PI*1.9);
      const targetY=.10+.17*Math.cos(chapter*PI);
      const aim=ease(thresholdAt,bridgeEnd,p);
      // At the threshold, aim straight ahead as on the approach.
      // By .39, rejoin the untouched architecture camera direction.
      if(p<bridgeEnd)camera.lookAt(
        mix(camera.position.x,targetX,aim),
        mix(camera.position.y,targetY,aim),z-20.5);
      else camera.lookAt(targetX*(1-align),targetY*(1-align),z-20.5);
      camera.rotateZ(.012*Math.sin(PI*travel*2)*(1-align));
      camera.fov=passageFov(p);
    }
    camera.updateProjectionMatrix();
    // The palette shifts from warm ivory illumination to deep forest light,
    // finally balancing out so the real cream Work section feels native.
    const amberStrength=1-ease(.12,.42,p);
    warmLamp.intensity=7+18*amberStrength;
    mintLamp.intensity=21+17*ease(.20,.56,p);
    headlamp.position.set(camera.position.x-2.9,camera.position.y+3.1,z-6.5);
    mintLamp.position.set(camera.position.x+2.4,camera.position.y+1.4,z-15);
    warmLamp.position.set(camera.position.x-3,camera.position.y-1.3,z-9.0);
    scene.fog.density=(small?.016:.0122)-.003*ease(.29,.59,p);

    const thresholdExit=ease(.12,.35,p);
    threshold.position.x=-3.3*thresholdExit;
    threshold.rotation.y=-.12*thresholdExit;
    shell.color.copy(C.cream).lerp(C.evergreen,ease(.11,.42,p));
    const ex=ease(.76,.95,p);
    // Structural resolution is not simply a fade: genuine meshes part and
    // leave the line of sight as the real website becomes visible.
    for(const leaf of leaves){
      const i=leaf.idx,move=(i<2?10.0:8.5)*ex*leaf.sign;
      leaf.mesh.position.copy(leaf.base);
      if(i<2)leaf.mesh.position.x+=move;
      else leaf.mesh.position.y+=move;
      leaf.mesh.rotation.z+=(i%2?-.20:.17)*ex;
    }
    resolution.scale.setScalar(1+.11*ex);
    resolution.rotation.z=.065*ex;

    signalsAt(now,p);
    veilMaterial.uniforms.uClock.value=now*.001;
    veilMaterial.uniforms.uStrength.value=.10+.21*ease(.23,.53,p);
    revealSource(p);
    if(!ready && p>=.245){
      ready=true;
      onCover();
      // Read live Work's eventual target placement once rather than
      // forcing layout every animation frame.
      liveTop=actualWork?.getBoundingClientRect().top||0;
      measureArrival();
    }
    approachWork(p);
    revealWork(p);
    renderer.render(scene,camera);
    if(debug&&window.__genezisiPassage){
      window.__genezisiPassage.stats={
        drawCalls:renderer.info.render.calls,
        triangles:renderer.info.render.triangles,
        pixelRatio:renderer.getPixelRatio(),
        progress:p
      };
    }
  }

  function dispose(){
    if(disposed)return;
    disposed=true;running=false;
    cancelAnimationFrame(frame);
    stage.removeEventListener("pointerdown",interrupt);
    window.removeEventListener("wheel",interrupt);
    window.removeEventListener("touchstart",interrupt);
    window.removeEventListener("keydown",onKey);
    window.removeEventListener("resize",onResize);
    window.removeEventListener("pagehide",interrupt);
    document.removeEventListener("visibilitychange",onVisibility);
    canvas.removeEventListener("webglcontextlost",onContextLost);
    restoreFocus(); // Also covers Escape, context loss, Back and resize.
    document.documentElement.classList.remove("genezisi-passage-active");
    if(debug)delete window.__genezisiPassage;
    const geometries=new Set(),materials=new Set(),instances=[];
    scene.traverse(obj=>{
      if(obj.geometry)geometries.add(obj.geometry);
      if(obj.material)
        for(const m of (Array.isArray(obj.material)?obj.material:[obj.material]))
          materials.add(m);
      if(obj.isInstancedMesh)instances.push(obj);
    });
    for(const im of instances)im.dispose();
    for(const g of geometries)g.dispose();
    for(const m of materials)m.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    stage.remove();
  }
  function interrupt(){if(!disposed)onFinish();}
  function failure(e){if(!disposed)onError(e);}
  function onKey(e){
    if(["Escape","Tab","Enter"," ","ArrowDown","ArrowUp",
      "PageDown","PageUp","Home","End"].includes(e.key))interrupt();
  }
  function onVisibility(){if(document.hidden)interrupt();}
  function onContextLost(e){e.preventDefault();failure(new Error("WebGL context lost"));}
  function onResize(){
    if(disposed)return;
    if(Math.abs(window.innerWidth-baseW)>48||
       Math.abs(window.innerHeight-baseH)>90){interrupt();return;}
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight,false);
  }

  function tick(now){
    if(disposed||!running)return;
    if(!started)started=now;
    // Three seconds of stalled GPU must never trap a visitor.
    const elapsed=Math.min(DURATION+400,now-started);
    const pos=debug&&window.__genezisiPassage?.paused?p:clamp(elapsed/DURATION);
    try{
      if(lastStamp && now-lastStamp>29 && ++lowFpsFrames>12 &&
         renderer.getPixelRatio()>1){
        renderer.setPixelRatio(1);
        renderer.setSize(window.innerWidth,window.innerHeight,false);
        lowFpsFrames=0;
      }else if(lastStamp && now-lastStamp<22){
        lowFpsFrames=Math.max(0,lowFpsFrames-1);
      }
      lastStamp=now;
      render(pos,now);
      if(pos>=1){interrupt();return;}
      frame=requestAnimationFrame(tick);
    }catch(err){failure(err);}
  }
  function start(){
    if(disposed||running)return;
    stage.style.clipPath=initialClip;
    stage.style.opacity="0";
    arrivalVignette.style.opacity="0";
    apertureUnlocked=false;
    root.classList.add("genezisi-passage-focus");
    document.body.appendChild(stage);
    document.documentElement.classList.add("genezisi-passage-active");
    stage.addEventListener("pointerdown",interrupt);
    canvas.addEventListener("webglcontextlost",onContextLost,false);
    window.addEventListener("wheel",interrupt,{passive:true});
    window.addEventListener("touchstart",interrupt,{passive:true});
    window.addEventListener("keydown",onKey);
    window.addEventListener("resize",onResize);
    window.addEventListener("pagehide",interrupt);
    document.addEventListener("visibilitychange",onVisibility);
    if(debug)window.__genezisiPassage={
      get progress(){return p;},
      get revision(){return THREE.REVISION;},
      paused:false,stats:null,
      seek(v){this.paused=true;render(Number(v),performance.now());},
      resume(){this.paused=false;started=performance.now()-p*DURATION;}
    };
    running=true;
    frame=requestAnimationFrame(tick);
  }
  return {start,dispose};
}
