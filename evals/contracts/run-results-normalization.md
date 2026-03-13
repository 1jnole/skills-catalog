# Run Results Normalization Contract

This note captures the canonical local result shape that separates engine output from core semantics.

## Current source of truth
- `scripts/evals/domain/run-results/run-result.schema.ts`
- `scripts/evals/domain/run-results/run-results.ts`

## Canonical normalized shape
A normalized case result always contains:
- `case_id`
- `should_trigger`
- `expected_stop`
- `with_skill`
- `without_skill`

Each mode keeps only canonical fields:
- `status`
- `duration_ms`
- `score`
- `passed`
- optional technical metadata (`provider`, `model`, `usage`)
- optional `error` only when status is `error`

## Canonicalization rules
- `status = completed` must not carry `error`.
- `status = error` must carry `error`.
- technical metadata in errored modes is not part of the canonical output.
- legacy errored artifacts without error payload are upgraded with a fallback error marker during normalization.

## Boundary rule
Engine-specific raw reports do not define benchmark or grading semantics directly.

The core reads normalized case results and builds benchmark/scoring semantics from this stable local shape.
