# Phase 3 Batch 2 Active Path

This note records the point where the supported eval command starts routing through the Laminar boundary.

## Goal

Make `run-evals` use the Laminar path with fail-fast readiness checks, while preserving the local iteration contract.

## Implemented Behavior

### Supported routing

- `run-evals` still enters the existing command surface.
- The active execution path now goes through `scripts/evals/platforms/laminar/`.
- Both `with_skill` and `without_skill` execute through the Laminar executor boundary.

### Fail-fast order

Before creating `iteration-N`, the command now validates:

1. CLI arguments
2. `evals.json`
3. `LMNR_PROJECT_API_KEY`
4. `OPENAI_API_KEY`
5. timeout configuration
6. Laminar SDK availability

If any of those fail, no new iteration folder is created.

### Local retry and resume

- `--iteration` and `--retry-errors` still use local iteration state.
- completed cases are still reused from local `benchmark.json`
- retry logic still depends on local case status, not Laminar-native rerun semantics

### Mode behavior

- `with_skill` still injects `SKILL.md`
- `without_skill` remains the baseline path

## Explicit Non-Goals

- no parity proof yet
- no legacy retirement yet
- no new public CLI options

## Exit Condition for Batch 2

Batch 2 is complete when:

- the supported command routes through Laminar
- fail-fast happens before `iteration-N`
- local retry and resume semantics remain intact
- Batch 3 can focus only on artifacts and reporting
