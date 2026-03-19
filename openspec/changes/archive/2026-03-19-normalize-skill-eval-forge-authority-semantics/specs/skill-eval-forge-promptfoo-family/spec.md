## MODIFIED Requirements

### Requirement: The family checks eval-authoring behavior without phrasing lock-in

The `skill-eval-forge` Promptfoo family SHALL test the eval-authoring boundary described by `packs/core/skill-eval-forge/SKILL.md` and SHALL validate boundary behavior semantically rather than by requiring exact wording.

#### Scenario: Authority is mentioned but not operationally identifiable

- **WHEN** a Promptfoo test prompt says the approved contract artifact, the existing implementation, or the active eval context exists but does not identify it specifically enough to inspect as authority
- **THEN** the expected outcome SHALL be `stop_and_ask`
- **AND** the assertions SHALL require clarification language
- **AND** the assertions SHALL require the absence of `Skill eval ready`

#### Scenario: Comparative uplift preserves the highest-signal authority guardrails

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml` is reviewed
- **THEN** it SHALL include comparative authority guardrails for contract artifact, implementation, and eval context mentioned-only cases
- **AND** it SHALL remain lighter than the contract gate

#### Scenario: Baseline mirrors renamed authority cases without impersonating the skill

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml` is reviewed after those authority cases are renamed
- **THEN** it SHALL mirror those prompt semantics where applicable
- **AND** it SHALL continue forbidding skill-owned terminal markers, skill-owned authority framing, and repo-local boundary framing
- **AND** it SHALL acknowledge when repo-local references are only mentioned rather than inspectable
- **AND** it SHALL stay at brief general guidance rather than inventing repo-shaped authoring procedures
