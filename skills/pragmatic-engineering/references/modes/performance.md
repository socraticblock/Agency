# Mode: Performance

Never optimize a performance problem that has not been defined and measured.

1. Define the user-visible or system metric, unit, target, and workload.
2. Capture a comparable baseline.
3. Profile or otherwise locate the actual bottleneck.
4. Form a causal hypothesis.
5. Make one bounded change.
6. Re-run correctness checks.
7. Measure under comparable conditions.
8. Inspect secondary effects: memory, latency distribution, throughput, CPU/GPU, I/O, startup, battery, cost, or code complexity as relevant.
9. Keep the change only if the evidence justifies the added complexity.
10. Document deliberate non-obvious optimization.

Do not:

- report microbenchmark wins as production wins without justification;
- compare measurements from materially different environments without saying so;
- optimize a proxy without explaining how it relates to the requested outcome;
- sacrifice correctness for speed unless the specification explicitly defines that tradeoff.

---

The four recorded obligations in `SKILL.md` — baseline, falsifier, completion record, procedure compliance —
apply in this mode. This file tells you what to do; the obligations tell you what to record while doing it.
