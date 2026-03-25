## MODIFIED Requirements

### Requirement: Baseline mirrors the family boundary without impersonating the skill

The `without_skill` baseline SHALL remain informational even when prompts paraphrase repo-local authority or workflow semantics.

#### Scenario: Baseline avoids skill-owned markers without policing generic stop wording

- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/uplift.without-skill.yaml` is reviewed
- **THEN** its load-bearing negative assertions SHALL reject `Skill implementation ready` and skill-owned contract phrasing
- **AND** it SHALL NOT require generic phrases like `stop and ask` or `stop-and-ask` to be absent when those phrases are not acting as the skill-owned response envelope
