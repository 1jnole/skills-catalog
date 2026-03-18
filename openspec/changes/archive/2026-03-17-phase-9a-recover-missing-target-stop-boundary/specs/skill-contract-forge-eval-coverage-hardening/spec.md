## MODIFIED Requirements

### Requirement: High-signal routing boundaries are covered
The supported hardened suite MUST include explicit coverage for key routing boundaries that are known regression risks.

#### Scenario: Ambiguous skill-refactor request is evaluated
- **WHEN** a request does not identify a clear skill target or clear authoring boundary
- **THEN** the hardened suite SHALL verify that the case is treated as stop-and-ask

#### Scenario: Deictic refactor or rewrite wording does not identify a target skill
- **WHEN** a refactor or rewrite request uses phrases such as `this skill`, `the current skill`, `rewrite this`, or similar deictic wording without naming the existing target skill
- **THEN** the supported `skill-contract-forge` contract SHALL treat that request as `Classification: stop-and-ask`
- **AND** it SHALL NOT infer the target skill from repository, folder, or active-skill context alone
