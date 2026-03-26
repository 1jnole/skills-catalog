## MODIFIED Requirements

### Requirement: Structural guidance remains downstream-compatible
The `skill-contract-forge` core contract MUST preserve the neutral structural guidance needed for downstream consumers without naming a specific runtime implementation.

#### Scenario: Eval Brief structure is described
- **WHEN** `packs/core/skill-contract-forge/SKILL.md` instructs the skill to preserve the brief structure
- **THEN** it SHALL describe that structure as consumable by downstream structural validation
- **AND** it SHALL NOT describe Promptfoo checks as the reason the structure must remain stable

#### Scenario: `seedEvalIntent` remains engine-neutral but explicit
- **WHEN** `packs/core/skill-contract-forge/SKILL.md` describes `seedEvalIntent`
- **THEN** it SHALL describe `seedEvalIntent` as a neutral brief field with `mustStopAt`, `comparisonFocus`, and `notes`
- **AND** it SHALL keep that structure independent from any engine-specific suite implementation
