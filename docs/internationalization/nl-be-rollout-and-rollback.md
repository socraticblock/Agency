# NL-BE rollout and rollback

This branch is **not** deployed. Nothing here has been pushed to `main`, no preview branch was
created, and no Vercel deployment was triggered.

## Release state

| Field | Value |
|---|---|
| Branch | `feat/genezisi-belgian-dutch-homepage` |
| Base `origin/main` | `879b5b7e9ea5c16681b56b5e176f127830692918` |
| Verified live production SHA | **not verified** — no Vercel access from this environment |
| Preview URL | not created (requires owner approval) |
| Previous known-good production deployment | to be recorded at cutover time; the merge note in history mentions `e7f46d846c5d` but that must be re-verified, not reused blindly |

## Preview protocol (one, deliberate)

`vercel.json` deploys only `main` and `preview-*`. After the owner accepts the local evidence
and approves exactly one preview:

```bash
git status --short                 # expect clean
git rev-parse HEAD                 # record the candidate SHA
git branch preview-genezisi-nl-final <CANDIDATE_SHA>
git push origin preview-genezisi-nl-final
```

Then verify on the preview origin: `/en`, `/ka`, `/nl`, `/nl/pricing` (307), `/nl/unknown`
(404), canonical/hreflang/OG/JSON-LD, sitemap, robots, the WhatsApp link, and that the preview
does not advertise itself as the production host. Do **not** create further preview branches.

## Production cutover (owner-approved only)

1. Re-verify `main` has not moved since the branch was created; if it has, merge/rebase and re-run
   the whole local gate to produce a new candidate SHA.
2. Record: current `main` SHA, deployed production SHA, candidate SHA, rollback target.
3. Merge with explicit owner permission — this triggers one production deployment.
4. Confirm the deployed SHA matches the candidate.
5. Production smoke test: `/` (308), `/en`, `/ka`, `/nl`, `/nl/pricing` (307), `/nl/unknown`
   (404), `/sitemap.xml`, `/robots.txt`, one legacy route (`/en/pricing`), `/onboarding`,
   `/success`, `/games`, the WhatsApp link, and — if a mapped customer domain is available —
   that it still resolves to its published card.

## Rollback

- Revert the merge commit (or redeploy the last verified healthy deployment) under owner
  authority. No `git push --force` to `main`, no `git reset --hard` on a shared branch.
- After rollback, re-verify `/en`, `/ka`, `/nl` (should return to the 308 → `/en/nl` behaviour),
  contact links, `/api/*`, mapped hosts and `/games`.
- Keep the evidence and the postmortem; do not overwrite the failing release history.
