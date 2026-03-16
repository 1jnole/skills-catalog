# skill-contract-forge-dataset-maintenance Specification

## Purpose
TBD - created by archiving change phase-6c-define-dataset-maintenance-criteria. Update Purpose after archive.
## Requirements
### Requirement: skill-contract-forge case admission is explicit
The repository MUST document explicit admission criteria for new `skill-contract-forge` canonical cases.

#### Scenario: A maintainer considers adding a new case
- **WHEN** the local `skill-contract-forge` case docs are reviewed
- **THEN** they SHALL describe when a new case is worth adding
- **AND** they SHALL reject decorative or non-informative prompt growth

### Requirement: skill-contract-forge case pruning and movement is explicit
The repository MUST document when an existing `skill-contract-forge` case should be pruned, fused, moved between suites, or downgraded out of the canonical surface.

#### Scenario: A maintainer reviews low-signal or duplicate coverage
- **WHEN** the local `skill-contract-forge` case docs are reviewed
- **THEN** they SHALL describe when to remove, fuse, move, or downgrade a case

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

