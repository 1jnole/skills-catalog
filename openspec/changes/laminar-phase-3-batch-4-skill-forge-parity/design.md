# Design: laminar-phase-3-batch-4-skill-forge-parity

## Context

Phase 3 now has:

- Batch 0 readiness decisions
- Batch 1 Laminar boundary skeleton
- Batch 2 active supported routing
- Batch 3 reporting and artifact closure

The next risk is purely functional: the Laminar path may still diverge from the accepted local benchmark semantics. Batch 4 exists to prove or disprove that parity explicitly, using `skill-forge` as the only migration pilot.

## Decisions

### Decision: Batch 4 is evidence-first

Batch 4 should not expand architecture or CLI surface. It should focus on preparing the required Laminar runtime dependency, producing a fresh Laminar-backed run, and evaluating it against the frozen parity rules.

### Decision: parity is judged on local artifacts

Even though Laminar is the active execution path, parity is still measured from the local `benchmark.json` and `run.json` outputs.

### Decision: transient operational noise uses the approved rerun policy

If a verification run fails only because of `timeout` or `execution_error`, one additional fresh verification run is allowed before parity is declared failed.

### Decision: retry contract must be re-proven on Laminar

Parity is not complete until the green Laminar iteration can also be retried locally with `--iteration` and `--retry-errors` without breaking the local contract.

### Decision: SDK readiness is part of the parity batch

The active Laminar path already depends on `@lmnr-ai/lmnr`. Because the dependency is currently missing from the repo, Batch 4 must include installing and preparing that SDK before the parity run is attempted. This is treated as a direct prerequisite of the parity gate, not as a separate architectural batch.

## Work Required

1. Add and install `@lmnr-ai/lmnr` for the active Laminar path.
2. Execute a fresh `skill-forge` iteration on the Laminar path.
3. Inspect the resulting `benchmark.json` and `run.json`.
4. Re-run the green Laminar iteration with local retry flags.
5. Record the evidence in OpenSpec and the resulting local run artifacts.

## Risks

- Provider noise can still produce false negatives if parity runs are judged too early.
- If the SDK is missing, the batch cannot produce meaningful parity evidence at all.
- If retry is not checked on the green iteration, the local contract can silently regress.
- If parity fails, the repo should stop before legacy retirement starts.

