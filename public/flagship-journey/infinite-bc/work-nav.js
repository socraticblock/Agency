/* Gate 1b / Screen 01 — Folding Project Dive (founder concept C + D).
 * A clicked, optional, lightweight 3D visual shortcut; NOT the native-scroll film.
 * Source page remains real, linked and reversible. Decorative replicas are inert.
 * The #work proof here is a labeled mirror; true SelectedWork belongs to Gate 3. */
(() => {
  'use strict';

  const link=document.querySelector('.opening .actions a[href="#work"]');
  const destination=document.getElementById('work');
  const journey=document.getElementById('journey');
  const sourceIntro=document.querySelector('.opening .intro');
  const sourceHeader=document.getElementById('siteNav');
  const sourceFoot=document.querySelector('.opening-foot');
  if(!link || !destination || !journey || !sourceIntro || !sourceHeader || !sourceFoot)return;

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  const DURATION=1080; // Cinematic timing hypothesis; tune from real browser footage.
  let active=null;

  // Clones are artwork: never duplicate document identities, navigation, or focus.
  const decorative=(element)=>{
    const copy=element.cloneNode(true);
    copy.setAttribute('aria-hidden','true');
    copy.inert=true;
    for(const node of [copy,...copy.querySelectorAll('*')]){
      node.removeAttribute('id');
      node.removeAttribute('aria-labelledby');
      node.removeAttribute('aria-describedby');
      if(node.matches('a,button,input,select,textarea,[tabindex]'))node.tabIndex=-1;
    }
    return copy;
  };

  const metricStyle=(original,copy)=>{
    if(!original || !copy)return;
    const computed=window.getComputedStyle(original);
    for(const key of ['fontSize','fontFamily','fontWeight','lineHeight','letterSpacing',
      'textAlign','color','marginTop','marginBottom','paddingTop','paddingBottom',
      'maxWidth','gap','justifyContent','minHeight','borderColor','backgroundColor']){
      copy.style[key]=computed[key];
    }
  };

  // The 2D hero print is laid out from the *actual rendered DOM rectangles*.
  // This permits a convincing page split while keeping the real DOM untouched.
  const makeHeroPrint=()=>{
    const print=document.createElement('div');
    print.className='dive-print';

    const nav=decorative(sourceHeader);
    metricStyle(sourceHeader,nav);
    const originalNavButton=sourceHeader.querySelector('.nav-cta');
    const copyNavButton=nav.querySelector('.nav-cta');
    metricStyle(originalNavButton,copyNavButton);
    print.appendChild(nav);

    const bounds=sourceIntro.getBoundingClientRect();
    const intro=decorative(sourceIntro);
    intro.style.position='absolute';
    intro.style.top=`${bounds.top}px`;
    intro.style.left=`${bounds.left}px`;
    intro.style.width=`${bounds.width}px`;
    intro.style.height=`${bounds.height}px`;
    intro.style.maxWidth='none';
    intro.style.transform='none';
    metricStyle(sourceIntro,intro);
    for(const selector of ['.eyebrow','h1','h1 em','.body','.actions',
      '.button.primary','.button:not(.primary)','.button.primary span','.button:not(.primary) span']){
      metricStyle(sourceIntro.querySelector(selector),intro.querySelector(selector));
    }
    // Entrance CSS gives this centered hero layout inside .journey only.
    intro.style.textAlign=window.getComputedStyle(sourceIntro).textAlign;
    const body=intro.querySelector('.body');
    const actions=intro.querySelector('.actions');
    if(body){body.style.marginLeft='auto';body.style.marginRight='auto';}
    if(actions)actions.style.justifyContent='center';
    print.appendChild(intro);

    const foot=decorative(sourceFoot);
    metricStyle(sourceFoot,foot);
    foot.style.display=window.getComputedStyle(sourceFoot).display;
    print.appendChild(foot);
    return print;
  };

  const makeStage=()=>{
    const stage=document.createElement('div');
    stage.className='work-dive';
    stage.setAttribute('aria-hidden','true');
    // The visual copies are inert, but the stage itself can receive a tap to
    // immediately finish the journey rather than trapping the visitor.

    const backdrop=document.createElement('div');
    backdrop.className='dive-backdrop';
    const radiance=document.createElement('div');
    radiance.className='dive-radiance';
    const space=document.createElement('div');
    space.className='dive-space';
    const arrival=document.createElement('div');
    arrival.className='dive-arrival';
    const outer=document.createElement('div');
    outer.className='dive-frame outer';
    const inner=document.createElement('div');
    inner.className='dive-frame inner';
    const wallLeft=document.createElement('div');
    wallLeft.className='dive-wall left';
    const wallRight=document.createElement('div');
    wallRight.className='dive-wall right';

    // A precise visual copy of the REAL destination, not invented sample projects.
    const work=decorative(destination);
    work.style.scrollMarginTop='0';
    arrival.appendChild(work);
    // Only the existing #work preview is used; its contents/layout are
    // not modified, and there is no design work on the Work section here.
    space.append(arrival,outer,inner,wallLeft,wallRight);

    const doors=document.createElement('div');
    doors.className='dive-doors';
    const doorNodes=[];
    for(const side of ['left','right']){
      const door=document.createElement('div');
      door.className=`dive-door ${side}`;
      const face=document.createElement('div');
      face.className='dive-door-face';
      face.appendChild(makeHeroPrint());
      const edge=document.createElement('div');
      edge.className='dive-door-edge';
      door.append(face,edge);
      doors.appendChild(door);
      doorNodes.push(door);
    }
    stage.append(backdrop,radiance,space,doors);
    document.body.appendChild(stage);
    return {stage,radiance,arrival,outer,inner,wallLeft,wallRight,
      left:doorNodes[0],right:doorNodes[1]};
  };

  const goToWork=()=>{
    // The replicated arrival starts at viewport y=0. Ignore the ordinary
    // Work anchor's 15px scroll-margin here so the final painted pixels line
    // up with the real #work view instead of jumping at cleanup.
    const exactTop=window.scrollY+destination.getBoundingClientRect().top;
    if(window.location.hash!=='#work')window.location.hash='work';
    if(Number.isFinite(exactTop))window.scrollTo(0,Math.max(0,exactTop));
    else destination.scrollIntoView({behavior:'auto',block:'start'});
  };

  link.addEventListener('click',(event)=>{
    // Keep native fragment behavior for modified clicks, reduced motion,
    // static/no-JS, unsupported animations and all non-hero Work links.
    if(event.defaultPrevented || event.button!==0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      reduce.matches || journey.dataset.mode!=='motion' ||
      typeof Element.prototype.animate!=='function')return;
    if(active){event.preventDefault();active.complete();return;}

    event.preventDefault();
    const keyboardActivated=event.detail===0;
    let visuals;
    try {
      visuals=makeStage();
      // Do not run an invisible overlay if the isolated visual stylesheet
      // failed to load in this browser/environment.
      if(window.getComputedStyle(visuals.stage).position!=='fixed')throw Error('dive stylesheet unavailable');
    }catch(_error){visuals?.stage.remove();goToWork();return;}

    let committed=false;
    let finished=false;
    const animations=[];
    const cleanup=()=>{
      if(finished)return;
      finished=true;
      for(const animation of animations)animation.cancel();
      visuals.stage.remove();
      window.removeEventListener('wheel',interrupt);
      window.removeEventListener('touchstart',interrupt);
      window.removeEventListener('keydown',onKeydown);
      window.removeEventListener('popstate',onPopstate);
      window.removeEventListener('hashchange',onHashchange);
      window.removeEventListener('pagehide',onPagehide);
      document.removeEventListener('visibilitychange',onVisibility);
      if(reduce.removeEventListener)reduce.removeEventListener('change',onMotionPreference);
      active=null;
    };
    const commit=()=>{
      if(committed)return;
      committed=true;
      goToWork();
    };
    const complete=()=>{
      if(finished)return;
      try{commit();}finally{
        cleanup();
        if(keyboardActivated){
          const heading=destination.querySelector('h2');
          if(heading){
            heading.tabIndex=-1;
            heading.focus({preventScroll:true});
          }
        }
      }
    };
    const interrupt=()=>complete();
    const onKeydown=(event)=>{
      if(['Escape','Tab','Enter',' ','ArrowDown','ArrowUp','PageDown','PageUp'].includes(event.key))complete();
    };
    // Navigation elsewhere should win; never force the visitor back to Work.
    const onPopstate=()=>cleanup();
    const onHashchange=()=>{if(!committed && window.location.hash!=='#work')cleanup();};
    const onPagehide=()=>cleanup();
    const onVisibility=()=>{if(document.hidden)complete();};
    const onMotionPreference=()=>{if(reduce.matches)complete();};
    active={complete};
    visuals.stage.addEventListener('click',complete);

    const play=(node,frames,options={})=>{
      const animation=node.animate(frames,{
        duration:DURATION,
        fill:'both',
        easing:'linear',
        ...options
      });
      animations.push(animation);
      return animation;
    };

    try{
      // One coordinated physical event: ivory leaves part, the existing
      // Work plane becomes visible at once, and foreground architecture moves
      // past the viewer faster than the far plane. No opaque 3D parent can
      // occlude the destination and no root-snapshot crossfade is involved.
      const left=play(visuals.left,[
        {offset:0,transform:'translate3d(0,0,0) rotateY(0deg)',easing:'cubic-bezier(.48,0,.28,1)'},
        {offset:.12,transform:'translate3d(0,0,0) rotateY(-7deg)',easing:'cubic-bezier(.42,0,.18,1)'},
        {offset:.40,transform:'translate3d(0,0,0) rotateY(-76deg)',easing:'cubic-bezier(.32,0,.15,1)'},
        {offset:.66,transform:'translate3d(-9%,0,70px) rotateY(-106deg)',easing:'ease-out'},
        {offset:.91,transform:'translate3d(-32%,0,110px) rotateY(-114deg)'},
        {offset:1,transform:'translate3d(-32%,0,110px) rotateY(-114deg)'}
      ]);
      const right=play(visuals.right,[
        {offset:0,transform:'translate3d(0,0,0) rotateY(0deg)',easing:'cubic-bezier(.48,0,.28,1)'},
        {offset:.12,transform:'translate3d(0,0,0) rotateY(7deg)',easing:'cubic-bezier(.42,0,.18,1)'},
        {offset:.40,transform:'translate3d(0,0,0) rotateY(76deg)',easing:'cubic-bezier(.32,0,.15,1)'},
        {offset:.66,transform:'translate3d(9%,0,70px) rotateY(106deg)',easing:'ease-out'},
        {offset:.91,transform:'translate3d(32%,0,110px) rotateY(114deg)'},
        {offset:1,transform:'translate3d(32%,0,110px) rotateY(114deg)'}
      ]);

      // Work copy is an opaque viewport-sized card. Scale stays entirely
      // positive and its paint layer is above the background at every frame.
      // It resolves to exactly scale(1) before the real Work page is exposed.
      const arrivalMotion=play(visuals.arrival,[
        {offset:0,transform:'scale(.24)',easing:'ease-out'},
        {offset:.17,transform:'scale(.24)',easing:'cubic-bezier(.35,0,.18,1)'},
        {offset:.39,transform:'scale(.36)',easing:'cubic-bezier(.22,.48,.14,1)'},
        {offset:.66,transform:'scale(.75)',easing:'cubic-bezier(.18,.64,.17,1)'},
        {offset:.89,transform:'scale(1)',easing:'ease-out'},
        {offset:1,transform:'scale(1)'}
      ]);

      play(visuals.radiance,[
        {offset:0,opacity:0,transform:'scale(.72)',easing:'ease-out'},
        {offset:.20,opacity:.68,transform:'scale(.95)',easing:'ease-out'},
        {offset:.48,opacity:.9,transform:'scale(1.1)',easing:'ease-out'},
        {offset:.85,opacity:.22,transform:'scale(1.25)'},
        {offset:1,opacity:0,transform:'scale(1.3)'}
      ]);

      // Two structural thresholds sweep past at different depths. Their
      // scale and opacity are independent from the destination's.
      play(visuals.outer,[
        {offset:0,transform:'translate(-50%,-50%) scale(.62)',opacity:.95,easing:'ease-out'},
        {offset:.34,transform:'translate(-50%,-50%) scale(.74)',opacity:.95,easing:'cubic-bezier(.22,.7,.19,1)'},
        {offset:.66,transform:'translate(-50%,-50%) scale(1.65)',opacity:.56,easing:'cubic-bezier(.21,.7,.17,1)'},
        {offset:.89,transform:'translate(-50%,-50%) scale(3.2)',opacity:0},
        {offset:1,transform:'translate(-50%,-50%) scale(3.3)',opacity:0}
      ]);
      play(visuals.inner,[
        {offset:0,transform:'translate(-50%,-50%) scale(.43)',opacity:.95,easing:'ease-out'},
        {offset:.34,transform:'translate(-50%,-50%) scale(.56)',opacity:.95,easing:'cubic-bezier(.22,.7,.18,1)'},
        {offset:.67,transform:'translate(-50%,-50%) scale(1.52)',opacity:.52,easing:'cubic-bezier(.22,.74,.18,1)'},
        {offset:.90,transform:'translate(-50%,-50%) scale(3.5)',opacity:0},
        {offset:1,transform:'translate(-50%,-50%) scale(3.5)',opacity:0}
      ]);
      play(visuals.wallLeft,[
        {offset:0,transform:'translate3d(0,0,0) rotateY(14deg) scale(1)',opacity:.95,easing:'ease-out'},
        {offset:.42,transform:'translate3d(-20%,0,0) rotateY(17deg) scale(1.1)',opacity:.9,easing:'cubic-bezier(.18,.7,.23,1)'},
        {offset:.82,transform:'translate3d(-145%,0,0) rotateY(22deg) scale(1.5)',opacity:0},
        {offset:1,transform:'translate3d(-150%,0,0) rotateY(22deg) scale(1.5)',opacity:0}
      ]);
      play(visuals.wallRight,[
        {offset:0,transform:'translate3d(0,0,0) rotateY(-14deg) scale(1)',opacity:.95,easing:'ease-out'},
        {offset:.42,transform:'translate3d(20%,0,0) rotateY(-17deg) scale(1.1)',opacity:.9,easing:'cubic-bezier(.18,.7,.23,1)'},
        {offset:.82,transform:'translate3d(145%,0,0) rotateY(-22deg) scale(1.5)',opacity:0},
        {offset:1,transform:'translate3d(150%,0,0) rotateY(-22deg) scale(1.5)',opacity:0}
      ]);

      // Move the underlying document only when the Work copy fills the view;
      // the last tenth is a 1:1 pixel handoff, with the layer still present.
      const cue=visuals.stage.animate(
        [{opacity:1},{opacity:1}],
        {duration:DURATION*.92,fill:'both'}
      );
      animations.push(cue);
      cue.finished.then(()=>{if(!finished)commit();}).catch(()=>{});
      arrivalMotion.finished.then(()=>complete()).catch(()=>{});
      window.addEventListener('wheel',interrupt,{passive:true});
      window.addEventListener('touchstart',interrupt,{passive:true});
      window.addEventListener('keydown',onKeydown);
      window.addEventListener('popstate',onPopstate);
      window.addEventListener('hashchange',onHashchange);
      window.addEventListener('pagehide',onPagehide);
      document.addEventListener('visibilitychange',onVisibility);
      if(reduce.addEventListener)reduce.addEventListener('change',onMotionPreference);
    }catch(_error){
      // Animation failure must never strand the click in a noninteractive layer.
      complete();
    }
  });
})();
