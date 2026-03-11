# Design: laminar-phase-3-batch-0-readiness

## Context

Phase 3 is now documented correctly in `PLAN.md`, and `roadmap2/` translates it into agreements, gaps, batches, and gates. The next risk is no longer architectural drift; it is implementation drift caused by unresolved operational defaults.

Batch 0 exists to close those defaults before touching Laminar integration code.

## Decisions

### Decision: keep Batch 0 documentation-only

Batch 0 produces an implementation-ready decision record, not runtime code. This keeps the readiness review atomic and avoids mixing contract decisions with SDK wiring.

### Decision: dependency strategy must be explicit

Batch 0 must name the Laminar client or SDK strategy that future implementation will use. The approved default is the official Laminar TypeScript SDK, isolated under `scripts/evals/platforms/laminar/`.

### Decision: retry and resume remain local

`--iteration` and `--retry-errors` remain public local flags. They continue to use `iteration-N`, `benchmark.json`, and `run.json` as the local control plane even after Laminar becomes the supported path.

### Decision: fail-fast happens before iteration creation

The command must validate, in order:

1. CLI arguments
2. `evals.json`
3. required credentials and SDK availability
4. only then create `iteration-N`

### Decision: parity policy must distinguish noise from regression

Phase 3 verification must use an explicit timeout profile. A single `timeout` or `execution_error` does not count as semantic regression by itself; one additional fresh verification run is allowed before parity is declared failed.

## Work Required

1. Create a readiness note under `roadmap2/` that records the approved Batch 0 decisions.
2. Ensure the note is aligned with the revised Phase 3 section of `PLAN.md`.
3. Ensure the note is aligned with `roadmap2/phase-3-agreements.md`, `roadmap2/phase-3-plan-alignment.md`, and `roadmap2/phase-3-task-batches.md`.
4. Record the decisions in OpenSpec via proposal, design, spec, and tasks.

## Risks

- If the dependency strategy is not frozen now, Batch 1 can expand scope unexpectedly.
- If retry or resume semantics are not frozen now, implementation may couple local control flow to Laminar-native behavior.
- If parity policy is not explicit, Phase 3 closure can be blocked by provider noise instead of real semantic drift.
