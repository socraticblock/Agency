"""Fresh-review bounded-verifier and Git filter preflight regressions."""
import importlib.util
import hashlib
import json
import subprocess
import sys
import tempfile
import time
import unittest
from pathlib import Path

GATE = Path(__file__).with_name('pe_gate.py')
spec=importlib.util.spec_from_file_location('pe_gate_review7', GATE)
gate=importlib.util.module_from_spec(spec)
sys.modules[spec.name]=gate
spec.loader.exec_module(gate)

class OutputBounds(unittest.TestCase):
    def test_small_success(self):
        r=gate.run('python3 -c "print(42)"',Path.cwd(),5)
        self.assertEqual((r.code,r.output,r.output_limited),(0,'42',False))
        self.assertEqual(r.output_sha256,hashlib.sha256(b'42\n').hexdigest())
        self.assertEqual(r.output_bytes,3)

    def test_nonzero_not_rewritten_as_timeout(self):
        r=gate.run('python3 -c "import sys;print(123);sys.exit(4)"',Path.cwd(),5)
        self.assertEqual((r.code,r.output),(4,'123'))

    def test_streaming_output_limit(self):
        cmd='python3 -c "import sys;sys.stdout.write(\'z\'*2000000);sys.stdout.flush()"'
        start=time.monotonic()
        r=gate.run(cmd,Path.cwd(),5)
        self.assertLess(time.monotonic()-start,4)
        self.assertIsNone(r.code)
        self.assertIsNone(r.output_sha256)
        self.assertTrue(r.output_limited)
        self.assertLess(len(r.output),5000)

    def test_stderr_is_bounded_too(self):
        r=gate.run('python3 -c "import sys;sys.stderr.write(\'x\'*2000000)"',Path.cwd(),5)
        self.assertTrue(r.output_limited)

    def test_timeout(self):
        r=gate.run('python3 -c "import time;time.sleep(5)"',Path.cwd(),0.2)
        self.assertTrue(r.timed_out)
        self.assertIsNone(r.code)

    def test_detached_pipe_does_not_hang(self):
        cmd=("python3 -c \"import subprocess;"
             "subprocess.Popen(['python3','-c','import os,time;os.setsid();time.sleep(4)']);"
             "print('ok')\"")
        start=time.monotonic()
        r=gate.run(cmd,Path.cwd(),3)
        self.assertLess(time.monotonic()-start,2.5)
        self.assertTrue(r.timed_out)

class FilterPreflight(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.repo=Path(self.tmp.name)
        for c in [('init','-q'),('config','user.email','test@example.com'),('config','user.name','test')]:
            subprocess.run(['git',*c],cwd=self.repo,check=True,capture_output=True)
        (self.repo/'app.py').write_text('print(1)\n')
        (self.repo/'protected.txt').write_text('private\n')
        subprocess.run(['git','add','.'],cwd=self.repo,check=True,capture_output=True)
        subprocess.run(['git','commit','-qm','init'],cwd=self.repo,check=True,capture_output=True)

    def call(self,*args):
        return subprocess.run([sys.executable,str(GATE),*args],cwd=self.repo,capture_output=True,text=True,timeout=10)

    def test_unapproved_attribute_change_blocks_falsify_before_side_effect(self):
        base=self.call('baseline','--change-class','refactor','--authorised','app.py')
        self.assertEqual(base.returncode,0,base.stdout+base.stderr)
        (self.repo/'.gitattributes').write_text('protected.txt filter=cloak\n')
        cmd='python3 -c "from pathlib import Path;Path(\'side_effect\').write_text(\'bad\')"'
        p=self.call('falsify','--label','eq','--kind','equivalence','--phase','before','--cmd',cmd)
        self.assertEqual(p.returncode,2,p.stdout+p.stderr)
        self.assertIn('gate.scope-outside-authority',p.stdout+p.stderr)
        self.assertFalse((self.repo/'side_effect').exists())

    def test_unapproved_text_attribute_change_refused_before_verifier(self):
        (self.repo / '.gitattributes').write_text('protected.txt text\n')
        base=self.call('baseline','--change-class','refactor','--authorised','app.py')
        self.assertEqual(base.returncode,0,base.stdout+base.stderr)
        cmd='python3 -c "from pathlib import Path;Path(\'side_effect\').write_text(\'bad\')"'
        p=self.call('falsify','--label','eq','--kind','equivalence','--phase','before','--cmd',cmd)
        self.assertEqual(p.returncode,2,p.stdout+p.stderr)
        self.assertFalse((self.repo/'side_effect').exists())

    def test_autocrlf_true_supported_with_raw_audit(self):
        subprocess.run(['git','config','core.autocrlf','true'],cwd=self.repo,check=True)
        base=self.call('baseline','--change-class','refactor','--authorised','app.py')
        self.assertEqual(base.returncode,0,base.stdout+base.stderr)
        cmd='python3 -c "print(1)"'
        p=self.call('falsify','--label','eq','--kind','equivalence','--phase','before','--cmd',cmd)
        self.assertEqual(p.returncode,0,p.stdout+p.stderr)
        self.assertFalse((self.repo/'side_effect').exists())

    def test_text_unset_attribute_does_not_block(self):
        (self.repo / '.gitattributes').write_text('protected.txt -text\n')
        self.assertFalse(gate.git_filter_visibility_problems(self.repo))

    def test_output_limit_cannot_be_a_failure_phase(self):
        base=self.call('baseline','--change-class','bugfix','--authorised','app.py')
        self.assertEqual(base.returncode,0,base.stdout+base.stderr)
        cmd='python3 -c "import sys;sys.stdout.write(\'z\'*2000000)"'
        p=self.call('falsify','--label','cap','--kind','capability','--phase','before','--cmd',cmd)
        self.assertEqual(p.returncode,0,p.stdout+p.stderr)
        gitdir=subprocess.run(['git','rev-parse','--absolute-git-dir'],cwd=self.repo,capture_output=True,text=True,check=True).stdout.strip()
        r=json.loads((Path(gitdir)/'pe-gate'/'falsify.json').read_text())['cap']['runs']['before']
        self.assertTrue(r['output_limited'])
        self.assertIsNone(r['exit'])
        self.assertFalse(gate.validate_state(self.repo))

if __name__=='__main__':unittest.main(verbosity=2)
