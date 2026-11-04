#!/usr/bin/env python3
"""Independent raw-byte inventory regressions for v3.5.3-dev-review.9.

Case coverage: normalized CRLF staging, custom clean-filter, tracked mode,
legitimate text=auto workflow, manifest corruption and phase preflight.
"""
from __future__ import annotations
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

GATE = Path(__file__).with_name('pe_gate.py')
spec=importlib.util.spec_from_file_location('pe9_gate', GATE)
gate=importlib.util.module_from_spec(spec)
sys.modules[spec.name]=gate
spec.loader.exec_module(gate)

class RawAuditTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(prefix='pe9raw-')
        self.addCleanup(self.tmp.cleanup)
        self.root=Path(self.tmp.name)
        for args in [('init','-q'),('config','user.name','audit'),('config','user.email','audit@example.test')]:
            self.git(*args)
        (self.root/'app.py').write_bytes(b'VALUE = 1\n')
        (self.root/'restricted.txt').write_bytes(b'hello\nworld\n')
        self.git('add','-A')
        self.git('commit','-qm','fixture')
    def git(self,*args):
        r=subprocess.run(['git',*args],cwd=self.root,capture_output=True,timeout=10)
        self.assertEqual(r.returncode,0,r.stderr.decode(errors='replace'))
        return r
    def cli(self,*args):
        return subprocess.run([sys.executable,str(GATE),*args],cwd=self.root,
                              capture_output=True,text=True,timeout=25)
    def baseline(self, *extra):
        r=self.cli('baseline','--change-class','refactor','--authorised','app.py',*extra)
        self.assertEqual(r.returncode,0,r.stdout+r.stderr)
        return gate.load(self.root,'baseline.json',{})
    def test_normalized_crlf_staged_cannot_hide_unauthorized_change(self):
        (self.root/'.gitattributes').write_text('restricted.txt text\n')
        self.git('add','.gitattributes');self.git('commit','-qm','attributes')
        b=self.baseline()
        (self.root/'restricted.txt').write_bytes(b'hello\r\nworld\r\n')
        self.git('add','restricted.txt')
        self.assertNotIn('restricted.txt',gate.changed_paths(self.root))
        self.assertIn('restricted.txt',gate.raw_scope_delta(self.root,b)[0])
        cmd="python3 -c \"from pathlib import Path;Path('oops').write_text('ran')\""
        r=self.cli('falsify','--label','equiv','--kind','equivalence','--phase','before','--cmd',cmd)
        self.assertEqual(r.returncode,2,r.stdout+r.stderr)
        self.assertIn('gate.scope-outside-authority',r.stderr)
        self.assertFalse((self.root/'oops').exists())
    def test_custom_clean_filter_unchanged_repo_is_supported(self):
        self.git('config','filter.cloak.clean','sed s/CLOAKED/secret/g')
        (self.root/'.gitattributes').write_text('restricted.txt filter=cloak\n')
        self.git('add','.gitattributes');self.git('commit','-qm','attributes')
        b=self.baseline()
        self.assertIn('raw_tracked',b)
        self.assertEqual(gate.visibility_problems(self.root,b),[])
        self.assertEqual(gate.raw_scope_delta(self.root,b),([],[]))
    def test_clean_filter_normalized_unauthorized_change_detected(self):
        self.git('config','filter.cloak.clean','sed s/CLOAKED/hello/g')
        (self.root/'.gitattributes').write_text('restricted.txt filter=cloak\n')
        self.git('add','.gitattributes');self.git('commit','-qm','attributes')
        b=self.baseline()
        (self.root/'restricted.txt').write_bytes(b'CLOAKED\nworld\n')
        self.git('add','restricted.txt')
        self.assertNotIn('restricted.txt',gate.changed_paths(self.root))
        self.assertIn('restricted.txt',gate.raw_scope_delta(self.root,b)[0])
    def test_legitimate_refactor_with_text_auto_can_pass(self):
        (self.root/'.gitattributes').write_text('* text=auto\n')
        self.git('add','.gitattributes');self.git('commit','-qm','attributes')
        self.baseline()
        cmd='python3 -c "from pathlib import Path;assert Path(\'app.py\').read_text().startswith(\'VALUE = \')"'
        for phase in ('before','after'):
            if phase=='after':
                (self.root/'app.py').write_text('VALUE = 2\n')
            r=self.cli('falsify','--label','equiv','--kind','equivalence','--cmd',cmd,'--phase',phase)
            self.assertEqual(r.returncode,0,r.stdout+r.stderr)
        for n in range(1,7):
            r=self.cli('dod','--item',f'dod.{n}','--answer','Validated')
            self.assertEqual(r.returncode,0,r.stdout+r.stderr)
        self.assertEqual(self.cli('record').returncode,0)
        result=self.cli('check')
        self.assertEqual(result.returncode,0,result.stdout+result.stderr)
    def test_authorized_crlf_only_candidate_can_pass_with_budget_note(self):
        (self.root/'.gitattributes').write_text('app.py text\n')
        self.git('add','.gitattributes');self.git('commit','-qm','attributes')
        self.baseline('--budget-note','raw normalization changes are deliberately authorized')
        cmd='python3 -c "from pathlib import Path;assert Path(\'app.py\').read_text().startswith(\'VALUE = \')"'
        before=self.cli('falsify','--label','equiv','--kind','equivalence','--cmd',cmd,'--phase','before')
        self.assertEqual(before.returncode,0,before.stdout+before.stderr)
        (self.root/'app.py').write_bytes(b'VALUE = 1\r\n')
        self.git('add','app.py')
        self.assertNotIn('app.py',gate.changed_paths(self.root))
        after=self.cli('falsify','--label','equiv','--kind','equivalence','--cmd',cmd,'--phase','after')
        self.assertEqual(after.returncode,0,after.stdout+after.stderr)
        for n in range(1,7):
            r=self.cli('dod','--item',f'dod.{n}','--answer','Validated raw change')
            self.assertEqual(r.returncode,0,r.stdout+r.stderr)
        self.assertEqual(self.cli('record').returncode,0)
        r=self.cli('check')
        self.assertEqual(r.returncode,0,r.stdout+r.stderr)
        self.assertIn('raw_changed_invisible_to_git=1',r.stdout)
        self.assertIn('diff=1 file(s)',r.stdout)

    def test_verifier_normalizing_outside_scope_midcheck_refused(self):
        (self.root/'.gitattributes').write_text('restricted.txt text\n')
        self.git('add','.gitattributes');self.git('commit','-qm','attributes')
        marker=self.root/'.git'/'trigger-raw'
        cmd=("python3 -c \"from pathlib import Path;"
             f"p=Path('restricted.txt');m=Path({str(marker)!r});"
             "p.write_bytes(p.read_bytes().replace(b'\\n',b'\\r\\n')) if m.exists() else None;"
             "assert Path('app.py').read_text().startswith('VALUE = ')\"")
        self.baseline()
        for phase in ('before','after'):
            if phase=='after':(self.root/'app.py').write_text('VALUE = 2\n')
            r=self.cli('falsify','--label','equiv','--kind','equivalence','--cmd',cmd,'--phase',phase)
            self.assertEqual(r.returncode,0,r.stdout+r.stderr)
        for n in range(1,7):
            self.assertEqual(self.cli('dod','--item',f'dod.{n}','--answer','Validated').returncode,0)
        self.assertEqual(self.cli('record').returncode,0)
        marker.write_text('run')
        check=self.cli('check')
        self.assertEqual(check.returncode,2,check.stdout+check.stderr)
        self.assertIn('gate.scope-outside-authority',check.stdout)
        self.assertIn('restricted.txt',gate.raw_scope_delta(self.root,gate.load(self.root,'baseline.json',{}))[0])

    def test_raw_manifest_corruption_refused(self):
        self.baseline()
        p=gate.state_path(self.root,'baseline.json')
        b=json.loads(p.read_text());b['raw_tracked']={'zz':'fake'}
        p.write_text(json.dumps(b))
        self.assertTrue(gate.validate_state(self.root))
        r=self.cli('check')
        self.assertEqual(r.returncode,2,r.stdout+r.stderr)
        self.assertIn('state-invalid',r.stdout+r.stderr)
    def test_outside_scope_mode_change_detected(self):
        b=self.baseline()
        p=self.root/'restricted.txt';p.chmod(0o755)
        self.assertIn('restricted.txt',gate.raw_scope_delta(self.root,b)[0])

if __name__=='__main__':unittest.main(verbosity=2)
