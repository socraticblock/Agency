#!/usr/bin/env python3
"""Fresh independent check preflight regressions; side effects must not occur on known refusal."""
import subprocess, tempfile, unittest, sys, os
from pathlib import Path

GATE=Path(os.environ.get('PE_GATE_OVERRIDE', str(Path(__file__).with_name('pe_gate.py'))))

class PreflightCheck(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory(prefix='pe-preflight-')
        self.repo=Path(self.temp.name)/'repo';self.repo.mkdir()
        self.counter=Path(self.temp.name)/'count'
        self.command=lambda *args: subprocess.run(args,cwd=self.repo,capture_output=True,text=True,timeout=25)
        for args in [('git','init','-q'),('git','config','user.email','tester@example.test'),('git','config','user.name','tester')]:
            r=self.command(*args);self.assertEqual(r.returncode,0,r.stderr)
        (self.repo/'app.py').write_text('VALUE = 1\n')
        (self.repo/'tests').mkdir()
        (self.repo/'tests'/'check.py').write_text(
            f"from pathlib import Path\n"
            f"counter=Path({str(self.counter)!r})\n"
            f"counter.write_text(str(int(counter.read_text())+1 if counter.exists() else 1))\n"
            "assert Path('app.py').read_text().startswith('VALUE = ')\n")
        self.command('git','add','-A');self.command('git','commit','-qm','base')
    def tearDown(self): self.temp.cleanup()
    def gate(self,*args): return self.command(sys.executable,str(GATE),*args)
    def count(self): return int(self.counter.read_text()) if self.counter.exists() else 0
    def setup_valid(self, *, dod=True):
        r=self.gate('baseline','--change-class','refactor','--authorised','app.py')
        self.assertEqual(r.returncode,0,r.stdout+r.stderr)
        args=('falsify','--label','equiv','--kind','equivalence','--cmd','python3 tests/check.py')
        for phase in ('before','after'):
            if phase=='after': (self.repo/'app.py').write_text('VALUE = 2\n')
            r=self.gate(*args,'--phase',phase)
            self.assertEqual(r.returncode,0,r.stdout+r.stderr)
        if dod:
            for i in range(1,7):
                r=self.gate('dod','--item',f'dod.{i}','--answer','Evidence reviewed')
                self.assertEqual(r.returncode,0,r.stdout+r.stderr)
        r=self.gate('record');self.assertEqual(r.returncode,0,r.stdout+r.stderr)
    def test_positive_valid_refactor_executes_once(self):
        self.setup_valid(); prior=self.count()
        r=self.gate('check');self.assertEqual(r.returncode,0,r.stdout+r.stderr)
        self.assertEqual(self.count(),prior+1)
    def test_missing_dod_refuses_without_execution(self):
        self.setup_valid(dod=False); prior=self.count()
        r=self.gate('check');self.assertEqual(r.returncode,2,r.stdout+r.stderr)
        self.assertIn('gate.dod-unanswered',r.stdout+r.stderr)
        self.assertEqual(self.count(),prior)
    def test_outside_scope_refuses_without_execution(self):
        self.setup_valid();(self.repo/'unexpected.txt').write_text('outside\n');prior=self.count()
        r=self.gate('check');self.assertEqual(r.returncode,2,r.stdout+r.stderr)
        self.assertIn('gate.scope-outside-authority',r.stdout+r.stderr)
        self.assertEqual(self.count(),prior)
    def test_verifier_introduces_out_of_scope_file_refused(self):
        marker=Path(self.temp.name)/'trigger'
        checker=self.repo/'tests'/'check.py'
        checker.write_text(checker.read_text()+
            f"if Path({str(marker)!r}).exists(): Path('unapproved.log').write_text('oops')\n")
        self.command('git','add','tests/check.py')
        self.command('git','commit','-qm','add conditional test oracle')
        self.setup_valid();marker.write_text('run')
        r=self.gate('check')
        self.assertEqual(r.returncode,2,r.stdout+r.stderr)
        self.assertTrue((self.repo/'unapproved.log').exists())
        self.assertIn('gate.scope-outside-authority',r.stdout+r.stderr)
    def test_stale_candidate_refuses_without_execution(self):
        self.setup_valid();(self.repo/'app.py').write_text('VALUE = 3\n');prior=self.count()
        r=self.gate('check');self.assertEqual(r.returncode,2,r.stdout+r.stderr)
        self.assertIn('gate.candidate-changed',r.stdout+r.stderr)
        self.assertEqual(self.count(),prior)

if __name__=='__main__':unittest.main(verbosity=2)
