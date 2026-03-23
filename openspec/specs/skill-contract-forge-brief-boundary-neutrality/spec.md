# skill-contract-forge-brief-boundary-neutrality Specification

## Purpose
Keep the `skill-contract-forge` brief boundary engine-neutral so the skill stops at `Eval Brief ready` and downstream runtime choices stay outside the core contract.
## Requirements
### Requirement: Skill-contract-forge contract remains engine-neutral
The `skill-contract-forge` core contract MUST describe a neutral `Eval Brief` authoring boundary and MUST NOT frame that brief as being produced for a specific eval engine.

#### Scenario: Core contract references downstream eval context
- **WHEN** `packs/core/skill-contract-forge/SKILL.md` describes downstream eval authoring context
- **THEN** it SHALL allow repository eval docs to orient downstream work
- **AND** it SHALL NOT identify an engine-specific runtime execution suite as part of the core skill contract

### Requirement: Structural guidance remains downstream-compatible
The `skill-contract-forge` core contract MUST preserve the neutral structural guidance needed for downstream consumers without naming a specific runtime implementation.

#### Scenario: Eval Brief structure is described
- **WHEN** `packs/core/skill-contract-forge/SKILL.md` instructs the skill to preserve the brief structure
- **THEN** it SHALL describe that structure as consumable by downstream structural validation
- **AND** it SHALL NOT describe Promptfoo checks as the reason the structure must remain stable

### Requirement: Core skill metadata remains contract-first
The maintained `skill-contract-forge` skill metadata MUST describe the current contract-first workflow and stop at `Eval Brief ready`.

#### Scenario: Maintained skill metadata is inspected
- **WHEN** the maintained skill metadata surfaces for `skill-contract-forge` are read
- **THEN** they SHALL describe creating or refactoring one skill through a contract-first workflow
- **AND** they SHALL identify `Eval Brief ready` as the stopping boundary

### Requirement: Active authoring templates remain engine-neutral
The maintained `skill-contract-forge` authoring templates MUST keep the brief boundary engine-neutral and MUST NOT instruct maintainers to convert those artifacts into retired eval-authoring files.

#### Scenario: Eval Brief template is reviewed
- **WHEN** the active Eval Brief template for `skill-contract-forge` is reviewed
- **THEN** it SHALL stop at `Eval Brief ready`
- **AND** it SHALL NOT name `evals.json` as a downstream authoring target
- **AND** it SHALL preserve neutral guidance about deferring concrete downstream eval case authoring

### Requirement: Trigger briefs freeze repo-required skill metadata
The `skill-contract-forge` core contract MUST require trigger-path Eval Briefs to freeze the canonical skill metadata that downstream `SKILL.md` frontmatter needs today.

#### Scenario: New-skill trigger output is produced
- **WHEN** `skill-contract-forge` returns a trigger-path Eval Brief for a new skill
- **THEN** the payload SHALL include `skill.name`
- **AND** it SHALL include `skill.description`
- **AND** it SHALL keep that metadata inside the engine-neutral brief payload rather than delegating it to downstream runtime-specific instructions

#### Scenario: Existing-skill refactor or rewrite output is produced
- **WHEN** `skill-contract-forge` returns a trigger-path Eval Brief for `existing-skill-refactor` or `skill-rewrite`
- **THEN** the payload SHALL still include the canonical `skill.description`
- **AND** it SHALL NOT assume downstream implementation can recover that description from the current repository state without the brief freezing it explicitly

### Requirement: Trigger briefs freeze the minimal package shape
The `skill-contract-forge` core contract MUST require trigger-path Eval Briefs to freeze the minimal package shape that downstream implementation should materialize.

#### Scenario: Trigger output defaults to a shallow package
- **WHEN** `skill-contract-forge` returns a trigger-path Eval Brief
- **THEN** the payload SHALL include `authoring.packageShape.requiredFiles`
- **AND** `requiredFiles` SHALL include `SKILL.md`
- **AND** the payload SHALL include `authoring.packageShape.supportFolders`
- **AND** support folders SHALL default to the minimal justified subset rather than a scaffold-by-default list

#### Scenario: Trigger output selects support folders by content role
- **WHEN** `skill-contract-forge` freezes a trigger-path brief
- **THEN** it SHALL keep core trigger and procedure content in `SKILL.md`
- **AND** it SHALL reserve `references` for consultation material, `scripts` for repetitive or fragile logic, and `assets` for templates or output resources
- **AND** it SHALL NOT introduce support folders that the request does not justify

#### Scenario: Trigger output includes agents only when interface metadata is frozen
- **WHEN** `skill-contract-forge` returns a trigger-path Eval Brief whose `authoring.packageShape.supportFolders` includes `agents`
- **THEN** the payload SHALL also include `authoring.interface.display_name`
- **AND** it SHALL include `authoring.interface.short_description`
- **AND** it SHALL include `authoring.interface.default_prompt`
- **AND** it SHALL NOT assume downstream implementation can invent that interface later

