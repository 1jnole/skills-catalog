# skill-contract-forge-eval-coverage-hardening Specification

## Purpose
Harden `skill-contract-forge` evaluation coverage around the highest-signal routing and payload failures while keeping offline fixtures subordinate to live Promptfoo runtime truth.
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
Offline fixtures used by the preferred Promptfoo replay gates MUST be refreshed only after the post-refactor live behavior is restored.

#### Scenario: Live recovery succeeds after package refactor
- **WHEN** live `contract` and live `uplift with-skill` return to the intended green state
- **THEN** the repository SHALL refresh the surface-specific offline fixtures to snapshot that recovered behavior
- **AND** offline replay SHALL be re-run to confirm that the restored behavior is reproducible

### Requirement: Affected docs describe hardened runtime truth
Affected runtime and local-authoring docs MUST identify the authoritative contract and the role of offline fixtures correctly.

#### Scenario: Eval docs are reviewed after alignment
- **WHEN** affected `skill-contract-forge` eval docs are reviewed
- **THEN** they SHALL identify `packs/core/skill-contract-forge/SKILL.md` as the authority for output behavior
- **AND** they SHALL describe offline fixtures as snapshots used for replay rather than the source of truth

