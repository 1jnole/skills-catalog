# skill-contract-forge-packaging-alignment Specification

## ADDED Requirements

### Requirement: `skill-contract-forge` stays a single portable skill package
`skill-contract-forge` MUST remain one skill package with a normative `SKILL.md` and optional nearby support files.

#### Scenario: Skill package is reviewed after progressive-disclosure refactor
- **WHEN** `packs/core/skill-contract-forge/` is reviewed
- **THEN** `SKILL.md` SHALL remain the always-loaded normative contract for the skill
- **AND** the package SHALL NOT split the skill into multiple child skills
- **AND** supportive material MAY live under `references/` as on-demand context

### Requirement: Supportive material is separated from the normative contract
Examples, routing expansion, and edge-case walkthroughs MUST live outside the always-loaded `SKILL.md` when they are not required to state the contract itself.

#### Scenario: Skill references are reviewed after refactor
- **WHEN** `packs/core/skill-contract-forge/SKILL.md` and `packs/core/skill-contract-forge/references/*.md` are reviewed together
- **THEN** `SKILL.md` SHALL keep purpose, scope, routing envelope, trigger rules, core operating rules, and procedure
- **AND** long examples, anti-examples, and edge-case walkthroughs SHALL live in `references/`
- **AND** `SKILL.md` SHALL point to those support files using relative paths

### Requirement: Eval ownership remains outside the skill package
The repository-wide Promptfoo runtime boundary for `skill-contract-forge` MUST remain under `evals/`.

#### Scenario: Skill package is reviewed for eval ownership drift
- **WHEN** the package structure is reviewed after the refactor
- **THEN** runtime Promptfoo suites, prompts, providers, fixtures, and generated outputs SHALL remain outside `packs/core/skill-contract-forge/`
- **AND** the packaging refactor SHALL NOT introduce a duplicate eval harness inside the skill folder
