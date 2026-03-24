## ADDED Requirements

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
