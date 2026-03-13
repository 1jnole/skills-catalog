# Proposal: evals-phase-5-scorers-benchmark

## Why

Phase 4 already proved that scoring and benchmark can run through the Promptfoo bridge, but that proof still centers on the smaller bootstrap suite. Phase 5 needs the portable scoring and benchmark path to run on the useful canonical suite in the new scaffold.

## What Changes

- expand the offline Promptfoo model-output fixture so the canonical `skill-forge` suite can run end to end without live model calls
- update Promptfoo config/scoring/benchmark tests and docs to reference the canonical suite instead of the Phase 4-only snapshot
- make the scoring ownership explicit: useful scoring rules now live in the canonical new-scaffold suite and feed the portable core
- verify that the local benchmark is generated from the expanded new-scaffold suite

## Capabilities

### New Capabilities
- `evals-expanded-suite-benchmarking`: Defines scoring and benchmark behavior for the canonical new-scaffold `skill-forge` suite.

### Modified Capabilities
- None.

## Impact

- `evals/engines/promptfoo/fixtures/`
- `scripts/evals/infrastructure/promptfoo/`
- `evals/scorers/README.md`
- `evals/benchmark/README.md`
