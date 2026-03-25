## MODIFIED Requirements

### Requirement: The family checks eval-authoring behavior without phrasing lock-in

The `skill-eval-forge` Promptfoo family SHALL test the eval-authoring boundary described by `packs/core/skill-eval-forge/SKILL.md` and SHALL validate boundary behavior semantically rather than by requiring exact wording.

#### Scenario: Baseline avoids skill-owned markers without policing generic stop wording

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml` is reviewed
- **THEN** its load-bearing negative assertions SHALL reject `Skill eval ready` and skill-owned contract phrasing
- **AND** it SHALL NOT require generic phrases like `stop and ask` or `stop-and-ask` to be absent when those phrases are not acting as the skill-owned response envelope
