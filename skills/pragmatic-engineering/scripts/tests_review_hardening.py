#!/usr/bin/env python3
"""Independent-targeted review cases for experimental v3.5.2 repair; no stable release claim."""
import importlib.util
import json
import os
import subprocess
import sys
import tempfile
import hashlib
import shutil
import time
import shlex
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('review_pe_gate', ROOT/'pe_gate.py')
gate_module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(gate_module)

class PolicyUnitTests(unittest.TestCase):
    def test_root_alias_rejection(self):
        for p in ('','.', './', '**', './**','?*','*','/', '../foo','src/../bar','src//foo','C:/repo','src/../../foo',' x ','src\\..\\foo'):
            with self.subTest(p=p),self.assertRaises(ValueError):gate_module.normalize_scope(p)
    def test_narrow_scopes(self):
        for p in ('app.py','src/foo','./src/foo','tests/*','src/**','src/a?'):
            self.assertTrue(gate_module.normalize_scope(p))
        self.assertTrue(gate_module.covers('src/*','src/example.py'))
        self.assertFalse(gate_module.covers('../src','src/example.py'))
        self.assertFalse(gate_module.covers('src/*','outside/example.py'))
    def test_measurements_reject_corrupt_fields(self):
        good=dict(metric='p95',unit='ms',direction='lower',value=12.0,tolerance=0.5,repeats=3,spread=0.1)
        gate_module.validate_measure(good)
        cases=(('unit',''),('direction','sideways'),('value',float('nan')),
               ('value',float('inf')),('value',True),('repeats',True),('repeats',1),
               ('repeats',2.2),('spread',-1),('spread',float('inf')),
               ('tolerance',0),('tolerance',float('nan')))
        for key,value in cases:
            with self.subTest(key=key,value=str(value)),self.assertRaises(ValueError):
                gate_module.validate_measure({**good,key:value})
        with self.assertRaises(ValueError):gate_module.validate_measure({k:v for k,v in good.items() if k!='unit'})
    def test_candidate_attribution_rejects_external_only(self):
        base=dict(change_class='bugfix')
        m=lambda code,c:dict(exit=code,candidate=c,tests_digest='fixed')
        fals={'bug':dict(cmd='true',kind='capability',runs={'before':m(1,'none:0'),'after':m(0,'none:0'),'reverted':m(1,'none:0')})}
        ids=[x[0] for x in gate_module.class_findings('bugfix',fals,base)]
        self.assertIn('gate.candidate-not-attributable',ids)
        fals['bug']['runs']['after']['candidate']='hash:1'
        ids=[x[0] for x in gate_module.class_findings('bugfix',fals,base)]
        self.assertNotIn('gate.candidate-not-attributable',ids)
    def test_benchmark_tolerance_mismatch_rejected(self):
        m=lambda t,v:dict(metric='speed',unit='ops/s',direction='higher',value=v,tolerance=t,repeats=2,spread=0)
        rec=lambda measure:dict(exit=0,candidate='hash:1',tests_digest='stable',measure=measure)
        fals={'eq':dict(kind='equivalence',runs={'before':rec({}), 'after':rec({})}),
              'b':dict(kind='benchmark',runs={'before':rec(m(1,10)),'after':rec(m(2,20))})}
        ids=[x[0] for x in gate_module.class_findings('performance',fals,{})]
        self.assertIn('gate.benchmark-incomparable',ids)
    def test_git_changed_path_audit_failure_never_defaults_to_empty(self):
        from unittest.mock import patch
        with patch.object(gate_module, '_git_nul', return_value=(1, [])):
            with self.assertRaisesRegex(ValueError, 'changed paths are unknown'):
                gate_module.changed_paths(Path('/tmp'))

    def test_shell_startup_is_inconclusive(self):
        rec=lambda code:dict(exit=code,candidate='different',tests_digest='same',spawn_error=False,timed_out=False)
        f={'b':dict(kind='capability',runs={'before':rec(127),'after':rec(0),'reverted':rec(1)})}
        ids=[x[0] for x in gate_module.class_findings('bugfix',f,{})]
        self.assertIn('gate.command-not-executed',ids)

