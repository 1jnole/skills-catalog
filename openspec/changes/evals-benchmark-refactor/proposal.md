# Proposal: evals-benchmark-refactor

## Why

`benchmark.ts` currently mixes per-case reduction, totals accumulation, gate counting, delta calculation, and artifact assembly inside one function. The behavior is already covered by unit tests, so the next step is to reduce structural complexity without changing public benchmark semantics.

## What Changes

- add a characterization test for the current gate-rounding behavior
- refactor benchmark aggregation into smaller pure helpers
- preserve the current `BenchmarkArtifact` contract and output semantics

## Capabilities

### Modified Capabilities
- `evals-domain-unit-tests`

## Impact

- `scripts/evals/domain/services/benchmark.ts`
- `scripts/evals/domain/services/benchmark.test.ts`
