## Why

The repo needs its stable OpenSpec layer and active change layer to describe the same architecture: skill-local eval authoring, Promptfoo-native runtime, and no repo-owned local runner. Several stable specs still carry placeholder purposes or older path assumptions, and several active phase-6 changes remain open even though the new direction supersedes them.

## What Changes

- Normalize stable `skill-contract-forge` specs so they point at `packs/core/skill-contract-forge/evals/evals.json` for authoring and Promptfoo for runtime.
- Fill the remaining `Purpose: TBD` placeholders in the stable `skill-contract-forge` specs touched by this architecture.
- Reconcile or supersede open phase-6 changes that still imply `suite.v1.json` as an active authority.
- Keep the no-runner guardrail explicit in stable specs and active changes.

## Capabilities

### Modified Capabilities

- `skill-contract-forge-promptfoo-eval-runtime`
- `skill-contract-forge-packaging-alignment`
- `skill-contract-forge-dataset-maintenance`
- `skill-contract-forge-dataset-expansion`

## Impact

- Affected code: `openspec/specs/skill-contract-forge-*/spec.md`, active `openspec/changes/phase-6*/` metadata as needed
- Affected systems: stable architecture documentation and change-layer authority
- Dependencies: none
