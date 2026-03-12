# Design: laminar-phase-3-batch-6-docs-closeout

## Context

The implementation already reached the Batch 6 prerequisites:

- `run-evals` is the supported command owner
- Laminar is the active platform boundary in the supported flow
- legacy helpers are isolated as historical compatibility
- parity was proven on `skill-forge`

The remaining task is documentary consistency. The root README, runner README, and `PLAN.md` still contain transition-phase wording that describes the pre-closeout state.

## Goals / Non-Goals

**Goals:**
- describe the supported command and compatibility aliases accurately
- make `PLAN.md` read as the implemented architecture and completed Phase 3 result
- keep Mermaid diagrams aligned with the current code layout
- keep Batch 6 completion evidence inside active repo docs and OpenSpec task evidence

**Non-Goals:**
- recreate removed roadmap folders
- rewrite every historical planning document
- change runtime behavior

## Decisions

### Decision: keep historical planning docs historical
Batch-specific planning notes that describe earlier incomplete states may remain as historical records. Batch 6 should update the repo-level entrypoints and architecture documents that a maintainer is most likely to treat as current truth.

### Decision: update `PLAN.md` in place
`PLAN.md` remains the architecture source of truth, so it should be updated in place to describe the implemented final state rather than linking to a new replacement file.

## Risks / Trade-offs

- Historical notes may still mention incomplete states -> acceptable because they are chronological records, not the primary current docs.
- Over-editing `PLAN.md` could erase useful migration rationale -> keep the phase history, but change wording where the document still implies that the old supported path remains active.


