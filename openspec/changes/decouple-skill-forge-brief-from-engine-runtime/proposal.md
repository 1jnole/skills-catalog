## Why

`skill-forge` should describe a neutral `Eval Brief` handoff boundary, not an engine-specific runtime implementation. The current wording in the skill contract still leaks Promptfoo-specific execution details into the core authoring workflow and no longer matches the intended contract-first boundary.

## What Changes

- Remove direct Promptfoo runtime-suite references from `packs/core/skill-forge/SKILL.md`.
- Reword `skill-forge` guidance so the skill produces a neutral Eval Brief that downstream structural validation can consume without naming an engine.
- Update the `skill-forge` OpenAI agent description so it matches the current contract-first workflow and stops at `Eval Brief ready`.

## Capabilities

### New Capabilities
- `skill-forge-brief-boundary-neutrality`: Define that the `skill-forge` core contract stays engine-neutral while allowing downstream eval docs to describe implementation-specific runtimes.

### Modified Capabilities
- None.

## Impact

- Affected docs: `packs/core/skill-forge/SKILL.md`
- Affected agent metadata: `packs/core/skill-forge/agents/openai.yaml`
- No runtime config, tests, or dependencies change
