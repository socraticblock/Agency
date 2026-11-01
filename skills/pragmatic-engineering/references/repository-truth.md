# Repository Truth and Dependency Discipline

Use when it is unclear what file is authoritative, or when a task touches generated code, vendored code, lockfiles, dependencies, code generation, snapshots/golden files, build artifacts, or mirrored configuration.

## Find the source of truth

Before editing a suspicious file, determine whether it is:

- hand-authored source;
- generated output;
- vendored third-party code;
- build output;
- cached/transient state;
- a mirror copied from another canonical file;
- a committed artifact intentionally treated as canonical.

Prefer changing the authoritative input and regenerating derived output through the project's established mechanism.


If documentation, generator metadata, build configuration, checked-in artifacts, and observed build behavior disagree about the source of truth, do not choose whichever is easiest to edit. Trace the actual build/release path and repository policy far enough to identify the authority, and surface the contradiction if it cannot be resolved confidently.

Do not hand-edit generated or vendored files unless the repository explicitly treats that as the supported workflow or an emergency patch is deliberately required.

## Generated artifacts

When regeneration changes many files:

1. verify the generator/version/configuration;
2. isolate intended semantic changes from formatting/churn;
3. review the generated diff rather than assuming generator output is correct;
4. preserve reproducibility where practical.

Generated does not mean trusted.

## Tests, snapshots, and golden files

A failing expected-output artifact is evidence to investigate.

Before updating a snapshot/golden fixture:

- determine whether product behavior intentionally changed;
- inspect the semantic diff;
- verify unexpected changes are not being blessed accidentally.

Never mass-update expected output simply to make the suite green.

## Dependencies

Before adding or upgrading a dependency:

- check whether the standard library, existing dependency set, or small local code already solves the need;
- justify the maintenance and supply-chain cost;
- prefer the narrowest compatible version change that solves the actual problem;
- inspect license/security/compatibility constraints when material;
- avoid unrelated broad upgrades in a task-scoped change;
- review lockfile changes for unexpected transitive movement.

## Patches to third-party code

Prefer upstream-compatible extension points or a documented patch mechanism. If local vendor modification is unavoidable, make the divergence discoverable and explain how future upgrades will preserve or retire it.

## Repository policy precedence

Project-specific authoritative instructions, schemas, generators, architecture decisions, and release policies outrank generic preferences in this skill unless they are unsafe or conflict with higher-priority user/system constraints.
