## ADDED Requirements

### Requirement: The family enforces portable contract handoff semantics
The maintained `skill-implementation-forge` Promptfoo family SHALL verify that implementation-from-contract behavior depends on one inspectable approved brief artifact, not on auxiliary local authoring refs.

#### Scenario: Contract gate accepts brief-only contract authority
- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml` includes an implementation-from-contract request with one inspectable approved brief artifact
- **AND** the brief carries the needed implementation boundary without auxiliary repo-local source refs
- **THEN** the expected behavior SHALL remain trigger-path compatible
- **AND** it SHALL preserve `Skill implementation ready` only after the normal validation-aware closure

#### Scenario: Contract gate rejects requests that require upstream auxiliary refs
- **WHEN** the maintained contract or uplift suite includes an implementation request whose authority depends on repo-local authoring refs that are only historically mentioned or implied
- **THEN** the expected behavior SHALL reject that dependency
- **AND** the case SHALL require the portable brief content itself rather than those auxiliary refs
