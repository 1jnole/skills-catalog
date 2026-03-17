# skill-contract-forge-dataset-maintenance Specification

## Purpose
TBD - created by archiving change phase-6c-define-dataset-maintenance-criteria. Update Purpose after archive.
## Requirements
### Requirement: skill-contract-forge case admission is explicit

The repository MUST document explicit admission criteria for new canonical `skill-contract-forge` cases next to the active skill-local authoring source.

#### Scenario: A maintainer considers adding a new case

- **WHEN** the `skill-contract-forge` eval authoring docs are reviewed
- **THEN** they SHALL identify `packs/core/skill-contract-forge/evals/evals.json` as the active authoring source
- **AND** they SHALL reject decorative or non-informative prompt growth

### Requirement: skill-contract-forge case pruning and movement is explicit

The repository MUST document when an existing canonical case should be removed, fused, moved between runtime surfaces, or downgraded out of the active authoring source.

#### Scenario: A maintainer reviews low-signal or duplicate coverage

- **WHEN** the active `skill-contract-forge` maintenance docs are reviewed
- **THEN** they SHALL describe when to remove, fuse, move, or downgrade a case in `packs/core/skill-contract-forge/evals/evals.json`
- **AND** they SHALL NOT present `evals/cases/skill-contract-forge/suite.v1.json` as an active canonical dataset

### Requirement: skill-contract-forge dataset evolution follows a short operational workflow
The repository MUST document a short workflow for evolving the `skill-contract-forge` dataset.

#### Scenario: A maintainer responds to a newly observed failure family
- **WHEN** the local `skill-contract-forge` maintenance workflow is followed
- **THEN** it SHALL describe the progression from observed failure to rerun and signal check

### Requirement: skill-contract-forge maintenance defines a stopping point
The repository MUST define when the canonical `skill-contract-forge` dataset is sufficiently good for daily work.

#### Scenario: A maintainer evaluates whether to keep expanding coverage
- **WHEN** the local `skill-contract-forge` maintenance rules are reviewed
- **THEN** they SHALL define when additional cases have low enough marginal value to stop routine expansion

