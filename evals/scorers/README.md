# Scorers Boundary

This directory marks the Phase 3 destination for portable scoring logic.

## Current scope
The grading/scoring semantics currently live in:
- `scripts/evals/domain/grading/grading.schema.ts`
- `scripts/evals/domain/grading/grade-case.ts`

## Ownership rule
Scorers should own only semantic inputs and outputs:
- case-level scoring rules,
- deterministic checks,
- pass/fail and score semantics.

Scorers should not own:
- provider wiring,
- engine config,
- filesystem iteration details,
- lock or retry machinery.

## Transition note
This boundary is visible now before scorer files are physically rehomed from `scripts/evals/domain/grading/`.

Current Promptfoo pilot scoring bridge:
- adapter: `scripts/evals/infrastructure/promptfoo/pilot-scoring.ts`
- scorer source of truth: `scripts/evals/domain/grading/grade-case.ts`
