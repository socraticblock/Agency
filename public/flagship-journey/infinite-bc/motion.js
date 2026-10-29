/* Deterministic, reversible scroll-sampled motion. No real back-end calls.
 * Gate 1b entrance is additive; the existing depth, fold and C geometry are retained. */
(()=>{
 'use strict';
 const root=document.getElementById('journey'),scene=document.getElementById('scene');
 const opening=root.querySelector('.opening'),intro=opening.querySelector('.intro'),panel=opening.querySelector('.interface-wrap');
 const reveal=root.querySelector('.reveal'),reading=root.querySelector('.reading');
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 const clamp=v=>Math.max(0,Math.min(1,v));
 const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t)};
 const mix=(a,b,t)=>a+(b-a)*t;
 // All scene state, including the entrance, is a pure function of scroll progress.
 // .20–.32 is an intentional full-B reading window before depth begins.
 const sample=(p,w)=>{
   // The arriving panel leads by a fraction of the scroll distance, so the copy
   // visibly makes room in response instead of behaving like a separate slide.
   const arrival=smooth(.012,.20,p),introArrival=smooth(.040,.20,p),e=smooth(.32,.49,p);
   const h=smooth(.38,.50,p)*(1-smooth(.62,.76,p));
   const f=smooth(.60,.88,p),c=smooth(.72,.93,p);
   const d=smooth(.32,.49,p)*(1-smooth(.79,.94,p)),b=1-smooth(.32,.49,p);
   return {p,arrival,introArrival,e,h,f,c,d,b,n:smooth(.32,.49,p)*(1-c),
     foldAlpha:smooth(.6,.68,p)*(1-smooth(.85,.94,p)),
     foldLeftX:mix(-w*.18,0,f),foldRightX:mix(w*.18,0,f),foldRotL:mix(-48,0,f),foldRotR:mix(48,0,f),
     shiftX:mix(0,-Math.min(w*.23,320),e),shiftY:mix(0,-24,e),artScale:mix(1,2.25,e),
     leftX:-e*Math.min(w*.31,460)+f*Math.min(w*.17,250),rightX:e*Math.min(w*.31,460)-f*Math.min(w*.17,250),
     nearZ:350*e+250*f,farLeft:e*-Math.min(w*.13,170),farRight:e*Math.min(w*.13,170),groundZ:550*e+250*f,
     cOffset:mix(48,0,c)
   };
 };
 let raf=0;
 const apply=()=>{
   raf=0;if(root.dataset.mode!=='motion')return;
   const rect=root.getBoundingClientRect(),total=root.offsetHeight-window.innerHeight;
   const p=clamp(-rect.top/Math.max(1,total)),w=window.innerWidth,v=sample(p,w);
   // offsetLeft/Top measure layout positions, unaffected by a previous transform.
   // This keeps the introduction optically centered on the first frame, including resize.
   const isMobile=w<=740;
   const introShiftX=isMobile?0:(w/2-(opening.offsetLeft+intro.offsetLeft+intro.offsetWidth/2));
   const introShiftY=isMobile?window.innerHeight*.51-(opening.offsetTop+intro.offsetTop+intro.offsetHeight/2):0;
   const panelShiftX=isMobile?0:w-(opening.offsetLeft+panel.offsetLeft)+40;
   const panelShiftY=isMobile?window.innerHeight-(opening.offsetTop+panel.offsetTop)+40:0;
   // Two tracks share one scroll sampler; the earlier panel track causes
   // the later intro displacement. Both finish together at the full-B pose.
   const introRest=1-v.introArrival,panelRest=1-v.arrival;
   root.style.setProperty('--introOffset',(introShiftX*introRest)+'px');
   root.style.setProperty('--introVertical',(introShiftY*introRest)+'px');
   root.style.setProperty('--panelOffsetX',(panelShiftX*panelRest)+'px');
   root.style.setProperty('--panelOffsetY',(panelShiftY*panelRest)+'px');
   const map={p:v.p,e:v.e,h:v.h,f:v.f,c:v.c,d:v.d,b:v.b,n:v.n,shiftX:v.shiftX,shiftY:v.shiftY,artScale:v.artScale,leftX:v.leftX,rightX:v.rightX,nearZ:v.nearZ,farLeft:v.farLeft,farRight:v.farRight,groundZ:v.groundZ,cOffset:v.cOffset,foldAlpha:v.foldAlpha,foldLeftX:v.foldLeftX,foldRightX:v.foldRightX,foldRotL:v.foldRotL,foldRotR:v.foldRotR};
   for(const [k,x] of Object.entries(map))root.style.setProperty('--'+k,String(x));
   root.dataset.beat=p<.44?'opening':p>.79?'reveal':'interior';
   const night=smooth(.32,.49,p);
   const darkInk=Math.round(mix(23,240,night)),greenInk=Math.round(mix(51,241,night)),blueInk=Math.round(mix(39,233,night));
   root.style.setProperty('--nav-ink',darkInk+' '+greenInk+' '+blueInk);
   root.style.setProperty('--nav-cta',Math.round(mix(23,236,night))+' '+Math.round(mix(51,243,night))+' '+Math.round(mix(39,232,night)));
   root.style.setProperty('--nav-cta-ink',Math.round(mix(255,20,night))+' '+Math.round(mix(255,42,night))+' '+Math.round(mix(255,31,night)));
   opening.inert=p>=.46;reveal.inert=p<.78;reading.inert=p<.36||p>.78;
 };
 const queue=()=>{if(!raf)raf=requestAnimationFrame(apply)};
 const enable=()=>{
   const motion=!reduce.matches;
   document.documentElement.classList.toggle('bc-motion-ready',motion);
   root.dataset.mode=motion?'motion':'static';root.style.cssText='';
   opening.inert=false;reveal.inert=false;reading.inert=false;
   // This runs before the next paint, avoiding a one-frame approximate layout
   // when the stylesheet is already active but CSS variables are not sampled.
   if(motion)apply();
 };
 window.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',queue,{passive:true});
 window.addEventListener('pageshow',queue);
 if(document.fonts)document.fonts.ready.then(queue);
 if(reduce.addEventListener)reduce.addEventListener('change',enable);else reduce.addListener(enable);
 enable();
 // Named development hook: sample and seek never run on their own.
 window.__GENEZISI_BC_TEST__={sample,seek:p=>{const total=root.offsetHeight-window.innerHeight;window.scrollTo(0,root.offsetTop+clamp(p)*total);apply();return sample(clamp(p),window.innerWidth)}};
})();
