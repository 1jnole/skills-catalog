## Why

`skill-contract-forge` now freezes both `skill.name` and `skill.description` in trigger-path briefs, but `skill-implementation-forge` still treats implementation authority too loosely. That leaves a second handoff gap: implementation can proceed from an approved contract artifact without treating repo-required frontmatter metadata as mandatory authority, and it can reach `Skill implementation ready` without explicitly checking the repo-local metadata validator.

## What Changes

- Require `skill-implementation-forge` to treat `skill.name` and `skill.description` from the approved contract artifact as required implementation authority for `SKILL.md` frontmatter.
- Require implementation-phase stop-and-ask behavior when the approved contract artifact omits canonical `skill.description`.
- Harden the maintained Promptfoo family so trigger behavior stays valid only when the contract artifact carries repo-required frontmatter metadata and the phase closes behind `npm run validate:skill-metadata`.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-implementation-forge`: implementation-from-contract now requires approved-contract authority for repo-required frontmatter metadata and a metadata-validation gate before terminal closure.
- `skill-implementation-forge-promptfoo-family`: contract and uplift coverage now exercise missing-description stop-and-ask behavior and validation-aware trigger completion.

## Impact

- Affected code: `packs/core/skill-implementation-forge/` and `evals/engines/promptfoo/skill-implementation-forge/`.
- Affected interface: implementation requests now require an approved contract artifact whose authority includes canonical `skill.description`, not just the skill name.
- Out of scope: `packageShape`, `agents/openai.yaml`, new validators, fixture/offline expansion, and repo-wide packaging policy.
