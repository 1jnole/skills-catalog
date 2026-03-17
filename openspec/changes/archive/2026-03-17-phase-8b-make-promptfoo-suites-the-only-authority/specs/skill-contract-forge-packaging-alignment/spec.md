## MODIFIED Requirements

### Requirement: `skill-contract-forge` stays a single portable skill package

`skill-contract-forge` MUST remain one portable skill package with a normative `SKILL.md` and optional nearby support files, without owning an active eval-authoring source for the supported Promptfoo suites.

#### Scenario: Skill package is reviewed after Promptfoo-native authority is fixed

- **WHEN** `packs/core/skill-contract-forge/` is reviewed
- **THEN** `SKILL.md` SHALL remain the always-loaded contract for the skill
- **AND** the package SHALL NOT be documented as the active source of truth for `skill-contract-forge` eval cases
- **AND** the package SHALL NOT add Promptfoo runtime configs, providers, fixtures, generated outputs, sync tooling, or a local eval runner

### Requirement: Eval runtime remains outside the skill package

The repository-wide Promptfoo runtime boundary for `skill-contract-forge` MUST remain under `evals/`.

#### Scenario: Skill package is reviewed for runtime ownership drift

- **WHEN** the package structure is reviewed after Promptfoo-native authority is fixed
- **THEN** Promptfoo suites, prompts, providers, fixtures, and generated outputs SHALL remain outside `packs/core/skill-contract-forge/`
- **AND** the package SHALL NOT absorb runtime execution or suite-authoring responsibilities
