# Laminar Migration - Phase 2 Tasks

## Objective

Move the eval semantics out of platform-specific and legacy runner concerns. This phase freezes the source of truth, extracts pure eval logic, and defines a backend-neutral `run.json`.

## End State

At the end of Phase 2:

- `Eval Brief`, `evals.json`, Zod schemas, and benchmark semantics are the explicit source of truth
- scoring, gates, and benchmark aggregation are runner-neutral
- `benchmark.json` keeps the current repo semantics
- `run.json` exists with neutral naming and no Laminar-specific field names
- the benchmark can be rebuilt from platform run results without depending on legacy detailed artifacts

## Task List

### 1. Freeze the source of truth

- Document and enforce that the authoritative eval contracts are:
  - `Eval Brief`
  - `packs/core/<skill>/evals/evals.json`
  - `scripts/evals/domain/schemas/*`
  - `scripts/evals/domain/types/*`
  - benchmark semantics
- Ensure Laminar is treated only as execution/observability infrastructure.

### 2. Extract pure scoring logic

- Review the current scoring logic and separate any runner-dependent parts.
- Keep or refactor the scoring implementation so it can evaluate case outputs without depending on:
  - filesystem artifact layout
  - Laminar-specific result shapes
  - legacy runner-specific types

### 3. Extract pure gates logic

- Isolate gate decisions from execution details.
- Preserve the current meaning of:
  - trigger
  - non-trigger
  - stop-and-ask
  - case score threshold
  - overall pass/fail decisions

### 4. Extract pure benchmark aggregation

- Consolidate benchmark aggregation into logic that consumes normalized run results.
- Ensure aggregation remains based on the repo semantics, not on a specific platform.
- Preserve:
  - `golden_pass_rate`
  - `negative_pass_rate`
  - `case_score_threshold`
  - `overall_passed`
  - `with_skill` vs `without_skill`
  - average score and deltas

### 5. Define `run.json`

- Create a neutral `run.json` shape with these fields:
  - `platform`
  - `run_ref`
  - `group_ref`
  - `provider`
  - `model`
  - `skill_name`
  - `eval_version`
  - `iteration`
  - `created_at`
- Do not use Laminar-prefixed or vendor-specific field names in the schema.

### 6. Reduce artifact coupling

- Ensure the Phase 2 benchmark path does not depend on these detailed artifacts:
  - `outputs/`
  - `timing.json`
  - `grading.json`
  - `feedback.json`
  - `with_skill/`
  - `without_skill/`
- In the hybrid flow, keep only:
  - `benchmark.json`
  - `run.json`

### 7. Align documentation and diagrams

- Update docs so they reflect that benchmark semantics are local and pure.
- Update the final context/relationship diagram and the Phase 2 diagram if needed.
- Ensure the docs do not imply that Laminar defines passing criteria.

## Validation

### Search checks

- No public active docs state or imply that Laminar defines the benchmark semantics.
- No `run.json` fields use Laminar-specific naming.

### Build checks

- `npx tsc -p scripts/evals/tsconfig.json`

### Behavioral checks

- The benchmark semantics remain unchanged for `skill-forge`.
- The code path that computes `benchmark.json` can work from normalized platform results instead of legacy detailed artifacts.
- `with_skill` and `without_skill` remain comparable with the same scoring logic.

## Risks / Notes

- Do not redesign the platform integration in this phase.
- Do not remove the legacy runner yet unless Phase 3 parity is already proven.
- Do not introduce a generic platform abstraction yet.
- Keep the benchmark semantics stable; this phase is about isolation, not changing what “pass” means.

## Done Gate

Phase 2 is complete only when:

- scoring is runner-neutral
- gates are runner-neutral
- benchmark aggregation is runner-neutral
- `run.json` is backend-neutral
- `benchmark.json` still reflects the current repo semantics
- the benchmark no longer depends on legacy detailed artifacts as a source of truth

## Assumptions

- Phase 2 does not change public benchmark meaning; it only changes where the logic lives.
- `skill-forge` remains the only migration pilot.
- A second observability/eval platform is still hypothetical, so neutrality is achieved through pure logic and neutral naming, not a generic platform interface yet.
