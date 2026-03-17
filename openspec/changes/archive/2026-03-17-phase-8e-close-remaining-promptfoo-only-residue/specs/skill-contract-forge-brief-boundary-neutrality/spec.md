## ADDED Requirements

### Requirement: Active authoring templates remain engine-neutral
The maintained `skill-contract-forge` authoring templates MUST keep the brief boundary engine-neutral and MUST NOT instruct maintainers to convert those artifacts into retired eval-authoring files.

#### Scenario: Eval Brief template is reviewed
- **WHEN** the active Eval Brief template for `skill-contract-forge` is reviewed
- **THEN** it SHALL stop at `Eval Brief ready`
- **AND** it SHALL NOT name `evals.json` as a downstream authoring target
- **AND** it SHALL preserve neutral guidance about deferring concrete downstream eval case authoring
