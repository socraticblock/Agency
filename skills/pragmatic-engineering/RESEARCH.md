> **Status:** HISTORICAL — background research for the original skill. Retained for provenance; not current for rc1.

# Research Basis — Pragmatic Engineering Skill

Research date: 2026-10-07.

This skill is an original operational synthesis. It paraphrases concepts rather than reproducing book text.

## Primary foundation

- The Pragmatic Bookshelf — *The Pragmatic Programmer, 20th Anniversary Edition*, official 100 tips:
  https://books.pragprog.com/tips/

The book contributes the central philosophy: craft, active thinking, agency, DRY, orthogonality, reversibility, tracer bullets/prototypes, contracts, small steps, avoiding accidental programming, refactoring, testing, automation, user feedback, and responsibility.

## Skill / agent design

- OpenAI Developers — “Rethinking skills and prompts for GPT-6 Astra” (2026-09-11):
  https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra
- OpenAI Developers — Skills:
  https://developers.openai.com/api/docs/guides/tools-skills
- OpenAI — “Running Codex safely at OpenAI” (2026-05-08):
  https://openai.com/index/running-codex-safely/
- OpenAI — “A Practical Approach to Verifying Code at Scale” (2025-12-01):
  https://alignment.openai.com/scaling-code-verification/
- OpenAI Developers — Agent evals:
  https://developers.openai.com/api/docs/guides/agent-evals
- Anthropic — “Building effective agents” (2024-12-19):
  https://www.anthropic.com/engineering/building-effective-agents
- Anthropic — “Demystifying evals for AI agents” (2026-01-09):
  https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

Design consequences:
- progressive disclosure rather than a huge always-loaded prompt;
- concise skill discovery metadata;
- simple agent/tool patterns before complex orchestration;
- ground agent loops in environment feedback;
- explicit stop conditions;
- sandbox/approval/credential boundaries;
- outcome and behavior evals for the skill itself.

## Code quality, review, and maintainability

- Google Engineering Practices — Code Review:
  https://google.github.io/eng-practices/review/
- Google Engineering Practices — Small CLs:
  https://google.github.io/eng-practices/review/developer/small-cls.html
- Google Engineering Practices — What to look for in a review:
  https://google.github.io/eng-practices/review/reviewer/looking-for.html
- Google Go Style Guide — clarity, simplicity, maintainability:
  https://google.github.io/styleguide/go/guide.html
- *Software Engineering at Google* — testing overview and unit testing:
  https://abseil.io/resources/swe-book/html/ch11.html
  https://abseil.io/resources/swe-book/html/ch12.html

Design consequences:
- optimize for readers and future change;
- small self-contained changes;
- design/functionality before style in review;
- least mechanism;
- behavior-focused tests;
- avoid brittle implementation-coupled tests;
- fast/deterministic checks plus broader tests where boundaries require them.

## Security

- NIST Secure Software Development Framework:
  https://csrc.nist.gov/projects/ssdf
- OpenAI sandbox security:
  https://developers.openai.com/api/docs/guides/agents-api/environments/security

Design consequences:
- security is integrated into engineering rather than a late checklist;
- authority and secret boundaries are explicit;
- least privilege and auditability matter for agent actions.

## Benchmark / verification context

- SWE-bench Verified:
  https://www.swebench.com/verified

Repository-level coding-agent evaluation reinforces a simple point: engineering-agent output should be judged by reproducible outcomes and regression checks, not by plausible-looking patches.
