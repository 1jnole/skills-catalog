# Laminar platform boundary

This folder is the canonical source location for Laminar as an observability and eval platform.

Phase 1 established the boundary and naming. Phase 3 Batch 1 adds the source skeleton that later batches will wire into the supported execution path.

Current module ownership:

- `dataset-adapter.ts`: derives the platform-facing dataset shape from the local eval definition
- `executor.ts`: owns the internal `runText(...)` contract and future Laminar SDK wiring
- `evaluators-adapter.ts`: translates platform execution outputs into local per-mode summaries
- `report.ts`: prepares Laminar-derived results for the existing local benchmark and run manifest builders

This folder still does not own the active `run-evals` path. Routing and credentials move in later Phase 3 batches.
