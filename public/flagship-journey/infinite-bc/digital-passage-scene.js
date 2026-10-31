/* GENEZISI — DIGITAL PASSAGE / native-geometry edition.
 * Three.js r186.1 pinned for the isolated static prototype. 3D, not a screenshot
 * tunnel. Procedural architectural strata + luminous transport filaments.
 * All text, Work content, links and navigation remain in the original DOM.
 * D0/D4 candidate; neither visual acceptance nor a production integration.
 */
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js";

const PI = Math.PI;
const clamp = x => Math.max(0, Math.min(1, x));
const smooth = (a,b,x) => { const t=clamp((x-a)/(b-a)); return t*t*(3-2*t); };
const lerp = (a,b,t) => a+(b-a)*t;
const PAPER = new THREE.Color("#e6ded2");
const FOREST = new THREE.Color("#173327");
const VOLUME = new THREE.Color("#07160f");
const MINT = new THREE.Color("#9be5c0");
const tempV = new THREE.Vector3();
const dirY = new THREE.Vector3(0,1,0);

export function createDigitalPassage({trigger,onCover,onFinish,onError}) {
  const desktop = () => window.innerWidth >= 700;
  let mobile = !desktop();
  const source = trigger.getBoundingClientRect();
  const initialWidth=window.innerWidth, initialHeight=window.innerHeight;
  const ox = source.left + source.width * .50;
  const oy = source.top + source.height * .50;
  let disposed = false, running = false, raf=0, started=0, progress=0, covered=false;
  
  const debug = new URLSearchParams(location.search).has("passageDebug");
  const stage = document.createElement("div");
  stage.className = "genezisi-passage";
  stage.setAttribute("aria-hidden","true");
  stage.innerHTML = [
    '<canvas class="genezisi-passage-canvas"></canvas>',
    '<div class="genezisi-passage-grain"></div>',
    '<div class="genezisi-passage-top"><span>G / 01</span><span>DIGITAL PASSAGE — SELECTED WORK</span></div>',
    '<div class="genezisi-passage-bottom"><span>ENTERING THE WORK</span><i></i><span class="genezisi-passage-number">00</span></div>'
  ].join("");
  const canvas=stage.querySelector("canvas");
  const count=stage.querySelector(".genezisi-passage-number");
  const measure = () => Math.min(window.devicePixelRatio||1,mobile?1.15:1.5);
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas, antialias:desktop(), alpha:false, stencil:false,
      depth:true, powerPreference:"high-performance"
    });
    renderer.setPixelRatio(measure());
    renderer.setSize(window.innerWidth,window.innerHeight,false);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.55;
    renderer.setClearColor(VOLUME,1);
  } catch(e) { stage.remove(); throw e; }

  const scene = new THREE.Scene();
  scene.background=VOLUME;
  scene.fog=new THREE.FogExp2(VOLUME, mobile?.016:.0128);
  const camera = new THREE.PerspectiveCamera(mobile?77:69,window.innerWidth/window.innerHeight,.08,195);
  camera.position.set(0,0,3.1);
  camera.lookAt(0,0,-40);

  const ambient=new THREE.HemisphereLight(0x8ad8ae,0x03120d,1.25);
  scene.add(ambient);
  const guideLight=new THREE.PointLight(0x90ffcc,42,28,2);
  const amberLight=new THREE.PointLight(0xffe0a9,23,22,2);
  const tailLight=new THREE.PointLight(0x4aab83,26,36,2);
  guideLight.position.set(-2.7,2.4,1);
  amberLight.position.set(2.4,-1.4,-10);
  tailLight.position.set(1.2,3,-25);
  scene.add(guideLight,amberLight,tailLight);

  const ribMaterial = new THREE.MeshStandardMaterial({
    color:0x1c4334, metalness:.42, roughness:.34,
    emissive:0x071a10, emissiveIntensity:.78, flatShading:true
  });
  const darkMaterial = new THREE.MeshStandardMaterial({
    color:0x102e24, metalness:.27, roughness:.54,
    emissive:0x061710, emissiveIntensity:.43, flatShading:true,
    side:THREE.DoubleSide
  });
  const ivoryMaterial = new THREE.MeshStandardMaterial({
    color:PAPER,metalness:.12,roughness:.42,emissive:0x14221b,
    emissiveIntensity:.20,flatShading:true
  });
  const hazeMaterial = new THREE.ShaderMaterial({
    uniforms:{uStrength:{value:.50},uTime:{value:0}},
    vertexShader:/* glsl */ `
      varying vec2 vUv;
      void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}
    `,
    fragmentShader:/* glsl */ `
      varying vec2 vUv;
      uniform float uStrength;
      uniform float uTime;
      void main(){
        float x=abs(vUv.x-.5)*2.;
        float core=pow(max(0.,1.-x),4.);
        float edge=smoothstep(0.,.25,vUv.y)*(1.-smoothstep(.70,1.,vUv.y));
        float wave=.90+.10*sin(vUv.y*19.-uTime*1.7);
        float a=core*edge*wave*uStrength;
        gl_FragColor=vec4(.22,.84,.58,a);
      }
    `,
    transparent:true,depthWrite:false,side:THREE.DoubleSide,
    blending:THREE.AdditiveBlending
  });

  // The 10-sided vault is slightly asymmetric and advances on a changing
  // centerline. It reads as interlocking digital architecture, not identical
  // rectangular door frames nested inside one another.
  const SIDES=10, ROWS=17, GAP=7.45;
  const centerX=i=>.54*Math.sin(i*.46)+.22*Math.sin(i*.17+1.1);
  const centerY=i=>.18*Math.cos(i*.51);
  const ringPoint=(i,s,radius=1)=>{
    const a=(s/SIDES)*2*PI+.035*Math.sin(i*.47);
    const wav=1+.065*Math.sin(i*.71+s*1.73);
    const x=Math.cos(a)*3.78*wav*radius;
    const y=Math.sin(a)*3.02*(1+.055*Math.cos(i*.55))*radius;
    return new THREE.Vector3(x+centerX(i),y+centerY(i),-4-i*GAP);
  };

  const d=new THREE.Object3D();
  const unitBox=new THREE.BoxGeometry(1,1,1);
  function setSegment(inst,index,a,b,thick,depth){
    tempV.subVectors(b,a);
    d.position.copy(a).add(b).multiplyScalar(.5);
    d.quaternion.setFromUnitVectors(dirY,tempV.clone().normalize());
    d.scale.set(thick,tempV.length(),depth);
    d.updateMatrix();
    inst.setMatrixAt(index,d.matrix);
  }

  const ribs = new THREE.InstancedMesh(unitBox,ribMaterial,ROWS*SIDES);
  const threshold = new THREE.InstancedMesh(unitBox,ivoryMaterial,SIDES);
  ribs.instanceMatrix.setUsage(THREE.StaticDrawUsage);
  for(let i=0;i<ROWS;i++){
    for(let s=0;s<SIDES;s++){
      const a=ringPoint(i,s),b=ringPoint(i,(s+1)%SIDES);
      setSegment(ribs,i*SIDES+s,a,b,
        .19+(i%4===0?.12:0),.27+(i%3===0?.18:0));
      if(i===0) {
        setSegment(threshold,s,ringPoint(0,s,1.035),ringPoint(0,(s+1)%SIDES,1.035),.105,.135);
      }
    }
  }
  ribs.instanceMatrix.needsUpdate=true;
  threshold.instanceMatrix.needsUpdate=true;
  ribs.frustumCulled=false;
  threshold.frustumCulled=false;
  scene.add(ribs,threshold);

  // Large asymmetric architectural plates: dense silhouette near the
  // camera, porous deeper in the passage. They are actual 3D occluders.
  const PANEL_COUNT=ROWS*5;
  const panels=new THREE.InstancedMesh(unitBox,darkMaterial,PANEL_COUNT);
  for(let i=0;i<ROWS;i++){
    for(let j=0;j<5;j++){
      const a=(j/5)*2*PI+.26+(i%2)*.28;
      const radial=4.65+.2*Math.sin(i*1.7+j);
      const center=new THREE.Vector3(
        centerX(i)+Math.cos(a)*radial,
        centerY(i)+Math.sin(a)*radial*.78,
        -4-i*GAP-(j%2)*1.8
      );
      d.position.copy(center);
      d.rotation.set(.08*Math.sin(i),-.28*Math.cos(a),a+.24*Math.sin(i*.44+j));
      d.quaternion.setFromEuler(d.rotation);
      d.scale.set((j%3===0?1.7:1.15),.075+(j%2)*.08,2.0+(i%3)*.65);
      d.updateMatrix();
      panels.setMatrixAt(i*5+j,d.matrix);
    }
  }
  panels.instanceMatrix.needsUpdate=true;
  panels.frustumCulled=false;
  scene.add(panels);

  // Transport filaments weave continuously through vault bays. Curved
  // TubeGeometry supplies real highlights, perspective and parallax.
  const fibers=[];
  const mintLine = new THREE.MeshBasicMaterial({
    color:0x79dca9,transparent:true,opacity:.57,
    blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false
  });
  const warmLine = new THREE.MeshBasicMaterial({
    color:0xe3d3a3,transparent:true,opacity:.32,
    blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false
  });
  for(let lane=0;lane<16;lane++){
    const pts=[];
    const a=2*PI*lane/16;
    for(let t=0;t<=84;t++){
      const pos=t/84*(ROWS-1),i=Math.min(ROWS-1,Math.floor(pos));
      const x=centerX(pos)+Math.cos(a+pos*.025)*3.50;
      const y=centerY(pos)+Math.sin(a+pos*.025)*2.81;
      pts.push(new THREE.Vector3(x,y,-4-pos*GAP));
    }
    const curve=new THREE.CatmullRomCurve3(pts);
    const geometry=new THREE.TubeGeometry(curve,128,lane%4===0?.023:.011,3,false);
    const fiber=new THREE.Mesh(geometry,lane%5===0?warmLine:mintLine);
    fiber.frustumCulled=false;
    scene.add(fiber);fibers.push(fiber);
  }

  // Moving packets of light, independent of camera dolly. Each has its own
  // spatial location and streak length, avoiding a fake screen-space overlay.
  const SIGNALS=mobile?95:185;
  const packetMat=new THREE.MeshBasicMaterial({
    color:0xc8ffe2,transparent:true,opacity:.83,
    blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false
  });
  const packets=new THREE.InstancedMesh(new THREE.BoxGeometry(.027,.031,.58),packetMat,SIGNALS);
  packets.frustumCulled=false;
  packets.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(packets);
  function updatePackets(time,p){
    for(let i=0;i<SIGNALS;i++){
      const z=-3-((i*3.79+time*(i%7===0?24:14))%(ROWS*GAP));
      const idx=(-z-4)/GAP;
      const a=2*PI*((i*7)%17)/17 + idx*.022;
      d.position.set(centerX(idx)+Math.cos(a)*3.46,centerY(idx)+Math.sin(a)*2.76,z);
      d.rotation.set(0,0,0);
      d.scale.set(1,1,.7+(i%5)*.29);
      d.updateMatrix();packets.setMatrixAt(i,d.matrix);
    }
    packets.instanceMatrix.needsUpdate=true;
    packetMat.opacity=.34+.48*smooth(.14,.45,p);
  }

  // Spectral light volumes. Gradients come from shaders; no CSS fake bloom
  // or large fullscreen filter chain. Minimal fill-rate on small devices.
  const haze=[];
  for(let i=1;i<ROWS;i+=3){
    const plane=new THREE.Mesh(new THREE.PlaneGeometry(5.6,10.5),hazeMaterial);
    plane.position.set(centerX(i)+((i%2)?-2.4:2.4),.10,-4-i*GAP-1);
    plane.rotation.y=(i%2?.29:-.29);
    plane.rotation.z=.07*Math.sin(i);
    plane.frustumCulled=false;
    scene.add(plane);haze.push(plane);
  }

  // Ahead-of-camera pearl/forest lights and remote fog supply optical scale.
  const lights=[];
  for(let i=2;i<ROWS;i+=3){
    const orb=new THREE.PointLight(i%2?0xb1ffdf:0xf3d5a4,16,18,2);
    orb.position.set(centerX(i)+(i%2?-2.45:2.45),2.0,-4-i*GAP);
    scene.add(orb);lights.push(orb);
  }

  // A remote luminous destination is abstract architecture only. The actual
  // Work DOM is revealed BELOW the canvas at the end, never rasterized here.
  const horizon=new THREE.Mesh(
    new THREE.PlaneGeometry(24,17),
    new THREE.MeshBasicMaterial({color:0x194233,side:THREE.DoubleSide})
  );
  horizon.position.set(centerX(ROWS-1),0,-4-(ROWS+1)*GAP);
  scene.add(horizon);

  // Grain/glint composited with CSS; thin spectral planes make the scene less
  // perfectly sterile without introducing code rain, skyboxes or fake UI.
  function render(p,now) {
    if(disposed) return;
    progress=clamp(p);
    const travel=smooth(.13,.91,progress);
    const z=lerp(3.1,-103.0,travel);
    const drift=Math.sin(travel*PI);
    camera.position.set(
      centerX(travel*14)*.60 + .29*drift,
      .10 + .24*Math.sin(travel*PI*1.8),
      z
    );
    // A gentle lateral tracking shot with restrained roll: foreground ribs
    // cross the lens, not a fixed screenshot zoom.
    const lookZ=z-25;
    camera.lookAt(centerX(Math.max(0,(-lookZ-4)/GAP))*.56, .04,lookZ);
    camera.rotateZ(.012*Math.sin(travel*PI*2));
    const fov=mobile?77:69;
    camera.fov=fov-6*smooth(.53,.90,progress);
    camera.updateProjectionMatrix();

    guideLight.position.set(camera.position.x-2.7,camera.position.y+2.8,z-7);
    amberLight.position.set(camera.position.x+2.4,camera.position.y-2.1,z-17);
    tailLight.position.set(camera.position.x+.8,camera.position.y+2.4,z-29);
    hazeMaterial.uniforms.uTime.value=now*.001;
    hazeMaterial.uniforms.uStrength.value=.12+.35*smooth(.13,.48,progress);
    ivoryMaterial.color.copy(PAPER).lerp(FOREST,smooth(.08,.38,progress));
    updatePackets(now*.001,progress);

    const x=window.innerWidth,y=window.innerHeight;
    if(progress<.27){
      const e=smooth(.015,.27,progress);
      const rx=lerp(2,x*1.8,e),ry=lerp(2,y*1.9,e);
      const points=[
        [ox-rx,oy-ry*.26],[ox-rx*.76,oy-ry],
        [ox+rx*.61,oy-ry],[ox+rx,oy-ry*.34],
        [ox+rx*.87,oy+ry*.61],[ox+rx*.46,oy+ry],
        [ox-rx*.62,oy+ry],[ox-rx,oy+ry*.38]
      ];
      stage.style.clipPath="polygon("+points.map(([a,b])=>a+"px "+b+"px").join(",")+")";
    } else {
      stage.style.clipPath="none";
    }
    if(!covered && progress>=.285){covered=true;onCover();}
    // The real Work page is already underneath. Dissolve the architectural
    // atmosphere into the actual DOM rather than zooming a counterfeit card.
    stage.style.opacity=String(1-smooth(.79,.985,progress));
    stage.style.setProperty("--passage-p",String(progress));
    count.textContent=String(Math.round(progress*100)).padStart(2,"0");
    renderer.render(scene,camera);
  }

  function dispose() {
    if(disposed)return;
    disposed=true;running=false;
    cancelAnimationFrame(raf);
    window.removeEventListener("resize",onResize);
    window.removeEventListener("wheel",onInterrupt);
    window.removeEventListener("touchstart",onInterrupt);
    window.removeEventListener("keydown",onKey);
    window.removeEventListener("pagehide",onInterrupt);
    document.removeEventListener("visibilitychange",onVisibility);
    renderer.domElement.removeEventListener("webglcontextlost",onContextLost);
    stage.removeEventListener("pointerdown",onInterrupt);
    document.documentElement.classList.remove("genezisi-passage-active");
    if(debug) delete window.__genezisiPassage;
    const geometries=new Set(),materials=new Set();
    scene.traverse(obj=>{
      if(obj.geometry)geometries.add(obj.geometry);
      if(obj.material) {
        for(const m of (Array.isArray(obj.material)?obj.material:[obj.material])) materials.add(m);
      }
    });
    for(const g of geometries)g.dispose();
    for(const m of materials)m.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    stage.remove();
  }
  function finish(){if(!disposed)onFinish();}
  function crash(e){if(!disposed)onError(e);}
  function onInterrupt(){finish();}
  function onKey(e){
    if(["Escape","Tab","ArrowDown","ArrowUp","PageDown","PageUp","Enter"," "].includes(e.key))finish();
  }
  function onVisibility(){if(document.hidden)finish();}
  function onContextLost(e){e.preventDefault();crash(new Error("WebGL context lost"));}
  function onResize(){
    if(disposed)return;
    if(Math.abs(window.innerWidth-initialWidth)>48 || Math.abs(window.innerHeight-initialHeight)>90){finish();return;}
    mobile=!desktop();
    renderer.setPixelRatio(measure());
    renderer.setSize(window.innerWidth,window.innerHeight,false);
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  }
  function tick(now) {
    if(disposed || !running)return;
    if(!started)started=now;
    // Clamp stutters and never allow an optional passage to become a trap.
    const elapsed=Math.min(3300,now-started);
    const p=debug&&window.__genezisiPassage?.paused?progress:Math.min(1,elapsed/2360);
    try{
      render(p,now);
      if(p>=1) {finish();return;}
      raf=requestAnimationFrame(tick);
    }catch(e){crash(e);}
  }
  function start(){
    if(disposed||running)return;
    stage.style.clipPath="circle(0px at "+ox+"px "+oy+"px)";
    document.body.appendChild(stage);
    document.documentElement.classList.add("genezisi-passage-active");
    stage.addEventListener("pointerdown",onInterrupt);
    renderer.domElement.addEventListener("webglcontextlost",onContextLost,false);
    window.addEventListener("wheel",onInterrupt,{passive:true});
    window.addEventListener("touchstart",onInterrupt,{passive:true});
    window.addEventListener("keydown",onKey);
    window.addEventListener("resize",onResize);
    window.addEventListener("pagehide",onInterrupt);
    document.addEventListener("visibilitychange",onVisibility);
    if(debug) {
      window.__genezisiPassage={
        get progress(){return progress},
        get revision(){return THREE.REVISION},
        paused:false,
        seek(value){this.paused=true;render(Number(value),performance.now())},
        resume(){this.paused=false;started=performance.now()-progress*2360}
      };
    }
    running=true;
    raf=requestAnimationFrame(tick);
  }
  return { start, dispose };
}
