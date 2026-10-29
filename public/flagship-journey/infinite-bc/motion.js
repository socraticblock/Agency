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
   // One physical entrance: the panel arrives while the complete opening moves
   // out of the viewport. B becomes the sole center-stage composition.
   const arrival=smooth(.012,.20,p),e=smooth(.32,.49,p);
   // Interior text enters only after the solid depth surface covers B.
   const h=smooth(.50,.56,p)*(1-smooth(.62,.76,p));
   const f=smooth(.60,.88,p),c=smooth(.72,.93,p);
   // Keep B at opacity 1 until an opaque right-to-left plane covers it.
   // This replaces the previous two-transparent-surfaces crossfade.
   const d=smooth(.32,.49,p)*(1-smooth(.79,.94,p)),b=p<.56?1:0;
   return {p,arrival,e,h,f,c,d,b,n:smooth(.32,.49,p)*(1-c),
     foldAlpha:smooth(.6,.68,p)*(1-smooth(.85,.94,p)),
     foldLeftX:mix(-w*.18,0,f),foldRightX:mix(w*.18,0,f),foldRotL:mix(-48,0,f),foldRotR:mix(48,0,f),
     // Do not magnify the readable panel while it is still visible in full.
     shiftX:mix(0,-Math.min(w*.23,320),smooth(.56,.64,p)),shiftY:mix(0,-24,smooth(.56,.64,p)),artScale:mix(1,2.25,smooth(.32,.52,p)),
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
   // All bounds below come from *layout*, not animated rectangles. Both tracks
   // are driven by the same arrival progress, with a shared non-overlap edge.
   const isMobile=w<=740,h=window.innerHeight;
   const ix=opening.offsetLeft+intro.offsetLeft,iy=opening.offsetTop+intro.offsetTop;
   const px=opening.offsetLeft+panel.offsetLeft,py=opening.offsetTop+panel.offsetTop;
   const iw=intro.offsetWidth,ih=intro.offsetHeight,pw=panel.offsetWidth,ph=panel.offsetHeight;
   const startIntroX=w/2-(ix+iw/2);
   const startIntroY=h*.51-(iy+ih/2);
   // Desktop B is deliberately larger, centered and fully opaque at rest.
   // Scale is capped by both viewport width and the actual visible stack height.
   const panelScale=isMobile?Math.min(1.08,(w-28)/Math.max(1,pw)):
     Math.max(1,Math.min(1.68,(w-96)/Math.max(1,pw),(h-195)/Math.max(1,ph*.8)));
   const finalPanelX=w/2-(px+pw/2),finalPanelY=isMobile?h*.52-(py+ph/2):0;
   const startPanelX=w+(pw*panelScale)/2+55-(px+pw/2);
   const startPanelY=h+(ph*panelScale)/2+48-(py+ph/2);
   const travel=v.arrival;
   const panelX=isMobile?0:mix(startPanelX,finalPanelX,travel);
   const panelY=isMobile?mix(startPanelY,finalPanelY,travel):0;
   // The intro is stationary until B actually approaches its visible boundary.
   // Proximity is measured in pixels from the incoming panel's transformed edge,
   // not from an independent scroll timer. This remains reversible under jumps.
   const gap=isMobile?20:Math.max(36,Math.min(64,w*.04));
   const panelLeft=px+pw/2+panelX-(pw*panelScale)/2;
   const finalPanelLeft=px+pw/2+finalPanelX-(pw*panelScale)/2;
   const introRight=ix+startIntroX+iw;
   const reactX=clamp((introRight+gap-panelLeft)/Math.max(1,introRight+gap-finalPanelLeft));
   const exitX=mix(startIntroX,-ix-iw-56,smooth(0,1,reactX));
   const introX=isMobile?0:Math.min(startIntroX,exitX,panelLeft-gap-ix-iw);
   const panelTop=py+ph/2+panelY-(ph*panelScale)/2;
   const finalPanelTop=py+ph/2+finalPanelY-(ph*panelScale)/2;
   const introBottom=iy+startIntroY+ih;
   const reactY=clamp((introBottom+gap-panelTop)/Math.max(1,introBottom+gap-finalPanelTop));
   const exitY=mix(startIntroY,-iy-ih-48,smooth(0,1,reactY));
   const introY=isMobile?Math.min(startIntroY,exitY,panelTop-gap-iy-ih):0;
   root.style.setProperty('--introOffset',introX+'px');
   root.style.setProperty('--introVertical',introY+'px');
   root.style.setProperty('--panelOffsetX',panelX+'px');
   root.style.setProperty('--panelOffsetY',panelY+'px');
   root.style.setProperty('--panelScale',String(panelScale));
   // Camera first advances into the still-opaque B window. Only once B is
   // substantially enlarged do deeper cards show through its central field.
   // The solid depth reveal grows outward without a screen-wide wipe or fade.
   const depthOpen=smooth(.46,.56,p);
   root.style.setProperty('--depthInset',(50*(1-depthOpen))+'%');
   const map={p:v.p,e:v.e,h:v.h,f:v.f,c:v.c,d:v.d,b:v.b,n:v.n,shiftX:v.shiftX,shiftY:v.shiftY,artScale:v.artScale,leftX:v.leftX,rightX:v.rightX,nearZ:v.nearZ,farLeft:v.farLeft,farRight:v.farRight,groundZ:v.groundZ,cOffset:v.cOffset,foldAlpha:v.foldAlpha,foldLeftX:v.foldLeftX,foldRightX:v.foldRightX,foldRotL:v.foldRotL,foldRotR:v.foldRotR};
   for(const [k,x] of Object.entries(map))root.style.setProperty('--'+k,String(x));
   root.dataset.beat=p<.56?'opening':p>.79?'reveal':'interior';
   const night=smooth(.32,.49,p);
   const darkInk=Math.round(mix(23,240,night)),greenInk=Math.round(mix(51,241,night)),blueInk=Math.round(mix(39,233,night));
   root.style.setProperty('--nav-ink',darkInk+' '+greenInk+' '+blueInk);
   root.style.setProperty('--nav-cta',Math.round(mix(23,236,night))+' '+Math.round(mix(51,243,night))+' '+Math.round(mix(39,232,night)));
   root.style.setProperty('--nav-cta-ink',Math.round(mix(255,20,night))+' '+Math.round(mix(255,42,night))+' '+Math.round(mix(255,31,night)));
   // Offscreen CTA links must not receive keyboard focus after the push.
   // The graphical B becomes the accessible content when its full pose settles.
   intro.inert=p>=.20;panel.setAttribute('aria-hidden',p>=.20&&p<.56?'false':'true');
   opening.inert=p>=.56;reveal.inert=p<.78;reading.inert=p<.50||p>.78;
 };
 const queue=()=>{if(!raf)raf=requestAnimationFrame(apply)};
 const enable=()=>{
   const motion=!reduce.matches;
   document.documentElement.classList.toggle('bc-motion-ready',motion);
   root.dataset.mode=motion?'motion':'static';root.style.cssText='';
   intro.inert=false;panel.setAttribute('aria-hidden','true');
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
