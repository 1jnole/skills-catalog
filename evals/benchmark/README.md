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

Current `skill-forge` benchmark state:
- the canonical suite is `evals/cases/skill-forge/suite.v1.json`
- the local benchmark now runs on results produced from that new-scaffold suite
- the inherited `packs/core/skill-forge/evals/evals.json` path is not required for the primary `skill-forge` benchmark flow

Current Promptfoo benchmark bridge:
- adapter: `scripts/evals/infrastructure/promptfoo/pilot-benchmark.ts`
- benchmark source of truth: `scripts/evals/domain/benchmark/benchmark.ts`
