## MODIFIED Requirements

### Requirement: Phase 6B expansion buckets are explicit next to the Promptfoo-native suites

The repository MUST keep a small, explicit bucket map for Phase 6B dataset expansion adjacent to the canonical Promptfoo-native `skill-contract-forge` suites.

#### Scenario: A maintainer reviews why a new case exists

- **WHEN** the local `skill-contract-forge` case docs are read alongside the Promptfoo-native suites
- **THEN** they SHALL describe the small set of Phase 6B expansion buckets
- **AND** each bucket SHALL point to concrete case IDs tied to observed calibration patterns
- **AND** they SHALL keep that bucket map adjacent to the Promptfoo-native suites rather than a retired local source file

### Requirement: Missing-target stop-and-ask coverage includes a realistic rewording

The repository MUST track at least one realistic rewording of the missing-target stop-and-ask boundary for `skill-contract-forge`.

#### Scenario: A maintainer inspects missing-target boundary coverage

- **WHEN** the canonical `skill-contract-forge` suites are reviewed
- **THEN** a missing-target rewording case SHALL exist in the contract suite
- **AND** that case SHALL also exist in the uplift `with_skill` suite
