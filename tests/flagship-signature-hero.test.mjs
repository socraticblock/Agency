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
 const tail=s=>s.slice(s.indexOf('<section class="work-intro"')).replace(/\r\n/g,'\n');
 assert.equal(tail(html),tail(base));
});
test('one original website and three subsequent narrative acts replace six cards',()=>{
 assert.equal((hero.match(/data-signature-story=/g)||[]).length,3);
 assert.equal((hero.match(/id="signatureSurface"/g)||[]).length,1);
 assert.doesNotMatch(hero,/signature-visual|signatureRequest|signatureReview|signatureOutcome/);
 assert.doesNotMatch(css,/clip-path|will-change/);
 assert.doesNotMatch(js,/heroVisualProgress|Math.exp|preventDefault.*wheel/);
 for(const label of ['WEBSITE DESIGN & DEVELOPMENT','AUTOMATION + INTEGRATIONS','AI AGENTS + HUMAN CONTROL','FROM POSSIBILITY TO PROOF'])assert.ok(hero.includes(label));
});
test('simulation boundaries and independently purchasable services are explicit',()=>{
 for(const text of ['DEMO-1042','calendar.read_availability','Send & calendar create blocked','OWNER APPROVAL SIMULATED','No message sent or booking created','available independently','approved draft is ready for manual delivery'])assert.ok(hero.includes(text),text);
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
  t.run(.75);assert.equal(t.nodes.approvalBoundary.style.opacity,'1.0000');assert.equal(t.copy.inert,true);
 }
});
test('script parses',()=>execFileSync(process.execPath,['--check',new URL('journey.js',site).pathname.replace(/^\/([A-Za-z]:)/,'$1')],{stdio:'pipe'}));
