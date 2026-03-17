# skill-contract-forge-promptfoo-eval-runtime Specification

## MODIFIED Requirements

### Requirement: Runtime suite authority is explicit
The supported `skill-contract-forge` Promptfoo runtime MUST keep inherited non-authoritative suites outside the active Promptfoo tests surface.

#### Scenario: Legacy runtime suite is retained for historical reference
- **WHEN** the repository keeps the inherited `skill-contract-forge.yaml` suite for migration history
- **THEN** it SHALL live outside `evals/engines/promptfoo/tests/`
- **AND** it SHALL NOT appear as a sibling of the active `contract` and `uplift` runtime suites
- **AND** nearby docs SHALL describe it as quarantined historical material rather than supported runtime authority
