## ADDED Requirements

### Requirement: Canonical skill suite in the new scaffold

The repository SHALL provide a canonical `skill-forge` eval-definition file under `evals/cases/skill-forge/` so the Promptfoo-based flow can load useful cases without depending on `packs/core/skill-forge/evals/evals.json` as its primary input.

#### Scenario: Maintainer runs the new-scaffold suite
- **WHEN** a maintainer resolves the default Promptfoo suite for `skill-forge`
- **THEN** the path MUST point to the canonical suite file under `evals/cases/skill-forge/`
- **AND** the suite MUST contain the useful migrated `golden` and `negative` cases needed for the main `skill-forge` flow

### Requirement: Fixture ownership is explicit for the migrated suite

The repository SHALL document the fixture story for the canonical `skill-forge` suite in the new scaffold, including when no dedicated external fixture files are required.

#### Scenario: Maintainer inspects the new fixture path
- **WHEN** a maintainer reads `evals/fixtures/skill-forge/`
- **THEN** the docs MUST explain whether the canonical suite uses external files
- **AND** they MUST avoid implying dependence on the inherited `packs/core/<skill>/evals/files/` layout when no such files are needed
