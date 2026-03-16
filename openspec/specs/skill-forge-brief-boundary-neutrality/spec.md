# skill-forge-brief-boundary-neutrality Specification

## Purpose
TBD - created by archiving change decouple-skill-forge-brief-from-engine-runtime. Update Purpose after archive.
## Requirements
### Requirement: Skill-forge contract remains engine-neutral
The `skill-forge` core contract MUST describe a neutral `Eval Brief` authoring boundary and MUST NOT frame that brief as being produced for a specific eval engine.

#### Scenario: Core contract references downstream eval context
- **WHEN** `packs/core/skill-forge/SKILL.md` describes downstream eval authoring context
- **THEN** it SHALL allow repository eval docs to orient downstream work
- **AND** it SHALL NOT identify an engine-specific runtime execution suite as part of the core skill contract

### Requirement: Structural guidance remains downstream-compatible
The `skill-forge` core contract MUST preserve the neutral structural guidance needed for downstream consumers without naming a specific runtime implementation.

#### Scenario: Eval Brief structure is described
- **WHEN** `packs/core/skill-forge/SKILL.md` instructs the skill to preserve the brief structure
- **THEN** it SHALL describe that structure as consumable by downstream structural validation
- **AND** it SHALL NOT describe Promptfoo checks as the reason the structure must remain stable

### Requirement: Agent description matches the contract-first boundary
The engine-facing `skill-forge` agent description MUST match the current contract-first workflow and stop at `Eval Brief ready`.

#### Scenario: Agent metadata is inspected
- **WHEN** `packs/core/skill-forge/agents/openai.yaml` is read
- **THEN** its short description SHALL describe creating or refactoring one skill through a contract-first workflow
- **AND** it SHALL identify `Eval Brief ready` as the stopping boundary

