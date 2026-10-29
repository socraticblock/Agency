/* Deterministic, reversible scroll-sampled motion. No real back-end calls. */
(()=>{
 'use strict';
 const root=document.getElementById('journey'), scene=document.getElementById('scene');
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 // All geometric state is a pure function of normalized scroll position.
 const clamp=(v)=>Math.max(0,Math.min(1,v));
 const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t)};
 const mix=(a,b,t)=>a+(b-a)*t;
 const sample=(p,w)=>{
   const e=smooth(.09,.37,p),h=smooth(.35,.46,p)*(1-smooth(.61,.76,p)),f=smooth(.60,.88,p),c=smooth(.72,.93,p);
   const d=smooth(.14,.34,p)*(1-smooth(.79,.94,p)),b=1-smooth(.12,.39,p);
   return {p,e,h,f,c,d,b,n:smooth(.14,.34,p)*(1-c),foldAlpha:smooth(.6,.68,p)*(1-smooth(.85,.94,p)),foldLeftX:mix(-w*.18,0,f),foldRightX:mix(w*.18,0,f),foldRotL:mix(-48,0,f),foldRotR:mix(48,0,f),
     shiftX:mix(0,-Math.min(w*.23,320),e),shiftY:mix(0,-24,e),artScale:mix(1,2.25,e),
     leftX:-e*Math.min(w*.31,460)+f*Math.min(w*.17,250),rightX:e*Math.min(w*.31,460)-f*Math.min(w*.17,250),
     nearZ:350*e+250*f,farLeft:e*-Math.min(w*.13,170),farRight:e*Math.min(w*.13,170),groundZ:550*e+250*f,
     cOffset:mix(48,0,c)
   };
 };
 let raf=0;
 const apply=()=>{
   raf=0;if(root.dataset.mode!=='motion')return;
   const rect=root.getBoundingClientRect();const total=root.offsetHeight-window.innerHeight;
   const p=clamp(-rect.top/Math.max(1,total));const v=sample(p,window.innerWidth);
   const map={p:v.p,e:v.e,h:v.h,f:v.f,c:v.c,d:v.d,b:v.b,n:v.n,shiftX:v.shiftX,shiftY:v.shiftY,artScale:v.artScale,leftX:v.leftX,rightX:v.rightX,nearZ:v.nearZ,farLeft:v.farLeft,farRight:v.farRight,groundZ:v.groundZ,cOffset:v.cOffset,foldAlpha:v.foldAlpha,foldLeftX:v.foldLeftX,foldRightX:v.foldRightX,foldRotL:v.foldRotL,foldRotR:v.foldRotR};
   for(const [k,x] of Object.entries(map))root.style.setProperty('--'+k,String(x));
   root.dataset.beat=p<.23?'opening':p>.79?'reveal':'interior';
   const night=smooth(.13,.32,p);const darkInk=Math.round(mix(23,240,night));const greenInk=Math.round(mix(51,241,night));const blueInk=Math.round(mix(39,233,night));
   root.style.setProperty('--nav-ink',darkInk+' '+greenInk+' '+blueInk);
   root.style.setProperty('--nav-cta',Math.round(mix(23,236,night))+' '+Math.round(mix(51,243,night))+' '+Math.round(mix(39,232,night)));
   root.style.setProperty('--nav-cta-ink',Math.round(mix(255,20,night))+' '+Math.round(mix(255,42,night))+' '+Math.round(mix(255,31,night)));
   const opening=root.querySelector('.opening'),reveal=root.querySelector('.reveal'),reading=root.querySelector('.reading');
   opening.inert=p>=.26;reveal.inert=p<.78;reading.inert=p<.36||p>.78;
   // The real work anchor is outside this timeline and is never intercepted.
 };
 const queue=()=>{if(!raf)raf=requestAnimationFrame(apply)};
 const enable=()=>{root.dataset.mode=reduce.matches?'static':'motion';root.style.cssText='';root.querySelector('.opening').inert=false;root.querySelector('.reveal').inert=false;root.querySelector('.reading').inert=false;if(!reduce.matches)queue()};
 window.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',queue,{passive:true});
 if(reduce.addEventListener)reduce.addEventListener('change',enable);else reduce.addListener(enable);
 enable();
 // Dev-only deterministic review hook: no artificial timeline runs on its own.
 window.__GENEZISI_BC_TEST__={sample,seek:(p)=>{const total=root.offsetHeight-window.innerHeight;window.scrollTo(0,root.offsetTop+clamp(p)*total);apply();return sample(clamp(p),window.innerWidth)}};
})();
