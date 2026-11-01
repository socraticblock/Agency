#!/usr/bin/env python3
"""External independent counterexamples for Git worktree identity and related cases."""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

GATE=Path(__file__).resolve().parent/'pe_gate.py'

class CheckoutIdentity(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(prefix='pe-review5-')
        self.addCleanup(self.tmp.cleanup)
        self.base=Path(self.tmp.name)
        self.repo=self.base/'real'
        self.repo.mkdir()
        (self.repo/'tests').mkdir()
        (self.repo/'tests'/'verify.py').write_text('raise SystemExit(0)\n')
        (self.repo/'app.py').write_text('x=1\n')
        (self.repo/'outside.sh').write_text('one\n')
        for args in [('init','-q'),('config','user.email','review@example.invalid'),
                     ('config','user.name','review'),('add','.'),('commit','-qm','initial')]:
            self.git(*args)

    def git(self,*args,cwd=None):
        cp=subprocess.run(('git',*args),cwd=cwd or self.repo,text=True,capture_output=True,timeout=10)
        self.assertEqual(cp.returncode,0,cp.stdout+cp.stderr)
        return cp.stdout

    def gate(self,*args,cwd=None,env=None):
        cp=subprocess.run((sys.executable,str(GATE),*args),cwd=cwd or self.repo,
                          capture_output=True,text=True,timeout=12,env=env)
        return cp.returncode, cp.stdout+cp.stderr

    def prepare(self):
        commands=[('baseline','--change-class','refactor','--authorised','app.py'),
                  ('falsify','--label','eq','--kind','equivalence','--cmd','python3 tests/verify.py','--phase','before')]
        for args in commands:
            rc,out=self.gate(*args);self.assertEqual(rc,0,out)
        (self.repo/'app.py').write_text('x=1 # changed\n')
        rc,out=self.gate('falsify','--label','eq','--kind','equivalence',
                         '--cmd','python3 tests/verify.py','--phase','after');self.assertEqual(rc,0,out)
        for k in range(1,7):
            rc,out=self.gate('dod','--item',f'dod.{k}','--answer','evaluated');self.assertEqual(rc,0,out)
        rc,out=self.gate('record');self.assertEqual(rc,0,out)
        rc,out=self.gate('check');self.assertEqual(rc,0,out)

    def test_hermes_absolute_core_worktree_redirect_refused(self):
        self.git('clone','-q','.','../clean')
        self.git('config','core.worktree',str(self.base/'clean'))
        (self.repo/'outside.sh').write_text('unauthorized\n')
        rc,out=self.gate('baseline','--change-class','refactor','--authorised','app.py')
        self.assertEqual(rc,2,out); self.assertIn('gate.workspace-identity',out)
        rc,out=self.gate('check')
        self.assertEqual(rc,2,out); self.assertIn('gate.workspace-identity',out)

    def test_hermes_redirect_after_valid_evidence_refused(self):
        self.prepare()
        self.git('clone','-q','.','../clean')
        self.git('config','core.worktree',str(self.base/'clean'))
        (self.repo/'outside.sh').write_text('unauthorized\n')
        rc,out=self.gate('check')
        self.assertEqual(rc,2,out); self.assertIn('gate.workspace-identity',out)

    def test_verifier_redirects_worktree_during_check_refused(self):
        """The check preflight alone must not authorize later redirected Git queries."""
        clone=self.base/'clean'
        flag=self.base/'redirect-now.flag'
        verifier=("import pathlib,subprocess\n"
                  f"if pathlib.Path({str(flag)!r}).exists():\n"
                  f"    subprocess.run(['git','config','core.worktree',{str(clone)!r}],check=True)\n"
                  "raise SystemExit(0)\n")
        (self.repo/'tests'/'verify.py').write_text(verifier)
        self.git('add','.');self.git('commit','-qm','conditional verifier')
        self.prepare()
        self.git('clone','-q','.',str(clone))
        (clone/'app.py').write_bytes((self.repo/'app.py').read_bytes())
        # No pre-existing out-of-scope mutation: reach the live verifier so
        # this test isolates worktree redirection *during* check.
        flag.write_text('enable worktree redirect\n')
        rc,out=self.gate('check')
        self.assertEqual(rc,2,out)
        self.assertIn('gate.workspace-identity',out)

    def test_verifier_redirect_does_not_publish_phase(self):
        clone=self.base/'clean'
        flag=self.base/'activate.flag'
        verifier=("import pathlib,subprocess\n"
                  f"if pathlib.Path({str(flag)!r}).exists():\n"
                  f"    subprocess.run(['git','config','core.worktree',{str(clone)!r}],check=True)\n"
                  "raise SystemExit(0)\n")
        (self.repo/'tests'/'verify.py').write_text(verifier)
        self.git('add','.');self.git('commit','-qm','conditional verifier')
        self.git('clone','-q','.',str(clone))
        rc,out=self.gate('baseline','--change-class','refactor','--authorised','app.py')
        self.assertEqual(rc,0,out)
        args=('falsify','--label','eq','--kind','equivalence',
              '--cmd','python3 tests/verify.py')
        rc,out=self.gate(*args,'--phase','before');self.assertEqual(rc,0,out)
        (self.repo/'app.py').write_text('x=1 # modified\n')
        flag.write_text('now\n')
        rc,out=self.gate(*args,'--phase','after')
        self.assertEqual(rc,2,out);self.assertIn('gate.workspace-identity-during-verifier',out)
        state=json.loads((self.repo/'.git'/'pe-gate'/'falsify.json').read_text())
        self.assertEqual(set(state['eq']['runs']),{'before'})

    def test_core_worktree_redirect_to_ancestor_refused(self):
        self.git('config','core.worktree',str(self.base))
        rc,out=self.gate('baseline','--change-class','refactor','--authorised','app.py')
        self.assertEqual(rc,2,out);self.assertIn('gate.workspace-identity',out)

    def test_environment_worktree_redirect_refused(self):
        self.git('clone','-q','.','../clean')
        env=os.environ.copy();env['GIT_WORK_TREE']=str(self.base/'clean')
        rc,out=self.gate('check',env=env)
        self.assertEqual(rc,2,out);self.assertIn('gate.workspace-identity',out)

    def test_environment_gitdir_swap_refused(self):
        self.git('clone','-q','.','../clean')
        env=os.environ.copy();env['GIT_DIR']=str(self.base/'clean'/'.git')
        env['GIT_WORK_TREE']=str(self.repo)
        rc,out=self.gate('check',env=env)
        self.assertEqual(rc,2,out);self.assertIn('gate.workspace-identity',out)

    def test_normal_checkout_subdirectory_passes(self):
        self.prepare()
        rc,out=self.gate('check',cwd=self.repo/'tests')
        self.assertEqual(rc,0,out)
        self.assertIn(f'root={self.repo}',out)

    def test_linked_git_worktree_passes(self):
        linked=self.base/'linked'
        self.git('worktree','add','-q','-b','linked-branch',str(linked))
        (linked/'tests'/'subfolder').mkdir()
        rc,out=self.gate('baseline','--change-class','docs','--authorised','app.py',cwd=linked/'tests'/'subfolder')
        self.assertEqual(rc,0,out)
        self.assertIn(f'root={linked}',self.gate('status',cwd=linked)[1])

    def test_no_vcs_workflow_not_misclassified_as_git(self):
        naked=self.base/'no-vcs';naked.mkdir()
        (naked/'file.txt').write_text('anything\n')
        rc,out=self.gate('baseline','--change-class','docs','--authorised','file.txt',
                         '--no-vcs-claim','git status failed',cwd=naked)
        self.assertEqual(rc,0,out)
        self.assertIn('baseline-recorded-unverifiable',out)

    def test_git_env_outside_checkout_refused(self):
        naked=self.base/'no-vcs';naked.mkdir()
        env=os.environ.copy();env['GIT_DIR']=str(self.repo/'.git');env['GIT_WORK_TREE']=str(self.repo)
        rc,out=self.gate('baseline','--change-class','docs','--authorised','file.txt',
                         '--no-vcs-claim','git status failed',cwd=naked,env=env)
        self.assertEqual(rc,2,out);self.assertIn('gate.workspace-identity',out)

if __name__=='__main__': unittest.main(verbosity=2)
