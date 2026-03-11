archivalo y# Phase 3 Batch 0 Readiness

This note freezes the Batch 0 decisions that must be explicit before any Laminar implementation work starts.

## Goal

Close the remaining implementation defaults for Phase 3 without introducing Laminar runtime code yet.

## Approved Decisions

### 1. Laminar integration mechanism and dependency strategy

- Phase 3 implementation will use the official Laminar TypeScript SDK.
- The SDK will be isolated under `scripts/evals/platforms/laminar/`.
- Batch 0 does not add the dependency yet; it only freezes that future default.
- No generic multi-platform abstraction is introduced in this phase.

### 2. Local retry and resume contract

- `--iteration` and `--retry-errors` remain supported public flags.
- Retry and resume stay local to `iteration-N`, `benchmark.json`, and `run.json`.
- `benchmark.json` remains the semantic source for completed, failed, or retryable cases.
- `run.json` may carry Laminar references for traceability, but it does not become the source of benchmark semantics.
- Laminar does not become the control plane for reruns.

### 3. Fail-fast validation order

The command must fail in this order:

1. validate CLI arguments
2. validate and load `evals.json`
3. validate required credentials and Laminar SDK availability
4. only then create `iteration-N`

Additional rule:

- missing `LMNR_PROJECT_API_KEY`, missing `OPENAI_API_KEY`, invalid timeout configuration, or missing Laminar SDK must not create an empty iteration folder

### 4. Parity policy for transient operational failures

- Phase 3 parity verification must use an explicit timeout profile.
- The default verification profile should use `EVAL_RUN_TIMEOUT_MS=60000` unless Phase 3 implementation proves a different stable value is required.
- A single `timeout` or `execution_error` during parity verification is treated as operational noise first.
- One additional fresh verification run is allowed before declaring parity failure.
- If a semantic mismatch repeats after that rerun, the result is treated as a real regression.

## Cross-check Against Phase 3 Contract

These decisions are intentionally aligned with:

- [PLAN.md](C:/Users/Jorge/WebstormProjects/skills-catalog/PLAN.md)
- [Phase 3 Agreements](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap2/phase-3-agreements.md)
- [Phase 3 Plan Alignment](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap2/phase-3-plan-alignment.md)
- [Phase 3 Task Batches](C:/Users/Jorge/WebstormProjects/skills-catalog/roadmap2/phase-3-task-batches.md)

They also preserve these explicit constraints:

- `platform = laminar`
- `provider = openai`
- `--group-name` stays out of scope for Phase 3
- the benchmark remains local to the repo
- the legacy runner is not removed from the supported flow until parity is proven

## Exit Condition for Batch 0

Batch 0 is complete when:

- the dependency strategy is frozen
- local retry and resume semantics are frozen
- fail-fast order is frozen
- parity policy is frozen
- Batch 1 can start without inventing new operational defaults
