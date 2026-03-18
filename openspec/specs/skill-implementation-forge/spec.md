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

#### Scenario: Missing or ambiguous contract

- **WHEN** the request does not provide a frozen contract, or the contract is ambiguous or not specific enough to implement safely
- **THEN** the skill SHALL stop and ask for clarification instead of inventing missing boundaries

#### Scenario: Deictic target reference without stable identification

- **WHEN** the request uses phrases such as `implement this skill`, `refactor this skill`, `rewrite the current skill`, or `build the next skill` without clearly identifying the target skill
- **THEN** the skill SHALL stop and ask rather than infer the target from weak context

### Requirement: The skill package does not own Promptfoo runtime assets

The `skill-implementation-forge` package SHALL remain a shallow skill package and SHALL NOT absorb Promptfoo-native eval or runtime assets.

#### Scenario: Package structure is reviewed

- **WHEN** `packs/core/skill-implementation-forge/` is reviewed
- **THEN** the package SHALL NOT include an `evals/` subtree
- **AND** it SHALL NOT add Promptfoo configs, provider adapters, fixtures, generated outputs, or shared eval runner tooling

