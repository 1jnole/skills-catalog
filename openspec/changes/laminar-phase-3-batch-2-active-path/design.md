# Design: laminar-phase-3-batch-2-active-path

## Context

Phase 3 Batch 2 is the first change that switches the supported execution path from the legacy runner to Laminar. Batch 1 already created the module skeleton, so Batch 2 can focus on routing and readiness checks.

## Decisions

### Decision: Batch 2 owns routing and fail-fast, not parity

Batch 2 changes the supported execution path and credential validation order, but it does not close parity or remove the legacy implementation entirely. Those remain later gates.

### Decision: local retry and resume survive unchanged

`--iteration` and `--retry-errors` stay local and continue to use `iteration-N`, `benchmark.json`, and `run.json` as the control plane, even once Laminar becomes the active path.

### Decision: fail-fast happens before iteration creation

Batch 2 must enforce the already approved validation order:

1. CLI args
2. `evals.json`
3. `LMNR_PROJECT_API_KEY`, `OPENAI_API_KEY`, timeout config, and Laminar SDK readiness
4. only then create `iteration-N`

### Decision: `with_skill` and `without_skill` both route through Laminar

The supported flow must execute both modes through the Laminar boundary. `with_skill` still injects `SKILL.md`; `without_skill` remains the same baseline comparison path.

## Work Required

1. Add runtime readiness checks in the Laminar boundary.
2. Route the supported command path through Laminar.
3. Preserve local iteration behavior and artifact expectations.
4. Add a Batch 2 note under `roadmap2/`.
5. Record the routing contract in OpenSpec.

## Risks

- If Batch 2 blurs routing with parity, failures will be harder to diagnose.
- If fail-fast happens too late, the repo will create empty or misleading iteration folders.
- If local retry semantics drift here, later parity debugging becomes much harder.
