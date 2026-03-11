# Laminar Migration - Phase 0 Tasks

## Objective

Stabilize the current eval runner state before changing naming, architecture, or platform integration. This phase reduces ambiguity and defines the migration baseline that later phases must preserve.

## End State

At the end of Phase 0:

- the active and legacy parts of `scripts/evals` are clearly identified
- stale or transitional pieces are explicitly classified
- `skill-forge` is frozen as the only migration pilot
- the accepted behavioral baseline for parity is documented
- later phases can measure success against a known starting point

## Task List

### 1. Inventory the current runner state

- Identify which commands are currently active, transitional, or stale.
- Identify which folders under `scripts/evals/` are part of the supported path versus legacy support.
- Identify which docs still describe the current runner shape.

### 2. Classify the current code paths

- Split the current eval code into three groups:
  - `source of truth`
  - `legacy but still needed`
  - `stale / safe to ignore during migration`
- Capture this classification in the Phase 0 notes so the next phases can use it as a reference.

### 3. Freeze the migration pilot

- Confirm `skill-forge` as the only pilot for the Laminar migration.
- Avoid expanding the migration to any other skill before parity is proven for `skill-forge`.

### 4. Capture the functional baseline

- Record the accepted benchmark expectations for `skill-forge`:
  - `overall_passed: true`
  - `with_skill` outperforms `without_skill`
  - trigger / non-trigger / stop-and-ask decisions remain aligned
- Note the benchmark and artifact paths currently used for that accepted baseline.

### 5. Identify legacy artifact coupling

- Identify which parts of the current runner still depend on:
  - `outputs/`
  - `timing.json`
  - `grading.json`
  - `feedback.json`
  - `with_skill/`
  - `without_skill/`
- Record these dependencies so Phase 2 can remove them intentionally.

### 6. Identify naming drift and documentation drift

- Search for stale references to:
  - `run-iteration`
  - `read-evals`
  - `run-lmnr-eval`
  - legacy artifact structures
- Record which docs must be updated in later phases.

### 7. Align the migration baseline with diagrams

- Ensure the “current state” Mermaid reflects the real code layout and not an outdated spike.
- Ensure the migration plan starts from the actual repo state, not an assumed intermediate state.

## Validation

### Search checks

- There is a written classification of active, legacy, and stale eval runner pieces.
- The current supported flow and the current legacy flow are distinguishable from the docs and notes.

### Build checks

- `npx tsc -p scripts/evals/tsconfig.json`

### Baseline checks

- The accepted `skill-forge` benchmark outcome is documented as the parity target for later phases.
- The migration starts from the real current file/folder structure.

## Risks / Notes

- Do not rename commands or folders yet in this phase.
- Do not change benchmark semantics in this phase.
- Do not remove any legacy piece yet unless it is unquestionably stale and unused.
- This phase is about reducing uncertainty, not implementing the migration itself.

## Done Gate

Phase 0 is complete only when:

- the current runner state is inventoried
- active vs legacy vs stale pieces are classified
- `skill-forge` is explicitly frozen as the only pilot
- the accepted parity baseline is documented
- the starting Mermaid and roadmap reflect the actual repo state

## Assumptions

- The repo currently mixes active, legacy, and transitional eval runner pieces.
- Later phases will be safer if they start from a documented baseline rather than inferred state.
- Phase 0 exists only to reduce migration risk and improve the odds of parity in later phases.
