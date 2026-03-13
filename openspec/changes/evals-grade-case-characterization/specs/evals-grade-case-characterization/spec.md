# evals-grade-case-characterization Specification

## ADDED Requirements

### Requirement: grade-case legacy skill-forge behavior SHALL be characterized before seam extraction
The shared grader SHALL have colocated characterization tests that lock down representative `skill-forge`-specific assertion behavior before any decoupling refactor begins.

#### Scenario: Maintainer protects hardcoded assertion semantics
- **WHEN** the shared eval unit tests run
- **THEN** the suite MUST verify a single-marker structured assertion path
- **AND** the suite MUST verify a multi-marker structured assertion path
- **AND** the suite MUST verify an absent-marker structured assertion path
- **AND** the suite MUST verify a legacy keyword-fallback path

### Requirement: grade-case current boundary semantics SHALL remain explicit during characterization
The characterization suite SHALL make the current trigger, non-trigger, and `stop_and_ask` boundary behavior explicit for the duration of the refactor.

#### Scenario: Maintainer validates current boundary behavior
- **WHEN** the shared eval unit tests run against the current grader
- **THEN** the suite MUST verify the trigger boundary behavior
- **AND** the suite MUST verify the non-trigger boundary behavior
- **AND** the suite MUST verify the `stop_and_ask` boundary behavior
