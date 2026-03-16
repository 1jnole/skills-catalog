# skill-contract-forge-contract-gate Specification

## Purpose
Define the canonical Promptfoo gate for `skill-contract-forge` as a contract-only execution path.
## Requirements
### Requirement: Canonical Promptfoo gate is contractual
The canonical Promptfoo config for `skill-contract-forge` MUST represent only the contractual gate with the skill active.

#### Scenario: Canonical config is inspected
- **WHEN** `evals/engines/promptfoo/promptfooconfig.yaml` is read
- **THEN** it SHALL define only the `with_skill` prompt path
- **AND** it SHALL point to `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`

### Requirement: Contractual suite has an explicit source of truth
The active contractual Promptfoo suite for `skill-contract-forge` MUST live in a dedicated file.

#### Scenario: Contract suite is reviewed
- **WHEN** the supported contractual suite is reviewed
- **THEN** it SHALL exist at `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- **AND** the previous mixed suite entrypoint SHALL NOT remain as a second canonical source
