---
name: spec-spec-fix
description: Fix a Mini-SPEC/SPEC that failed `spec-spec-lint` by rewriting the spec with minimal edits (no new scope). Preserve existing IDs when possible. Output the corrected spec only.
metadata:
  short-description: spec-spec-fix
---

## Goal
Auto-repair spec drafts so you don't have to craft prompts every time, while respecting `process_mode` (strict vs advisory).

## When to use

- After `$spec-spec-lint` reports FAIL, to apply minimal edits that make the spec pass.
- When you want deterministic repairs without expanding scope.

## When NOT to use

- The spec is missing entirely (generate it first).
- The lint failures are caused by unresolved ambiguity (record Q/D and stop instead of inventing).

## Inputs
- Current spec markdown
- Lint report from `spec-spec-lint`
- Optional: source brief
- Optional flags:
  - `process_mode`: `strict | advisory | auto` (default: `auto`)
    - `auto`: follow the mode requested/mentioned in the lint report if present; otherwise default to `strict`.

## Outputs
- Write ONLY the corrected spec to the same target path implied by context.
- No code changes. No dependency changes. No commands.

## Rules (MUST)
- Minimal-diff mindset: change only what's necessary to pass lint.
- Do NOT add new scope.
- Preserve existing IDs (`R-*`, `AC-*`, `Q-*`, `D-*`) when possible.
- If information is missing:
  - `strict`: capture it as `Q-*` / `D-*` and mark impacted requirements `UNKNOWN` (do not invent).
  - `advisory`: you may add a documented assumption under `Notes / assumptions` and use `ASSUMED` status when necessary.

## Stop condition (MUST)
- If any lint item cannot be fixed without inventing requirements/decisions, STOP and list remaining failures.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

