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

### Requirement: Packaged support assets avoid retired eval-authoring targets
Support assets shipped inside `packs/core/skill-contract-forge/assets/` MUST reinforce the supported Promptfoo-native boundary without teaching retired `skill-contract-forge` eval-authoring files or local eval subtrees.

#### Scenario: Packaged support assets are reviewed
- **WHEN** maintained support assets under `packs/core/skill-contract-forge/assets/` are reviewed
- **THEN** they SHALL NOT instruct maintainers to turn those artifacts into `evals.json`
- **AND** they SHALL NOT imply that `packs/core/skill-contract-forge/` owns the active downstream eval-authoring surface
- **AND** they SHALL preserve the package boundary where runtime configs and case-authoring authority live under `evals/`

### Requirement: Maintained support assets are explicitly routed from the normative contract

Maintained support assets inside `packs/core/skill-contract-forge/assets/` SHALL remain discoverable from `SKILL.md` through explicit forward-slash relative-path instructions at the decision points where those assets matter.

#### Scenario: Trigger-path brief structure needs the packaged JSON template

- **WHEN** `packs/core/skill-contract-forge/SKILL.md` instructs the agent to emit trigger-path Eval Brief JSON
- **THEN** it SHALL direct the agent to `assets/eval-brief.template.json` using a forward-slash relative path
- **AND** it SHALL do so before or at the point where the skill freezes the trigger-path JSON payload

#### Scenario: Reusable wording templates remain packaged but not hidden

- **WHEN** maintained wording templates such as `assets/skill-template.job.md` or `assets/skill-template.guardrail.md` remain in the package
- **THEN** `packs/core/skill-contract-forge/SKILL.md` SHALL state when they may be consulted
- **AND** it SHALL treat them as optional support assets rather than as hidden knowledge the agent is expected to discover implicitly

