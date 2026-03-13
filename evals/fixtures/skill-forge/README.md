# Skill-Forge Fixtures

No dedicated external fixture files are required for the canonical `skill-forge` suite at this stage.

Current state:
- `evals/cases/skill-forge/suite.v1.json` carries inline prompts and deterministic assertion rules
- the historical `pilot-suite.v1.json` snapshot also uses inline case data only
- the offline Promptfoo response fixture lives under `evals/engines/promptfoo/fixtures/` because it is engine input, not eval-case source data

If a future `skill-forge` case needs attached files, place them in this folder and reference them from the case `files` field.
