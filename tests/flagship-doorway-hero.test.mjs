import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const url=new URL('../public/flagship-journey/doorway-hero.js',import.meta.url);
const source=readFileSync(url,'utf8');
const pure=source.split('/* PURE TIMELINE START */')[1].split('/* PURE TIMELINE END */')[0];
const context={};vm.createContext(context);vm.runInContext(pure,context);
const frame=p=>context.getFrame(p);
test('doorway mode is inert on all previous review and normal routes',()=>{
 for(const search of ['', '?hero-study=connection', '?hero=not-doorway']) vm.runInNewContext(source,{URLSearchParams,location:{search}});
});
test('forward, reverse, and skipped scroll states are deterministic and contain no readable text overlaps',()=>{
 const samples=[];
 for(let i=0;i<=1000;i++){
  const p=i/1000,f=frame(p);samples[i]=JSON.stringify(f);
  assert.ok(f.copy.filter(a=>a>.05).length<=1,'overlapping outer copy at '+p);
  assert.ok(!(f.mapping>.05&&f.agent>.05),'overlapping operational surfaces at '+p);
  assert.ok(!(f.entry>.05&&f.resolved>.05),'overlapping enquiry/result labels at '+p);
  assert.ok(!(f.pending>.05&&f.approved>.05),'overlapping review labels at '+p);
  for(const [key,value]of Object.entries(f))if(key!=='copy'){assert.ok(Number.isFinite(value),key);assert.ok(value>=0&&value<=1,key);}
 }
 for(let i=1000;i>=0;i--)assert.equal(JSON.stringify(frame(i/1000)),samples[i]);
 for(const p of [.98,0,.765,.44,1,.2,.87,0])assert.equal(JSON.stringify(frame(p)),samples[Math.round(p*1000)]);
});
test('causality and approval order hold at representative native-scroll positions',()=>{
 assert.equal(frame(0).frame,1);assert.equal(frame(0).editorial,1);assert.equal(frame(0).body,0);
 assert.equal(frame(.25).entrance,1);assert.equal(frame(.44).mapped,1);assert.equal(frame(.44).notification,1);assert.equal(frame(.44).agent,0);
 assert.equal(frame(.765).options,1);assert.equal(frame(.765).draft,1);assert.equal(frame(.765).review,1);assert.equal(frame(.765).approved,0);
 assert.equal(frame(.825).approved,1);assert.equal(frame(.98).resolved,1);assert.equal(frame(.98).editorial,1);assert.equal(frame(.98).frame,1);assert.equal(frame(.98).body,0);
});
test('one live website and enquiry remain truthful and production-independent',()=>{
 assert.equal((source.match(/class="dw-website"/g)||[]).length,1);assert.equal((source.match(/class="dw-document"/g)||[]).length,1);assert.equal((source.match(/class="dw-message"/g)||[]).length,1);
 for(const claim of ['OWNER APPROVAL SIMULATED','Sending and appointment creation are disabled.','Approved draft.','Ready for manual delivery.','No AI required.','Available independently.','No message is sent'])assert.ok(source.includes(claim),claim);
 assert.doesNotMatch(source,/fetch\(|XMLHttpRequest|setInterval|addEventListener\(['"](?:wheel|touchmove)/);
 assert.ok(source.includes('prefers-reduced-motion'));assert.ok(source.includes('dw-static-story'));
});
test('doorway script parses',()=>execFileSync(process.execPath,['--check',fileURLToPath(url)]));
