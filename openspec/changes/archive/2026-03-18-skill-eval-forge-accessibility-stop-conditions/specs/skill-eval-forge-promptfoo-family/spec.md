## MODIFIED Requirements

### Requirement: The family checks eval-authoring behavior without phrasing lock-in

The `skill-eval-forge` Promptfoo family SHALL test the eval-authoring boundary described by `packs/core/skill-eval-forge/SKILL.md` and SHALL validate boundary behavior semantically rather than by requiring exact wording.

#### Scenario: Operational accessibility is insufficient

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml` is reviewed for stop-and-ask paths
- **THEN** it SHALL cover cases where the contract authority, implementation authority, or active Promptfoo context is not accessible enough to proceed safely
- **AND** it SHALL accept prudent requests for the missing operational detail without requiring exact stop-and-ask phrasing
