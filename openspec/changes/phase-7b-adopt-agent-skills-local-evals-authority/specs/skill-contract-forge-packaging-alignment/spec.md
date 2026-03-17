## MODIFIED Requirements

### Requirement: `skill-contract-forge` stays a single portable skill package

`skill-contract-forge` MUST remain one portable skill package with a normative `SKILL.md`, optional nearby support files, and a skill-local eval authoring contract.

#### Scenario: Skill package is reviewed after eval-authoring move

- **WHEN** `packs/core/skill-contract-forge/` is reviewed
- **THEN** `SKILL.md` SHALL remain the always-loaded contract for the skill
- **AND** `packs/core/skill-contract-forge/evals/evals.json` SHALL be the canonical authoring source for this skill's eval definition
- **AND** the package SHALL NOT add Promptfoo runtime configs, providers, fixtures, generated outputs, or a local eval runner

### Requirement: Eval ownership remains outside the skill package

The repository-wide Promptfoo runtime boundary for `skill-contract-forge` MUST remain under `evals/`.

#### Scenario: Skill package is reviewed for runtime ownership drift

- **WHEN** the package structure is reviewed after the eval-authoring move
- **THEN** Promptfoo suites, prompts, providers, fixtures, and generated outputs SHALL remain outside `packs/core/skill-contract-forge/`
- **AND** the package SHALL NOT absorb runtime execution responsibilities just because it now owns `evals/evals.json`
