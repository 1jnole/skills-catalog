## MODIFIED Requirements

### Requirement: skill-contract-forge case admission is explicit

The repository MUST document explicit admission criteria for new canonical `skill-contract-forge` cases next to the active Promptfoo-native suites.

#### Scenario: A maintainer considers adding a new case

- **WHEN** the `skill-contract-forge` eval authoring docs are reviewed
- **THEN** they SHALL identify the three Promptfoo-native suites under `evals/engines/promptfoo/tests/` as the active case-definition authority
- **AND** they SHALL reject decorative or non-informative prompt growth
- **AND** active example targets SHALL refer only to currently supported skills or generic domains, not removed legacy skills
