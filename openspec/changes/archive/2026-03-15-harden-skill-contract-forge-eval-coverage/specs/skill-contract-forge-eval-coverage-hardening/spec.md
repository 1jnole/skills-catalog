# Capability: skill-contract-forge-eval-coverage-hardening

## ADDED Requirements

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
Offline fixture artifacts used by the preferred gate MUST reflect the hardened runtime expectations.

#### Scenario: Offline gate is executed after hardening
- **WHEN** `npm run promptfoo:run:offline` is executed after this change
- **THEN** the fixture-backed run SHALL exercise the hardened assertions and expectations rather than pre-hardening semantics

### Requirement: Affected docs describe hardened runtime truth
Affected runtime docs MUST describe the hardened `skill-contract-forge` contract without reintroducing deprecated grading layers.

#### Scenario: Hardened runtime path is documented
- **WHEN** an affected eval or skill-contract-forge document describes the supported runtime path after this change
- **THEN** it SHALL identify the supported Promptfoo runtime path and hardened trigger expectations
- **AND** it SHALL NOT describe a removed central grader as part of the supported runtime
