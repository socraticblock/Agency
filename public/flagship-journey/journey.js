(()=>{
'use strict';
const clamp=n=>Math.max(0,Math.min(1,n));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const chapters=[...document.querySelectorAll('[data-chapter]')];
const moments={
 tk:[['01 / FIRST IMPRESSION','Clarity before complexity.','Precise hierarchy and considered typography introduce a serious professional service.'],['02 / SERVICE STRUCTURE','Complexity, made legible.','A consistent hierarchy helps visitors find the legal information relevant to them.'],['03 / NEXT STEP','A clear path to enquire.','Service content is connected to an approachable contact and assessment process.']],
 sb:[['01 / ARCHITECTURE','Engineering is the difference.','Real technical work and documentation, presented for people who want to understand the decisions.'],['02 / SYSTEMS','Ideas become implemented systems.','The portfolio connects design decisions to the engineering that makes products work.'],['03 / DOCUMENTATION','Depth you can inspect.','Case studies and engineering notes demonstrate technical practice beyond the interface.']],
 fw:[['01 / THE THRESHOLD','Interaction creates atmosphere.','The original landing-page gate artwork introduces a persistent, mobile-first RPG.'],['02 / THE CROSSING','The world responds to you.','A cinematic gate sequence translates a simple scroll into a sense of arrival.'],['03 / THE GAME','An evolving early test.','The game is playable, incomplete and changing. The live test is always a separate deliberate choice.']]
};
let updateQueued=false;
const heroJourney=document.querySelector('#heroJourney');
const flowing=()=>innerHeight<=500&&innerWidth>innerHeight;
if(heroJourney&&!reduced&&!flowing())heroJourney.classList.add('is-enhanced');
// Cache hero references once. Native scroll is the only progress source.
const heroNodes=heroJourney?Object.fromEntries([...heroJourney.querySelectorAll('[id]')].map(el=>[el.id,el])):{};
const heroCopy=heroJourney?.querySelector('.hero-copy');
const heroStories=[...document.querySelectorAll('[data-signature-story]')];
const routeStations=[...document.querySelectorAll('[data-route]')];
const heroStage=heroJourney?.querySelector('.signature-stage');
function heroFrame(progress){
 const smooth=(a,b)=>{const t=clamp((progress-a)/(b-a));return t*t*(3-2*t)};
 const show=(el,amount,y=0)=>{
   if(!el)return;
   el.style.opacity=amount.toFixed(4);
   el.style.visibility=amount<.001?'hidden':'visible';
   el.style.transform=`translate3d(0,${y.toFixed(2)}px,0)`;
 };
 const compact=innerWidth<=760;
 const short=compact&&innerHeight<=710;
 const lift=smooth(.14,.31);
 const agent=smooth(.49,.60);
 const resolve=smooth(.78,.91);
 const bridge=smooth(.94,1);
 const opening=1-smooth(.16,.26);
 show(heroCopy,opening,-smooth(.16,.26)*26);
 heroCopy.inert=opening<.1;
 heroJourney.style.setProperty('--unfold',String(lift));
 heroJourney.style.setProperty('--foundation-label',String(1-agent));

 // ACT I → II: the website is the uppermost physical layer of a connected
 // stack. Do not simply slide away one card and reveal an unrelated dashboard.
 const surface=heroNodes.signatureSurface;
 const surfaceScale=1-lift*(short?.47:.43)-agent*.14+resolve*.48;
 const surfaceY=-lift*(short?27:30)-agent*8+resolve*35;
 const surfaceX=-agent*8+resolve*8;
 const surfaceTilt=-8*(1-lift)+agent*3+resolve*5;
 surface.style.transform=`translate3d(${surfaceX.toFixed(2)}%,${surfaceY.toFixed(2)}%,0) scale(${surfaceScale.toFixed(4)}) perspective(1600px) rotateY(${surfaceTilt.toFixed(2)}deg) rotateZ(${(-2+lift*2-agent*.5+resolve*.5).toFixed(2)}deg)`;
 surface.style.opacity=String((1-agent*.77)*(1-resolve*.23));
 const depthAmount=smooth(.18,.31)*(1-smooth(.78,.90));
 show(heroNodes.systemDepth,depthAmount);
 heroNodes.systemDepth.style.transform=`translate3d(0,${((1-lift)*26-agent*9).toFixed(2)}px,0) perspective(1700px) rotateX(${((1-lift)*9).toFixed(2)}deg) scale(${(.91+lift*.09).toFixed(4)})`;
 show(heroJourney.querySelector('.system-foundation'),smooth(.18,.29)*(1-smooth(.82,.93)));

 // ACT II: the single enquiry visibly travels from the website's enquiry
 // strip into three fixed-rule integration stations. No AI is implied here.
 const routeVisible=smooth(.28,.35)*(1-smooth(.46,.54));
 show(heroNodes.systemRoute,routeVisible,(1-routeVisible)*16);
 const travel=smooth(.32,.43);
 show(heroNodes.requestToken,smooth(.30,.34)*(1-smooth(.43,.47)));
 heroNodes.requestToken.style.left=`${(travel*68).toFixed(2)}%`;
 heroNodes.routeSignal.style.transform=`scaleX(${travel.toFixed(4)})`;
 routeStations.forEach((el,i)=>{
   const reached=smooth(.33+i*.033,.36+i*.033);
   el.style.opacity=String(.37+.63*reached);
   el.style.transform=`translate3d(0,${((1-reached)*7).toFixed(2)}px,0)`;
 });
 show(heroNodes.crmRecord,smooth(.39,.43));
 show(heroNodes.routeResult,smooth(.40,.46),(1-smooth(.40,.46))*8);
 show(heroNodes.systemExchange,smooth(.33,.38)*(1-smooth(.47,.53)));

 // ACT III: distinct visual path: intent → permitted read-only tool →
 // returned calendar options → a visible human decision boundary.
 const agentVisible=smooth(.50,.59)*(1-smooth(.79,.86));
 show(heroNodes.agentWorkspace,agentVisible,(1-smooth(.50,.59))*18);
 show(heroNodes.agentContext,smooth(.54,.60));
 const toolIn=smooth(.61,.67);
 show(heroNodes.agentTool,toolIn,(1-toolIn)*10);
 const connectorIn=smooth(.64,.70);
 show(heroNodes.agentToolConnector,connectorIn);
 const pulseProgress=smooth(.67,.74);
 heroNodes.agentToolPulse.style.opacity=String(connectorIn*(1-smooth(.76,.80)));
 heroNodes.agentToolPulse.style.left=`${(pulseProgress*81).toFixed(2)}%`;
 const optionsIn=smooth(.70,.76);
 show(heroNodes.agentOptions,optionsIn,(1-optionsIn)*10);
 const approvalIn=smooth(.75,.81);
 show(heroNodes.approvalBoundary,approvalIn,(1-approvalIn)*8);
 heroNodes.toolState.textContent=pulseProgress>.97?'RETURNED':'READ ONLY';

 // ACT IV: reassemble into one physical editorial composition; the final
 // cream surface occupies the original object's geometry. Nothing was sent.
 const resultVisible=smooth(.83,.92);
 show(heroNodes.resolutionNote,resultVisible);
 heroNodes.resolutionNote.style.transform=`translate3d(0,${((1-resultVisible)*23).toFixed(2)}px,0) scale(${(.915+.085*resultVisible).toFixed(4)})`;
 const ranges={
   automation:[.26,.33,.46,.52],
   agent:[.52,.59,.79,.85],
   resolution:[.84,.91,1.1,1.2]
 };
 heroStories.forEach(el=>{
   const [a,b,c,d]=ranges[el.dataset.signatureStory];
   const enter=smooth(a,b),exit=smooth(c,d),opacity=enter*(1-exit);
   el.style.opacity=opacity.toFixed(4);
   el.style.visibility=opacity<.001?'hidden':'visible';
   el.style.transform=`translateY(calc(${compact?'0%':'-40%'} + ${((1-enter)*24-exit*20).toFixed(2)}px))`;
   el.inert=opacity<.95;
   const link=el.querySelector('a');
   if(link)link.tabIndex=opacity>.95?0:-1;
 });
 heroStage.style.transform=`translate3d(0,${(-bridge*5).toFixed(2)}%,0) scale(${(1-bridge*.055).toFixed(4)})`;
 heroNodes.signatureProgressFill.style.transform=`scaleX(${progress.toFixed(4)})`;
 heroJourney.querySelector('.hero-bottom').style.opacity=String(1-smooth(.14,.24));
}
function updateScroll(){updateQueued=false;const top=window.scrollY,range=Math.max(1,document.documentElement.scrollHeight-innerHeight);document.querySelector('#readingTrack').style.width=Math.round(top/range*10000)/100+'%';if(reduced)return;

if(heroJourney){
 heroJourney.classList.toggle('is-enhanced',!flowing());
 if(!flowing()){
  const bounds=heroJourney.getBoundingClientRect();
  const progress=clamp(-bounds.top/Math.max(1,bounds.height-innerHeight));
  heroFrame(progress);
 }
}
for(const el of chapters){const rect=el.getBoundingClientRect();if(rect.top>innerHeight*1.4||rect.bottom< -innerHeight*.4)continue;const span=Math.max(1,rect.height-innerHeight);const progress=clamp(-rect.top/span);const visual=el.querySelector('.case-visual');el.style.setProperty('--p',progress.toFixed(4));visual.style.transform=`translate3d(0,${((.5-progress)*32).toFixed(1)}px,0)`;const browser=visual.querySelector('.browser-frame');if(browser)browser.style.transform=`perspective(1200px) rotateY(${((1-progress)*-8).toFixed(1)}deg) rotateZ(${((1-progress)*-2).toFixed(1)}deg) scale(${(.91+progress*.07).toFixed(3)})`;const capture=visual.querySelector('.project-capture img');if(capture){if(capture.classList.contains('is-full')){const viewport=capture.parentElement;const imgHeight=capture.naturalHeight/capture.naturalWidth*viewport.clientWidth;const maxPan=Math.max(0,imgHeight-viewport.clientHeight);capture.style.transform=`translate3d(0,${(-progress*maxPan).toFixed(1)}px,0)`;}else{capture.style.transform=`translate3d(0,${(-progress*11).toFixed(1)}%,0) scale(1.12)`;}}const doors=visual.querySelectorAll('.gate-door');if(doors.length===2){doors[0].style.transform=`translateX(${(-progress*37).toFixed(1)}%)`;doors[1].style.transform=`translateX(${(progress*37).toFixed(1)}%)`;}const idx=Math.min(2,Math.floor(progress*3));if(el.dataset.moment!==String(idx)){el.dataset.moment=String(idx);const [k,t,b]=moments[el.dataset.project][idx];const m=el.querySelector('.case-moment');m.querySelector('.moment-index').textContent=k;m.querySelector('strong').textContent=t;m.querySelector('p').textContent=b;}}}
function schedule(){if(updateQueued)return;updateQueued=true;requestAnimationFrame(updateScroll)}window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});schedule();
// Enhance the tour with authentic, full-page captures when a developer has generated them.
// Missing captures are not simulated: the repository's verified hero previews remain in place.
for(const img of document.querySelectorAll('img[data-full]')){const probe=new Image();probe.onload=()=>{if(probe.naturalWidth<300||probe.naturalHeight<500)return;img.src=probe.src;img.classList.add('is-full');schedule()};probe.src=img.dataset.full;}
// Project viewer: only TK Counsel is *attempted* as a live iframe; permission is verified by the browser at load time. Every entry keeps a real external original link.
const projects={tk:{title:'TK Counsel',url:'https://tkcounsel.com/',image:'/work-previews/tk-counsel.webp',live:true,note:'Read-only live preview, if TK Counsel permits embedding. Forms are disabled by sandbox. If blocked, open the original site.'},sb:{title:'Socraticblock',url:'https://www.socraticblock.com/',image:'/work-previews/socraticblock.png',live:false,note:'Socraticblock prevents iframe embedding as a security measure. This is a genuine project screenshot; open the original for full navigation.'},fw:{title:'Fornward',url:'https://fornward.com/',image:'/flagship-journey/fornward/gate-world.webp',live:false,note:'Original Fornward landing-page artwork. Open the original landing experience to explore the current game and Early Public Test.'}};
const modal=document.querySelector('#explorer'),frame=document.querySelector('#explorerFrame'),staticEl=document.querySelector('#explorerStatic'),photo=document.querySelector('#explorerImage'),canvas=document.querySelector('#explorerCanvas'),device=document.querySelector('#deviceToggle'),liveButton=document.querySelector('#loadLive');let previousFocus=null;
function closeModal(){if(modal.hidden)return;modal.hidden=true;document.body.classList.remove('dialog-open');frame.src='about:blank';frame.hidden=true;staticEl.hidden=false;canvas.classList.remove('mobile');device.setAttribute('aria-pressed','false');device.textContent='Mobile view';if(previousFocus)previousFocus.focus();}
function openModal(key){const p=projects[key];if(!p)return;previousFocus=document.activeElement;document.querySelector('#explorerTitle').textContent=p.title;document.querySelector('#explorerOriginal').href=p.url;document.querySelector('#explorerNote').textContent=p.note;photo.src=p.image;photo.alt=`${p.title} project preview`;staticEl.hidden=false;frame.hidden=true;frame.src='about:blank';liveButton.hidden=!p.live;modal.hidden=false;document.body.classList.add('dialog-open');document.querySelector('#closeExplorer').focus();}
document.querySelectorAll('.open-explorer').forEach(x=>x.addEventListener('click',()=>openModal(x.dataset.open)));
liveButton.addEventListener('click',()=>{const p=Object.values(projects).find(x=>x.title===document.querySelector('#explorerTitle').textContent);if(!p||!p.live)return;frame.src=p.url;staticEl.hidden=true;frame.hidden=false;liveButton.hidden=true;});document.querySelector('#closeExplorer').addEventListener('click',closeModal);document.querySelector('[data-close="explorer"]').addEventListener('click',closeModal);
device.addEventListener('click',()=>{const isMobile=canvas.classList.toggle('mobile');device.setAttribute('aria-pressed',String(isMobile));device.textContent=isMobile?'Desktop view':'Mobile view';});
document.addEventListener('keydown',e=>{if(modal.hidden)return;if(e.key==='Escape'){e.preventDefault();closeModal();return;}if(e.key==='Tab'){const focusables=[...modal.querySelectorAll('button:not([disabled]),a[href]')].filter(x=>x.getClientRects().length);if(!focusables.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
// Two local deterministic demonstrations. Nothing leaves the browser.
const scenarios={
 automation:[
  ['FIXED RULES / STAGE 01','A request arrives.','A visitor submits a consultation enquiry. The workflow identifies predefined fields without making a judgment.',[['NEW ENQUIRY','Website consultation'],['REQUESTOR','sarah@example.com']],[['INPUT','Enquiry submitted'],['POLICY','Fixed-rule flow']]],
  ['FIXED RULES / STAGE 02','Validate the fields.','The automation confirms the required structured data is present.',[['VALIDATION','Required fields present'],['CONNECTION','Configured workflow']],[['CHECK','Email format accepted'],['RESULT','Required data complete']]],
  ['FIXED RULES / STAGE 03','Create a record.','A simulated CRM receives the validated enquiry through a predefined mapping.',[['RECORD','DEMO-1042'],['SERVICE','New website']],[['CRM','Demo record created'],['ID','DEMO-1042']]],
  ['FIXED RULES / STAGE 04','Notify the owner.','The system prepares an internal alert and assigns the next action.',[['DESTINATION','Business owner'],['STATUS','Notification prepared']],[['OWNER','Draft alert prepared'],['SEND','Disabled in demo']]],
  ['FIXED RULES / STAGE 05','Update the status.','The enquiry is marked for follow-up. The automation is complete without an AI model.',[['REQUEST','DEMO-1042'],['NEXT STEP','Awaiting follow-up']],[['STATUS','Ready for human follow-up'],['MODE','No AI was required']]]
 ],
 agent:[
  ['AGENT / STAGE 01','Understand the question.','The fictional message asks about timing for a website consultation next week.',[['MESSAGE','Next week, afternoon'],['CONTEXT','Unstructured text']],[['INPUT','Customer message received'],['TASK','Determine intent']]],
  ['AGENT / STAGE 02','Find the intent.','The agent infers scheduling intent and an afternoon preference from the request.',[['INTENT','Schedule consultation'],['PREFERENCE','Afternoon']],[['EXTRACT','Scheduling requested'],['CONSTRAINT','Next week / afternoon']]],
  ['AGENT / STAGE 03','Use one permitted tool.','The agent reads a simulated availability fixture. It cannot create events or send messages.',[['ALLOWED','calendar.read_availability'],['DENIED','calendar.create_event']],[['TOOL','Read-only calendar fixture'],['RESULT','Tue 14:00, Thu 15:00']]],
  ['AGENT / STAGE 04','Request human review.','The agent drafts two illustrative options. Sending is blocked until a person reviews the proposed reply.',[['DRAFT','Two appointment options'],['GATE','Human review required']],[['ACTION','Draft reply prepared'],['SEND','Not permitted automatically']]],
  ['AGENT / STAGE 05','A useful next step.','The example owner approves the draft. No external message is sent and no booking is created.',[['REVIEW','Approved in simulation'],['RESULT','Ready to send manually']],[['OWNER','Simulated approval'],['EXTERNAL CALLS','None performed']]]
 ]
};
let currentMode='automation',currentStep=0;const buttons=[...document.querySelectorAll('[data-flow]')];
function renderFlow(){const [kicker,heading,body,details,lines]=scenarios[currentMode][currentStep];document.querySelector('#flowKicker').textContent=kicker;document.querySelector('#flowHeading').textContent=heading;document.querySelector('#flowBody').textContent=body;document.querySelector('#flowDetails').replaceChildren(...details.flatMap(([name,value])=>{const s=document.createElement('span'),b=document.createElement('strong');s.textContent=name;b.textContent=value;return[s,b]}));const el=document.querySelector('#flowLines');el.replaceChildren(...lines.map(([name,value])=>{const p=document.createElement('p'),s=document.createElement('small'),b=document.createElement('b');s.textContent=name;b.textContent=value;p.append(s,b);return p}));[...document.querySelectorAll('.workflow-steps i')].forEach((n,i)=>n.classList.toggle('active',i<=currentStep));document.querySelector('#flowCounter').textContent=String(currentStep+1).padStart(2,'0')+' / 05';document.querySelector('#flowNext').firstChild.textContent=currentStep===4?'Restart demonstration ':'Continue workflow ';buttons.forEach(b=>{const selected=b.dataset.flow===currentMode;b.classList.toggle('selected',selected);b.setAttribute('aria-selected',String(selected))});document.querySelector('#workflowScreen').setAttribute('aria-labelledby',currentMode==='automation'?'tabAutomation':'tabAgent');}
buttons.forEach((b,i)=>{b.addEventListener('click',()=>{currentMode=b.dataset.flow;currentStep=0;renderFlow()});b.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();buttons[e.key==='ArrowRight'?(i+1)%2:(i+1)%2].click();buttons[(i+1)%2].focus()}})});
document.querySelector('#flowNext').addEventListener('click',()=>{currentStep=(currentStep+1)%5;renderFlow()});renderFlow();
})();
