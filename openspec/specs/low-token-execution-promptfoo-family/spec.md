# low-token-execution-promptfoo-family Specification

## Purpose
Define the Promptfoo-native eval family for `low-token-execution` so the skill can be verified through the repo's maintained `contract`, `uplift.with-skill`, and `uplift.without-skill` surfaces.

## Requirements
### Requirement: `low-token-execution` has a direct Promptfoo family

The repository SHALL provide a direct Promptfoo family for `low-token-execution` under `evals/engines/promptfoo/low-token-execution/`.

#### Scenario: The family is reviewed

- **WHEN** the Promptfoo topology is inspected after this change
- **THEN** `low-token-execution` SHALL live under `evals/engines/promptfoo/low-token-execution/`
- **AND** it SHALL expose `promptfooconfig.yaml`, `promptfooconfig.uplift.with-skill.yaml`, and `promptfooconfig.uplift.without-skill.yaml`
- **AND** it SHALL keep prompts and tests local to that family

### Requirement: The family checks compact-execution behavior without phrase lock-in

The `low-token-execution` Promptfoo family SHALL test the compact-execution boundary described by `packs/core/low-token-execution/SKILL.md` and SHALL validate routing and closure semantically rather than by requiring exact wording.

#### Scenario: Contract gate stays authoritative

- **WHEN** `evals/engines/promptfoo/low-token-execution/tests/contract.yaml` is reviewed
- **THEN** it SHALL remain the authoritative gate for trigger, `non-trigger`, `stop-and-ask`, and incompatible-marker behavior
- **AND** it SHALL cover bounded trigger scope, trivial non-trigger scope, unstable `done`, deictic unit ambiguity, and mixed-workflow boundary behavior

#### Scenario: Comparative uplift stays lighter than the contract gate

- **WHEN** `evals/engines/promptfoo/low-token-execution/tests/uplift.yaml` is reviewed
- **THEN** it SHALL keep only a compact set of high-signal comparative cases for trigger routing, non-trigger precedence, unstable-work stop-boundary, and terminal-marker behavior
- **AND** it SHALL remain lighter than the contract gate

#### Scenario: Baseline remains informational and anti-impersonation

- **WHEN** `evals/engines/promptfoo/low-token-execution/tests/uplift.without-skill.yaml` is reviewed
- **THEN** it SHALL keep the baseline brief and informational
- **AND** it SHALL NOT imitate the active skill boundary, repo-shaped workflow, or the exclusive marker `Execution compacted`

### Requirement: Dogfooding remains supplemental

The repository MAY use lightweight dogfooding while authoring or refining this family, but SHALL keep contractual authority in the approved `low-token-execution` contract and existing implementation.

#### Scenario: Dogfooding informs but does not override assertions

- **WHEN** real repo tasks are mirrored into Promptfoo cases for `low-token-execution`
- **THEN** those cases SHALL still trace cleanly to the approved contract and existing implementation
- **AND** the family SHALL NOT relax routing or boundary assertions only because a response feels practically useful

### Requirement: `low-token-execution` family is config-local in v1

The initial Promptfoo family for `low-token-execution` SHALL support direct config validation and live execution without introducing replay fixtures or expanding the supported public npm command surface by default.

#### Scenario: Runtime docs are reviewed

- **WHEN** `evals/README.md` and `evals/engines/promptfoo/README.md` are reviewed together
- **THEN** they SHALL describe `low-token-execution` as a direct Promptfoo family with config-local entrypoints
- **AND** they SHALL state that the family is not yet part of the supported public npm command surface
- **AND** they SHALL NOT claim that `low-token-execution` already has maintained offline replay fixtures unless those fixtures are added in a later change
