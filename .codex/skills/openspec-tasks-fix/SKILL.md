---
name: openspec-tasks-fix
description: Fix tasks.md that failed openspec-tasks-lint with minimal edits. Schedule missing ACs or PROCESS constraints, add Iteration 0 gates if missing, keep PR-sized iterations. No new scope.
metadata:
  short-description: Fix tasks.md minimal diff
---
## Goal
Auto-repair tasks.md so the plan covers all ACs and constraints.

## Inputs
- tasks.md
- tasks lint report from `openspec-tasks-lint`
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

