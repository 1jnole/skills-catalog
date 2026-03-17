## MODIFIED Requirements

### Requirement: Promptfoo entrypoints have a single clear purpose

The supported Promptfoo configs for `skill-contract-forge` MUST each represent one explicit execution role, and their suite files SHALL be authored directly in the Promptfoo-native suite files without repo-owned projection tooling.

#### Scenario: Promptfoo topology is reviewed after the cleanup slug lands

- **WHEN** the supported Promptfoo config files and test suites are inspected
- **THEN** `promptfooconfig.yaml` SHALL remain the canonical contract gate
- **AND** the uplift configs SHALL remain separate comparative entrypoints
- **AND** the repository SHALL NOT ship `promptfoo:sync`, `promptfoo:sync:check`, or equivalent `skill-contract-forge` sync tooling

### Requirement: Promptfoo modular topology is documented without unnecessary indirection

The Promptfoo engine documentation MUST describe prompts, tests, and providers as separate responsibility areas and MUST NOT present sync or projection tooling as part of the supported `skill-contract-forge` flow.

#### Scenario: Engine README is reviewed after the cleanup slug lands

- **WHEN** `evals/engines/promptfoo/README.md` is read
- **THEN** it SHALL identify Promptfoo itself as the only runtime execution boundary
- **AND** it SHALL NOT describe sync/check commands as available or required for `skill-contract-forge`
