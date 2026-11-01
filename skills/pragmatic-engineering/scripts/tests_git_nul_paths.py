#!/usr/bin/env python3
"""Literal-path adversarial probes for Git status, diff and candidate identity."""
import importlib.util
import subprocess
import tempfile
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('pe_git', ROOT/'pe_gate.py')
pe=importlib.util.module_from_spec(spec)
spec.loader.exec_module(pe)

class GitPathTests(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory(prefix='pe-git-nul-')
  self.addCleanup(self.tmp.cleanup)
  self.r=Path(self.tmp.name)
  for args in [('init','-q'),('config','user.email','test@example.invalid'),('config','user.name','Tester')]:self.g(*args)
 def g(self,*args):
  p=subprocess.run(('git',*args),cwd=self.r,capture_output=True,text=True)
  self.assertEqual(p.returncode,0,p.stderr)
  return p.stdout
 def test_content_fingerprint_changes_for_newline_filename(self):
  name='new\nline.py'
  (self.r/name).write_text('x=0\n')
  self.g('add','--',name);self.g('commit','-qm','base')
  (self.r/name).write_text('x=1\n')
  one,issues=pe.candidate_fingerprint(self.r, ['notes.txt'],[])
  self.assertFalse(issues);self.assertEqual(pe.changed_paths(self.r),[name])
  (self.r/name).write_text('x=2\n')
  two,issues=pe.candidate_fingerprint(self.r,['notes.txt'],[])
  self.assertFalse(issues);self.assertNotEqual(one,two)
  self.assertEqual(pe.diff_stats(self.r),(1,1))
 def test_weird_names_and_renames_are_preserved(self):
  names=['white space.py','tab\tname.py','quote"name.py','-leading.py','escape\nname.py']
  for name in names:(self.r/name).write_text('x=0\n')
  self.g('add','--',*names);self.g('commit','-qm','base')
  for name in names:(self.r/name).write_text('x=1\n')
  self.assertEqual(set(pe.changed_paths(self.r)),set(names))
  self.assertEqual(pe.diff_stats(self.r),(len(names),len(names)))
  self.g('add','--',*names);self.g('commit','-qm','changes')
  (self.r/'white space.py').rename(self.r/'renamed\nfile.py')
  self.assertIn('white space.py',pe.changed_paths(self.r))
  self.assertIn('renamed\nfile.py',pe.changed_paths(self.r))
 def test_non_utf8_filename_hashes_without_exception(self):
  import os
  name=os.fsdecode(b'invalid_\xff.py')
  (self.r/name).write_text('x=0\n')
  self.g('add','--',name);self.g('commit','-qm','base')
  (self.r/name).write_text('x=1\n')
  one,problems=pe.candidate_fingerprint(self.r,[name],[])
  self.assertFalse(problems)
  (self.r/name).write_text('x=2\n')
  two,problems=pe.candidate_fingerprint(self.r,[name],[])
  self.assertFalse(problems)
  self.assertNotEqual(one,two)
  self.assertIn(name,pe.changed_paths(self.r))

 def test_untracked_paths_remain_literal(self):
  (self.r/'plain.py').write_text('x=0\n');self.g('add','.');self.g('commit','-qm','base')
  name='untracked\nname.py';(self.r/name).write_text('new\n')
  self.assertIn(name,pe.changed_paths(self.r))
  self.assertEqual(pe.diff_stats(self.r),(1,0))

if __name__=='__main__':unittest.main(verbosity=2)
