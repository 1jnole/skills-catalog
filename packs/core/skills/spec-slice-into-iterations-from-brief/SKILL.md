---
name: spec-slice-into-iterations-from-brief
description: After a full SPEC, write openspec/changes/<slug>/tasks.md as 3-6 reviewable iterations with Iteration 0 baseline and gates. Each iteration maps to specific ACs. PROCESS items are advisory unless process_mode=strict.
metadata:
  short-description: Feature -> tasks.md iterations
---
## Goal
Turn a SPEC into a pragmatic execution plan (tasks.md).

## When to use

- After the SPEC/Mini-SPEC is lint-clean, to split work into 3–5 iterations and draft tasks.
- When the source is a product brief/notes-derived requirement inventory.

## When NOT to use

- The spec is not lint-clean yet (run `$spec-spec-lint`/`$spec-spec-fix` first).
- The project expects a single PR only (do not force slicing).

## Inputs
- SPEC (Acceptance criteria + Requirements + Determinism rules)
- Preferred gate command (default: `npm run verify`)
- Optional: docs/RUNBOOK.md

## Outputs
- Write tasks plan to:
  `openspec/changes/<slug>/tasks.md`
- No code changes. No commands.

## Preflight (MUST)
1) Confirm `openspec/changes/<slug>/tasks.md` exists.
   - If missing: STOP and run `$spec-new-change-from-templates`.
2) Confirm repo-local template exists:
   - `openspec/templates/tasks.md`
   - If missing: STOP and run `$spec-bootstrap`.

## Update rule (MUST)
- Treat `tasks.md` as **plan + evidence**.
- Replace the **Iterations** plan, but preserve an existing `## Evidence log` section if present.

## Rules (MUST)
- Iteration 0: baseline + gates.
- Each iteration has a single objective and references which ACs it delivers.
- Determinism/state rules get their own iteration if non-trivial.
- If there are PROCESS constraints, treat as advisory unless strict is stated.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

