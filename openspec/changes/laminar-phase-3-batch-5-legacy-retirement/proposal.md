# Proposal: laminar-phase-3-batch-5-legacy-retirement

## Why

Batch 4 proved that the Laminar-backed path preserves the accepted `skill-forge` benchmark behavior. The next step is to remove the remaining supported-path dependence on legacy entrypoints and legacy artifact helpers so the repo can treat the old runner as historical compatibility instead of active flow.

## What Changes

- create a dedicated supported `run-evals` command implementation instead of routing the public command through the legacy `run-iteration` command file
- keep `run-iteration` only as a compatibility alias to the supported command
- isolate historical legacy artifact helpers outside the supported `run/artifacts/` path
- remove the supported-path dependency on the `legacy-runner` manifest default
- record Batch 5 implementation evidence and supported-flow retirement status in OpenSpec evidence

## Capabilities

### New Capabilities
- `laminar-legacy-retirement`: Defines how the supported flow retires legacy routing while preserving optional historical compatibility outside the active path.

### Modified Capabilities
- None.

## Impact

- `scripts/evals/commands/`
- `scripts/evals/run/`
- `scripts/evals/domain/services/`
- `scripts/evals/platforms/laminar/`

- `openspec/changes/laminar-phase-3-batch-5-legacy-retirement/`


