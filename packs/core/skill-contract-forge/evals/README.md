# skill-contract-forge evals folder

This folder is transitional and is no longer the supported source of truth for `skill-contract-forge` eval cases.

## Current authority

- the supported `skill-contract-forge` cases are authored directly in:
  - `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
  - `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
  - `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`
- `packs/core/skill-contract-forge/SKILL.md` remains the authority for observable output behavior
- Promptfoo remains the only supported runtime boundary

## Status

- this folder does not define the active case inventory
- this folder does not define the supported maintenance workflow
- this folder is kept only until the follow-up cleanup slug removes the obsolete artifacts it still contains
