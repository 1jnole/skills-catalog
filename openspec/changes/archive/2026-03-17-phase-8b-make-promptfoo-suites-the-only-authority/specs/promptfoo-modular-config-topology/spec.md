## MODIFIED Requirements

### Requirement: Promptfoo entrypoints have a single clear purpose

The supported Promptfoo configs for `skill-contract-forge` MUST each represent one explicit execution role, and their suite files SHALL be authored directly in the Promptfoo-native suite files without repo-owned projection tooling.

#### Scenario: Promptfoo topology is reviewed after Promptfoo-native authority is fixed

- **WHEN** the supported Promptfoo config files and test suites are inspected
- **THEN** `promptfooconfig.yaml` SHALL remain the canonical contract gate
- **AND** the uplift configs SHALL remain separate comparative entrypoints
- **AND** the supported flow SHALL author cases directly in the three Promptfoo-native suite files
- **AND** the repository SHALL NOT require sync/check tooling to project `skill-contract-forge` cases into those suites

### Requirement: Promptfoo modular topology is documented without unnecessary indirection

The Promptfoo engine documentation MUST describe prompts, tests, and providers as separate responsibility areas and MUST NOT present sync or projection tooling as part of the supported `skill-contract-forge` flow.

#### Scenario: Engine README is reviewed after Promptfoo-native authority is fixed

- **WHEN** `evals/engines/promptfoo/README.md` is read
- **THEN** it SHALL identify Promptfoo itself as the only runtime execution boundary
- **AND** it SHALL NOT describe sync/check commands as part of the supported maintenance flow for `skill-contract-forge`
