## ADDED Requirements

### Requirement: `skill-eval-forge` has a direct Promptfoo family

The repository SHALL provide a direct Promptfoo family for `skill-eval-forge` under `evals/engines/promptfoo/skill-eval-forge/`.

#### Scenario: The family is reviewed

- **WHEN** the Promptfoo topology is inspected after this change
- **THEN** `skill-eval-forge` SHALL live under `evals/engines/promptfoo/skill-eval-forge/`
- **AND** it SHALL expose `promptfooconfig.yaml`, `promptfooconfig.uplift.with-skill.yaml`, and `promptfooconfig.uplift.without-skill.yaml`
- **AND** it SHALL keep prompts and tests local to that family

### Requirement: The family checks eval-authoring behavior without phrasing lock-in

The `skill-eval-forge` Promptfoo family SHALL test the eval-authoring boundary described by `packs/core/skill-eval-forge/SKILL.md` and SHALL validate boundary behavior semantically rather than by requiring exact wording.

#### Scenario: Contract surface is reviewed

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml` is reviewed
- **THEN** it SHALL require one named target skill, contract authority, and implementation preconditions on trigger paths
- **AND** it SHALL reject contract authoring, skill implementation, and runtime-redesign requests as out of scope or stop-and-ask
- **AND** it SHALL treat `Skill eval ready` as the terminal marker for in-scope trigger paths

### Requirement: `skill-eval-forge` family is config-local in v1

The initial Promptfoo family for `skill-eval-forge` SHALL support direct config validation and live execution without introducing replay fixtures or expanding the supported public npm command surface by default.

#### Scenario: Runtime docs are reviewed

- **WHEN** `evals/README.md` and `evals/engines/promptfoo/README.md` are reviewed together
- **THEN** they SHALL describe `skill-eval-forge` as a direct Promptfoo family with config-local entrypoints
- **AND** they SHALL state that the family is not yet part of the supported public npm command surface
- **AND** they SHALL NOT claim that `skill-eval-forge` already has maintained offline replay fixtures unless those fixtures are added in a later change
