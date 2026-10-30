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
  const DURATION=1120; // Screen 01 visual hypothesis; tune after full-route footage.
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
      // Every moving surface samples ONE smooth progression. The previous
      // staggered per-keyframe easings caused mismatched velocities: typography
      // bent around huge doors while heavy green frames raced past a static card.
      // The samples are computed once; the browser compositor runs the motion.
      const clamp01=(value)=>Math.max(0,Math.min(1,value));
      const smooth=(value)=>{
        const t=clamp01(value);
        return t*t*(3-2*t);
      };
      const phase=(progress,start,end)=>smooth((progress-start)/(end-start));
      const framesFor=(sample)=>{
        const frames=[];
        for(let i=0;i<=32;i++){
          const p=i/32;
          frames.push({offset:p,...sample(p)});
        }
        return frames;
      };
      const fixed=(value)=>Number(value.toFixed(3));

      const left=play(visuals.left,framesFor((p)=>{
        const opening=phase(p,.07,.62);
        const travel=phase(p,.28,.86);
        return {transform:`translate3d(${fixed(-16*travel)}%,0,${fixed(65*travel)}px) rotateY(${fixed(-106*opening)}deg)`};
      }));
      const right=play(visuals.right,framesFor((p)=>{
        const opening=phase(p,.07,.62);
        const travel=phase(p,.28,.86);
        return {transform:`translate3d(${fixed(16*travel)}%,0,${fixed(65*travel)}px) rotateY(${fixed(106*opening)}deg)`};
      }));

      // As the page physically folds, its printed typography disappears WITH
      // the surface; avoid enlarged, warped chunks of headline at the sides.
      for(const print of visuals.stage.querySelectorAll('.dive-print')){
        play(print,framesFor((p)=>({opacity:fixed(1-phase(p,.18,.49))})));
      }

      // From the first opening slit the existing Work section is already
      // visible. It then approaches in perspective without a premature cut.
      // The backdrop is painted behind the Work plane, never over it.
      const arrivalMotion=play(visuals.arrival,framesFor((p)=>{
        const travel=phase(p,.24,.9);
        return {
          transform:`translate3d(0,0,${fixed(-110*(1-travel))}px) scale(${fixed(.38+.62*travel)})`
        };
      }));

      // Light spills softly from behind the folding material, cresting as
      // the opening becomes legible; it does not read as a neon tunnel.
      play(visuals.radiance,framesFor((p)=>{
        const light=Math.sin(Math.PI*phase(p,.1,.88));
        const travel=phase(p,.24,.9);
        return {opacity:fixed(.5*light),transform:`scale(${fixed(.86+.28*travel)})`};
      }));

      // Restrained site-derived architectural lines move past at different
      // depths, with much lower contrast than the actual Work destination.
      play(visuals.outer,framesFor((p)=>{
        const rush=phase(p,.25,.83);
        return {
          transform:`translate(-50%,-50%) scale(${fixed(.72+2.22*rush)})`,
          opacity:fixed(.56*(1-phase(p,.42,.79)))
        };
      }));
      play(visuals.inner,framesFor((p)=>{
        const rush=phase(p,.31,.85);
        return {
          transform:`translate(-50%,-50%) scale(${fixed(.53+2.04*rush)})`,
          opacity:fixed(.25*(1-phase(p,.43,.77)))
        };
      }));
      play(visuals.wallLeft,framesFor((p)=>{
        const rush=phase(p,.23,.82);
        return {
          transform:`translate3d(${fixed(-135*rush)}%,0,0) rotateY(${fixed(15+9*rush)}deg) scale(${fixed(1+.28*rush)})`,
          opacity:fixed(.78*(1-phase(p,.37,.81)))
        };
      }));
      play(visuals.wallRight,framesFor((p)=>{
        const rush=phase(p,.23,.82);
        return {
          transform:`translate3d(${fixed(135*rush)}%,0,0) rotateY(${fixed(-15-9*rush)}deg) scale(${fixed(1+.28*rush)})`,
          opacity:fixed(.78*(1-phase(p,.37,.81)))
        };
      }));

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
