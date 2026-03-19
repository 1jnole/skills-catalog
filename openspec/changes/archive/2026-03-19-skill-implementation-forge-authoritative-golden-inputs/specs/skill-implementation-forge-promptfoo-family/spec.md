## MODIFIED Requirements

### Requirement: Contract and uplift suites stay semantically aligned

The contract and uplift suites for `skill-implementation-forge` SHALL describe the same implementation-precondition boundary for authoritative contract delivery, including a real positive trigger path when authority is operationally available.

#### Scenario: Shared artifact-mentioned-only case exists in both suites

- **WHEN** the same case appears in `contract.yaml` and `uplift.yaml`
- **THEN** its description, `case_id`, prompt semantics, and expected stop SHALL remain aligned around clarification rather than silent implementation success

#### Scenario: Shared authoritative trigger case exists in both suites

- **WHEN** a positive real case appears in `contract.yaml` and `uplift.yaml`
- **THEN** it SHALL identify one explicit target skill plus a concrete authoritative repo-local contract artifact
- **AND** it SHALL require in-scope implementation behavior ending with `Skill implementation ready`
- **AND** it SHALL use deterministic assertions without depending on verbatim path echo

### Requirement: Without-skill baseline remains informational

The `uplift.without-skill.yaml` suite SHALL remain an informational baseline and SHALL NOT impersonate `skill-implementation-forge` behavior while still staying readable against the with-skill cases, including the real positive trigger path.

#### Scenario: Informational baseline mirrors renamed clarification cases

- **WHEN** the contract and uplift suites rename "artifact mentioned only" cases
- **THEN** the without-skill baseline SHALL mirror those case names and prompt semantics where applicable
- **AND** it SHALL continue asserting absence of `Skill implementation ready`
- **AND** it SHALL remain informational rather than a skill-behavior gate

#### Scenario: Informational baseline mirrors the authoritative trigger case

- **WHEN** the maintained suites include a real positive trigger case with authoritative repo-local inputs
- **THEN** `uplift.without-skill.yaml` SHALL mirror the same `case_id`, description, and prompt semantics
- **AND** it SHALL remain baseline-only rather than triggering implementation completion
- **AND** it SHALL assert absence of `Skill implementation ready` and other skill-owned boundary language
