# skill-contract-forge-eval-coverage-hardening Specification

## Purpose
TBD - created by archiving change harden-skill-contract-forge-eval-coverage. Update Purpose after archive.
## Requirements
### Requirement: Trigger cases require schema-backed Eval Brief payloads
Trigger cases in the supported `skill-contract-forge` runtime MUST require embedded JSON that satisfies the supported Eval Brief schema.

#### Scenario: Trigger output contains visible markers but malformed payload
- **WHEN** a trigger-case output contains the expected trigger markers but the embedded JSON payload is missing required Eval Brief structure
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output contains valid structured Eval Brief payload
- **WHEN** a trigger-case output includes the required trigger markers and embedded JSON satisfying the supported Eval Brief schema
- **THEN** the hardened Promptfoo suite SHALL allow that structural portion of the case to pass

### Requirement: Classification contradictions are rejected
The supported `skill-contract-forge` runtime SHALL reject outputs that mix incompatible classification families or trigger markers.

#### Scenario: Trigger output also claims non-trigger classification
- **WHEN** a case output includes `Classification: trigger` and also includes an incompatible classification marker
- **THEN** the hardened Promptfoo suite SHALL mark the case as failed

#### Scenario: Non-trigger or stop-and-ask output emits trigger completion marker
- **WHEN** a non-trigger or stop-and-ask output includes `Eval Brief ready`
- **THEN** the hardened Promptfoo suite SHALL mark the case as failed

### Requirement: High-signal routing boundaries are covered
The supported hardened suite MUST include explicit coverage for key routing boundaries that are known regression risks.

#### Scenario: Valid authoring request includes unrelated downstream noise
- **WHEN** a request is clearly a valid authoring trigger but also mentions downstream eval or benchmark work for later
- **THEN** the hardened suite SHALL verify that the case remains a trigger rather than degrading to stop-and-ask or non-trigger

#### Scenario: Runtime-only request is evaluated
- **WHEN** a request is for shared eval runtime implementation rather than skill authoring
- **THEN** the hardened suite SHALL verify that the case is treated as non-trigger

#### Scenario: Ambiguous skill-refactor request is evaluated
- **WHEN** a request does not identify a clear skill target or clear authoring boundary
- **THEN** the hardened suite SHALL verify that the case is treated as stop-and-ask

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

