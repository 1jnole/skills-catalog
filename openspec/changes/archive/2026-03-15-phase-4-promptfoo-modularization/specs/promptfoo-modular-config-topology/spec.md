## ADDED Requirements

### Requirement: Promptfoo entrypoints have a single clear purpose
The supported Promptfoo configs for `skill-forge` MUST each represent one explicit execution role.

#### Scenario: Promptfoo configs are reviewed
- **WHEN** the three supported Promptfoo config files are inspected
- **THEN** `promptfooconfig.yaml` SHALL identify the canonical contract gate
- **AND** the uplift configs SHALL identify comparative uplift execution for their respective prompt modes

### Requirement: Promptfoo modular topology is documented without unnecessary indirection
The Promptfoo engine documentation MUST describe prompts, tests, and providers as separate responsibility areas and MUST NOT add shared defaults files unless they provide clear value.

#### Scenario: Engine README is reviewed
- **WHEN** `evals/engines/promptfoo/README.md` is read
- **THEN** it SHALL describe the topology of `prompts/`, `tests/`, and `providers/`
- **AND** it SHALL explain whether `tests/defaults.yaml` is intentionally absent or present