class CLIFixture(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(prefix='review-positive-')
        self.addCleanup(self.tmp.cleanup)
        self.repo=Path(self.tmp.name)
        (self.repo/'app.py').write_text('BUG=1\n')
        (self.repo/'tests').mkdir()
        (self.repo/'tests'/'check.py').write_text("from pathlib import Path\nraise SystemExit(1 if 'BUG=1' in Path('app.py').read_text() else 0)\n")
        for args in (('init','-q'),('config','user.email','test@example.invalid'),('config','user.name','test'),('add','.'),('commit','-qm','base')):
            p=subprocess.run(('git',*args),cwd=self.repo,capture_output=True,text=True)
            self.assertEqual(p.returncode,0,p.stderr)
    def cmd(self,*args):
        p=subprocess.run((sys.executable,str(ROOT/'pe_gate.py'),*args),cwd=self.repo,capture_output=True,text=True,timeout=40)
        return p.returncode,p.stdout+p.stderr
    def baseline(self,cls='bugfix'):
        n,txt=self.cmd('baseline','--change-class',cls,'--authorised','app.py')
        self.assertEqual(n,0,txt)
    def record(self):
        for n in range(1,7):
            k,txt=self.cmd('dod','--item',f'dod.{n}','--answer','checked')
            self.assertEqual(k,0,txt)
        k,txt=self.cmd('record');self.assertEqual(k,0,txt)
    def test_real_bugfix_fails_passes_reverts_and_passes(self):
        self.baseline()
        checks=[]
        for phase,content in (('before','BUG=1\n'),('after','BUG=0\n'),('reverted','BUG=1\n')):
            (self.repo/'app.py').write_text(content)
            n,txt=self.cmd('falsify','--kind','capability','--label','fix','--cmd','python3 tests/check.py','--phase',phase)
            self.assertEqual(n,0,txt);checks.append(phase)
        (self.repo/'app.py').write_text('BUG=0\n')
        self.record()
        n,txt=self.cmd('check')
        self.assertEqual(n,0,txt)
        self.assertIn('PASS',txt)
    def test_mutated_class_blocks_untrusted_execution(self):
        self.baseline()
        f=self.repo/'.git'/'pe-gate'/'baseline.json'; v=json.loads(f.read_text());v['change_class']='bogus';f.write_text(json.dumps(v))
        target=self.repo/'SHOULD_NOT_EXIST'
        n,txt=self.cmd('falsify','--label','attack','--phase','before','--cmd',f'touch {target}')
        self.assertEqual(n,2,txt)
        self.assertFalse(target.exists(),txt)
        self.assertIn('gate.state-invalid',txt)
    def test_input_traversal_refused(self):
        n,txt=self.cmd('baseline','--change-class','docs','--authorised','app.py','--input','../escape.txt')
        self.assertEqual(n,2,txt)
        self.assertIn('gate.input-invalid',txt)
    def test_corrupt_seq_blocks_record(self):
        self.baseline()
        seq=self.repo/'.git'/'pe-gate'/'seq.json';seq.write_text('{"next": "error"}')
        n,txt=self.cmd('record');self.assertEqual(n,2,txt);self.assertIn('gate.state-invalid',txt)

    def test_duplicate_phase_is_refused_and_keeps_the_earlier_record(self):
        self.baseline()
        (self.repo/'app.py').write_text('BUG=1\n')
        n,txt=self.cmd('falsify','--kind','capability','--label','fix','--cmd','python3 tests/check.py','--phase','before')
        self.assertEqual(n,0,txt)
        state=self.repo/'.git'/'pe-gate'/'falsify.json'
        first=json.loads(state.read_text())['fix']['runs']['before']
        n,txt=self.cmd('falsify','--kind','capability','--label','fix','--cmd','python3 tests/check.py','--phase','before')
        self.assertEqual(n,2,txt)
        self.assertIn('gate.phase-already-recorded',txt)
        self.assertEqual(json.loads(state.read_text())['fix']['runs']['before'],first,
                         'a refused re-record must leave the earlier evidence untouched')

    def test_replace_phase_supersedes_instead_of_erasing(self):
        self.baseline()
        (self.repo/'app.py').write_text('BUG=1\n')
        self.cmd('falsify','--kind','capability','--label','fix','--cmd','python3 tests/check.py','--phase','before')
        state=self.repo/'.git'/'pe-gate'/'falsify.json'
        first=json.loads(state.read_text())['fix']['runs']['before']
        n,txt=self.cmd('falsify','--kind','capability','--label','fix','--cmd','python3 tests/check.py',
                       '--phase','before','--replace-phase')
        self.assertEqual(n,0,txt)
        entry=json.loads(state.read_text())['fix']
        self.assertNotEqual(entry['runs']['before']['seq'],first['seq'])
        superseded=[s for s in entry.get('superseded',[]) if s['phase']=='before']
        self.assertTrue(superseded,txt)
        self.assertEqual(superseded[0]['replaced'],first,
                         'the replaced record must survive under `superseded`, not be erased')

    def test_concurrent_writers_all_persist(self):
        self.baseline()
        (self.repo/'app.py').write_text('BUG=1\n')
        procs=[subprocess.Popen((sys.executable,str(ROOT/'pe_gate.py'),'falsify','--kind','capability',
                                 '--label',f'c{i}','--cmd','python3 tests/check.py','--phase','before'),
                                cwd=self.repo,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True)
               for i in range(3)]
        outputs=[p.communicate(timeout=12)[0] for p in procs]
        codes=[p.returncode for p in procs]
        self.assertEqual(codes,[0,0,0],'every writer must report success only when its record is stored')
        state=json.loads((self.repo/'.git'/'pe-gate'/'falsify.json').read_text())
        self.assertEqual(sorted(state),['c0','c1','c2'],'concurrent writers must merge, not replace, the evidence store')
        seqs=[state[k]['runs']['before']['seq'] for k in state]
        self.assertEqual(len(set(seqs)),3,'each record keeps its own sequence number')

    def test_duplicate_phase_refuses_before_running_side_effectful_command(self):
        self.baseline()
        command = ('python3 -c "from pathlib import Path; p=Path(\'effects-count\'); '
                   'p.write_text(str(int(p.read_text()) + 1 if p.exists() else 1))"')
        n,txt=self.cmd('falsify','--label','effects','--cmd',command,'--phase','before')
        self.assertEqual(n,0,txt)
        self.assertEqual((self.repo/'effects-count').read_text(),'1')
        n,txt=self.cmd('falsify','--label','effects','--cmd',command,'--phase','before')
        self.assertEqual(n,2,txt)
        self.assertIn('gate.phase-already-recorded',txt)
        self.assertEqual((self.repo/'effects-count').read_text(),'1',
                         'a known duplicate must be refused before executing a command with effects')

    def test_malformed_superseded_history_refuses(self):
        self.baseline()
        self.cmd('falsify','--label','e','--cmd','python3 tests/check.py','--phase','before')
        state=self.repo/'.git'/'pe-gate'/'falsify.json'
        def record_with(history):
            data=json.loads(state.read_text())
            data['e']['superseded']=history
            state.write_text(json.dumps(data))
            return self.cmd('record')
        for corrupt in (
            [{'phase':'before','at':'yesterday','replaced':{'anything':'goes'}}],
            [{'phase':'before','at':'yesterday','replaced':json.loads(state.read_text())['e']['runs']['before']}],
            'not-a-list',
        ):
            with self.subTest(corrupt=str(corrupt)[:55]):
                n,txt=record_with(corrupt)
                self.assertEqual(n,2,txt)
                self.assertIn('gate.state-invalid',txt)

    def test_superseded_sequence_is_ordered_and_bound(self):
        self.baseline()
        self.cmd('falsify','--label','e','--cmd','python3 tests/check.py','--phase','before')
        state=self.repo/'.git'/'pe-gate'/'falsify.json'
        n,txt=self.cmd('falsify','--label','e','--cmd','python3 tests/check.py','--phase','before','--replace-phase')
        self.assertEqual(n,0,txt)
        active=json.loads(state.read_text());self.assertEqual(len(active['e']['superseded']),1)
        # A fabricated historical sequence must be refused instead of being
        # ignored just because the active run looks valid.
        active['e']['superseded'][0]['replaced']['seq']=1000000
        state.write_text(json.dumps(active))
        n,txt=self.cmd('record')
        self.assertEqual(n,2,txt)
        self.assertIn('gate.state-invalid',txt)

    def _side_cmd(self, seconds=1.0):
        """A verifier with an observable side effect, so a double execution is countable."""
        # Outside the repository: the side-effect log is not part of the change under test.
        self.side = Path(tempfile.mkdtemp(prefix='review-side-'))/'side.log'
        self.addCleanup(shutil.rmtree, self.side.parent, True)
        return (f'python3 -c "open(\'{self.side}\',\'a\').write(\'x\\n\'); '
                f'import time; time.sleep({seconds})"')

    def _refactor_pass(self, cmd):
        self.baseline('refactor')
        for phase in ('before','after'):
            n,txt=self.cmd('falsify','--label','eq','--kind','equivalence','--cmd',cmd,'--phase',phase)
            self.assertEqual(n,0,txt)
        self.record()
        before_check=len(self.side.read_text().splitlines()) if self.side.exists() else 0
        n,txt=self.cmd('check')
        self.assertEqual(n,0,txt)
        after_check=len(self.side.read_text().splitlines()) if self.side.exists() else 0
        return after_check-before_check   # executions caused by that one check

    def test_concurrent_checks_run_the_verifier_once(self):
        """`check` re-runs the recorded command, so without the lease two checks both launch it."""
        cmd=self._side_cmd()
        single=self._refactor_pass(cmd)
        self.assertEqual(single,1,'one check runs the verifier once')
        self.side.unlink()
        procs=[subprocess.Popen((sys.executable,str(ROOT/'pe_gate.py'),'check'),cwd=self.repo,
                                stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True) for _ in range(3)]
        outs=[p.communicate()[0] for p in procs]
        ran=len(self.side.read_text().splitlines()) if self.side.exists() else 0
        self.assertEqual(ran,1,f'the verifier must execute once, not once per concurrent check (ran {ran})')
        self.assertIn('gate.phase-in-flight',outs[0]+outs[1]+outs[2],
                      'the losing checks must refuse by name rather than pass')

    def test_git_assume_unchanged_cannot_hide_unauthorised_content(self):
        """Git index visibility flags must prevent a false scope PASS."""
        (self.repo/'outside.py').write_text('ORIGINAL\n')
        for args in [('add','outside.py'), ('commit','-qm','outside baseline')]:
            p=subprocess.run(('git',*args),cwd=self.repo,capture_output=True,text=True)
            self.assertEqual(p.returncode,0,p.stdout+p.stderr)
        self.baseline('refactor')
        (self.repo/'app.py').write_text('BUG=0\n')
        for phase in ('before','after'):
            n,txt=self.cmd('falsify','--label','eq','--kind','equivalence',
                           '--cmd','python3 tests/check.py','--phase',phase)
            self.assertEqual(n,0,txt)
        self.record()
        n,txt=self.cmd('check'); self.assertEqual(n,0,txt)
        p=subprocess.run(('git','update-index','--assume-unchanged','outside.py'),cwd=self.repo,
                         capture_output=True,text=True)
        self.assertEqual(p.returncode,0,p.stdout+p.stderr)
        (self.repo/'outside.py').write_text('UNAUTHORISED CHANGE\n')
        n,txt=self.cmd('check')
        self.assertEqual(n,2,txt)
        self.assertIn('gate.git-index-hidden',txt,txt)

    def test_verifier_cannot_hide_unauthorised_edit_with_git_index_mid_check(self):
        """Preflight alone misses index flags set by a re-run verifier itself."""
        (self.repo/'outside.py').write_text('ORIGINAL\n')
        for args in [('add','outside.py'), ('commit','-qm','outside baseline')]:
            p=subprocess.run(('git',*args),cwd=self.repo,capture_output=True,text=True)
            self.assertEqual(p.returncode,0,p.stdout+p.stderr)
        marker=Path(self.tmp.name).parent / (Path(self.tmp.name).name + '-trigger')
        self.addCleanup(marker.unlink,missing_ok=True)
        script=("import pathlib,subprocess; p=pathlib.Path(%r); "
                "subprocess.run(['git','update-index','--assume-unchanged','outside.py'],check=True) if p.exists() else None; "
                "pathlib.Path('outside.py').write_text('HIDDEN\\n') if p.exists() else None" % str(marker))
        command='python3 -c '+shlex.quote(script)
        self.baseline('refactor')
        (self.repo/'app.py').write_text('BUG=0\n')
        for phase in ('before','after'):
            n,txt=self.cmd('falsify','--label','eq','--kind','equivalence',
                           '--cmd',command,'--phase',phase)
            self.assertEqual(n,0,txt)
        self.record()
        n,txt=self.cmd('check'); self.assertEqual(n,0,txt)
        marker.write_text('now')
        n,txt=self.cmd('check')
        self.assertEqual(n,2,txt)
        self.assertIn('gate.git-index-hidden-during-check',txt,txt)
        self.assertNotEqual((self.repo/'outside.py').read_text(),'ORIGINAL\n',
                            'the command must have produced the unauthorized edit')

    def test_git_skip_worktree_cannot_hide_unauthorised_content(self):
        (self.repo/'outside.py').write_text('ORIGINAL\n')
        for args in [('add','outside.py'), ('commit','-qm','outside baseline')]:
            p=subprocess.run(('git',*args),cwd=self.repo,capture_output=True,text=True)
            self.assertEqual(p.returncode,0,p.stdout+p.stderr)
        self.baseline('refactor')
        (self.repo/'app.py').write_text('BUG=0\n')
        for phase in ('before','after'):
            n,txt=self.cmd('falsify','--label','eq','--kind','equivalence',
                           '--cmd','python3 tests/check.py','--phase',phase)
            self.assertEqual(n,0,txt)
        self.record()
        n,txt=self.cmd('check'); self.assertEqual(n,0,txt)
        p=subprocess.run(('git','update-index','--skip-worktree','outside.py'),cwd=self.repo,
                         capture_output=True,text=True)
        self.assertEqual(p.returncode,0,p.stdout+p.stderr)
        (self.repo/'outside.py').write_text('UNAUTHORISED CHANGE\n')
        n,txt=self.cmd('check')
        self.assertEqual(n,2,txt)
        self.assertIn('gate.git-index-hidden',txt,txt)

    def test_killed_check_keeps_lease_until_verifier_exits(self):
        """A killed check must not permit a duplicate live verifier to start."""
        cmd=self._side_cmd(2.0)
        self._refactor_pass(cmd)
        self.side.unlink()
        first=subprocess.Popen((sys.executable,str(ROOT/'pe_gate.py'),'check'),cwd=self.repo,
                               stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True)
        deadline=time.monotonic()+6
        while not self.side.exists() and time.monotonic()<deadline:
            time.sleep(.02)
        self.assertTrue(self.side.exists(), 'the first check did not launch')
        first.kill(); first.wait(timeout=3)
        if first.stdout: first.stdout.close()
        n,txt=self.cmd('check')
        self.assertEqual(n,2,txt)
        self.assertIn('gate.phase-in-flight',txt,txt)
        self.assertEqual(len(self.side.read_text().splitlines()),1,
                         'killing the check parent must not allow the orphan verifier to be doubled')

    def test_symlinked_lock_path_is_refused(self):
        """A lock path that is not a regular file must be refused, not followed."""
        self.baseline()
        target=Path(self.tmp.name)/'outside.lock'
        lock=self.repo/'.git'/'pe-gate'/('phase-'+hashlib.sha256(b'e').hexdigest()+'.lock')
        lock.parent.mkdir(parents=True,exist_ok=True)
        if lock.exists():lock.unlink()
        lock.symlink_to(target)
        n,txt=self.cmd('falsify','--label','e','--kind','capability','--cmd','true','--phase','before')
        self.assertEqual(n,2,txt)
        self.assertFalse(target.exists(),'the gate must not create the symlink target')
        self.assertNotIn('Traceback',txt,txt)

    def test_check_refuses_while_the_same_label_runs(self):
        cmd=self._side_cmd(2.0)
        self._refactor_pass(cmd)
        self.side.unlink()
        running=subprocess.Popen((sys.executable,str(ROOT/'pe_gate.py'),'falsify','--label','eq',
                                  '--kind','equivalence','--cmd',cmd,'--phase','before','--replace-phase'),
                                 cwd=self.repo,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True)
        time.sleep(0.6)
        n,txt=self.cmd('check')
        running.communicate()
        self.assertEqual(n,2,txt)
        self.assertIn('gate.phase-in-flight',txt,txt)
        ran=len(self.side.read_text().splitlines()) if self.side.exists() else 0
        self.assertEqual(ran,1,f'check must not re-run a command that is already executing (ran {ran})')

if __name__=='__main__':unittest.main(verbosity=2)
