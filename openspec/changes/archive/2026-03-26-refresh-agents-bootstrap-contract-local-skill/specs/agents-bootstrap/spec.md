## ADDED Requirements

### Requirement: agents-bootstrap contract refresh uses the local repo forge skill

The repository SHALL support refreshing the approved `agents-bootstrap` contract artifact from the local repo implementation of `skill-contract-forge` when later dogfooding changes materially affect package-shape guidance.

#### Scenario: Refreshed brief preserves local asset authority

- **WHEN** `agents-bootstrap` is refreshed through the contract phase after the local repo `skill-contract-forge` absorbed the asset-authority refinement
- **THEN** the refreshed approved brief SHALL preserve `assets` in `authoring.packageShape.supportFolders`
- **AND** it SHALL treat `packs/core/agents-bootstrap/assets/AGENTS.managed.md` as package-shape authority rather than decorative context
- **AND** it SHALL remain a contract-only handoff artifact
- **AND** it SHALL not depend on an unsynced Codex-home copy of `skill-contract-forge`
