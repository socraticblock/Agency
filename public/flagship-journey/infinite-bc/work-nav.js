/* GENEZISI / Screen 01 — The Living Page (isolated clicked CTA).
 * The actual opening, scroll film and Work remain untouched. The temporary
 * visual layer has ONE asymmetrically curling ivory surface; not two copies
 * of the hero, two doors, a framed tunnel, or a different portfolio.
 *
 * Spatial art direction derives from an independent D1/D2 previsualization.
 * CSS/SVG 2.5D is a deliberate lightweight first engineering proof:
 * do not claim this is real nonrigid 3D geometry or final visual acceptance.
 */
(() => {
  'use strict';
  const trigger=document.querySelector('.opening .actions a[href="#work"]');
  const target=document.getElementById('work');
  const journey=document.getElementById('journey');
  const sourceIntro=document.querySelector('.opening .intro');
  const sourceHeader=document.getElementById('siteNav');
  const sourceFoot=document.querySelector('.opening-foot');
  if(!trigger || !target || !journey || !sourceIntro || !sourceHeader || !sourceFoot)return;

  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const NS='http://www.w3.org/2000/svg';
  const DURATION=1180; // Hypothesis to tune against the founder's real recording.
  let running=null;

  const clamp=(n)=>Math.max(0,Math.min(1,n));
  const smooth=(a,b,n)=>{
    const t=clamp((n-a)/(b-a));
    return t*t*(3-2*t);
  };
  const lerp=(a,b,t)=>a+(b-a)*t;
  const svgNode=(name,attrs={})=>{
    const node=document.createElementNS(NS,name);
    for(const [k,v] of Object.entries(attrs))node.setAttribute(k,String(v));
    return node;
  };
  const cloneArt=(element)=>{
    const clone=element.cloneNode(true);
    clone.setAttribute('aria-hidden','true');
    clone.inert=true;
    for(const node of clone.querySelectorAll('*')){
      node.removeAttribute('id');
      node.removeAttribute('aria-labelledby');
      node.removeAttribute('aria-describedby');
      if(node.matches('a,button,input,select,textarea,[tabindex]'))node.tabIndex=-1;
    }
    clone.removeAttribute('id');
    clone.removeAttribute('aria-labelledby');
    clone.removeAttribute('aria-describedby');
    return clone;
  };

  // Unlike the rejected half-page duplicates, these are full-layout inert
  // replicas at the actual pixel coordinates of the real on-screen hero.
  // They never rotate: the continuous cream material does all the folding.
  function makeInk(){
    const layer=document.createElement('div');
    layer.className='living-ink-layer';
    const measure=(source)=>{
      const copy=cloneArt(source);
      const rect=source.getBoundingClientRect();
      copy.style.top=rect.top+'px';
      copy.style.left=rect.left+'px';
      copy.style.width=rect.width+'px';
      copy.style.height=rect.height+'px';
      copy.style.display=window.getComputedStyle(source).display;
      copy.style.textAlign=window.getComputedStyle(source).textAlign;
      copy.style.transform='none';
      layer.appendChild(copy);
      return copy;
    };
    measure(sourceHeader);
    const intro=measure(sourceIntro);
    const body=intro.querySelector('.body');
    if(body){body.style.marginLeft='auto';body.style.marginRight='auto';}
    const actions=intro.querySelector('.actions');
    if(actions)actions.style.justifyContent='center';
    measure(sourceFoot);
    return layer;
  }

  function createVisuals(){
    const stage=document.createElement('div');
    stage.className='living-dive';
    stage.setAttribute('aria-hidden','true');

    const backdrop=document.createElement('div');
    backdrop.className='living-backdrop';
    const arrival=document.createElement('div');
    arrival.className='living-destination';
    const work=cloneArt(target);
    work.style.scrollMarginTop='0';
    arrival.appendChild(work);
    // The original Work can be shorter than the viewport. Copy its existing
    // immediate continuation only so the final painted viewport matches.
    const following=target.nextElementSibling;
    if(following && following.classList.contains('work-preview'))
      arrival.appendChild(cloneArt(following));

    const art=svgNode('svg',{
      class:'living-surface',xmlns:NS,
      'aria-hidden':'true',preserveAspectRatio:'none'
    });
    const defs=svgNode('defs');
    const lipGradient=svgNode('linearGradient',{
      id:'living-page-lip',x1:'0%',y1:'0%',x2:'100%',y2:'0%'
    });
    for(const [offset,color] of [
      ['0%','#516b52'],['15%','#b2ac97'],['32%','#f5ebd8'],
      ['56%','#d8c6ad'],['78%','#fcf4e6'],['100%','#e6ded2']
    ])lipGradient.appendChild(svgNode('stop',{offset,'stop-color':color}));
    defs.appendChild(lipGradient);
    const shadow=svgNode('path',{class:'living-shadow'});
    const contact=svgNode('path',{class:'living-contact'});
    const underside=svgNode('path',{fill:'url(#living-page-lip)'});
    const paper=svgNode('path',{fill:'#e6ded2'});
    const crease=svgNode('path',{class:'living-crease'});
    art.append(defs,shadow,contact,underside,paper,crease);

    const rim=document.createElement('div');
    rim.className='living-rim';
    const ink=makeInk();
    stage.append(backdrop,arrival,art,rim,ink);
    document.body.appendChild(stage);
    return {stage,arrival,art,shadow,contact,underside,paper,crease,rim,ink,lipGradient};
  }

  // One material geometry function drives the uncovered Work boundary,
  // shaded underside, physical crease and contact shadow in both orientations.
  // 32 samples are enough for a clean quadratic-like line, without a GPU-heavy
  // canvas renderer or independent per-object animation engines.
  function draw(world,progress){
    const w=window.innerWidth,h=window.innerHeight;
    const portrait=w<=740;
    const approach=smooth(.19,.92,progress);
    const fold=smooth(.045,.83,progress);
    const swell=Math.pow(Math.max(0,Math.sin(Math.PI*fold)),.8);
    const segments=32;
    const dimension=portrait?h:w;
    const breadth=portrait?w:h;
    const center=lerp(-.21,1.21,fold);
    const lip=dimension*(portrait?.047:.075)*(0.65+1.05*swell);
    const contour=(t)=>{
      // Asymmetric, continuous crease: no rigid symmetric hinge and no
      // viewport-size duplicate typography that can change its layout.
      const curve=(.069*Math.sin(Math.PI*(1.12*t+.15))+
        .018*Math.sin(3*Math.PI*t+.23)+.032*(t-.5))*swell;
      return dimension*(center+curve);
    };

    const front=[],back=[];
    for(let i=0;i<=segments;i++){
      const t=i/segments;
      const cross=contour(t);
      const other=t*breadth;
      front.push(portrait?[other,cross]:[cross,other]);
      // A rolled lip extends into the revealed side of the same paper.
      const offset=lip*(.88+.12*Math.cos(t*Math.PI*2));
      back.push(portrait?[other,cross-offset]:[cross-offset,other]);
    }
    const coords=points=>points.map((q,i)=>
      (i===0?'M':'L')+q[0].toFixed(2)+' '+q[1].toFixed(2)).join(' ');
    const seam=coords(front);
    const sheet=seam+(portrait?' L '+w+' '+h+' L 0 '+h+' Z':
      ' L '+w+' '+h+' L '+w+' 0 Z');
    const ribbon=coords(back)+' '+front.slice().reverse()
      .map(q=>'L'+q[0].toFixed(2)+' '+q[1].toFixed(2)).join(' ')+' Z';

    world.art.setAttribute('viewBox','0 0 '+w+' '+h);
    world.paper.setAttribute('d',sheet);
    world.underside.setAttribute('d',ribbon);
    world.crease.setAttribute('d',seam);
    world.shadow.setAttribute('d',seam);
    world.contact.setAttribute('d',seam);
    world.contact.setAttribute('stroke-width',Math.max(7,dimension*.018).toFixed(1));
    world.contact.setAttribute('stroke-opacity',(.20*swell).toFixed(3));
    world.shadow.setAttribute('stroke-width',Math.max(2,dimension*.006).toFixed(1));
    world.shadow.setAttribute('opacity',swell.toFixed(3));
    world.crease.setAttribute('opacity',(.60*swell).toFixed(3));
    world.underside.setAttribute('opacity',(.90*swell).toFixed(3));
    if(portrait){
      world.lipGradient.setAttribute('x2','0%');
      world.lipGradient.setAttribute('y2','100%');
    }else{
      world.lipGradient.setAttribute('x2','100%');
      world.lipGradient.setAttribute('y2','0%');
    }

    // Advance the existing Work plane just enough to convey forward
    // movement without becoming a tiny screenshot in a tunnel.
    const scale=lerp(portrait?.91:.87,1,approach);
    world.arrival.style.transform='translate3d(0,0,0) scale('+scale.toFixed(5)+')';
    world.rim.style.opacity=(.32*Math.sin(Math.PI*fold)).toFixed(3);
    // The original typographic composition remains legible while the crease
    // first responds. The ink retires before Work is substantially exposed.
    world.ink.style.opacity=(1-smooth(.085,.255,progress)).toFixed(4);
    // The stage takes over almost instantly from the real hero to its
    // measured full-layout print. No washed-out/blank cream anticipation.
    world.stage.style.opacity=smooth(.005,.075,progress).toFixed(4);
  }

  const navigate=()=>{
    // Scroll to the exact top of the current, untouched #work; an ordinary
    // fragment navigation includes its 15px scroll-margin and would jump.
    const y=window.scrollY+target.getBoundingClientRect().top;
    if(window.location.hash!=='#work')window.location.hash='work';
    if(Number.isFinite(y))window.scrollTo(0,Math.max(0,y));
    else target.scrollIntoView({behavior:'auto',block:'start'});
  };

  trigger.addEventListener('click',(event)=>{
    if(event.defaultPrevented || event.button!==0 ||
       event.metaKey || event.ctrlKey || event.altKey || event.shiftKey ||
       reduced.matches || journey.dataset.mode!=='motion' ||
       typeof window.requestAnimationFrame!=='function')return;
    event.preventDefault();
    if(running){running.finish();return;}

    const keyboard=event.detail===0;
    let world;
    try {
      world=createVisuals();
      if(window.getComputedStyle(world.stage).position!=='fixed')
        throw new Error('living transition CSS unavailable');
    }catch(_error){
      if(world)world.stage.remove();
      navigate();return;
    }
    let done=false,frame=0,started=0;
    const removeListeners=()=>{
      window.removeEventListener('wheel',onInterrupt);
      window.removeEventListener('touchstart',onInterrupt);
      window.removeEventListener('keydown',onKey);
      window.removeEventListener('popstate',onPop);
      window.removeEventListener('hashchange',onHash);
      window.removeEventListener('pagehide',onPop);
      window.removeEventListener('resize',onResize);
      document.removeEventListener('visibilitychange',onHidden);
      if(reduced.removeEventListener)reduced.removeEventListener('change',onReduced);
    };
    const cleanup=()=>{
      if(done)return;
      done=true;
      if(frame)window.cancelAnimationFrame(frame);
      removeListeners();
      world.stage.remove();
      running=null;
    };
    const finish=()=>{
      if(done)return;
      try{navigate();}finally{
        cleanup();
        if(keyboard){
          const heading=target.querySelector('h2');
          if(heading){
            heading.tabIndex=-1;
            heading.focus({preventScroll:true});
          }
        }
      }
    };
    const onInterrupt=()=>finish();
    const onKey=(e)=>{
      if(['Escape','Tab','Enter',' ','ArrowUp','ArrowDown','PageUp','PageDown'].includes(e.key))
        finish();
    };
    const onPop=()=>cleanup(); // never override history navigation
    const onHash=()=>{if(window.location.hash && window.location.hash!=='#work')cleanup();};
    const onHidden=()=>{if(document.hidden)finish();};
    const onReduced=()=>{if(reduced.matches)finish();};
    const onResize=()=>{if(!done){
      // On an actual resize, the old text-print geometry is stale. The
      // visitor should reach usable Work rather than see a reflowing ghost.
      finish();
    }};
    running={finish};
    world.stage.addEventListener('click',finish);
    window.addEventListener('wheel',onInterrupt,{passive:true});
    window.addEventListener('touchstart',onInterrupt,{passive:true});
    window.addEventListener('keydown',onKey);
    window.addEventListener('popstate',onPop);
    window.addEventListener('hashchange',onHash);
    window.addEventListener('pagehide',onPop);
    window.addEventListener('resize',onResize);
    document.addEventListener('visibilitychange',onHidden);
    if(reduced.addEventListener)reduced.addEventListener('change',onReduced);

    const animate=(stamp)=>{
      if(done)return;
      if(!started)started=stamp;
      const p=clamp((stamp-started)/DURATION);
      try{
        draw(world,p);
        if(p>=1){finish();return;}
        frame=window.requestAnimationFrame(animate);
      }catch(_error){finish();}
    };
    try {
      draw(world,0);
      frame=window.requestAnimationFrame(animate);
    }catch(_error){finish();}
  });
})();
