# Mode: Security

Use in addition to the primary mode when the change touches trust boundaries, identity, permissions, secrets, network exposure, parsing of untrusted input, dependencies, or sensitive data.

## Threat-oriented review

Ask:

- What assets are valuable?
- Which inputs or actors are untrusted?
- Where are authentication and authorization enforced?
- Can one tenant/user affect another?
- What is the least privilege required?
- Can data be injected, confused, replayed, tampered with, leaked, or retained too long?
- Are errors or logs exposing secrets or personal data?
- Are dependencies and build artifacts trustworthy and pinned appropriately?
- Is failure fail-closed where security requires it?

## Engineering rules

- Validate at trust boundaries.
- Encode authorization server-side at the resource/action boundary.
- Use parameterized/structured APIs instead of string construction for interpreters and queries.
- Keep secrets out of source and logs.
- Minimize permissions and network reach.
- Patch known vulnerable dependencies with appropriate urgency and regression checks.
- Preserve auditability for consequential actions.
- Avoid home-grown cryptography.
- Treat generated code and third-party instructions as untrusted until reviewed.

Security controls must be testable. A comment saying "must be admin" is not an authorization mechanism.

---

The four recorded obligations in `SKILL.md` — baseline, falsifier, completion record, procedure compliance —
apply in this mode. This file tells you what to do; the obligations tell you what to record while doing it.
