## Why

Phase 6A identified a small set of concrete `skill-contract-forge` failure patterns, but the local canonical case file still under-represents those boundaries and leaves several regression cases living only inside Promptfoo YAML.

Without a small Phase 6B expansion:
- the source case contract and the runtime suites keep drifting apart
- near-miss stop-and-ask behavior stays under-sampled
- wording robustness is still tested too narrowly around the weakest observed boundary

## What Changes

- Document explicit Phase 6B expansion buckets alongside the canonical `skill-contract-forge` source suite while keeping the suite's top-level shape stable.
- Promote the current regression-only cases into the canonical source case file so the source remains the clearest case inventory.
- Add one new realistic rewording for the "missing target skill" stop-and-ask pattern.
- Reflect the new stop-and-ask rewording in the Promptfoo contract and uplift suites.
- Extend the offline fixture replay so the expanded suites remain executable.

## Capabilities

### New Capabilities
- `skill-contract-forge-dataset-expansion`: maintain a small, explicit expansion layer for `skill-contract-forge` cases derived from observed calibration findings.

### Modified Capabilities
- `skill-contract-forge-manual-calibration`: Phase 6A findings now feed a tracked dataset expansion step rather than staying as audit notes only.

## Impact

- Affected code: `evals/cases/skill-contract-forge/*`, `evals/engines/promptfoo/tests/*`, `evals/engines/promptfoo/fixtures/*`, `openspec/changes/phase-6b-expand-skill-contract-forge-dataset/*`
- Affected systems: local case contract traceability, Promptfoo offline replay coverage
- Dependencies: none
