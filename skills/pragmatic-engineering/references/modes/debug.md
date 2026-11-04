# Mode: Debug

Debug by hypothesis and evidence, not by random edits.

1. Capture the exact symptom, environment, inputs, and expected behavior.
2. Reproduce reliably if possible. If not, collect enough telemetry to narrow when and where it occurs.
3. Read the complete error, logs, stack, failing assertion, and nearby code before editing.
4. Locate the smallest boundary where expected and actual behavior diverge.
5. Form one or a few falsifiable hypotheses.
6. Test the cheapest discriminating hypothesis first.
7. Change one meaningful variable at a time.
8. Establish root cause before applying a permanent fix.
9. Preserve a regression test/reproducer when useful.
10. Verify the fix plus neighboring behavior.

## Strong suspicion signals

For apparently random failures, investigate:

- concurrency and races;
- timing and time zones;
- hidden shared state;
- ordering dependence;
- retries and eventual consistency;
- resource exhaustion;
- nondeterministic iteration/randomness;
- environment/configuration drift;
- external service behavior.

## Prohibited shortcuts without evidence

Do not use these as unexplained cures:

- arbitrary sleep;
- broad retry loops;
- catch-and-ignore;
- disabling assertions/tests;
- cache clearing as the "fix";
- increasing timeouts indefinitely;
- changing several configurations at once.

A workaround may be appropriate under incident pressure, but label it as a workaround, bound its lifetime, and preserve the root-cause follow-up.

When the investigation needs a durable record or handoff, use `assets/debug-template.md`.

---

The four recorded obligations in `SKILL.md` — baseline, falsifier, completion record, procedure compliance —
apply in this mode. This file tells you what to do; the obligations tell you what to record while doing it.
