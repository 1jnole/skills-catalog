# Proposal: evals-domain-unit-tests

## Why

The repository now has a supported unit-test bootstrap for `scripts/evals/`, but the deterministic domain logic still lacks direct coverage. That keeps the feedback loop broader and slower than the TDD workflow described for the shared eval runner.

## What Changes

- add colocated unit tests for `grade-case`, `benchmark`, and `run-results`
- verify boundary behavior, aggregation math, rounding, and timestamp/default handling
- keep `run-evals` as the existing integration path without changing its public behavior

## Capabilities

### Added Capabilities
- `evals-domain-unit-tests`

## Impact

- `scripts/evals/grading/grade-case.test.ts`
- `scripts/evals/domain/services/benchmark.test.ts`
- `scripts/evals/domain/services/run-results.test.ts`