## Why

`skill-contract-forge` still keeps its local eval authoring contract under `evals/cases/skill-contract-forge/suite.v1.json`, even though the runtime truth already lives in Promptfoo and the desired packaging model is Agent Skills style authoring close to the skill itself.

## What Changes

- Adopt `packs/core/skill-contract-forge/evals/evals.json` as the canonical authoring source for this skill.
- Keep Promptfoo runtime assets under `evals/engines/promptfoo/`.
- Add only the minimum extra authoring fields required to map cases onto the three Promptfoo surfaces.
- Keep the no-runner guardrail explicit: authoring moves into the skill package, but execution remains pure Promptfoo.

## Capabilities

### Modified Capabilities

- `skill-contract-forge-packaging-alignment`: the skill package owns eval authoring inputs while Promptfoo runtime assets remain outside the package.

## Impact

- Affected code: `packs/core/skill-contract-forge/evals/*`, `evals/cases/skill-contract-forge/*`
- Affected systems: skill-local eval authoring layout
- Dependencies: none
