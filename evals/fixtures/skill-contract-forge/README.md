# Skill-Contract-Forge Fixtures

No dedicated external fixture files are required for the canonical `skill-contract-forge` suite at this stage.

Current state:
- `evals/cases/skill-contract-forge/suite.v1.json` carries inline prompts and deterministic assertion rules
- `evals/engines/promptfoo/tests/skill-contract-forge.yaml` is the native execution suite built from that contract
- the historical `pilot-suite.v1.json` snapshot also uses inline case data only
- the offline Promptfoo response fixture lives under `evals/engines/promptfoo/fixtures/` because it is engine input, not eval-case source data

If a future `skill-contract-forge` case needs attached files, place them in this folder and reference them from the case `files` field.
