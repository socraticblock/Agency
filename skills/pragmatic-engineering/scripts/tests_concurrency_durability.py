#!/usr/bin/env python3
"""Adversarial local Linux concurrency, crash and durability verification.

These are transaction/side-effect tests, not semantic proof or security-isolation tests.
"""
import importlib.util
import json
import os
from pathlib import Path
import signal
import subprocess
import sys
import tempfile
import time
import unittest

HERE = Path(__file__).resolve().parent
GATE = HERE / 'pe_gate.py'
spec = importlib.util.spec_from_file_location('pe_for_concurrency', GATE)
pe = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pe)

class ConcurrencyDurability(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix='pe-concurrent-')
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        (self.root / 'app.py').write_text('VALUE=1\n')
        for cmd in [('git','init','-q'),('git','config','user.email','test@example.invalid'),
                    ('git','config','user.name','test'),('git','add','.'),('git','commit','-qm','start')]:
            p=subprocess.run(cmd,cwd=self.root,capture_output=True,text=True,timeout=10)
            self.assertEqual(p.returncode,0,p.stderr)
        result=self.call('baseline','--change-class','bugfix','--authorised','app.py')
        self.assertEqual(result.returncode,0,result.stdout+result.stderr)

    def spawn(self, *args):
        return subprocess.Popen([sys.executable,str(GATE),*args],cwd=self.root,
                                stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
    def call(self,*args,timeout=15):
        return subprocess.run([sys.executable,str(GATE),*args],cwd=self.root,
                              capture_output=True,text=True,timeout=timeout)
    def counter(self):
        f=self.root/'executions'
        return len(f.read_text()) if f.exists() else 0
    @staticmethod
    def command(delay=1.0):
        # append is atomic enough for demonstrating that a second command ran
        return ("python3 -c \"import time;from pathlib import Path; "
                f"time.sleep({delay});Path('executions').open('a').write('x')\"")

    def test_two_identical_writers_one_execution(self):
        cmd=self.command()
        procs=[self.spawn('falsify','--label','same','--phase','before','--cmd',cmd) for _ in range(2)]
        outcomes=[]
        for p in procs:
            out,err=p.communicate(timeout=12)
            outcomes.append((p.returncode,out+err))
        self.assertEqual(sorted(r for r,_ in outcomes),[0,2],outcomes)
        self.assertEqual(self.counter(),1)
        self.assertIn('gate.phase-in-flight', '\n'.join(s for code,s in outcomes if code == 2))
        self.assertEqual(len(json.loads((self.root/'.git/pe-gate/falsify.json').read_text())['same']['runs']),1)

    def test_four_identical_writers_one_execution(self):
        cmd=self.command()
        procs=[self.spawn('falsify','--label','same','--phase','before','--cmd',cmd) for _ in range(4)]
        res=[]
        for p in procs:
            out,err=p.communicate(timeout=12)
            res.append((p.returncode,out+err))
        self.assertEqual(sorted(x[0] for x in res),[0,2,2,2],res)
        self.assertEqual(self.counter(),1)

    def test_same_label_different_phase_cannot_overlap(self):
        cmd=self.command()
        a=self.spawn('falsify','--label','same','--phase','before','--cmd',cmd)
        time.sleep(0.25)
        b=self.call('falsify','--label','same','--phase','after','--cmd',cmd)
        out,err=a.communicate(timeout=12)
        self.assertEqual(a.returncode,0,out+err)
        self.assertEqual(b.returncode,2,b.stdout+b.stderr)
        self.assertIn('gate.phase-in-flight',b.stderr)
        self.assertEqual(self.counter(),1)

    def test_other_labels_can_execute_in_parallel_and_persist(self):
        cmd=self.command(0.55)
        start=time.monotonic()
        procs=[self.spawn('falsify','--label',f'label-{i}','--phase','before','--cmd',cmd) for i in range(4)]
        results=[]
        for p in procs:
            o,e=p.communicate(timeout=12)
            results.append((p.returncode,o+e))
        self.assertTrue(all(n==0 for n,_ in results),results)
        self.assertEqual(self.counter(),4)
        state=json.loads((self.root/'.git/pe-gate/falsify.json').read_text())
        self.assertEqual(len(state),4)
        ids=[v['runs']['before']['seq'] for v in state.values()]
        self.assertEqual(len(set(ids)),4)

    def test_parent_crash_keeps_child_owned_lease_then_releases(self):
        # The verifier first signals that it is running. Killing the gate must
        # NOT cause its OS lock to become free while the verifier is still alive.
        cmd=("python3 -c \"import time;from pathlib import Path;"
             "Path('.git/running-marker').write_text('running');time.sleep(2.5);"
             "Path('.git/finished-marker').write_text('done')\"")
        a=self.spawn('falsify','--label','crash','--phase','before','--cmd',cmd)
        limit=time.monotonic()+8
        while not (self.root/'.git'/'running-marker').exists() and time.monotonic()<limit:
            time.sleep(.02)
        self.assertTrue((self.root/'.git'/'running-marker').exists(),'child did not start')
        a.kill();a.wait(timeout=3)
        if a.stdout: a.stdout.close()
        if a.stderr: a.stderr.close()
        b=self.call('falsify','--label','crash','--phase','before','--cmd',cmd)
        self.assertEqual(b.returncode,2,b.stdout+b.stderr)
        self.assertIn('gate.phase-in-flight',b.stderr)
        limit=time.monotonic()+8
        while not (self.root/'.git'/'finished-marker').exists() and time.monotonic()<limit:
            time.sleep(.025)
        self.assertTrue((self.root/'.git'/'finished-marker').exists(),'child should finish naturally')
        # The child may still be closing its last FD for an instant.
        time.sleep(.2)
        c=self.call('falsify','--label','crash','--phase','before','--cmd',"python3 -c 'print(1)'")
        self.assertEqual(c.returncode,0,c.stdout+c.stderr)

    def test_dead_owner_lock_is_recoverable_no_stale_stealing(self):
        # A dead owner can never leave a permanent reservation.
        script=("import os,sys,time;sys.path.insert(0,%r);import pe_gate;"
                "fd,_=pe_gate.state_lock(__import__('pathlib').Path(%r),'manual.lock');"
                "print('LOCKED',flush=True);os._exit(13)" % (str(HERE),str(self.root)))
        p=subprocess.run([sys.executable,'-c',script],capture_output=True,text=True,timeout=5)
        self.assertEqual(p.returncode,13,p.stdout+p.stderr)
        fd,_=pe.state_lock(self.root,'manual.lock',wait=0)
        os.close(fd)

    def test_stale_mtime_does_not_steal_live_lock(self):
        fd,path=pe.state_lock(self.root,'age.lock')
        try:
            old=time.time()-1000000
            os.utime(path,(old,old))
            script=("import sys;sys.path.insert(0,%r);import pe_gate;"
                    "pe_gate.state_lock(__import__('pathlib').Path(%r),'age.lock',wait=.15)" % (str(HERE),str(self.root)))
            p=subprocess.run([sys.executable,'-c',script],capture_output=True,text=True,timeout=5)
            self.assertNotEqual(p.returncode,0,p.stdout)
            self.assertIn('TimeoutError',p.stderr)
        finally:
            os.close(fd)

    def test_atomic_save_keeps_prior_valid_json_if_replace_fails(self):
        base=self.root/'.git/pe-gate'/'falsify.json'
        pe.save(self.root,'falsify.json',{'good':{'v':1}})
        original=base.read_bytes()
        prev=pe.os.replace
        try:
            pe.os.replace=lambda *_: (_ for _ in ()).throw(OSError('simulated failure'))
            with self.assertRaises(OSError):pe.save(self.root,'falsify.json',{'bad':{'v':2}})
        finally:
            pe.os.replace=prev
        self.assertEqual(base.read_bytes(),original)
        self.assertEqual(list(base.parent.glob('.falsify.json.*.tmp')),[])

    def test_timeout_kills_grandchild_process_group(self):
        # Shell -> Python -> grandchild. If only the shell is killed the
        # grandchild continues and writes a marker that should never exist.
        cmd=("python3 -c \"import subprocess,time;"
             "subprocess.Popen(['python3','-c',"
             "'import time;from pathlib import Path;time.sleep(2);Path(\\\"escaped-marker\\\").write_text(\\\"bad\\\")']);"
             "time.sleep(20)\"")
        p=self.call('falsify','--label','timeout','--phase','before',
                    '--cmd',cmd,'--timeout','1',timeout=10)
        self.assertEqual(p.returncode,0,p.stdout+p.stderr)
        data=json.loads((self.root/'.git/pe-gate/falsify.json').read_text())['timeout']['runs']['before']
        self.assertTrue(data['timed_out'])
        time.sleep(2.5)
        self.assertFalse((self.root/'escaped-marker').exists(),p.stdout+p.stderr)

    def test_detached_pipe_holder_cannot_extend_timeout(self):
        # A grandchild in a different session inherits the output pipes, then
        # remains alive after the parent process group is killed. The gate's
        # command timeout must still have a bounded drain/reap path.
        cmd=("python3 -c \"import subprocess,time;"
             "subprocess.Popen(['python3','-c','import os,time;os.setsid();time.sleep(7)']);"
             "time.sleep(9)\"")
        start=time.monotonic()
        p=self.call('falsify','--label','detached','--phase','before',
                    '--cmd',cmd,'--timeout','1',timeout=6)
        self.assertLess(time.monotonic()-start,5.5,p.stdout+p.stderr)
        self.assertEqual(p.returncode,0,p.stdout+p.stderr)
        record=json.loads((self.root/'.git/pe-gate/falsify.json').read_text())['detached']['runs']['before']
        self.assertTrue(record['timed_out'])

    def test_baseline_mutation_during_verification_refuses_recording(self):
        command=("python3 -c \"import time;from pathlib import Path;"
                 "Path('.git/running-marker').write_text('yes');time.sleep(1.2)\"")
        process=self.spawn('falsify','--label','mutate','--phase','before','--cmd',command)
        limit=time.monotonic()+6
        while not (self.root/'.git'/'running-marker').exists() and time.monotonic()<limit:
            time.sleep(.02)
        self.assertTrue((self.root/'.git'/'running-marker').exists())
        base=self.root/'.git/pe-gate/baseline.json'
        payload=json.loads(base.read_text());payload['note']='modified elsewhere'
        base.write_text(json.dumps(payload))
        out,err=process.communicate(timeout=8)
        self.assertEqual(process.returncode,2,out+err)
        self.assertIn('gate.baseline-changed-during-run',out+err)
        state=self.root/'.git/pe-gate/falsify.json'
        if state.exists():self.assertNotIn('mutate',json.loads(state.read_text()))

    def test_check_refuses_if_record_changes_mid_verification(self):
        (self.root/'tests').mkdir()
        (self.root/'tests'/'check.py').write_text(
            "from pathlib import Path\nimport time\n"
            "if Path('.git/slowcheck.flag').exists():\n"
            " Path('.git/check-entered').write_text('1'); time.sleep(1.4)\n"
            "raise SystemExit(1 if 'BUG' in Path('app.py').read_text() else 0)\n")
        # Baseline came before edits: any test additions must be committed
        # before the actual baseline for a legitimate fixture.
        for cmd in (('git','add','.'),('git','commit','-qm','add verifier')):
            p=subprocess.run(cmd,cwd=self.root,capture_output=True,text=True,timeout=10)
            self.assertEqual(p.returncode,0,p.stderr)
        # Re-baseline on the new revision; narrow input remains identical.
        self.assertEqual(self.call('baseline','--change-class','bugfix','--authorised','app.py').returncode,0)
        for phase,source in [('before','BUG\n'),('after','CLEAN\n'),('reverted','BUG\n')]:
            (self.root/'app.py').write_text(source)
            p=self.call('falsify','--label','bug','--phase',phase,'--cmd','python3 tests/check.py')
            self.assertEqual(p.returncode,0,p.stdout+p.stderr)
        (self.root/'app.py').write_text('CLEAN\n')
        for i in range(1,7):
            self.assertEqual(self.call('dod','--item',f'dod.{i}','--answer','yes').returncode,0)
        self.assertEqual(self.call('record').returncode,0)
        p=self.call('check',timeout=15)
        self.assertEqual(p.returncode,0,p.stdout+p.stderr)
        # Test-only control files live in the Git metadata directory and cannot
        # themselves violate the worktree scope policy being tested.
        (self.root/'.git/slowcheck.flag').write_text('')
        proc=self.spawn('check')
        limit=time.monotonic()+8
        while not (self.root/'.git/check-entered').exists() and time.monotonic()<limit:
            time.sleep(.025)
        self.assertTrue((self.root/'.git/check-entered').exists(),'check never reached the verifier')
        change=self.call('dod','--item','dod.1','--answer','changed during run')
        self.assertEqual(change.returncode,0,change.stdout+change.stderr)
        out,err=proc.communicate(timeout=12)
        self.assertEqual(proc.returncode,2,out+err)
        self.assertIn('gate.state-changed-during-check',out+err)

    def test_replace_phase_cannot_preempt_in_flight_verifier(self):
        cmd=self.command()
        original=self.spawn('falsify','--label','replace','--phase','before','--cmd',cmd)
        time.sleep(.25)
        attack=self.call('falsify','--label','replace','--phase','before',
                         '--replace-phase','--cmd',cmd)
        out,err=original.communicate(timeout=12)
        self.assertEqual(original.returncode,0,out+err)
        self.assertEqual(attack.returncode,2,attack.stdout+attack.stderr)
        self.assertTrue(attack.stderr.startswith('REFUSED  gate.phase-in-flight:'),attack.stderr)
        self.assertEqual(self.counter(),1)

if __name__ == '__main__':unittest.main(verbosity=2)
