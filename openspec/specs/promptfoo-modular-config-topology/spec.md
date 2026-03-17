# promptfoo-modular-config-topology Specification

## Purpose
Define a modular Promptfoo topology where entrypoints, prompts, tests, and providers have clear, separate responsibilities.
## Requirements
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

### Requirement: Active Promptfoo docs present one supported command surface
The maintained Promptfoo-facing docs MUST describe one consistent supported command surface for `skill-contract-forge` across root and eval READMEs without reintroducing sync or wrapper tooling.

#### Scenario: Maintained Promptfoo docs are reviewed together
- **WHEN** `README.md`, `evals/README.md`, and `evals/engines/promptfoo/README.md` are reviewed after this closeout
- **THEN** they SHALL list the supported validate, uplift validate, live replay, and offline replay commands for `skill-contract-forge`
- **AND** they SHALL identify the Promptfoo-native suites under `evals/engines/promptfoo/tests/` as the active case-definition authority for this skill
- **AND** they SHALL NOT present `promptfoo:sync`, `promptfoo:sync:check`, or equivalent wrapper tooling as part of the supported flow

