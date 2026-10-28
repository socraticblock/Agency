/* Doorway prototype. Opt-in only; current hero and composition study remain available. */
(() => {
 'use strict';
 const params=new URLSearchParams(location.search);
 if(params.get('hero')!=='doorway') return;
 const previous=document.querySelector('#heroJourney');
 if(!previous) return;
 const sheet=document.createElement('link');sheet.rel='stylesheet';sheet.href='./doorway-hero.css';document.head.append(sheet);
 const root=document.createElement('section');root.id='doorwayHero';root.className='dw-journey';root.setAttribute('aria-labelledby','dwTitle');
 root.innerHTML=`<div class="dw-pin">
  <div class="dw-light" aria-hidden="true"></div>
  <div class="dw-copy">
   <div class="dw-copy-layer" data-dw-copy="0"><span class="dw-kicker">01 / WEBSITE DESIGN & DEVELOPMENT</span><h1 id="dwTitle">Your website<br>is only the<br><em>beginning.</em></h1><p>Distinctive websites. Dependable automation. AI agents with people in control.</p><div class="dw-ctas"><a href="#work" class="dw-primary">Explore our work ↘</a><a href="#contact">Start a project ↗</a></div><small>Three disciplines. Available independently.</small></div>
   <div class="dw-copy-layer" data-dw-copy="1" aria-hidden="true" inert><span class="dw-kicker">02 / AUTOMATION + INTEGRATIONS</span><h2>Every enquiry.<br><em>In the right place.</em></h2><p>The same message, connected to the tools behind your business. Validated, mapped, and ready for follow-up. No AI required.</p><a class="dw-inline-link" href="#services">Automation is a service in its own right ↗</a></div>
   <div class="dw-copy-layer" data-dw-copy="2" aria-hidden="true" inert><span class="dw-kicker">03 / AI AGENTS + HUMAN CONTROL</span><h2>Context.<br><em>Put to work.</em></h2><p>An agent understands the request, reads permitted availability, and prepares a useful reply. A person reviews the next step.</p><a class="dw-inline-link" href="#services">Explore agentic integrations ↗</a></div>
   <div class="dw-copy-layer" data-dw-copy="3" aria-hidden="true" inert><span class="dw-kicker">04 / FROM POSSIBILITY TO PROOF</span><h2>Beautiful outside.<br><em>Useful inside.</em></h2><p>The original website. A considered system behind it. Now, step inside the real work.</p><div class="dw-ctas"><a class="dw-primary" href="#work">See selected work ↘</a><a href="#contact">Start a project ↗</a></div><small>Approved draft in this simulation. Nothing was sent.</small></div>
  </div>
  <div class="dw-scene">
   <div class="dw-ground" aria-hidden="true"></div>
   <div class="dw-screen">
    <article class="dw-website" aria-label="Illustrative website with a connected enquiry">
     <header class="dw-site-header"><b>genezisi<span>↗</span></b><a href="#services">Our practice ↗</a></header>
     <div class="dw-editorial"><span class="dw-site-kicker">INDEPENDENT BY DESIGN</span><h2>Make room<br>for <em>what’s next.</em></h2><div class="dw-poster" aria-hidden="true"><span>01</span><i></i><strong>DESIGN<br>DEVELOP<br>CONNECT.</strong></div><p>Digital experiences.<br>Considered in every detail.</p><div class="dw-service-index"><span>Websites</span><span>Automation</span><span>AI agents</span></div></div>
     <section class="dw-document" aria-label="The same enquiry through automation and agent review">
      <div class="dw-docbar"><div class="dw-entry-copy"><small>ILLUSTRATIVE ENQUIRY / DEMO-1042</small><strong>“Could we talk next week?”</strong></div><div class="dw-result-copy"><small>OWNER APPROVAL SIMULATED</small><strong>Approved draft.<br>Ready for manual delivery.</strong></div><button class="dw-open" type="button" aria-label="Follow the illustrative enquiry" aria-expanded="false" aria-controls="dwDocumentBody">↗</button><span class="dw-result-check" aria-hidden="true">✓</span></div>
      <div class="dw-body" id="dwDocumentBody">
       <div class="dw-message-meta"><span>ONE ENQUIRY, FOLLOWED THROUGH</span><span>DEMO-1042</span></div>
       <blockquote class="dw-message">“Could we <span class="dw-meaning">talk</span> <span class="dw-meaning">next week</span>?<br>An <span class="dw-meaning">afternoon</span> would be ideal.”</blockquote>
       <div class="dw-operation-space">
        <section class="dw-mapping" aria-label="Fixed-rule automation">
         <div class="dw-map-grid"><div><span class="dw-label">WEBSITE INPUT</span><strong>Enquiry.</strong><p>Website enquiry<br>visitor@example.com</p><small class="dw-valid">✓ Required fields complete</small></div><div class="dw-destination"><span class="dw-label">CRM DESTINATION</span><div class="dw-record"><strong class="dw-record-empty">Awaiting input</strong><strong class="dw-record-filled">DEMO-1042</strong></div><p>Website enquiry<br><span class="dw-received">Ready for follow-up</span></p><small class="dw-received">✓ Information received</small></div></div>
         <div class="dw-rail" aria-hidden="true"><i></i><span class="dw-token">ENQUIRY →</span></div>
         <div class="dw-notification"><span>↳</span><p>Owner notification prepared.<small>Fixed rules · No AI required · Not sent</small></p></div>
        </section>
        <section class="dw-agent" aria-label="Agent interpretation, permitted tool and human review">
         <div class="dw-intent"><div><span>INTENT</span><strong>A consultation</strong></div><div><span>WHEN</span><strong>Next week</strong></div><div><span>PREFERENCE</span><strong>Afternoons</strong></div></div>
         <div class="dw-tool"><span>↗ Read calendar availability</span><small>Permitted · Read-only</small></div>
         <div class="dw-options"><div><span>TUESDAY</span><strong>14:00</strong></div><i>or</i><div><span>THURSDAY</span><strong>15:00</strong></div><small>calendar.<br>read_availability</small></div>
         <div class="dw-draft"><span class="dw-label">PROPOSED REPLY</span><p>“Would Tuesday at 14:00 or Thursday at 15:00 suit you?”</p></div>
         <div class="dw-review"><span class="dw-review-icon">⊙</span><div class="dw-review-pending"><strong>Ready for your review.</strong><p>Sending and appointment creation are disabled.</p></div><div class="dw-review-confirmed"><strong>Owner approval simulated.</strong><p>Approved draft. Ready for manual delivery.</p></div></div>
        </section>
       </div>
      </div>
     </section>
     <footer class="dw-site-footer"><span>BEAUTIFUL EXPERIENCES. PURPOSEFUL ENGINEERING.</span><span>↗</span></footer>
    </article>
   </div>
   <img class="dw-frame" src="./doorway-frame.png" alt="" width="1280" height="1280" fetchpriority="high">
   <span class="dw-scene-note">ILLUSTRATIVE EXPERIENCE / NO LIVE ACTIONS</span>
  </div>
  <div class="dw-bottom"><span>SCROLL TO GO BEYOND THE SURFACE</span><a href="#work">SKIP TO SELECTED WORK ↓</a></div>
 </div>
 <div class="dw-static-story"><h2>One website. Its connections. A useful next step.</h2><p>Websites, automation and AI agents are independently available services. This fictional enquiry demonstrates how they can work together.</p><ol><li><strong>The website:</strong> a designed digital experience invites an enquiry.</li><li><strong>Automation:</strong> fixed rules validate the fields, map CRM record DEMO-1042, and prepare an owner notification. No notification is sent.</li><li><strong>AI agents:</strong> “next week, an afternoon would be ideal” establishes a consultation intent, time constraint and preference. The permitted read-only calendar.read_availability tool returns Tuesday 14:00 and Thursday 15:00. Those options inform a proposed reply.</li><li><strong>Human control:</strong> the owner’s approval is simulated. The approved draft is ready for manual delivery. No message is sent, appointment created, or external service called.</li></ol><a href="#work">Explore the real work ↘</a></div>`;
 previous.replaceWith(root);
 const clean=params.get('clean')==='1';
 if(!clean){const review=document.createElement('nav');review.className='dw-reviewbar';review.setAttribute('aria-label','Prototype review and comparison');review.innerHTML=`<span class="dw-mode-note" role="status"></span><div class="dw-compare"><span>COMPARE</span><a href="?hero=doorway" aria-current="page">Doorway</a><a href="?hero-study=experience">Enquiry study</a><a href="./index.html">Previous hero</a></div><div class="dw-act-buttons"><button type="button" data-dw-jump="0" aria-label="Jump to website">01</button><button type="button" data-dw-jump=".44" aria-label="Jump to automation">02</button><button type="button" data-dw-jump=".765" aria-label="Jump to AI agent">03</button><button type="button" data-dw-jump=".98" aria-label="Jump to resolution">04</button></div>`;document.body.append(review);}

 /* PURE TIMELINE START */
 function getFrame(value){
  const p=Math.max(0,Math.min(1,value));
  const s=(a,b)=>{const t=Math.max(0,Math.min(1,(p-a)/(b-a)));return t*t*(3-2*t)};
  const entrance=s(.07,.25),returning=s(.885,.965);
  return {
   introactions:1-s(.10,.15),introlead:1-s(.16,.21),entrance:entrance*(1-returning),frame:1-s(.17,.26)+s(.93,.965),open:s(.25,.35)*(1-s(.875,.95)),body:s(.33,.37)*(1-s(.85,.885)),editorial:1-s(.20,.24)+s(.955,.98),
   mapping:s(.35,.38)*(1-s(.47,.50)),transport:s(.355,.39),mapped:s(.382,.398),notification:s(.397,.42),
   agent:s(.51,.55)*(1-s(.84,.87)),interpret:s(.51,.56),tool:s(.575,.615),options:s(.625,.665),draft:s(.675,.715),review:s(.72,.75),pending:1-s(.775,.792),approved:s(.80,.815),entry:1-s(.885,.905),resolved:s(.915,.94),
   copy:[1-s(.24,.28),s(.285,.32)*(1-s(.48,.52)),s(.53,.57)*(1-s(.84,.875)),s(.88,.92)]
  };
 }
 /* PURE TIMELINE END */
 const layers=[...root.querySelectorAll('[data-dw-copy]')];
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let flow=false,queued=false,start=0,range=1,last=-1;
 function measure(){flow=reduced.matches||innerHeight<680||(innerWidth<=760&&innerWidth>innerHeight)||(innerWidth>760&&innerWidth<1100&&innerHeight>innerWidth);root.classList.toggle('dw-flow',flow);const reviewBar=document.querySelector('.dw-reviewbar');if(reviewBar){reviewBar.dataset.mode=flow?'reading':'motion';reviewBar.querySelector('.dw-mode-note').textContent=flow?(reduced.matches?'Reduced-motion reading view':'Reading view · enlarge the browser for the scroll journey'):'';}if(flow){for(const name of Object.keys(getFrame(0)))if(name!=='copy')root.style.removeProperty('--dw-'+name);root.classList.remove('dw-flow-open');root.querySelector('[data-dw-copy="0"] .dw-ctas').inert=false;root.querySelector('[data-dw-copy="0"] p').setAttribute('aria-hidden','false');root.querySelector('[data-dw-copy="0"] small').setAttribute('aria-hidden','false');root.querySelector('.dw-open').disabled=false;for(const [selector,hidden]of [['.dw-editorial',false],['.dw-body',true],['.dw-mapping',true],['.dw-agent',true],['.dw-entry-copy',false],['.dw-result-copy',true],['.dw-review-pending',false],['.dw-review-confirmed',true]])root.querySelector(selector).setAttribute('aria-hidden',String(hidden));layers.forEach((el,i)=>{el.inert=i!==0;el.setAttribute('aria-hidden',String(i!==0));});}const rect=root.getBoundingClientRect();start=rect.top+scrollY;range=Math.max(1,root.offsetHeight-innerHeight);last=-1;schedule();}
 function render(){queued=false;if(flow)return;const p=Math.max(0,Math.min(1,(scrollY-start)/range));if(Math.abs(p-last)<.00001)return;last=p;root.dataset.progress=p.toFixed(3);const f=getFrame(p);for(const [name,value]of Object.entries(f)){if(name==='copy')continue;root.style.setProperty('--dw-'+name,value.toFixed(5));}
  const enters=[[0,.01],[.285,.32],[.53,.57],[.88,.92]];
  layers.forEach((el,i)=>{const a=f.copy[i];el.style.opacity=a.toFixed(4);el.style.visibility=a<.001?'hidden':'visible';el.style.transform=`translateY(${((1-a)*((p<enters[i][1])?18:-18)).toFixed(2)}px)`;el.inert=a<.95;el.setAttribute('aria-hidden',String(a<.05));});
  root.querySelector('[data-dw-copy="0"] .dw-ctas').inert=f.copy[0]<.95||(innerWidth<=760&&f.introactions<.95);
  root.querySelector('[data-dw-copy="0"] p').setAttribute('aria-hidden',String(innerWidth<=760&&f.introlead<.05));
  root.querySelector('[data-dw-copy="0"] small').setAttribute('aria-hidden',String(innerWidth<=760&&f.introactions<.05));
  root.querySelector('.dw-open').disabled=f.open>.2||f.resolved>.05;root.querySelector('.dw-open').setAttribute('aria-expanded',String(f.open>.5));
  root.querySelector('.dw-editorial').setAttribute('aria-hidden',String(f.editorial<.05));
  root.querySelector('.dw-body').setAttribute('aria-hidden',String(f.body<.05));
  root.querySelector('.dw-mapping').setAttribute('aria-hidden',String(f.mapping<.05));
  root.querySelector('.dw-agent').setAttribute('aria-hidden',String(f.agent<.05));
  root.querySelector('.dw-result-copy').setAttribute('aria-hidden',String(f.resolved<.05));
  root.querySelector('.dw-entry-copy').setAttribute('aria-hidden',String(f.entry<.05));
  root.querySelector('.dw-review-pending').setAttribute('aria-hidden',String(f.pending<.05));
  root.querySelector('.dw-review-confirmed').setAttribute('aria-hidden',String(f.approved<.05));
  root.querySelector('.dw-document').setAttribute('aria-label',p>.905?'Approved draft, ready for manual delivery':'The same enquiry through automation and agent review');
  document.querySelectorAll('[data-dw-jump]').forEach((b,i)=>{const active=i=== (p<.28?0:p<.52?1:p<.88?2:3);b.setAttribute('aria-current',active?'step':'false');});
 }
 function schedule(){if(queued)return;queued=true;requestAnimationFrame(render);}
 function seek(p){if(flow){const open=p>.2;root.classList.toggle('dw-flow-open',open);root.querySelector('.dw-open').disabled=open;root.querySelector('.dw-open').setAttribute('aria-expanded',String(open));root.querySelector('.dw-body').setAttribute('aria-hidden',String(!open));root.querySelector('.dw-agent').setAttribute('aria-hidden',String(!open));root.querySelector('.dw-mapping').setAttribute('aria-hidden','true');(open?root.querySelector('.dw-scene'):root).scrollIntoView({block:'start',behavior:reduced.matches?'instant':'smooth'});return;}window.scrollTo({top:start+range*p,behavior:'smooth'});}
 root.querySelector('.dw-open').addEventListener('click',()=>seek(.44));
 document.querySelectorAll('[data-dw-jump]').forEach(b=>b.addEventListener('click',()=>seek(Number(b.dataset.dwJump))));
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',measure,{passive:true});reduced.addEventListener('change',measure);sheet.addEventListener('load',measure);root.querySelector('.dw-frame').addEventListener('load',measure);measure();
})();
