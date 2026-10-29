/* Deterministic, reversible scroll-sampled motion. No real back-end calls.
 * Gate 1b entrance is additive; the existing depth, fold and C geometry are retained. */
(()=>{
 'use strict';
 const root=document.getElementById('journey'),scene=document.getElementById('scene');
 const opening=root.querySelector('.opening'),intro=opening.querySelector('.intro'),panel=opening.querySelector('.interface-wrap');
 const cardFace=panel.querySelector('.site-window');
 const reveal=root.querySelector('.reveal'),reading=root.querySelector('.reading');
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 const clamp=v=>Math.max(0,Math.min(1,v));
 const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t)};
 const mix=(a,b,t)=>a+(b-a)*t;
 // Fit the actual opaque green face inside the viewport at the camera's nearest
 // approach. Unlike a fixed 2.25x multiplier, this leaves visible margins so
 // the surrounding site-derived geometry can still read as a physical space.
 const panelScaleFor=(w,h,pw,ph)=>w<=740
   ?Math.min(1.08,(w-28)/Math.max(1,pw))
   :Math.max(1,Math.min(1.68,(w-96)/Math.max(1,pw),(h-195)/Math.max(1,ph*.8)));
 const cameraScaleFor=(w,h,panelScale)=>Math.max(1,Math.min(
   2.25,
   (w-(w<=740?32:96))/Math.max(1,cardFace.offsetWidth*panelScale),
   (h-(w<=740?148:140))/Math.max(1,cardFace.offsetHeight*panelScale)
 ));
 // All scene state, including the entrance, is a pure function of scroll progress.
 // .20–.32 is an intentional full-B reading window before depth begins.
 const sample=(p,w,zoomCap=2.25)=>{
   // One physical entrance: the panel arrives while the complete opening moves
   // out of the viewport. B becomes the sole center-stage composition.
   const arrival=smooth(.012,.20,p),e=smooth(.345,.54,p);
   // A small, distant third surface appears while B still forms its room;
   // it approaches only after the camera finishes advancing into solid B.
   const h=smooth(.432,.474,p)*(1-smooth(.62,.76,p));
   const f=smooth(.60,.88,p),c=smooth(.72,.93,p);
   // Keep B at opacity 1 until an opaque right-to-left plane covers it.
   // This replaces the previous two-transparent-surfaces crossfade.
   const d=smooth(.42,.54,p)*(1-smooth(.79,.94,p)),b=p<.54?1:0;
   return {p,arrival,e,h,f,c,d,b,n:smooth(.32,.49,p)*(1-c),
     foldAlpha:smooth(.6,.68,p)*(1-smooth(.85,.94,p)),
     foldLeftX:mix(-w*.18,0,f),foldRightX:mix(w*.18,0,f),foldRotL:mix(-48,0,f),foldRotR:mix(48,0,f),
     // Hold full B at .20-.32. Camera advances .32-.41 and stops before the
     // next surface travels in from depth: independent "settle -> enter" beats.
     shiftX:mix(0,-Math.min(w*.23,320),smooth(.54,.64,p)),shiftY:mix(0,-24,smooth(.54,.64,p)),artScale:mix(1,zoomCap,smooth(.32,.41,p)),
     wingProgress:smooth(.345,.445,p),readZ:mix(-780,0,smooth(.43,.54,p)),
     leftX:-e*Math.min(w*.31,460)+f*Math.min(w*.17,250),rightX:e*Math.min(w*.31,460)-f*Math.min(w*.17,250),
     nearZ:350*e+250*f,farLeft:e*-Math.min(w*.13,170),farRight:e*Math.min(w*.13,170),groundZ:550*e+250*f,
     cOffset:mix(48,0,c)
   };
 };
 let raf=0;
 const apply=()=>{
   raf=0;if(root.dataset.mode!=='motion')return;
   const rect=root.getBoundingClientRect(),total=root.offsetHeight-window.innerHeight;
   const p=clamp(-rect.top/Math.max(1,total)),w=window.innerWidth;
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
   const panelScale=panelScaleFor(w,h,pw,ph);
   const v=sample(p,w,cameraScaleFor(w,h,panelScale));
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
   // The two *existing* backing sheets pivot outward as the camera closes,
   // becoming the origins of the corridor side planes, not unrelated cards.
   const sideSpread=Math.min(pw*.23,145)*v.wingProgress;
   root.style.setProperty('--wingSpread',sideSpread+'px');
   root.style.setProperty('--wingAngle',(32*v.wingProgress)+'deg');
   root.style.setProperty('--wingProgress',String(v.wingProgress));
   // Reveal the constructed room through the center of B, after the camera
   // settles. The third surface is visible at a distance before it approaches.
   const depthOpen=smooth(.42,.54,p);
   root.style.setProperty('--depthInset',(50*(1-depthOpen))+'%');
   root.style.setProperty('--readZ',v.readZ+'px');
   const map={p:v.p,e:v.e,h:v.h,f:v.f,c:v.c,d:v.d,b:v.b,n:v.n,shiftX:v.shiftX,shiftY:v.shiftY,artScale:v.artScale,leftX:v.leftX,rightX:v.rightX,nearZ:v.nearZ,farLeft:v.farLeft,farRight:v.farRight,groundZ:v.groundZ,cOffset:v.cOffset,foldAlpha:v.foldAlpha,foldLeftX:v.foldLeftX,foldRightX:v.foldRightX,foldRotL:v.foldRotL,foldRotR:v.foldRotR};
   for(const [k,x] of Object.entries(map))root.style.setProperty('--'+k,String(x));
   root.dataset.beat=p<.54?'opening':p>.79?'reveal':'interior';
   const night=smooth(.32,.49,p);
   const darkInk=Math.round(mix(23,240,night)),greenInk=Math.round(mix(51,241,night)),blueInk=Math.round(mix(39,233,night));
   root.style.setProperty('--nav-ink',darkInk+' '+greenInk+' '+blueInk);
   root.style.setProperty('--nav-cta',Math.round(mix(23,236,night))+' '+Math.round(mix(51,243,night))+' '+Math.round(mix(39,232,night)));
   root.style.setProperty('--nav-cta-ink',Math.round(mix(255,20,night))+' '+Math.round(mix(255,42,night))+' '+Math.round(mix(255,31,night)));
   // Offscreen CTA links must not receive keyboard focus after the push.
   // The graphical B becomes the accessible content when its full pose settles.
   intro.inert=p>=.20;panel.setAttribute('aria-hidden',p>=.20&&p<.50?'false':'true');
   opening.inert=p>=.54;reveal.inert=p<.78;reading.inert=p<.50||p>.78;
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
 const inspect=p=>{
   const w=window.innerWidth,h=window.innerHeight;
   return sample(clamp(p),w,cameraScaleFor(w,h,panelScaleFor(w,h,panel.offsetWidth,panel.offsetHeight)));
 };
 window.__GENEZISI_BC_TEST__={sample:inspect,seek:p=>{const total=root.offsetHeight-window.innerHeight;window.scrollTo(0,root.offsetTop+clamp(p)*total);apply();return inspect(p)}};
})();
