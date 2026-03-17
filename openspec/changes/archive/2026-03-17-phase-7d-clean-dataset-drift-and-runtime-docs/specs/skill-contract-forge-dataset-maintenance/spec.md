## MODIFIED Requirements

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
