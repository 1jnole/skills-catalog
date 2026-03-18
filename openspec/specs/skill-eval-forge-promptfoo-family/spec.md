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

#### Scenario: Comparative uplift tracks the highest-signal guardrails

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml` is reviewed
- **THEN** it SHALL measure comparative improvement on the most important skill-owned guardrails rather than only the original trigger and missing-input set
- **AND** it SHALL remain lighter than the contract gate

#### Scenario: The baseline does not impersonate the active skill-owned boundary

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml` is reviewed
- **THEN** it SHALL keep `without_skill` informational and baseline-shaped
- **AND** it SHALL encode comparative checks against terminal markers, repo-local boundary framing, and skill-owned stop rules presented as if the local skill were active
- **AND** live evidence MAY remain red until the comparative grading is strong enough to catch those impersonation patterns without prompt-side policy

### Requirement: `skill-eval-forge` family is config-local in v1

The initial Promptfoo family for `skill-eval-forge` SHALL support direct config validation and live execution without introducing replay fixtures or expanding the supported public npm command surface by default.

#### Scenario: Runtime docs are reviewed

- **WHEN** `evals/README.md` and `evals/engines/promptfoo/README.md` are reviewed together
- **THEN** they SHALL describe `skill-eval-forge` as a direct Promptfoo family with config-local entrypoints
- **AND** they SHALL state that the family is not yet part of the supported public npm command surface
- **AND** they SHALL NOT claim that `skill-eval-forge` already has maintained offline replay fixtures unless those fixtures are added in a later change

