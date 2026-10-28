import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import vm from 'node:vm';
const site=new URL('../public/flagship-journey/',import.meta.url);
const html=readFileSync(new URL('index.html',site),'utf8');
const css=readFileSync(new URL('signature-hero.css',site),'utf8');
const js=readFileSync(new URL('journey.js',site),'utf8');
const hero=html.slice(html.indexOf('<div class="hero-journey"'),html.indexOf('<section class="work-intro"'));
const base=execFileSync('git',['show','edab4cd:public/flagship-journey/index.html'],{encoding:'utf8'});
test('all chapters after the hero remain identical after newline normalization',()=>{
 const tail=s=>s.slice(s.indexOf('<section class="work-intro"')).replace(/\r\n/g,'\n').replace('<script src="./hero-composition-study.js" defer></script>\n','').replace('<script src="./doorway-hero.js" defer></script>\n','');
 assert.equal(tail(html),tail(base));
});
test('one original website and three subsequent narrative acts replace six cards',()=>{
 assert.equal((hero.match(/data-signature-story=/g)||[]).length,3);
 assert.equal((hero.match(/id="signatureSurface"/g)||[]).length,1);
 assert.doesNotMatch(hero,/signature-visual|signatureRequest|signatureReview|signatureOutcome/);
 assert.doesNotMatch(css,/clip-path\s*:\s*inset\(/);
 assert.doesNotMatch(js,/heroVisualProgress|Math.exp|preventDefault.*wheel/);
 for(const label of ['WEBSITE DESIGN & DEVELOPMENT','AUTOMATION + INTEGRATIONS','AI AGENTS + HUMAN CONTROL','ONE CONSIDERED WHOLE'])assert.ok(hero.includes(label));
});
test('simulation boundaries and independently purchasable services are explicit',()=>{
 for(const text of ['DEMO-1042','calendar.read_availability','SEND BLOCKED','OWNER APPROVAL SIMULATED','No message sent','available independently','approved draft is ready for manual delivery'])assert.ok(hero.includes(text),text);
 assert.match(hero,/href="#work"/);assert.match(hero,/href="#services"/);assert.match(css,/prefers-reduced-motion:reduce/);assert.match(css,/:not\(.is-enhanced\)/);
});
function makeTimeline(width){
 const node=()=>({style:{},inert:false,tabIndex:-1});
 const ids=[...hero.matchAll(/id="([^"]+)"/g)].map(x=>x[1]);
 const nodes=Object.fromEntries(ids.map(id=>[id,node()]));
 const stories=['automation','agent','resolution'].map(role=>({...node(),dataset:{signatureStory:role},querySelector:()=>role==='resolution'?link:null}));
 const link=node(),copy=node(),stage=node(),foundation=node(),bottom=node();
 const context={innerWidth:width,innerHeight:width<400?568:900,clamp:n=>Math.max(0,Math.min(1,n)),heroNodes:nodes,heroCopy:copy,heroStories:stories,routeStations:[node(),node(),node()],heroStage:stage,heroJourney:{style:{setProperty(){}},querySelector:s=>s==='.system-foundation'?foundation:bottom}};
 vm.createContext(context);vm.runInContext(js.slice(js.indexOf('function heroFrame('),js.indexOf('function updateScroll(')),context);
 return {context,nodes,stories,copy,link,run:p=>vm.runInContext(`heroFrame(${p})`,context)};
}
test('forward, fast jumps and reverse scrolling produce identical clean states',()=>{
 for(const width of [320,390,768,1440,1920]){
  const t=makeTimeline(width),snapshots=new Map();
  for(let i=0;i<=200;i++){
   t.run(i/200);
   const visible=t.stories.filter(x=>Number(x.style.opacity)>.05);
   assert.ok(visible.length<=1,`overlapping readable headings at ${i/200}`);
   for(const el of Object.values(t.nodes))assert.doesNotMatch(JSON.stringify(el.style),/NaN|Infinity/);
   snapshots.set(i,JSON.stringify([t.nodes,t.stories,t.copy]));
  }
  for(let i=200;i>=0;i--){t.run(i/200);assert.equal(JSON.stringify([t.nodes,t.stories,t.copy]),snapshots.get(i));}
  t.run(.95);assert.equal(t.link.tabIndex,0);t.run(0);assert.equal(t.link.tabIndex,-1);assert.equal(t.copy.inert,false);
  t.run(.82);assert.equal(t.nodes.approvalBoundary.style.opacity,'1.0000');assert.equal(t.copy.inert,true);
 }
});
test('website unfolds into physical layers before automation becomes visible',()=>{
 for(const id of ['systemDepth','depthSpine','systemExchange','agentToolConnector','agentToolPulse','toolState','resolutionNote']){
  assert.equal((hero.match(new RegExp('id="'+id+'"','g'))||[]).length,1,id);
 }
 for(const word of ['THE EXPERIENCE','CONNECTED INPUT','BUSINESS SYSTEMS','AUTHORIZED TOOL','RESPONSE DATA','HUMAN DECISION GATE']){
  assert.ok(hero.includes(word),word);
 }
 assert.match(css,/\.depth-plane-data/);
 assert.match(css,/\.resolution-linkage/);
 assert.match(css,/\.agent-tool-connector/);
 const t=makeTimeline(1440);
 t.run(0);assert.equal(t.nodes.systemDepth.style.visibility,'hidden');
 t.run(.34);assert.ok(Number(t.nodes.systemDepth.style.opacity)>.5);
 t.run(.4);assert.ok(Number(t.nodes.systemRoute.style.opacity)>.9);
 t.run(.56);assert.ok(Number(t.nodes.agentWorkspace.style.opacity)>.3);
 t.run(.72);assert.ok(Number(t.nodes.agentToolPulse.style.opacity)>.5);
 t.run(.82);assert.equal(t.nodes.approvalBoundary.style.opacity,'1.0000');
 t.run(.95);assert.equal(t.nodes.resolutionNote.style.opacity,'1.0000');
});
test('the system diagram claims are illustrative and the final result is honest',()=>{
 for(const word of ['No message sent','No booking created','No external service called','read-only','available independently']){
   assert.match(hero,new RegExp(word,'i'));
 }
 assert.doesNotMatch(hero,/message successfully sent|meeting booked|crm updated in production/i);
});
test('script parses',()=>execFileSync(process.execPath,['--check',new URL('journey.js',site).pathname.replace(/^\/([A-Za-z]:)/,'$1')],{stdio:'pipe'}));
