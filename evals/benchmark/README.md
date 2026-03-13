# Benchmark Boundary

This directory marks the Phase 3 destination for benchmark aggregation semantics.

## Current scope
The benchmark aggregate currently lives in:
- `scripts/evals/domain/benchmark/benchmark.ts`
- `scripts/evals/domain/benchmark/benchmark.types.ts`

## Ownership rule
Benchmark owns only:
- normalized-result aggregation,
- gate pass-rate semantics,
- improvement deltas and summaries.

Benchmark does not own:
- provider runtime wiring,
- engine-specific report formats,
- iteration filesystem mechanics.

## Transition note
The physical benchmark logic still lives in `scripts/evals/domain/benchmark/` and is rehomed by later slices.
