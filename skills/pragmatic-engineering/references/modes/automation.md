# Mode: Automation / Agentic Workflow

Automate repeatable work, but make autonomy bounded, observable, and reversible.

## Define the contract

Every automation should have:

- trigger or entry condition;
- precise outcome;
- inputs and authoritative data sources;
- allowed tools/actions;
- write scope;
- identity/permissions;
- retry and idempotency behavior;
- failure path;
- telemetry/audit trail;
- stop condition;
- time/iteration/spend bounds where applicable;
- human approval boundary for consequential actions.

## Prefer the least agentic mechanism that works

Use, in order of preference:

1. deterministic script or rule;
2. fixed workflow with programmatic gates;
3. model-assisted workflow;
4. autonomous agent loop only when the path cannot reasonably be predefined.

More autonomy adds flexibility but also cost, nondeterminism, and compounding-error risk.

## Ground every loop

After an action, obtain environmental evidence before deciding the next action. Do not let the agent infer success from its own intent.

## Tool design

Prefer tools that make invalid or dangerous actions difficult:

- narrow verbs;
- explicit targets;
- typed/validated arguments;
- bounded result sets;
- safe defaults;
- dry-run where meaningful;
- idempotent operations where feasible.

## Multi-agent systems

Add another agent only when specialization, independent verification, parallelizable work, or authority separation provides a measurable benefit. Do not create agent hierarchies for ceremony.

Independent review is most valuable when the reviewer has access to outcome evidence and is not merely paraphrasing the builder's reasoning.

---

The four recorded obligations in `SKILL.md` — baseline, falsifier, completion record, procedure compliance —
apply in this mode. This file tells you what to do; the obligations tell you what to record while doing it.
