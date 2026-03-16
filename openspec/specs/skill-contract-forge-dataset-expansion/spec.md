# skill-contract-forge-dataset-expansion Specification

## Purpose
TBD - created by archiving change phase-6b-expand-skill-contract-forge-dataset. Update Purpose after archive.
## Requirements
### Requirement: Phase 6B expansion buckets are explicit next to the canonical source suite
The repository MUST keep a small, explicit bucket map for Phase 6B dataset expansion adjacent to the canonical `skill-contract-forge` source suite.

#### Scenario: A maintainer reviews why a new case exists
- **WHEN** the local `skill-contract-forge` case docs are read alongside `evals/cases/skill-contract-forge/suite.v1.json`
- **THEN** they SHALL describe the small set of Phase 6B expansion buckets
- **AND** each bucket SHALL point to concrete case IDs tied to observed calibration patterns
- **AND** the top-level JSON shape of `suite.v1.json` SHALL remain compatible with pre-existing consumers

### Requirement: Missing-target stop-and-ask coverage includes a realistic rewording
The repository MUST track at least one realistic rewording of the missing-target stop-and-ask boundary for `skill-contract-forge`.

#### Scenario: A maintainer inspects missing-target boundary coverage
- **WHEN** the canonical source suite and Promptfoo runtime suites are reviewed
- **THEN** a missing-target rewording case SHALL exist in the source suite
- **AND** that case SHALL also exist in the Promptfoo contract suite
- **AND** that case SHALL also exist in the Promptfoo uplift suite

### Requirement: Expanded suites remain offline-replayable
The repository MUST preserve the supported offline Promptfoo replay path after Phase 6B dataset expansion.

#### Scenario: The expanded dataset is replayed offline
- **WHEN** the supported offline Promptfoo commands are run against the expanded suites
- **THEN** the fixture replay SHALL include outputs for the newly added runtime cases

