# skill-contract-forge-eval-coverage-hardening Specification

## MODIFIED Requirements

### Requirement: Offline fixtures align with hardened runtime behavior
Offline fixture artifacts used by the preferred gate MUST reflect the hardened runtime expectations for each replayed surface.

#### Scenario: Live behavior does not satisfy the hard contract
- **WHEN** live Promptfoo executions for `skill-contract-forge` fail the exact contractual output envelope
- **THEN** the repository SHALL NOT refresh the offline fixture to encode those failures as accepted behavior
- **AND** the mismatch SHALL be recorded as an active contract violation

#### Scenario: Live behavior satisfies the hard contract
- **WHEN** live Promptfoo executions satisfy the contractual output envelope
- **THEN** the offline fixtures MAY be refreshed to snapshot that compliant behavior for the preferred replay gates

#### Scenario: Runtime surfaces use different prompt or case ordering
- **WHEN** contract and uplift replays do not share the same prompt surface or case ordering
- **THEN** the repository SHALL keep separate offline fixture artifacts per surface rather than forcing one shared replay snapshot

### Requirement: Affected docs describe hardened runtime truth
Affected runtime and local-authoring docs MUST identify the authoritative contract and the role of offline fixtures correctly.

#### Scenario: Eval docs are reviewed after alignment
- **WHEN** affected `skill-contract-forge` eval docs are reviewed
- **THEN** they SHALL identify `packs/core/skill-contract-forge/SKILL.md` as the authority for output behavior
- **AND** they SHALL describe offline fixtures as snapshots used for replay rather than the source of truth
