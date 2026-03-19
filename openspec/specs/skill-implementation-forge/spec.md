# skill-implementation-forge Specification

## Purpose
TBD - created by archiving change add-skill-implementation-forge. Update Purpose after archive.
## Requirements
### Requirement: `skill-implementation-forge` exists as the implementation-phase core skill

The repository SHALL provide `skill-implementation-forge` as a portable core skill package that owns only the implementation phase after a contract has already been frozen.

#### Scenario: Core pack is reviewed after the skill lands

- **WHEN** `packs/core/skill-implementation-forge/` is reviewed
- **THEN** the package SHALL contain a normative `SKILL.md`
- **AND** the skill SHALL describe a single job of implementing or refactoring one named skill from an already approved contract
- **AND** the skill SHALL stop at the exact marker `Skill implementation ready`

### Requirement: The skill is contract-driven and refuses hidden widening

`skill-implementation-forge` SHALL treat an approved contract artifact as the authoritative implementation input and SHALL refuse to redefine the contract or absorb downstream eval/runtime work.

#### Scenario: Implementation request is in scope

- **WHEN** a request provides a frozen contract for one named target skill
- **THEN** the skill SHALL stay within contract-driven implementation
- **AND** it SHALL allow `SKILL.md` plus nearby support files only when the frozen contract explicitly requires them

#### Scenario: Request widens into contract or eval work

- **WHEN** a request asks to renegotiate the contract, author Promptfoo-native evals, or change eval runtime architecture as part of the same step
- **THEN** the skill SHALL treat that widening as out of scope or stop-and-ask rather than silently absorbing it

### Requirement: Missing contract and deictic targets trigger clarification

`skill-implementation-forge` SHALL require both an authoritative contract artifact and a clearly identified target skill before implementation begins.

#### Scenario: Mentioned contract artifact is not actually provided

- **WHEN** a request says there is an approved contract artifact or frozen brief but does not actually provide the artifact or a concrete authoritative path
- **THEN** the skill SHALL stop and ask for the real artifact instead of treating the mention alone as sufficient authority

### Requirement: The skill package does not own Promptfoo runtime assets

The `skill-implementation-forge` package SHALL remain a shallow skill package and SHALL NOT absorb Promptfoo-native eval or runtime assets.

#### Scenario: Package structure is reviewed

- **WHEN** `packs/core/skill-implementation-forge/` is reviewed
- **THEN** the package SHALL NOT include an `evals/` subtree
- **AND** it SHALL NOT add Promptfoo configs, provider adapters, fixtures, generated outputs, or shared eval runner tooling

