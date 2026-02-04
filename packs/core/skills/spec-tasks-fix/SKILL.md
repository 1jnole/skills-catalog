---
name: spec-tasks-fix
description: Fix tasks.md that failed spec-tasks-lint with minimal edits. Schedule missing ACs or PROCESS constraints, add Iteration 0 gates if missing, keep PR-sized iterations. No new scope.
metadata:
  short-description: Fix tasks.md minimal diff
---
## Goal
Auto-repair tasks.md so the plan covers all ACs and constraints.

## When to use

- After `$spec-tasks-lint` reports FAIL, to minimally repair tasks formatting and missing fields.
- When you want the tasks file to be “gate-ready” for evidence logging.

## When NOT to use

- tasks.md is missing entirely (create it first).
- The fix would require adding new scope beyond the spec (stop and ask).

## Inputs
- tasks.md
- tasks lint report from `spec-tasks-lint`
- Spec (Mini-SPEC or SPEC)

## Outputs
- Write ONLY the corrected tasks.md to the same target path implied by context.
- No code changes. No commands.

## Rules (MUST)
- Minimal-diff mindset: change only what's necessary to pass tasks lint.
- Do NOT add new requirements; only schedule what exists in the spec.
- Preserve iteration numbering/structure when possible.

## Stop condition (MUST)
- If any lint item cannot be fixed without inventing scope, STOP and list remaining failures.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

