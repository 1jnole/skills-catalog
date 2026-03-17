## Why

After the runtime-authority realignment, the inherited `evals/engines/promptfoo/tests/skill-contract-forge.yaml` file still lives next to the active Promptfoo suites even though the repo no longer treats it as supported runtime authority. Leaving it in the active tests folder keeps the Phase A boundary blurry and makes future cleanup harder to review.

## What Changes

- Create the Phase A quarantine area under `evals/_phase_a_quarantine/`.
- Move the inherited `evals/engines/promptfoo/tests/skill-contract-forge.yaml` file into that quarantine area.
- Update the nearby docs and `PLAN.md` references so they point to the quarantined location or describe the file as already isolated.

## Capabilities

### Modified Capabilities

- `skill-contract-forge-promptfoo-eval-runtime`: unsupported legacy runtime suite files no longer live inside the active Promptfoo test surface.

## Impact

- Affected code: `PLAN.md`, `evals/cases/README.md`, `evals/fixtures/skill-contract-forge/README.md`, `evals/_phase_a_quarantine/README.md`, `evals/_phase_a_quarantine/engines/promptfoo/tests/skill-contract-forge.yaml`, `evals/engines/promptfoo/tests/skill-contract-forge.yaml`
- Affected systems: Promptfoo test-surface layout and historical artifact isolation
- Dependencies: `phase-6f-realign-promptfoo-runtime-authority`
