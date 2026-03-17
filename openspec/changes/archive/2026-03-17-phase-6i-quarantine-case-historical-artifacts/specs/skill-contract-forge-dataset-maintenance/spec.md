# skill-contract-forge-dataset-maintenance Specification

## MODIFIED Requirements

### Requirement: skill-contract-forge case pruning and movement is explicit
The repository MUST distinguish the canonical `skill-contract-forge` authoring surface from historical pilot and manual-audit case materials.

#### Scenario: A maintainer reviews local case artifacts
- **WHEN** the local `skill-contract-forge` case files and docs are reviewed
- **THEN** the then-primary case-directory authoring contract SHALL remain the only active authoring file for that phase
- **AND** historical pilot or manual-audit files SHALL live outside the active `evals/cases/skill-contract-forge/` surface
- **AND** nearby docs SHALL label those historical files as quarantined context rather than active authoring inputs
