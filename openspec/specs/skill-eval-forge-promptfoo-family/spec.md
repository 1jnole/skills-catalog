# skill-eval-forge-promptfoo-family Specification

## Purpose
TBD - created by archiving change add-skill-eval-forge-promptfoo-family. Update Purpose after archive.
## Requirements
### Requirement: `skill-eval-forge` has a direct Promptfoo family

The repository SHALL provide a direct Promptfoo family for `skill-eval-forge` under `evals/engines/promptfoo/skill-eval-forge/`.

#### Scenario: The family is reviewed

- **WHEN** the Promptfoo topology is inspected after this change
- **THEN** `skill-eval-forge` SHALL live under `evals/engines/promptfoo/skill-eval-forge/`
- **AND** it SHALL expose `promptfooconfig.yaml`, `promptfooconfig.uplift.with-skill.yaml`, and `promptfooconfig.uplift.without-skill.yaml`
- **AND** it SHALL keep prompts and tests local to that family

### Requirement: The family checks eval-authoring behavior without phrasing lock-in

The `skill-eval-forge` Promptfoo family SHALL test the eval-authoring boundary described by `packs/core/skill-eval-forge/SKILL.md` and SHALL validate boundary behavior semantically rather than by requiring exact wording.

#### Scenario: Baseline avoids skill-owned markers without policing generic stop wording

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml` is reviewed
- **THEN** its load-bearing negative assertions SHALL reject `Skill eval ready` and skill-owned contract phrasing
- **AND** it SHALL NOT require generic phrases like `stop and ask` or `stop-and-ask` to be absent when those phrases are not acting as the skill-owned response envelope

### Requirement: `skill-eval-forge` family is config-local in v1

The initial Promptfoo family for `skill-eval-forge` SHALL support direct config validation and live execution without introducing replay fixtures or expanding the supported public npm command surface by default.

#### Scenario: Runtime docs are reviewed

- **WHEN** `evals/README.md` and `evals/engines/promptfoo/README.md` are reviewed together
- **THEN** they SHALL describe `skill-eval-forge` as a direct Promptfoo family with config-local entrypoints
- **AND** they SHALL state that the family is not yet part of the supported public npm command surface
- **AND** they SHALL NOT claim that `skill-eval-forge` already has maintained offline replay fixtures unless those fixtures are added in a later change

### Requirement: The family enforces portable eval-authoring authority
The maintained `skill-eval-forge` Promptfoo family SHALL verify that eval-authoring behavior depends on the approved brief artifact, the existing implementation, and active eval context rather than on auxiliary local authoring refs.

#### Scenario: Contract and implementation authority are sufficient without auxiliary refs
- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml` includes an eval-authoring request with an inspectable approved brief artifact, inspectable implementation, and inspectable active eval context
- **AND** the request does not rely on auxiliary repo-local authoring refs
- **THEN** the expected behavior SHALL remain trigger-path compatible
- **AND** it SHALL keep `Skill eval ready` exclusive to valid trigger-path completion

#### Scenario: Family rejects auxiliary-ref-dependent eval authority
- **WHEN** the maintained contract or uplift suite includes an eval-authoring request that depends on auxiliary repo-local authoring refs not required by the approved brief or implemented package
- **THEN** the expected behavior SHALL reject that dependency
- **AND** it SHALL require portable downstream authority instead

