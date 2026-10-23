#!/usr/bin/env python3
"""Validate the pragmatic-engineering skill package.

Two classes of check:

1. Package checks — required files, YAML front matter, name/description/version,
   the 100-principle invariant, and INDEX.md agreement when present.

2. Reference checks — run over the **live runtime graph only**: the documents
   reachable from SKILL.md by progressive disclosure. Both supported local-reference
   forms are validated in every reachable document:

     * backticked root-relative paths   `references/testing.md`
     * Markdown local links             [label](../assets/review-template.md)

   A broken reference in a reachable document fails the build, in either form.
   Documents outside the graph (audit reports, eval notes, historical test reports)
   are deliberately NOT reference-checked: they quote broken paths as examples, and
   a fix that silenced those quotes by ignoring Markdown links globally would stop
   validating the form a reader can actually click.

   The graph is closed under both forms: a Markdown link from a reachable document to
   another in-package Markdown file makes that file reachable too, so its own
   references are validated in turn. Unreachable documents stay unreachable.
"""

from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[1]
skill = root / "SKILL.md"

errors = []

required = [
    "SKILL.md",
    "references/decision-policy.md",
    "references/authority-boundaries.md",
    "references/testing.md",
    "references/reliability.md",
    "references/repository-truth.md",
    "references/workspace-safety.md",
    "references/boundary-correctness.md",
    "references/self-review.md",
    "references/pragmatic-principles.md",
    "references/modes/build.md",
    "references/modes/debug.md",
    "references/modes/review.md",
    "references/modes/refactor.md",
    "references/modes/architect.md",
    "references/modes/security.md",
    "references/modes/performance.md",
    "references/modes/automation.md",
    "evals/behavior-evals.md",
    "evals/independent-v3.3-regressions.md",
    "scripts/pe_gate.py",
    "scripts/tests_pe_gate.py",
    "INDEX.md",
    "CORRECTIONS-V3.3-RC1.md",
    "HOLDOUT-RC1-RESULTS.md",
]

for rel in required:
    if not (root / rel).is_file():
        errors.append(f"missing required file: {rel}")

text = skill.read_text(encoding="utf-8") if skill.exists() else ""

front_version = None
if not text.startswith("---\n"):
    errors.append("SKILL.md must start with YAML front matter")
else:
    end = text.find("\n---\n", 4)
    if end == -1:
        errors.append("SKILL.md front matter is not closed")
    else:
        front = text[4:end]
        name = re.search(r"^name:\s*(.+)$", front, re.M)
        desc = re.search(r"^description:\s*(.+)$", front, re.M)
        ver = re.search(r"^version:\s*(.+)$", front, re.M)
        if not name or name.group(1).strip() != "pragmatic-engineering":
            errors.append("unexpected or missing skill name")
        if not desc or len(desc.group(1).strip()) > 240:
            errors.append("description missing or unnecessarily long")
        if not ver:
            errors.append("missing version field in front matter")
        else:
            front_version = ver.group(1).strip()

# INDEX.md must agree with the front-matter version, so the package cannot claim
# two identities at once.
index = root / "INDEX.md"
if index.is_file() and front_version is not None:
    m = re.search(r"^\*\*Version:\*\*\s*(\S+)", index.read_text(encoding="utf-8"), re.M)
    if not m:
        errors.append("INDEX.md does not state a **Version:** line")
    elif m.group(1).strip() != front_version:
        errors.append(
            f"version disagreement: SKILL.md version={front_version} "
            f"INDEX.md version={m.group(1).strip()}"
        )

# --- reference checks over the live runtime graph -------------------------------

# Optional "./" prefix and a case-varied extension are BOTH surface forms a reader can
# click, so the route pattern has to match them or a live edge written that way silently
# drops its whole downstream document out of the validated graph (found by an adversarial
# review of 3.4.0-rc.1; regression: dotted_route_form_keeps_target_reachable).
route_re = re.compile(r"`(\.?/?(?:references|assets)/[^`\n]+?\.md)(#[^`\n]*)?`", re.IGNORECASE)
link_re = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
root_resolved = root.resolve()


def check_target(doc_rel: Path, target: str, form: str, resolved: Path) -> bool:
    """Return True when the target is inside the skill root (whether or not it exists)."""
    try:
        resolved.relative_to(root_resolved)
    except ValueError:
        errors.append(f"{form} escapes skill root in {doc_rel.as_posix()}: {target}")
        return False
    if not resolved.is_file():
        errors.append(f"broken live {form} in {doc_rel.as_posix()}: {target}")
    return True


queue = [Path("SKILL.md")]
seen = set()
while queue:
    rel = queue.pop(0)
    if rel.as_posix() in seen:
        continue
    seen.add(rel.as_posix())
    doc = root / rel
    if not doc.is_file():
        continue
    body = doc.read_text(encoding="utf-8")

    for target, _fragment in route_re.findall(body):
        normalised = target[2:] if target.startswith("./") else target
        resolved = (root / normalised).resolve()
        if check_target(rel, target, "routed reference", resolved) and resolved.is_file():
            if normalised not in seen:
                queue.append(Path(normalised))

    for raw in link_re.findall(body):
        if raw.startswith(("http://", "https://", "#", "mailto:")):
            continue
        target = raw.split("#", 1)[0]
        if not target:
            continue
        resolved = (doc.parent / target).resolve()
        if not check_target(rel, raw, "markdown link", resolved):
            continue
        if resolved.is_file() and resolved.suffix == ".md":
            candidate = resolved.relative_to(root_resolved)
            if candidate.as_posix() not in seen:
                queue.append(candidate)

runtime_docs = sorted(seen)

# --- deep doctrine invariant ---------------------------------------------------

principles_path = root / "references" / "pragmatic-principles.md"
if principles_path.exists():
    ptext = principles_path.read_text(encoding="utf-8")
    nums = [int(n) for n in re.findall(r"(?m)^(\d{1,3})\.\s+\*\*", ptext)]
    if nums != list(range(1, 101)):
        errors.append("pragmatic-principles.md must contain numbered principles 1 through 100 exactly once")

if errors:
    print("INVALID")
    for e in errors:
        print(f"- {e}")
    sys.exit(1)

print("VALID")
print(f"root={root}")
print(f"runtime_documents={len(runtime_docs)}")
print(f"runtime_references={len([d for d in runtime_docs if d != 'SKILL.md'])}")
print(f"markdown_files={len(list(root.rglob('*.md')))}")
print(f"total_files={len([p for p in root.rglob('*') if p.is_file()])}")
