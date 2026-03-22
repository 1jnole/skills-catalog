## ADDED Requirements

### Requirement: `low-token-execution` has a maintained Promptfoo-native family

The repository SHALL provide a Promptfoo-native eval family for `low-token-execution` under the active eval runtime boundary in `evals/engines/promptfoo/`.

#### Scenario: Contract entrypoint exists

- **WHEN** the family is reviewed in the active eval runtime boundary
- **THEN** it SHALL provide a `contract` entrypoint for `low-token-execution`
- **AND** that entrypoint SHALL remain the authoritative gate for trigger, `non-trigger`, `stop-and-ask`, and terminal-marker behavior

#### Scenario: Comparative uplift entrypoint exists

- **WHEN** the family is reviewed
- **THEN** it SHALL provide an `uplift.with-skill` entrypoint
- **AND** that entrypoint SHALL stay lighter than the contract gate instead of duplicating it

#### Scenario: Informational baseline entrypoint exists

- **WHEN** the family is reviewed
- **THEN** it SHALL provide an `uplift.without-skill` entrypoint
- **AND** that entrypoint SHALL stay baseline-only rather than impersonating the skill boundary

### Requirement: The family remains aligned to the approved skill contract

The repository SHALL keep the Promptfoo-native family for `low-token-execution` aligned to the approved contract and the existing implementation rather than to ad hoc workflow preferences.

#### Scenario: Trigger behavior reflects bounded compact execution

- **WHEN** a request is primarily one bounded multi-step unit with freezeable `done`
- **THEN** the family SHALL treat that as trigger behavior for `low-token-execution`
- **AND** successful trigger-path completion SHALL preserve the exclusive marker `Execution compacted`

#### Scenario: Trivial or review-first work stays out of trigger scope

- **WHEN** a request is trivial or the primary job is deep review rather than bounded execution
- **THEN** the family SHALL verify `non-trigger` behavior rather than forcing compact-execution routing

#### Scenario: Missing stability still stops and asks

- **WHEN** the primary job remains execution but the unit, success criteria, or strategy choice is not stable enough to freeze safely
- **THEN** the family SHALL verify `stop-and-ask` behavior rather than inventing a stable path

### Requirement: Dogfooding remains supplemental

The repository MAY use lightweight dogfooding while authoring the family, but SHALL keep contractual authority in the approved contract and implementation of `low-token-execution`.

#### Scenario: Dogfooding informs but does not override assertions

- **WHEN** authoring or reviewing the family draws on real usage of `low-token-execution`
- **THEN** those cases SHALL still trace back to the approved contract and existing implementation
- **AND** the family SHALL NOT relax routing or boundary assertions only because a response feels practically useful
