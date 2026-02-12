---
name: agents-bootstrap
description: Scaffold repo-local AGENTS.md (short, truncation-safe) plus `openspec/AGENTS.override.md` for OpenSpec workflows. Uses a managed block; stops if repo root or `npm run verify` is missing.
metadata:
  short-description: Scaffold AGENTS.md + overrides
---
## Goal
Create **project instructions** for Codex that are:
- Short (to survive silent truncation)
- Deterministic (one gate, explicit stop conditions)
- Scoped (use directory overrides for deep detail)

This skill writes:
- `AGENTS.md` (repo root, short)
- `openspec/AGENTS.override.md` (details for the OpenSpec subtree)

## When to use
- New repo adopting Codex + OpenSpec.
- Repo has no `AGENTS.md`, or it needs a deterministic “managed” section.

## When NOT to use
- Repo already has an `AGENTS.md` with established team rules and you are not allowed to change it.

## Inputs
- Repo root (preferred: Git root).
- The single verification gate (required): `npm run verify`.
- Whether the repo is “untrusted” for Codex config (if yes, rely more on `AGENTS.md`).

## File precedence (Codex)
- Prefer the nearest `AGENTS.override.md` when present; otherwise fall back to `AGENTS.md`.
- Use directory-specific overrides (e.g. `openspec/AGENTS.override.md`) to keep root instructions short.

## Outputs
- `AGENTS.md` updated with a managed block:
  - `assets/AGENTS.managed.md` → inserted between markers
- `openspec/AGENTS.override.md` created/updated from:
  - `assets/openspec.AGENTS.override.md`

## Preflight (MUST)
1) Confirm repo root.
   - If unknown: **STOP**.
2) Confirm OpenSpec workspace exists.
   - If `openspec/` is missing: run `spec-bootstrap` first, then re-run this skill.
3) Confirm `npm run verify` exists.
   - If missing or fails: **STOP** and ask the user to define the gate.

## Update strategy (MUST)
- If `AGENTS.md` exists:
  - Preserve all content outside the managed block.
  - Replace only the managed block content.
- If `AGENTS.md` does not exist:
  - Create it from scratch using the managed block template.

Managed block markers (MUST):
```md
<!-- BEGIN MANAGED: agents-bootstrap -->
<!-- END MANAGED: agents-bootstrap -->
```

## Content rules (MUST)
- Put the **critical rules first** (source-of-truth, gate, stop conditions, commit convention).
- Keep `AGENTS.md` short; push detail into `openspec/AGENTS.override.md`.
- Use Conventional Commits with `scope=<slug>` (see managed block).
- Assume `AGENTS.md` may be silently truncated; keep the managed block compact.
- Never invent missing contracts; stop and ask.
- Default to minimal diffs.

## Definition of done
- Outputs are delivered as specified in "Outputs".
- Any required commands in the workflow were run, or blockers were reported.
- Stop conditions were enforced when triggered.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

