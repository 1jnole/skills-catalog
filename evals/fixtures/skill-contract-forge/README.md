# Skill-Contract-Forge Fixtures

No dedicated external fixture files are required for the canonical `skill-contract-forge` suite at this stage.

Current state:
- `packs/core/skill-contract-forge/evals/evals.json` is the canonical inline case source for prompts, assertions, and surface membership
- the active Promptfoo runtime is split across:
  - `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
  - `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
  - `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`
- the offline Promptfoo response fixture lives under `evals/engines/promptfoo/fixtures/` because it is engine input, not eval-case source data
- the repo does not ship a local runner or wrapper around Promptfoo fixtures

If a future `skill-contract-forge` case needs attached files, place them in this folder and reference them from the case `files` field.
