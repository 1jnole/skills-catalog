## MODIFIED Requirements

### Requirement: `skill-contract-forge` stays a single portable skill package

`skill-contract-forge` MUST remain one portable skill package with a normative `SKILL.md` and optional nearby support files, without owning an active eval-authoring source for the supported Promptfoo suites.

#### Scenario: Skill package is reviewed after the cleanup slug lands

- **WHEN** `packs/core/skill-contract-forge/` is reviewed
- **THEN** `SKILL.md` SHALL remain the always-loaded contract for the skill
- **AND** the package SHALL NOT include an `evals/` subtree for `skill-contract-forge`
- **AND** the package SHALL NOT be documented as the active source of truth for `skill-contract-forge` eval cases
- **AND** the package SHALL NOT add Promptfoo runtime configs, providers, fixtures, generated outputs, sync tooling, or a local eval runner
