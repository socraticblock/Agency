# Core rules

Routed from `SKILL.md`. These are the doctrine's standing rules; the four recorded obligations and the
change-class evidence table in `SKILL.md` are what the gate enforces.

## Precedence

1. Explicit user/owner authority and safety constraints.
2. Repository, project and SOUL rules.
3. A narrower specialist workflow — `systematic-debugging`, `fix-playbook`, `source-driven-development`,
   `specification-first-design`, `review-loop`, `merge-ready-review` — which owns its own procedure.
4. This doctrine's cross-cutting heuristics, and the gate that enforces them.

Where a specialist workflow and this doctrine appear to conflict, follow the specialist procedure, preserve the
invariant here where you can, and keep the record. Do not invent a second parallel workflow. This hierarchy used
to live only in a package index that loading the skill never reached; it belongs where a loaded session reads it.

## Before you act

- State the requested outcome as one testable sentence; repeat it at completion and note any deviation. Ask when
  the ambiguity changes what you build; otherwise take the plain reading and say which reading you took.
- Name, before reading, the file set the task needs and why; if you scan the whole tree, say which gap required
  it. Name the authoritative source before editing generated, vendored, mirrored or derived files, with how the
  generator or build path proves it; if two copies of a fact disagree, surface it rather than choosing.
- List material assumptions as checked / unchecked, name the one that would most change the design if wrong, and
  state the risk of acting on any unchecked one. An empty or partial list is not a complete one.
- For every consequential action — secrets, production access, destructive operations, spending, publishing,
  deployment — cite the instruction or policy that authorises it. No citation, no action; a tool existing is
  not authority for using it.
- Start from the cheapest check that could falsify the hypothesis at hand, and record why each broader check was
  included or skipped.

## While you act

- Account for every changed file: it belongs to the authorised scope, or it is reverted or named as an
  exception before finalising. One fact, one home: name which copy is authoritative before editing either.
- Add an abstraction, indirection or dependency only with the requirement that pays for it, cited; otherwise use
  the ordinary form.
- State the boundary semantics of what you touch — units, ranges, precision, encoding and normalisation, missing
  values, resource limits — and write `not applicable` for a category that genuinely does not apply, rather than
  omitting it silently.
- Make failures visible and bounded: every new retry, sleep, catch-all or fallback names the operation, its
  bound, and the failure it surfaces rather than hides.
- Update durable documentation when a contract, behaviour, configuration or operating procedure changes; name the
  doc surfaces you checked against the code diff, with the outcome for each, instead of trusting that docs still
  describe reality.

## Verify by trying to falsify

- Never weaken, delete, regenerate or rewrite a verification artefact to make a change look green; first
  establish whether the expected behaviour legitimately changed, then update it and say so.
- Attribute a failure to pre-existing causes only by DEMONSTRATING it on the pre-change revision, never from
  reading the code path; otherwise call it unexplained.
- Broaden verification in proportion to blast radius and the cost of being wrong, and test behaviour at the
  narrowest useful level. A passing suite is evidence about the checks that ran, not proof they encode the
  right requirement.

## Report honestly

- Tag factual claims with the evidence level actually reached (see the ladder); an unlabelled claim is E0.
- Answer each Definition of done item with its evidence, not with "yes".
- Stop when the outcome is met and adequately verified: RECORD the level, the results, and the finishing touches
  you deliberately deferred. After that stop check, do not continue without a new instruction.

