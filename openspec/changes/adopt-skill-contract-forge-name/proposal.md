## Why

The repository still refers to the same core skill, eval surfaces, contracts, and documentation under a legacy canonical name.

That creates naming drift because:
- the skill's actual purpose is contract-first authoring rather than generic "forge" behavior
- paths, generated artifacts, and OpenSpec capabilities no longer match the preferred name
- maintainers have to remember both names for the same thing

## What Changes

- Rename the core skill to `skill-contract-forge` everywhere it is still using the legacy name.
- Rename the related eval, contract, fixture, generated-artifact, and OpenSpec paths that carry the old name.
- Update textual references across repo docs, specs, tests, and archived change artifacts.
- Verify that no legacy-name references remain and that renamed paths are internally consistent.

## Capabilities

### Modified Capabilities
- `skill-contract-forge-brief-boundary-neutrality`
- `skill-contract-forge-contract-gate`
- `skill-contract-forge-uplift-surface`
- `skill-contract-forge-promptfoo-eval-runtime`
- `skill-contract-forge-dataset-expansion`
- `skill-contract-forge-dataset-maintenance`

## Impact

- Affected code: `packs/core/skill-contract-forge/*`, `evals/**/*`, `openspec/**/*`, repo docs and scripts that reference the old name
- Affected systems: skill authoring docs, Promptfoo suite paths, OpenSpec capability names, generated artifact names
- Dependencies: none
