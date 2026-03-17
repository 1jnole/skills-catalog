# skill-contract-forge-dataset-maintenance Specification

## Purpose
Define how the canonical `skill-contract-forge` dataset is maintained next to the skill-local authoring source, including admission, pruning, movement, and stopping rules without reviving retired legacy datasets.
## Requirements
### Requirement: skill-contract-forge case admission is explicit

The repository MUST document explicit admission criteria for new canonical `skill-contract-forge` cases next to the active skill-local authoring source.

#### Scenario: A maintainer considers adding a new case

- **WHEN** the `skill-contract-forge` eval authoring docs are reviewed
- **THEN** they SHALL identify `packs/core/skill-contract-forge/evals/evals.json` as the active authoring source
- **AND** they SHALL reject decorative or non-informative prompt growth

### Requirement: skill-contract-forge case pruning and movement is explicit

The repository MUST distinguish the canonical `skill-contract-forge` authoring surface from historical pilot and manual-audit case materials, and those historical materials MAY be removed from the active repo tree entirely once they are no longer needed.

#### Scenario: A maintainer reviews local case artifacts after cleanup

- **WHEN** the local `skill-contract-forge` case files and docs are reviewed
- **THEN** only the active skill-local authoring contract SHALL remain in the supported repository tree
- **AND** historical pilot or manual-audit files SHALL NOT appear under the active `evals/` tree
- **AND** nearby docs SHALL NOT present removed historical files as active or required authoring inputs

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

