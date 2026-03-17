## Why

The active Promptfoo runtime no longer depends on `evals/engines/promptfoo/support/assertions.cjs`, and the pilot fixture `evals/engines/promptfoo/fixtures/pilot-model-outputs.json` is no longer part of the supported offline command surface. Both files are historical engine artifacts, but they still live inside active runtime folders, which keeps the Phase A boundary blurrier than it needs to be.

## What Changes

- Move `evals/engines/promptfoo/support/assertions.cjs` into the Phase A quarantine tree.
- Move `evals/engines/promptfoo/fixtures/pilot-model-outputs.json` into the Phase A quarantine tree.
- Update `PLAN.md` so these two artifacts are described as already isolated rather than only candidates for review.

## Capabilities

### Modified Capabilities

- `skill-contract-forge-promptfoo-eval-runtime`: active engine folders contain only support and fixtures still used by the supported runtime surfaces.

## Impact

- Affected code: `PLAN.md`, `evals/_phase_a_quarantine/engines/promptfoo/support/assertions.cjs`, `evals/_phase_a_quarantine/engines/promptfoo/fixtures/pilot-model-outputs.json`, `evals/engines/promptfoo/support/assertions.cjs`, `evals/engines/promptfoo/fixtures/pilot-model-outputs.json`
- Affected systems: historical engine artifact isolation
- Dependencies: `phase-6g-quarantine-historical-eval-artifacts`
