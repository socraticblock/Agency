/* Deterministic, reversible scroll-sampled motion. No real back-end calls.
 * Gate 1b entrance is additive; the existing depth, fold and C geometry are retained. */
(()=>{
 'use strict';
 const root=document.getElementById('journey'),scene=document.getElementById('scene');
 const opening=root.querySelector('.opening'),intro=opening.querySelector('.intro'),panel=opening.querySelector('.interface-wrap');
 const cardFace=panel.querySelector('.site-window');
 const reveal=root.querySelector('.reveal'),reading=root.querySelector('.reading');
 const cHeading=reveal.querySelector('.c-center h2');
 const cTextBounds=document.createRange();
 cTextBounds.selectNodeContents(cHeading);
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 const clamp=v=>Math.max(0,Math.min(1,v));
 const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t)};
 const mix=(a,b,t)=>a+(b-a)*t;
 // Native scroll is a continuous, reversible film; a reader pauses by
 // stopping, not by being forced through long stationary scroll bands.
 // Re-map physical scroll distance to the original authored keyframes so
 // their poses and B -> room -> C geometry stay unchanged.
 const scrollStops=[[0,0],[.20,.20],[.24,.32],[.33,.415],[.42,.50],
   [.48,.56],[.505,.62],[.715,.76],[.93,.93],[1,1]];
 const storyProgress=(raw)=>{
   const x=clamp(raw);
   for(let i=1;i<scrollStops.length;i++){
     const [x0,y0]=scrollStops[i-1],[x1,y1]=scrollStops[i];
     if(x<=x1)return mix(y0,y1,(x-x0)/(x1-x0));
   }
   return 1;
 };
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
 // Full B remains a legible stop; only the physical scroll distance of its hold is shortened.
 const sample=(p,w,zoomCap=2.25)=>{
   // One physical entrance: the panel arrives while the complete opening moves
   // out of the viewport. B becomes the sole center-stage composition.
   const arrival=smooth(.012,.20,p),e=smooth(.345,.54,p);
   // B reaches its stable camera pose at .41. A *complete*, distant third
   // surface appears inside the formed room, then comes forward as a unit.
   // Its typography is delayed separately so no letter fragments can lead it.
   // The third reading stays fully solid as it folds and recedes. C arrives
   // as a full-height architectural surface along the direction of that fold,
   // not a detached rectangular panel floating in front of the chamber.
   const h=smooth(w<=740?.462:.452,.484,p)*(1-smooth(.718,.744,p));
   const f=smooth(.60,.88,p),c=smooth(.715,.77,p);
   const handoff=smooth(.658,.706,p);
   const fold=smooth(.647,.707,p);
   // The final message begins as soon as it *fits* on the covered C surface
   // while the green architecture is still visible at the edge. Supporting
   // details resolve after full coverage, keeping the moving frontier clean.
   // The decorative G. waits until the real C message is legible.
   const cInk=smooth(.706,.738,p);
   const cWatermark=smooth(.755,.83,p);
   // Keep the site facade solid until the same-color spatial room has fully
   // covered it. We never crossfade two simultaneously readable panels.
   const d=smooth(.415,.515,p)*(1-smooth(.79,.94,p)),b=p<.515?1:0;
   return {p,arrival,e,h,f,c,d,b,n:smooth(.32,.49,p)*(1-c),
     // No second pair of fold wings: their old triangular silhouettes
     // competed with the card's hinge, especially in reverse scroll.
     foldAlpha:0,
     foldLeftX:mix(-w*.18,0,f),foldRightX:mix(w*.18,0,f),
     foldRotL:mix(-52,0,smooth(.63,.785,p)),foldRotR:mix(52,0,smooth(.63,.785,p)),
     // Hold full B at .20-.32. Camera advances .32-.41 and stops before the
     // next surface travels in from depth: independent "settle -> enter" beats.
     shiftX:mix(0,-Math.min(w*.23,320),smooth(.54,.64,p)),shiftY:mix(0,-24,smooth(.54,.64,p)),artScale:mix(1,zoomCap,smooth(.32,.41,p)),
     wingProgress:smooth(.345,.445,p),
     readZ:mix(-1120,0,smooth(.46,.56,p)),
     roomAdvance:mix(0,155,smooth(.44,.565,p)),
     readInk:smooth(.465,.505,p),
     leftX:-e*Math.min(w*.17,230)+f*Math.min(w*.13,180),rightX:e*Math.min(w*.17,230)-f*Math.min(w*.13,180),
     nearZ:300*e+180*f,farLeft:e*-Math.min(w*.13,170),farRight:e*Math.min(w*.13,170),groundZ:550*e+250*f,
     cOffset:mix(20,0,c),handoff,fold,cInk,cWatermark
   };
 };
 let raf=0;
 const apply=()=>{
   raf=0;if(root.dataset.mode!=='motion')return;
   const rect=root.getBoundingClientRect(),total=root.offsetHeight-window.innerHeight;
   const raw=clamp(-rect.top/Math.max(1,total)),p=storyProgress(raw),w=window.innerWidth;
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
   // As the B surface opens, its two readable columns retire into the
   // corresponding architectural wings; only the third plane remains centered.
   // The green facade itself stays opaque until its depth scene covers it.
   const split=smooth(.421,.482,p);
   root.style.setProperty('--contentSlide',(cardFace.offsetWidth*.64*split)+'px');
   // The interface retires as its own perimeter becomes room architecture.
   // Keeping the text into the first visible depth beat prevents a vacant facade.
   const retire=1-smooth(.424,.465,p);
   root.style.setProperty('--contentAlpha',String(retire));
   root.style.setProperty('--facadeMetaAlpha',String(retire));
   root.style.setProperty('--facadeMetaLift',(-26*smooth(.425,.468,p))+'px');
   // Source-derived ribs bridge the facade and the established room. Their
   // opacity is a pure function of scroll position, including reverse/jumps.
   root.style.setProperty('--thresholdInk',String(smooth(.417,.475,p)*(1-smooth(.535,.612,p))));
   root.style.setProperty('--roomText',String(1-smooth(.49,.555,p)));
   // Card 3 contains its own scroll-sampled story, *after* the external
   // camera has nearly finished its approach (.46-.56). Keep the complete
   // headline centered first, then move its actual text upward as the steps
   // appear in order. All states derive only from p; reverse/jumps are exact.
   // Complete composition settles ahead of the unchanged C fold at .647.
   const story=smooth(.542,.575,p);
   const first=smooth(.559,.577,p),second=smooth(.584,.603,p),third=smooth(.610,.628,p);
   root.style.setProperty('--c3Story',String(story));
   root.style.setProperty('--c3HeroShift',(-Math.min(isMobile?h*.165:h*.10,isMobile?112:96)*story)+'px');
   root.style.setProperty('--c3HeroScale',String(mix(1.06,isMobile?.84:.85,story)));
   root.style.setProperty('--c3First',String(first));
   root.style.setProperty('--c3Second',String(second));
   root.style.setProperty('--c3Third',String(third));
   root.style.setProperty('--c3FirstRise',(22*(1-first))+'px');
   root.style.setProperty('--c3SecondRise',(22*(1-second))+'px');
   root.style.setProperty('--c3ThirdRise',(22*(1-third))+'px');
   root.style.setProperty('--c3Progress',String(smooth(.554,.632,p)));
   // Update every geometry variable *before* reading the transformed face.
   // This removes dependence on the previous scroll sample on jump/reversal.
   const map={p:v.p,e:v.e,h:v.h,f:v.f,c:v.c,d:v.d,b:v.b,n:v.n,shiftX:v.shiftX,shiftY:v.shiftY,artScale:v.artScale,leftX:v.leftX,rightX:v.rightX,nearZ:v.nearZ,farLeft:v.farLeft,farRight:v.farRight,groundZ:v.groundZ,cOffset:v.cOffset,foldAlpha:v.foldAlpha,foldLeftX:v.foldLeftX,foldRightX:v.foldRightX,foldRotL:v.foldRotL,foldRotR:v.foldRotR};
   for(const [k,x] of Object.entries(map))root.style.setProperty('--'+k,String(x));
   // Open the chamber *within the actual settled B facade*, not a generic
   // viewport-centered crop. This matters on portrait mobile: a symmetric
   // 50%-inset viewport crop produces a disconnected tall slit over a
   // horizontal green card. Grow to the card's proportions first, then fill
   // the viewport only after the facade's labels have cleared.
   const facade=cardFace.getBoundingClientRect();
   // B must be wholly unobstructed through its settled pose. The room's
   // B-derived aperture starts with ZERO area, then grows only as the actual
   // transition advances; the old 44%-wide initial opening leaked over B.
   const enter=smooth(.415,.46,p),expand=smooth(.46,.51,p);
   const cropW=mix(facade.width*enter,w,expand);
   const cropH=mix(facade.height*enter,h,expand);
   // Clip-path alone can render a one-pixel seam at a collapsed edge.
   // Keep the higher-z-index depth completely hidden until it has a real
   // aperture. Visibility remains a deterministic function of scroll.
   root.style.setProperty('--depthVisibility',p>.415&&cropW>1&&cropH>1?'visible':'hidden');
   const cropX=mix(facade.left+facade.width/2,w/2,expand);
   const cropY=mix(facade.top+facade.height/2,h/2,expand);
   root.style.setProperty('--depthTop',Math.max(0,cropY-cropH/2)+'px');
   root.style.setProperty('--depthRight',Math.max(0,w-cropX-cropW/2)+'px');
   root.style.setProperty('--depthBottom',Math.max(0,h-cropY-cropH/2)+'px');
   root.style.setProperty('--depthLeft',Math.max(0,cropX-cropW/2)+'px');
   const depthOpen=smooth(.415,.515,p);
   root.style.setProperty('--readZ',(v.readZ-155*v.fold)+'px');
   // A modest turn retains recognizable card geometry until the solid C
   // cover overtakes it. No near-edge-on white triangles or hard flips.
   root.style.setProperty('--readingTurn',(-36*v.fold)+'deg');
   root.style.setProperty('--readInk',String(v.readInk));
   root.style.setProperty('--roomAdvance',v.roomAdvance+'px');
   root.style.setProperty('--roomReveal',String(depthOpen));
   // C is a full-height architectural continuation of the reading plane:
   // its slightly angled leading edge advances left-to-right. There is no
   // small dark box and no central G. floating in front of the card.
   // The endpoint is exactly the complete C viewport, on all aspect ratios.
   const slant=8*4*v.handoff*(1-v.handoff);
   const edgeTop=Math.max(0,Math.min(100,100*v.handoff+slant));
   const edgeBottom=Math.max(0,Math.min(100,100*v.handoff-slant));
   root.style.setProperty('--cFrontTop',edgeTop+'%');
   root.style.setProperty('--cFrontBottom',edgeBottom+'%');
   // The actual headline appears *before* the viewport is entirely covered,
   // but only after the leading edge has moved past every rendered glyph.
   // A modest early scale gives the text a safe margin on portrait screens.
   // Set scale before measuring: jump and reverse scroll must read the exact
   // same typography bounds regardless of the preceding frame.
   const entryScale=mix(.76,1,smooth(.692,.713,p));
   root.style.setProperty('--cEntranceScale',String(entryScale));
   let earlyHeadline=0;
   if(p>=.714)earlyHeadline=1;
   else if(p>=.655){
     const inkRects=Array.from(cTextBounds.getClientRects()).filter(r=>r.width>1&&r.height>1);
     let rightmost=0,lowest=0;
     for(const r of inkRects){rightmost=Math.max(rightmost,r.right);lowest=Math.max(lowest,r.bottom)}
     const edgeAtInk=(edgeTop+(edgeBottom-edgeTop)*clamp(lowest/Math.max(1,h)))*w/100;
     const margin=isMobile?4:10,fadeDistance=isMobile?18:24;
     const inkSafe=smooth(rightmost+margin,rightmost+margin+fadeDistance,edgeAtInk);
     earlyHeadline=Math.min(smooth(.68,.709,p),inkSafe);
   }
   root.style.setProperty('--cHeadlineInk',String(earlyHeadline));
   root.style.setProperty('--cHeadlineRise',(8*(1-earlyHeadline))+'px');
   // The remaining page furniture waits until C fills the screen. The
   // original final positions, copy and typography are unchanged.
   root.style.setProperty('--cInk',String(v.cInk));
   root.style.setProperty('--cInkRise',(9*(1-v.cInk))+'px');
   root.style.setProperty('--cWatermark',String(v.cWatermark));
   root.dataset.beat=p<.515?'opening':p>=.75?'reveal':'interior';
   const night=smooth(.32,.49,p);
   const darkInk=Math.round(mix(23,240,night)),greenInk=Math.round(mix(51,241,night)),blueInk=Math.round(mix(39,233,night));
   root.style.setProperty('--nav-ink',darkInk+' '+greenInk+' '+blueInk);
   root.style.setProperty('--nav-cta',Math.round(mix(23,236,night))+' '+Math.round(mix(51,243,night))+' '+Math.round(mix(39,232,night)));
   root.style.setProperty('--nav-cta-ink',Math.round(mix(255,20,night))+' '+Math.round(mix(255,42,night))+' '+Math.round(mix(255,31,night)));
   // Offscreen CTA links must not receive keyboard focus after the push.
   // The graphical B becomes the accessible content when its full pose settles.
   intro.inert=p>=.20;panel.setAttribute('aria-hidden',p>=.20&&p<.50?'false':'true');
   opening.inert=p>=.515;reveal.inert=p<.75;reading.inert=p<.515||p>.75;
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
   return sample(storyProgress(p),w,cameraScaleFor(w,h,panelScaleFor(w,h,panel.offsetWidth,panel.offsetHeight)));
 };
 window.__GENEZISI_BC_TEST__={sample:inspect,seek:p=>{const total=root.offsetHeight-window.innerHeight;window.scrollTo(0,root.offsetTop+clamp(p)*total);apply();return inspect(p)}};
})();
