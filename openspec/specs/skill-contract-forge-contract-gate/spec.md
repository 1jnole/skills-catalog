# skill-contract-forge-contract-gate Specification

## Purpose
Define the canonical Promptfoo gate for `skill-contract-forge` as a contract-only execution path.
## Requirements
### Requirement: Canonical Promptfoo gate is contractual
The canonical Promptfoo config for `skill-contract-forge` MUST remain a hard contract gate even after the skill package moves supportive material into `references/`.

#### Scenario: Packaging refactor changes live trigger behavior
- **WHEN** `packs/core/skill-contract-forge/SKILL.md` is refactored for progressive disclosure
- **THEN** the repository SHALL recover live `contract` behavior so trigger, non-trigger, and stop-and-ask cases still satisfy the intended contract gate
- **AND** the recovery SHALL NOT depend on widening the contract to accept previously invalid output shapes

### Requirement: Contractual suite has an explicit source of truth

The active contractual Promptfoo suite for `skill-contract-forge` MUST live in a dedicated file and MUST emit interpretable metrics for critical contract dimensions.

#### Scenario: Contract suite is reviewed

- **WHEN** the supported contractual suite is reviewed
- **THEN** it SHALL exist at `evals/engines/promptfoo/skill-contract-forge/tests/contract.yaml`
- **AND** the previous flat root entrypoint SHALL NOT remain as a second canonical source

