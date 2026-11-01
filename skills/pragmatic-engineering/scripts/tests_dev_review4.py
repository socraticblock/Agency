#!/usr/bin/env python3
"""Adversarial regressions for dev-review.4; each fixture uses a fresh Git repository.

All tests must fail on dev-review.3 (for the corresponding defect) and pass on
review.4. The original source and full test logs are separate evidence.
"""
import importlib.util
import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent
GATE = ROOT / 'pe_gate.py'
spec = importlib.util.spec_from_file_location('dev4_under_test', GATE)
pe = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pe)


class Repo(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix='pe-dev4-')
        self.addCleanup(self.tmp.cleanup)
        self.repo = Path(self.tmp.name)
        (self.repo / 'tests').mkdir()
        (self.repo / 'tests' / 'verify.py').write_text('raise SystemExit(0)\n')
        (self.repo / 'app.py').write_text('x=1\n')
        (self.repo / 'outside.sh').write_text('#!/bin/sh\nexit 0\n')
        (self.repo / 'Foo').write_text('tracked case-twin\n')
        for args in [('init','-q'),('config','user.email','tests@example.invalid'),
                     ('config','user.name','tester'),('add','.'),('commit','-qm','initial')]:
            cp = self.git(*args)
            self.assertEqual(cp.returncode, 0, cp.stderr)

    def git(self,*args):
        return subprocess.run(('git',*args),cwd=self.repo,capture_output=True,text=True)

    def gate(self,*args):
        cp = subprocess.run((sys.executable,str(GATE),*args),cwd=self.repo,
                            capture_output=True,text=True,timeout=30)
        return cp.returncode, cp.stdout + cp.stderr

    def prepare_refactor(self):
        rc,output=self.gate('baseline','--change-class','refactor','--authorised','app.py')
        self.assertEqual(rc,0,output)
        rc,output=self.gate('falsify','--label','eq','--kind','equivalence',
                       '--cmd','python3 tests/verify.py','--phase','before')
        self.assertEqual(rc,0,output)
        (self.repo/'app.py').write_text('x=1 # updated\n')
        rc,output=self.gate('falsify','--label','eq','--kind','equivalence',
                       '--cmd','python3 tests/verify.py','--phase','after')
        self.assertEqual(rc,0,output)
        for i in range(1,7):
            rc,output=self.gate('dod','--item',f'dod.{i}','--answer','evaluated')
            self.assertEqual(rc,0,output)
        rc,output=self.gate('record');self.assertEqual(rc,0,output)
        rc,output=self.gate('check');self.assertEqual(rc,0,output)

    def test_false_pass_from_core_filemode_false_is_refused(self):
        self.prepare_refactor()
        self.assertEqual(self.git('config','core.filemode','false').returncode,0)
        (self.repo/'outside.sh').chmod(0o755)
        ordinary=self.git('status','--porcelain').stdout
        self.assertNotIn('outside.sh',ordinary,'control: ordinary Git must conceal permission change')
        rc,out=self.gate('check')
        self.assertEqual(rc,2,out)
        self.assertIn('gate.scope-outside-authority',out)
        self.assertIn('outside.sh',out)

    def test_false_pass_from_core_ignorecase_true_is_refused(self):
        self.prepare_refactor()
        # On a case-sensitive Linux filesystem, `Foo` and `foo` are distinct.
        # Git's case-insensitive emulation can conceal a new out-of-scope `foo`.
        self.assertEqual(self.git('config','core.ignorecase','true').returncode,0)
        (self.repo/'foo').write_text('concealed unauthorized file\n')
        ordinary=self.git('ls-files','--others','--exclude-standard').stdout
        self.assertNotIn('foo', ordinary, 'control: Git casefold mode must conceal the twin')
        rc,out=self.gate('check')
        self.assertEqual(rc,2,out)
        self.assertIn('gate.scope-outside-authority',out)
        self.assertIn('foo',out)

    def test_persisted_revision_is_never_evaluated_as_shell_code(self):
        rc,out=self.gate('baseline','--change-class','refactor','--authorised','app.py')
        self.assertEqual(rc,0,out)
        state=self.repo/'.git'/'pe-gate'/'baseline.json'
        obj=json.loads(state.read_text())
        obj['revision']='HEAD; touch ATTACK_SIDE_EFFECT; #'
        state.write_text(json.dumps(obj))
        rc,out=self.gate('check')
        self.assertEqual(rc,2,out)
        self.assertFalse((self.repo/'ATTACK_SIDE_EFFECT').exists(),out)
        self.assertIn('gate.state-invalid',out)

    def test_valid_commit_identifier_remains_accepted(self):
        self.prepare_refactor()
        rc,out=self.gate('check')
        self.assertEqual(rc,0,out)

    def test_symlink_target_spelling_changes_candidate_fingerprint(self):
        (self.repo/'a').write_text('identical\n')
        (self.repo/'b').write_text('identical\n')
        (self.repo/'link').symlink_to('a')
        self.assertEqual(self.git('add','.').returncode,0)
        self.assertEqual(self.git('commit','-qm','symlinks').returncode,0)
        (self.repo/'link').unlink();(self.repo/'link').symlink_to('b')
        first,issues=pe.candidate_fingerprint(self.repo,['link'],[])
        self.assertFalse(issues,issues)
        (self.repo/'link').unlink();(self.repo/'link').symlink_to('./b')
        second,issues=pe.candidate_fingerprint(self.repo,['link'],[])
        self.assertFalse(issues,issues)
        self.assertNotEqual(first,second,'literal Git symlink identity must affect candidate identity')

    def test_executable_mode_changes_candidate_fingerprint(self):
        f=self.repo/'app.py';f.write_text('changed\n')
        f.chmod(0o644)
        before,issues=pe.candidate_fingerprint(self.repo,['app.py'],[])
        self.assertFalse(issues,issues)
        f.chmod(0o755)
        after,issues=pe.candidate_fingerprint(self.repo,['app.py'],[])
        self.assertFalse(issues,issues)
        self.assertNotEqual(before,after)

    @unittest.skipUnless(hasattr(os, 'mkfifo'),'POSIX FIFO only')
    def test_fifo_is_not_read_as_a_regular_file(self):
        fifo=self.repo/'pipe'
        os.mkfifo(fifo)
        # Run in a child with a bounded timeout: the predecessor blocks forever
        # on `Path.read_bytes()` when no FIFO writer exists.
        test_code=("import importlib.util,sys; s=importlib.util.spec_from_file_location('p',sys.argv[1]); "
                   "m=importlib.util.module_from_spec(s);s.loader.exec_module(m); "
                   "print(m._hash_file(__import__('pathlib').Path(sys.argv[2])))")
        cp=subprocess.run((sys.executable,'-c',test_code,str(GATE),str(fifo)),
                          capture_output=True,text=True,timeout=3)
        self.assertEqual(cp.returncode,0,cp.stderr)
        self.assertEqual(cp.stdout.strip(),'None')

    def test_dangling_symlink_is_not_treated_as_absent(self):
        f=self.repo/'dangling';f.symlink_to('not_present')
        fingerprint,problems=pe.candidate_fingerprint(self.repo,['dangling'],['dangling'])
        self.assertTrue(problems, 'a symlink in candidate exists, though its target is missing')


if __name__=='__main__':
    unittest.main(verbosity=2)
