/**
 * GENEZISI / SCREEN 01 — THE DIGITAL PASSAGE : DIRECTOR'S CUT
 * A world-space journey with distinct spatial chapters:
 * I. origin/ivory threshold; II. impossible structural nave;
 * III. architectural deconstruction exposing the actual #work DOM.
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
const Z_START=3.3, Z_END=-116, DURATION=2520;

export function createDigitalPassage({trigger,onCover,onFinish,onError}){
  let disposed=false,running=false,frame=0,started=0,p=0,ready=false;
  let lowFpsFrames=0,lastStamp=0;
  const rect=trigger.getBoundingClientRect();
  const origin={x:rect.left+rect.width*.5,y:rect.top+rect.height*.5};
  const baseW=window.innerWidth,baseH=window.innerHeight;
  let small=baseW<700;
  const debug=new URLSearchParams(location.search).has("passageDebug");
  const stage=document.createElement("div");
  stage.className="genezisi-passage genezisi-passage-v2";
  stage.setAttribute("aria-hidden","true");
  stage.innerHTML='<canvas class="genezisi-passage-canvas" aria-hidden="true"></canvas><div class="genezisi-passage-atmosphere" aria-hidden="true"></div>';
  const canvas=stage.querySelector("canvas");
  let renderer;
  let initialDpr=Math.min(window.devicePixelRatio||1,small?1.12:1.5);
  try{
    renderer=new THREE.WebGLRenderer({
      canvas,antialias:!small,alpha:false,depth:true,stencil:false,
      powerPreference:"high-performance",preserveDrawingBuffer:false
    });
    renderer.setPixelRatio(initialDpr);
    renderer.setSize(baseW,baseH,false);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.25;
    renderer.setClearColor(C.nocturne,1);
  }catch(err){stage.remove();throw err;}
  const scene=new THREE.Scene();
  scene.background=C.nocturne;
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

  // Arrival target focus comes from its actual DOM geometry after onCover
  // scrolls it. An iris aperture reveals the genuine, usable website.
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

  function cameraTrack(t){
    // Three carefully eased speed chapters rather than one continuous
    // linear zoom. The second movement reveals true near/far parallax.
    if(t<.27)return mix(Z_START,-20.5,ease(0,.27,t));
    if(t<.78)return mix(-20.5,-96.5,ease(.27,.78,t));
    return mix(-96.5,Z_END,ease(.78,1,t));
  }

  function revealSource(prog){
    if(prog<.20){
      // Directional octagonal aperture anchored to the clicked CTA.
      const expand=ease(.005,.20,prog);
      const rx=mix(1,baseW*1.55,expand),ry=mix(1,baseH*1.72,expand);
      const x=origin.x,y=origin.y;
      stage.style.clipPath=`polygon(
        ${x-rx}px ${y-ry*.24}px,
        ${x-rx*.62}px ${y-ry}px,
        ${x+rx*.58}px ${y-ry}px,
        ${x+rx}px ${y-ry*.32}px,
        ${x+rx}px ${y+ry*.32}px,
        ${x+rx*.64}px ${y+ry}px,
        ${x-rx*.65}px ${y+ry}px,
        ${x-rx}px ${y+ry*.31}px
      )`;
    }else{
      stage.style.clipPath="none";
    }
  }
  function revealWork(prog){
    if(prog<.795){
      stage.style.maskImage="none";
      stage.style.webkitMaskImage="none";
      return;
    }
    const t=ease(.795,.985,prog);
    const radius=Math.hypot(baseW,baseH)*1.22*t;
    const inner=Math.max(0,radius-38),outer=radius+38;
    const gradient=`radial-gradient(circle at ${arrival.x}px ${arrival.y}px,
      transparent 0px,transparent ${inner}px,#000 ${outer}px,#000 100%)`;
    stage.style.maskImage=gradient;
    stage.style.webkitMaskImage=gradient;
  }

  function render(prog,now){
    if(disposed)return;
    p=clamp(prog);
    const travel=ease(.11,.94,p);
    const z=cameraTrack(travel);
    const chapter=clamp(((-z)-8)/97);
    const drift=Math.sin(PI*travel);
    const lateral=.55*Math.sin(travel*PI*2.2)+.27*drift;
    const vertical=.16+.31*Math.sin(travel*PI*1.5);
    camera.position.set(lateral,vertical,z);
    camera.lookAt(
      .54*Math.sin((chapter+.18)*PI*1.9),
      .10+.17*Math.cos(chapter*PI),
      z-20.5
    );
    camera.rotateZ(.012*Math.sin(PI*travel*2));
    camera.fov=(small?79:71)-5*ease(.67,.94,p);
    camera.updateProjectionMatrix();

    // The palette shifts from warm ivory illumination to deep forest light,
    // finally balancing out so the real cream Work section feels native.
    const amberStrength=1-ease(.12,.42,p);
    warmLamp.intensity=7+18*amberStrength;
    mintLamp.intensity=21+17*ease(.20,.56,p);
    headlamp.position.set(lateral-2.9,vertical+3.1,z-6.5);
    mintLamp.position.set(lateral+2.4,vertical+1.4,z-15);
    warmLamp.position.set(lateral-3,vertical-1.3,z-9.0);
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
    if(!ready && p>=.23){
      ready=true;
      onCover();
      measureArrival();
    }
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
    stage.style.clipPath=`circle(0px at ${origin.x}px ${origin.y}px)`;
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
