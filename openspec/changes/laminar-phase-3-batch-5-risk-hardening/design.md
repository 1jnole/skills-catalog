# Design: laminar-phase-3-batch-5-risk-hardening

## Context

The Batch 5 refactor intentionally separated the supported `run-evals` path from legacy helpers, but three residual risks remain:

- two processes can still target the same `iteration-N` concurrently and race on `benchmark.json`
- moving legacy readers and writers can break undiscovered internal imports that still use the old file paths
- a few docs still describe the pre-Batch-5 helper locations

## Goals / Non-Goals

**Goals:**
- prevent concurrent mutation of the same iteration workspace
- keep legacy helper implementations historical while restoring old import paths as compatibility shims
- update nearby docs so they describe the new historical locations accurately

**Non-Goals:**
- redesign retry semantics
- change benchmark scoring or manifest schemas
- clean every Phase 3 document in the repo

## Decisions

### Decision: use per-iteration lock files
The runner should create a lock file inside the iteration directory and fail fast if another process already owns that iteration. This keeps the protection local to the workspace that is actually being mutated.

### Decision: stale locks may be reclaimed when the owning PID is gone
If a previous process crashed and left a lock file behind, the next run may reclaim it only when the lock metadata shows that the owning PID is no longer alive.

### Decision: restore old import paths as compatibility shims
The legacy helper implementations still belong under `run/historical/`, but the old source paths may re-export them to protect any undiscovered imports. The supported flow remains isolated because those shims are not used by active routing.

## Risks / Trade-offs

- Lock metadata can become stale if PID reuse happens quickly -> include only a narrow stale-lock reclaim rule and keep the message explicit if the lock cannot be reclaimed.
- Compatibility shims may prolong old imports -> keep the real implementation historical and document the intended supported path clearly.
- Docs can drift again later -> limit this batch to the nearby docs touched by the residual-risk review.
