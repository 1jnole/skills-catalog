## MODIFIED Requirements

### Requirement: skill-contract-forge case admission is explicit

The repository MUST document explicit admission criteria for new canonical `skill-contract-forge` cases next to the active Promptfoo-native suites.

#### Scenario: A maintainer considers adding a new case

- **WHEN** the `skill-contract-forge` eval maintenance docs are reviewed
- **THEN** they SHALL identify the three Promptfoo-native suites under `evals/engines/promptfoo/tests/` as the active case-definition authority
- **AND** they SHALL reject decorative or non-informative prompt growth

### Requirement: skill-contract-forge case pruning and movement is explicit

The repository MUST distinguish the canonical `skill-contract-forge` suite-authoring surface from historical pilot and manual-audit case materials, and those historical materials MAY be removed from the active repo tree entirely once they are no longer needed.

#### Scenario: A maintainer reviews local case artifacts after cleanup

- **WHEN** the active `skill-contract-forge` case files and docs are reviewed
- **THEN** only the active Promptfoo-native suites and nearby supporting docs SHALL remain in the supported repository tree
- **AND** historical pilot or manual-audit files SHALL NOT appear under the active `evals/` tree
- **AND** nearby docs SHALL NOT present removed historical files as active or required authoring inputs
