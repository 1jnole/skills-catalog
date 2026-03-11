# Design: laminar-phase-3-batch-3-artifacts-reporting

## Context

Phase 3 Batch 2 moved the supported path to Laminar and preserved the local retry contract. Batch 3 now closes the reporting contract so the Laminar path writes the same supported local artifacts without transferring benchmark semantics into the platform layer.

## Decisions

### Decision: Batch 3 owns reporting closure, not parity

Batch 3 finishes the artifact and reporting shape for the Laminar path, but parity proof stays in Batch 4.

### Decision: normalized local results remain the handoff point

Laminar-derived execution output must be reduced to the local normalized result shape before benchmark aggregation runs. This keeps the domain reusable and keeps benchmark semantics local.

### Decision: `run.json` stays neutral, only `platform` changes

`run.json` continues to use the neutral schema from Phase 2. The only Laminar-specific distinction required in Batch 3 is `platform: laminar`.

### Decision: no extra supported artifacts

Batch 3 must preserve the supported artifact set as only:

- `benchmark.json`
- `run.json`

No new per-case or platform-specific persisted artifacts become supported outputs.

## Work Required

1. Ensure the Laminar path writes `benchmark.json` from normalized results.
2. Ensure the Laminar path writes `run.json` with the neutral schema and Laminar platform identity.
3. Add a Batch 3 note under `roadmap2/`.
4. Record the reporting contract in OpenSpec.

## Risks

- If Batch 3 lets Laminar define benchmark semantics, future platform changes become much harder.
- If Batch 3 adds extra persisted artifacts, it violates the Phase 2 and Phase 3 contract.
- If Batch 3 mixes reporting with parity proof, failures become harder to classify.
