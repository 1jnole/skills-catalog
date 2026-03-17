## MODIFIED Requirements

### Requirement: Legacy engine support stays outside the active runtime surface

The supported `skill-contract-forge` Promptfoo runtime MUST keep retired engine helpers and retired pilot replay artifacts out of the active engine support and fixture folders, and the repository MAY remove those historical files from the active repo tree entirely.

#### Scenario: Historical engine support is retained or purged

- **WHEN** the repository reviews `assertions.cjs` or `pilot-model-outputs.json` after the Promptfoo-native migration
- **THEN** those files SHALL NOT live under `evals/engines/promptfoo/support/` or `evals/engines/promptfoo/fixtures/`
- **AND** they MAY be removed from the active repository tree instead of being kept in an in-repo quarantine location
- **AND** active docs SHALL NOT treat them as part of the supported runtime surface
