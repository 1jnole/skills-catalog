# skill-implementation-forge-promptfoo-family Specification

## Purpose
TBD - created by archiving change normalize-skill-implementation-forge-precondition-semantics. Update Purpose after archive.
## Requirements
### Requirement: Promptfoo family honors authoritative implementation preconditions

The `skill-implementation-forge` Promptfoo family SHALL treat prompts that only mention an approved contract artifact, without actually providing an authoritative artifact, as clarification paths rather than valid implementation triggers.

#### Scenario: Artifact is mentioned but not delivered

- **WHEN** a Promptfoo test prompt says there is an approved contract artifact or frozen brief but does not include the artifact or a concrete authoritative path
- **THEN** the expected outcome SHALL be `stop_and_ask`
- **AND** the assertions SHALL require clarification language
- **AND** the assertions SHALL require the absence of `Skill implementation ready`

### Requirement: Contract and uplift suites stay semantically aligned

The contract and uplift suites for `skill-implementation-forge` SHALL describe the same precondition honesty boundary for authoritative contract delivery.

#### Scenario: Shared artifact-mentioned-only case exists in both suites

- **WHEN** the same case appears in `contract.yaml` and `uplift.yaml`
- **THEN** its description, `case_id`, prompt semantics, and expected stop SHALL remain aligned around clarification rather than silent implementation success

### Requirement: Without-skill baseline remains informational

The `uplift.without-skill.yaml` suite SHALL remain an informational baseline and SHALL NOT impersonate `skill-implementation-forge` behavior while still staying readable against the with-skill cases.

#### Scenario: Informational baseline mirrors renamed clarification cases

- **WHEN** the contract and uplift suites rename "artifact mentioned only" cases
- **THEN** the without-skill baseline SHALL mirror those case names and prompt semantics where applicable
- **AND** it SHALL continue asserting absence of `Skill implementation ready`
- **AND** it SHALL remain informational rather than a skill-behavior gate

