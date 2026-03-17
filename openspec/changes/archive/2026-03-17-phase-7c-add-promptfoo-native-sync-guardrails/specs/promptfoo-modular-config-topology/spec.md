## MODIFIED Requirements

### Requirement: Promptfoo entrypoints have a single clear purpose

The supported Promptfoo configs for `skill-contract-forge` MUST each represent one explicit execution role, and their suite files SHALL be generated or verified from the canonical skill-local authoring source without adding a repo-owned runtime layer.

#### Scenario: Promptfoo topology is reviewed after sync guardrails are added

- **WHEN** the supported Promptfoo config files, test suites, and sync tooling are inspected
- **THEN** `promptfooconfig.yaml` SHALL remain the canonical contract gate
- **AND** the uplift configs SHALL remain separate comparative entrypoints
- **AND** the repository MAY provide deterministic suite sync/check tooling
- **AND** that tooling SHALL project authoring data only and SHALL NOT execute Promptfoo as a wrapper runtime

### Requirement: Promptfoo modular topology is documented without unnecessary indirection

The Promptfoo engine documentation MUST describe prompts, tests, and providers as separate responsibility areas and MUST NOT present sync tooling as a second runtime.

#### Scenario: Engine README is reviewed after sync guardrails are added

- **WHEN** `evals/engines/promptfoo/README.md` is read
- **THEN** it SHALL describe any sync/check command as authoring projection or drift protection only
- **AND** it SHALL continue to identify Promptfoo itself as the only runtime execution boundary
