# Workflow Contract — Codex + Skills + OpenSpec + npm

This document is the **stable contract** for how this repository and downstream repos should be operated by agents.

## Non-negotiables
- **Spec workspace is source-of-truth**: implement only what exists under `openspec/changes/<slug>/`.
- **1 change = 1 PR** (or equivalent atomic unit).
- **Plans + evidence are mandatory**: keep an iteration plan (incl. Iteration 0) and record commands + relevant output (including exit codes) in `openspec/changes/<slug>/tasks.md`.
- **Single gate**: run `npm run verify`.
- **No invented contracts**: if an input/output/requirement is not specified, **STOP** and ask for clarification.
- **Templates are canonical**: use `openspec/templates/*` when creating new change files.

> Note: the workspace root is currently named `openspec/` for compatibility. If you later migrate to a different spec system, update the skills/catalog to point to the new root rather than keeping parallel conventions.

## OpenSpec structure

### Repo-local templates
`openspec/templates/*` is the canonical formatting contract used by skills:
- `proposal.md`, `tasks.md`, `spec.md`, `mini-spec.md`, `spec-delta.md`, `design.md`

### Stable specs vs change deltas
- `openspec/specs/` contains **stable specs** that define durable contracts (like this document).
- `openspec/changes/<slug>/specs/` contains **spec deltas** for a specific change *only when that change modifies or adds to a durable contract*.

It is valid for `openspec/changes/<slug>/specs/` to be empty when the change is purely mechanical or operational.

### Change folder minimum
A change folder should contain at least:
- `proposal.md`
- `tasks.md` (plan + evidence)

Optional (when needed):
- `design.md`
- `specs/` (spec deltas and/or TT specs)

## Commit messages

### Standard
Use **Conventional Commits**:
- Format: `type(scope): short summary`
- `scope` **MUST** be the OpenSpec `<slug>`.
- Types (minimum set): `feat | fix | refactor | docs | test | chore`.

### Traceability requirements
When the change is associated with an OpenSpec slug, the commit body SHOULD include:
- `OpenSpec: openspec/changes/<slug>/`

If a gate was executed successfully, the body MAY include:
- `Evidence: npm run verify`

### Safety
Agents SHOULD NOT run `git commit` unless the environment explicitly allows it; instead, generate the commit message text for human review.

## AGENTS.md
- Keep `AGENTS.md` short (root policy + gate + stop conditions).
- Put operational detail under directory overrides (e.g. `openspec/AGENTS.override.md`).

Reason: agent instruction documents may be truncated by size limits; prioritize critical content at the top and delegate details to overrides.
