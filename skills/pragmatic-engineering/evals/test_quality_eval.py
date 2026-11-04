import copy
import json
import tempfile
import unittest
from pathlib import Path

import quality_eval as q


class QualityEvalTests(unittest.TestCase):
    def setUp(self):
        self.manifest = {'schema_version': 1, 'seeds': [0, 1], 'tasks': [
            {'task_id': 'T1', 'family': 'bugfix', 'risk': 'low', 'starting_revision': 'a' * 40},
            {'task_id': 'T2', 'family': 'security', 'risk': 'high', 'starting_revision': 'b' * 40}]}
        self.allocation, self.blind = q.prepare(self.manifest)
        self.scores = {'schema_version': 1, 'results': [
            {'case_id': row['case_id'], 'tests_passed': row['arm'] == 'D',
             'critical_escape': False,
             'quality': {k: 3 for k in q.QUALITY}, 'unintended_changes': 0,
             'grader_evidence': 'synthetic-unit-test-not-real-grade',
             'final_tree_sha256': 'a' * 64}
            for row in self.allocation['allocations']]}

    def test_blinded_no_treatment_labels_and_balanced(self):
        self.assertEqual(len(self.blind['cases']), 16)
        self.assertTrue(all('arm' not in x for x in self.blind['cases']))
        self.assertEqual(len(q.validate_allocation(self.allocation)), 16)

    def test_pairing_is_task_level(self):
        report = q.summarize(self.allocation, self.scores)
        self.assertEqual(report['task_count'], 2)
        self.assertEqual(report['run_count'], 16)
        self.assertEqual(report['arms']['D']['success_rate'], 1)
        self.assertEqual(report['arms']['A']['success_rate'], 0)
        self.assertEqual(report['mean_task_level_delta_vs_A']['D'], 1)
        self.assertEqual(report['arms']['A']['mean_tokens'], None)

    def test_duplicate_grade_refused(self):
        copy_scores = copy.deepcopy(self.scores)
        copy_scores['results'].append(copy_scores['results'][0])
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(self.allocation, copy_scores)

    def test_missing_grade_refused(self):
        copy_scores = copy.deepcopy(self.scores)
        copy_scores['results'].pop()
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(self.allocation, copy_scores)

    def test_bad_scores_refused(self):
        for value in (-1, 5, 1.5, True):
            bad = copy.deepcopy(self.scores)
            bad['results'][0]['quality']['testing'] = value
            with self.assertRaises(q.InvalidEvaluation):
                q.summarize(self.allocation, bad)

    def test_treatment_leak_refused(self):
        bad = copy.deepcopy(self.scores)
        bad['results'][0]['arm'] = 'D'
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(self.allocation, bad)

    def test_corrupt_allocation_refused(self):
        bad = copy.deepcopy(self.allocation)
        bad['allocations'][0]['arm'] = 'A' if bad['allocations'][0]['arm'] != 'A' else 'B'
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(bad, self.scores)

    def test_bad_manifest_refused(self):
        bad = copy.deepcopy(self.manifest)
        bad['seeds'] = [0, 0]
        with self.assertRaises(q.InvalidEvaluation):
            q.prepare(bad)

    def test_missing_final_tree_digest_refused(self):
        bad = copy.deepcopy(self.scores)
        bad['results'][0].pop('final_tree_sha256')
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(self.allocation, bad)

    def test_nonfinite_cost_refused(self):
        bad = copy.deepcopy(self.scores)
        bad['results'][0]['cost_usd'] = float('inf')
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(self.allocation, bad)

    def test_refuses_overwrite(self):
        with tempfile.TemporaryDirectory() as d:
            dest = Path(d) / 'immutable.json'
            q.dump_new(dest, {'a': 1})
            with self.assertRaises(FileExistsError):
                q.dump_new(dest, {'a': 2})
            self.assertEqual(json.loads(dest.read_text()), {'a': 1})


if __name__ == '__main__':
    unittest.main()
