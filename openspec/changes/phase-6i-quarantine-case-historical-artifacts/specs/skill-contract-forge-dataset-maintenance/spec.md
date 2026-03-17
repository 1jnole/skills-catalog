# skill-contract-forge-dataset-maintenance Specification

## MODIFIED Requirements

### Requirement: skill-contract-forge case pruning and movement is explicit
The repository MUST distinguish the canonical `skill-contract-forge` authoring surface from historical pilot and manual-audit case materials.

#### Scenario: A maintainer reviews local case artifacts
- **WHEN** the local `skill-contract-forge` case files and docs are reviewed
- **THEN** `evals/cases/skill-contract-forge/suite.v1.json` SHALL remain the active local authoring contract
- **AND** historical pilot or manual-audit files SHALL live outside the active `evals/cases/skill-contract-forge/` surface
- **AND** nearby docs SHALL label those historical files as quarantined context rather than active authoring inputs
