## Why

The documentation closeout slug for `skill-contract-forge` exposed a pre-existing failure in `npm run promptfoo:run:offline:uplift:with-skill`: `ambiguous-refactor-missing-target` is replayed as `trigger` when the supported contract expects `stop-and-ask`. That semantic drift blocks a fully green Promptfoo replay surface and needs its own focused repair slug.

## What Changes

- Reproduce and isolate the source of the `with_skill` offline uplift replay drift.
- Determine whether the mismatch comes from fixture ordering, `--model-outputs` replay semantics, Promptfoo configuration, or stale case/output alignment.
- Repair the affected offline replay path so the `with_skill` uplift surface returns to the expected `8/8` pass state.
- Keep the offline replay tied to the canonical uplift suite so the repair does not create a second hand-maintained case-definition authority.
- Record verification evidence for the repaired replay behavior without widening scope into unrelated documentation cleanup.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-contract-forge-uplift-surface`: the offline `with_skill` uplift surface must replay the expected stop-and-ask behavior for ambiguous refactor requests.
- `skill-contract-forge-eval-coverage-hardening`: maintained replay evidence must stay aligned with the supported routing envelope for anchor regression cases.

## Impact

- Affected files are expected under `evals/engines/promptfoo/` and the new OpenSpec change artifacts.
- May touch fixtures, suite definitions, or replay-adjacent configuration depending on root cause.
- Does not need to reopen the documentation cleanup changes from `phase-8e`.
