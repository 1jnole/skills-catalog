# skill-contract-forge-dataset-maintenance Specification

## Purpose
Define how the canonical `skill-contract-forge` dataset is maintained next to the Promptfoo-native suites, including admission, pruning, movement, and stopping rules without reviving retired legacy datasets.
## Requirements
### Requirement: skill-contract-forge case admission is explicit

The repository MUST document explicit admission criteria for new canonical `skill-contract-forge` cases next to the active Promptfoo-native suites.

#### Scenario: A maintainer considers adding a new case

- **WHEN** the `skill-contract-forge` eval authoring docs are reviewed
- **THEN** they SHALL identify the three Promptfoo-native suites under `evals/engines/promptfoo/tests/` as the active case-definition authority
- **AND** they SHALL reject decorative or non-informative prompt growth
- **AND** active example targets SHALL refer only to currently supported skills or generic domains, not removed legacy skills

### Requirement: skill-contract-forge case pruning and movement is explicit

The repository MUST distinguish the canonical `skill-contract-forge` authoring surface from historical pilot and manual-audit case materials, and those historical materials MAY be removed from the active repo tree entirely once they are no longer needed.

#### Scenario: A maintainer reviews active case artifacts after cleanup

- **WHEN** the active `skill-contract-forge` case files and docs are reviewed
- **THEN** only the active Promptfoo-native suites and nearby supporting docs SHALL remain in the supported repository tree
- **AND** historical pilot or manual-audit files SHALL NOT appear under the active `evals/` tree
- **AND** nearby docs SHALL NOT present removed historical files as active or required authoring inputs
- **AND** obsolete `skill-contract-forge` eval-authoring files SHALL NOT remain under `packs/core/skill-contract-forge/`

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

