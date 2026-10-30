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
  const DURATION=980; // First visual-prototype hypothesis, not founder-approved timing.
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

    const space=document.createElement('div');
    space.className='dive-space';
    const outer=document.createElement('div');
    outer.className='dive-frame outer';
    const inner=document.createElement('div');
    inner.className='dive-frame inner';
    const arrival=document.createElement('div');
    arrival.className='dive-arrival';

    // A precise visual copy of the REAL destination, not invented sample projects.
    const work=decorative(destination);
    work.style.scrollMarginTop='0';
    arrival.appendChild(work);
    const next=destination.nextElementSibling;
    if(next && next.classList.contains('work-preview'))arrival.appendChild(decorative(next));
    space.append(outer,inner,arrival);

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
    stage.append(space,doors);
    document.body.appendChild(stage);
    return {stage,arrival,outer,inner,left:doorNodes[0],right:doorNodes[1]};
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
      // A pair of real perspective doors; the legible print is painted on them,
      // and naturally travels away with their physical surfaces.
      play(visuals.left,[
        {offset:0,transform:'rotateY(0deg)',easing:'cubic-bezier(.65,0,.22,1)'},
        {offset:.18,transform:'rotateY(-10deg)',easing:'cubic-bezier(.32,0,.12,1)'},
        {offset:.67,transform:'rotateY(-101deg)',easing:'ease-out'},
        {offset:1,transform:'rotateY(-111deg)'}
      ]);
      play(visuals.right,[
        {offset:0,transform:'rotateY(0deg)',easing:'cubic-bezier(.65,0,.22,1)'},
        {offset:.18,transform:'rotateY(10deg)',easing:'cubic-bezier(.32,0,.12,1)'},
        {offset:.67,transform:'rotateY(101deg)',easing:'ease-out'},
        {offset:1,transform:'rotateY(111deg)'}
      ]);
      // Preview of the existing #work section advances from deep within the
      // evergreen geometry and resolves at exactly 1:1 viewport scale.
      play(visuals.arrival,[
        {offset:0,transform:'translate3d(0,0,-920px) scale(.86)',easing:'ease-in'},
        {offset:.28,transform:'translate3d(0,0,-870px) scale(.86)',easing:'cubic-bezier(.25,0,.18,1)'},
        {offset:.58,transform:'translate3d(0,0,-520px) scale(.94)',easing:'cubic-bezier(.22,.65,.25,1)'},
        {offset:.89,transform:'translate3d(0,0,0) scale(1)',easing:'ease-out'},
        {offset:1,transform:'translate3d(0,0,0) scale(1)'}
      ]);
      play(visuals.outer,[
        {offset:0,transform:'translate(-50%,-50%) translateZ(-570px) scale(.88)',opacity:.65,easing:'cubic-bezier(.27,0,.22,1)'},
        {offset:.63,transform:'translate(-50%,-50%) translateZ(170px) scale(1.06)',opacity:.75,easing:'ease-out'},
        {offset:.91,transform:'translate(-50%,-50%) translateZ(420px) scale(1.15)',opacity:0},
        {offset:1,transform:'translate(-50%,-50%) translateZ(420px) scale(1.15)',opacity:0}
      ]);
      play(visuals.inner,[
        {offset:0,transform:'translate(-50%,-50%) translateZ(-670px) scale(.92)',opacity:.75,easing:'cubic-bezier(.3,0,.18,1)'},
        {offset:.65,transform:'translate(-50%,-50%) translateZ(70px) scale(1.04)',opacity:.7,easing:'ease-out'},
        {offset:.91,transform:'translate(-50%,-50%) translateZ(340px) scale(1.1)',opacity:0},
        {offset:1,transform:'translate(-50%,-50%) translateZ(340px) scale(1.1)',opacity:0}
      ]);

      // Move the underlying document only once the full-frame visual preview
      // has covered the old view; the final 10% is a seamless 1:1 handoff.
      const cue=visuals.stage.animate(
        [{opacity:1},{opacity:1}],
        {duration:DURATION*.91,fill:'both'}
      );
      animations.push(cue);
      cue.finished.then(()=>{if(!finished)commit();}).catch(()=>{});
      animations[2].finished.then(()=>complete()).catch(()=>{});
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
