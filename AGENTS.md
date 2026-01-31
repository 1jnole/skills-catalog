<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# AGENTS.md

## Managed workflow (Codex + Skills + OpenSpec)

- **Source of truth:** implement only what exists under `openspec/changes/<slug>/...`.
- **1 change = 1 PR** (or equivalent).
- **Single gate:** run `npm run verify` and record the result.
- **Evidence required:** every change must include `openspec/changes/<slug>/tasks.md` with:
  - commands (copy/paste)
  - relevant output (incl. exit codes)
  - `npm run verify` output
- **Stop conditions:** if requirements/spec are missing or ambiguous, stop and ask.

For OpenSpec-specific operating rules, see `openspec/AGENTS.override.md`.
For extended human notes, see `docs/AGENTS.md`.
