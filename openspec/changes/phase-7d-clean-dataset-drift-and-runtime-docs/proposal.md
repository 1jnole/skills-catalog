## Why

After the skill-local authoring source and sync guardrails land, the repo still needs to remove the old `suite.v1.json` authority story, clean the duplicated dataset entry, and update runtime-facing docs so the active paths are unambiguous.

## What Changes

- Remove the duplicated `eval-authoring-only-request` case from the canonical authoring dataset.
- Retire `evals/cases/skill-contract-forge/suite.v1.json` as an active authority.
- Convert `evals/cases/skill-contract-forge/` into a pointer or historical boundary instead of a competing source of truth.
- Update runtime and authoring docs to point to the skill-local source and to repeat the no-runner boundary.

## Capabilities

### Modified Capabilities

- `skill-contract-forge-dataset-maintenance`: the active authoring path and maintenance guidance move to the skill-local eval definition.

## Impact

- Affected code: `evals/README.md`, `evals/cases/*`, `evals/contracts/README.md`, `evals/fixtures/skill-contract-forge/README.md`, `evals/engines/promptfoo/README.md`
- Affected systems: eval authoring and runtime documentation
- Dependencies: none
