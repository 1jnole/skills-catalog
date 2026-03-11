# Laminar Migration - Phase 3 Tasks

## Objective

Integrate Laminar as the first observability/eval platform without making it the source of truth, then retire the legacy runner only after `skill-forge` reaches real parity.

## End State

At the end of Phase 3:

- `run-evals` is the only supported execution command
- `scripts/evals/platforms/laminar/` is the active platform integration
- Laminar runs both `with_skill` and `without_skill`
- the repo persists only `benchmark.json` and `run.json`
- `skill-forge` keeps `overall_passed: true`
- the legacy runner is no longer required by the supported flow

## Task List

### 1. Finalize the Laminar platform integration

- Ensure `scripts/evals/platforms/laminar/` contains only the pieces needed for the supported flow:
  - `dataset-adapter`
  - `executor`
  - `evaluators-adapter`
  - `report`
- Keep responsibilities separated:
  - dataset translation
  - execution
  - evaluator wiring
  - benchmark/report reconstruction

### 2. Stabilize the execution path

- Keep AI SDK as the model execution layer inside the Laminar integration.
- Preserve a stable execution contract:
  - `runText({ mode, model, systemPrompt, userPrompt, files, timeoutMs })`
- `with_skill` must inject `SKILL.md`
- `without_skill` must remain the baseline path

### 3. Validate credentials and startup behavior

- Fail early if required credentials are missing:
  - `LMNR_PROJECT_API_KEY`
  - `OPENAI_API_KEY`
- Ensure failure happens before creating `iteration-N`
- Keep the startup path deterministic and easy to diagnose

### 4. Persist only the hybrid artifacts

- Ensure the supported flow writes only:
  - `packs/core/<skill>/evals/runs/iteration-N/benchmark.json`
  - `packs/core/<skill>/evals/runs/iteration-N/run.json`
- Confirm the Laminar path no longer depends on:
  - `outputs/`
  - `timing.json`
  - `grading.json`
  - `feedback.json`
  - `with_skill/`
  - `without_skill/`

### 5. Prove parity with `skill-forge`

- Run the Laminar path with `skill-forge` as the only pilot
- Rebuild the local benchmark from Laminar results
- Verify parity against the current accepted benchmark behavior:
  - `overall_passed: true`
  - `with_skill` still beats `without_skill`
  - trigger / non-trigger / stop-and-ask decisions remain aligned

### 6. Retire legacy execution from the supported path

- Remove public reliance on the legacy runner once parity is confirmed
- Delete or isolate modules that only served:
  - legacy execution
  - detailed legacy artifacts
  - retry/resume behavior tied to the old filesystem runner
- Keep only what is still genuinely needed:
  - domain validation
  - pure scoring / gates / benchmark aggregation
  - Laminar integration

### 7. Align documentation and diagrams

- Update docs so they reflect Laminar as the active observability/eval platform
- Update the final context/relationship diagram and the Phase 3 diagram if needed
- Ensure docs no longer present the legacy runner as part of the supported flow

## Validation

### Search checks

- No public docs present the legacy runner as the supported execution path
- No active code path for supported runs depends on legacy artifact shapes

### Build checks

- `npx tsc -p scripts/evals/tsconfig.json`

### Behavioral checks

- `run-evals` executes through the Laminar path
- the command fails early if credentials are missing
- `benchmark.json` and `run.json` are produced by the supported flow
- `skill-forge` remains green with the same benchmark semantics

## Risks / Notes

- Do not broaden the migration to a second skill before `skill-forge` reaches parity
- Do not change benchmark semantics in this phase
- Do not introduce a generic platform abstraction unless a second real platform appears
- Do not remove legacy pieces that are still required to prove parity

## Done Gate

Phase 3 is complete only when:

- `run-evals` uses the Laminar path as the supported execution flow
- `skill-forge` maintains `overall_passed: true`
- `with_skill` still outperforms `without_skill`
- trigger / non-trigger / stop-and-ask remain aligned
- only `benchmark.json` and `run.json` remain as supported persisted artifacts
- the legacy runner is no longer required by the supported flow

## Assumptions

- `skill-forge` remains the only migration pilot in this phase
- AI SDK stays in place as the model provider layer
- Laminar remains the first observability/eval platform, but not the source of truth
- If parity cannot be proven cleanly, legacy removal is deferred rather than forced
