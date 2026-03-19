## MODIFIED Requirements

### Requirement: Contractual suite has an explicit source of truth

The active contractual Promptfoo suite for `skill-contract-forge` MUST live in a dedicated file and MUST emit interpretable metrics for critical contract dimensions.

#### Scenario: Contract suite is reviewed

- **WHEN** the supported contractual suite is reviewed
- **THEN** it SHALL exist at `evals/engines/promptfoo/skill-contract-forge/tests/contract.yaml`
- **AND** the previous flat root entrypoint SHALL NOT remain as a second canonical source
