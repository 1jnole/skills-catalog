# Design: evals-benchmark-map-reduce-refactor

## Context

The benchmark builder now has smaller helpers, but the main flow is still not as explicit as it could be. A final local refactor can express the intended domain shape more clearly: summarize each case, reduce summaries into totals, then assemble the final artifact.

## Goals

- make the benchmark flow read as map -> reduce -> assemble
- keep the current semantics and test expectations unchanged
- avoid new modules, classes, or abstractions beyond what the current domain needs

## Non-Goals

- redesign gates or scoring semantics
- introduce classes or strategy hierarchies
- change the benchmark artifact contract

## Decisions

### Decision: summaries stay internal to the module

The per-case summary type and reducer stay local to `benchmark.ts`. This keeps the refactor focused on readability and maintainability without widening the public API.
