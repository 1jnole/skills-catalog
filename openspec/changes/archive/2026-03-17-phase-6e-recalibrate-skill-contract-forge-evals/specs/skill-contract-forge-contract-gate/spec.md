## MODIFIED Requirements

### Requirement: Canonical Promptfoo gate is contractual
The canonical Promptfoo config for `skill-contract-forge` MUST remain a hard contract gate even after the skill package moves supportive material into `references/`.

#### Scenario: Packaging refactor changes live trigger behavior
- **WHEN** `packs/core/skill-contract-forge/SKILL.md` is refactored for progressive disclosure
- **THEN** the repository SHALL recover live `contract` behavior so trigger, non-trigger, and stop-and-ask cases still satisfy the intended contract gate
- **AND** the recovery SHALL NOT depend on widening the contract to accept previously invalid output shapes
