import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const studyUrl=new URL('../public/flagship-journey/hero-composition-study.js',import.meta.url);
const source=readFileSync(studyUrl,'utf8');
test('composition prototype is inert on the current hero and unrecognised review URLs',()=>{
 for(const search of ['', '?hero-study=not-a-state', '?hero-study=<script>']){
  // No document is supplied: even a DOM lookup would fail this isolation test.
  vm.runInNewContext(source,{URLSearchParams,location:{search}});
 }
});
test('study uses one continuing document, honest review states and no automatic animation',()=>{
 assert.equal((source.match(/class="kf-document"/g)||[]).length,1);
 assert.equal((source.match(/class="kf-message"/g)||[]).length,1);
 for(const state of ['experience','connection','intelligence','resolution','unfold','interpret','return','handoff']) assert.ok(source.includes("'"+state+"'"));
 for(const claim of ['OWNER APPROVAL SIMULATED','No message sent. No appointment created.','Ready for your review.','This demo cannot send messages or create appointments.','Available independently.']) assert.ok(source.includes(claim),claim);
 assert.doesNotMatch(source,/requestAnimationFrame|addEventListener\(['"](?:wheel|touchmove|scroll)|setInterval|setTimeout/);
});
test('composition script parses',()=>execFileSync(process.execPath,['--check',fileURLToPath(studyUrl)]));
