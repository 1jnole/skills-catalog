# skill-contract-forge-packaging-alignment Specification

## Purpose
Keep `skill-contract-forge` as one portable skill package whose contract lives in `SKILL.md`, while keeping the shared Promptfoo-native eval authority outside the package.
## Requirements
### Requirement: `skill-contract-forge` stays a single portable skill package

`skill-contract-forge` MUST remain one portable skill package with a normative `SKILL.md` and optional nearby support files, without owning an active eval-authoring source for the supported Promptfoo suites.

#### Scenario: Skill package is reviewed after the cleanup slug lands

- **WHEN** `packs/core/skill-contract-forge/` is reviewed
- **THEN** `SKILL.md` SHALL remain the always-loaded contract for the skill
- **AND** the package SHALL NOT include an `evals/` subtree for `skill-contract-forge`
- **AND** the package SHALL NOT be documented as the active source of truth for `skill-contract-forge` eval cases
- **AND** the package SHALL NOT add Promptfoo runtime configs, providers, fixtures, generated outputs, sync tooling, or a local eval runner

### Requirement: Supportive material is separated from the normative contract
Examples, routing expansion, and edge-case walkthroughs MUST live outside the always-loaded `SKILL.md` when they are not required to state the contract itself.

#### Scenario: Skill references are reviewed after refactor
- **WHEN** `packs/core/skill-contract-forge/SKILL.md` and `packs/core/skill-contract-forge/references/*.md` are reviewed together
- **THEN** `SKILL.md` SHALL keep purpose, scope, routing envelope, trigger rules, core operating rules, and procedure
- **AND** long examples, anti-examples, and edge-case walkthroughs SHALL live in `references/`
- **AND** `SKILL.md` SHALL point to those support files using relative paths

### Requirement: Eval runtime remains outside the skill package

The repository-wide Promptfoo runtime boundary for `skill-contract-forge` MUST remain under `evals/`.

#### Scenario: Skill package is reviewed for runtime ownership drift

- **WHEN** the package structure is reviewed after Promptfoo-native authority is fixed
- **THEN** Promptfoo suites, prompts, providers, fixtures, and generated outputs SHALL remain outside `packs/core/skill-contract-forge/`
- **AND** the package SHALL NOT absorb runtime execution or suite-authoring responsibilities

