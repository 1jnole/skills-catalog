## Why

`skill-contract-forge` still documents and teaches two authorities at once: Promptfoo-native runtime suites and a skill-local `evals.json` with sync tooling. That ambiguity is now the main blocker to aligning the repo with Promptfoo guidance and removing repo-owned projection mechanics in the next slug.

## What Changes

- Declare the three Promptfoo-native YAML suites under `evals/engines/promptfoo/tests/` as the only active authority for `skill-contract-forge` cases.
- Remove active docs and stable specs that still present `packs/core/skill-contract-forge/evals/evals.json` as an authoring source for this skill.
- Remove active documentation language that presents sync/projection as part of the supported flow for `skill-contract-forge`.
- Update active templates and examples so they teach Promptfoo-native suite authoring instead of `packs/core/<skill-name>/evals/evals.json`.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `skill-contract-forge-promptfoo-eval-runtime`: runtime and authoring authority collapse into the Promptfoo-native suites for `skill-contract-forge`.
- `promptfoo-modular-config-topology`: Promptfoo topology no longer includes supported sync/projection tooling for this skill.
- `skill-contract-forge-packaging-alignment`: the portable skill package no longer owns an active eval-authoring source for `skill-contract-forge`.
- `skill-contract-forge-dataset-maintenance`: case maintenance rules now point directly at the Promptfoo-native suites and nearby docs.
- `skill-contract-forge-dataset-expansion`: expansion buckets and coverage expectations now anchor on the Promptfoo-native suites instead of a skill-local source file.

## Impact

- Affected code: `AGENTS.md`, active eval docs, active templates/examples, and stable OpenSpec specs
- Affected systems: documentation and normative authority for `skill-contract-forge` eval maintenance
- Dependencies: none
