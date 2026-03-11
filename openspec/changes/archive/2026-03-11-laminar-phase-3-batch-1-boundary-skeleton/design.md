# Design: laminar-phase-3-batch-1-boundary-skeleton

## Context

Phase 3 implementation needs a concrete Laminar boundary before the supported flow can be rerouted. Without that boundary, Batch 2 would have to invent module ownership and internal contracts while also changing runtime behavior.

Batch 1 exists to separate those concerns.

## Decisions

### Decision: Batch 1 introduces structure, not active routing

Batch 1 may create modules, types, and documentation under `scripts/evals/platforms/laminar/`, but it must not change `run-evals` to use Laminar yet.

### Decision: keep exactly four internal modules

The Laminar boundary stays intentionally small:

- `dataset-adapter`
- `executor`
- `evaluators-adapter`
- `report`

No extra orchestration layer or generic platform abstraction is introduced in this batch.

### Decision: `executor` owns the internal model-call contract

The executor exposes the internal boundary:

`runText({ mode, model, systemPrompt, userPrompt, files, timeoutMs })`

This contract remains internal to `scripts/evals/platforms/laminar/` and is designed so Batch 2 can wire runtime behavior without rethinking the call shape.

### Decision: keep benchmark semantics outside the Laminar boundary

`report` may prepare platform-derived results for the existing pure benchmark logic, but Batch 1 must not move benchmark semantics into `platforms/laminar/`.

## Work Required

1. Create skeleton source files under `scripts/evals/platforms/laminar/`.
2. Add concise module-level docs or comments describing ownership.
3. Add a Batch 1 note under `roadmap2/` describing the boundary shape.
4. Ensure the boundary shape matches Batch 1 in `roadmap2/phase-3-task-batches.md`.
5. Record the new ownership contract in OpenSpec.

## Risks

- If Batch 1 adds routing, it overlaps with Batch 2 and makes parity failures harder to isolate.
- If Batch 1 adds too many modules, the Laminar boundary becomes harder to reason about before it proves value.
- If the executor contract is left vague, Batch 2 can still drift while wiring runtime behavior.
