# skill-forge-manual-calibration Specification

## ADDED Requirements

### Requirement: A tracked audit sample exists for the current supported cases
The repository MUST keep a small, explicit audit sample for manual review of `skill-forge`.

#### Scenario: The audit sample is reviewed
- **WHEN** the Phase 6A audit artifacts are inspected
- **THEN** a tracked sample file SHALL exist under `evals/cases/skill-forge/`
- **AND** it SHALL identify the included case IDs and why they were chosen

### Requirement: Manual calibration records both observed and human judgment
The repository MUST record a human-readable calibration note for the audit sample.

#### Scenario: A maintainer reviews Phase 6A findings
- **WHEN** the manual calibration note is read
- **THEN** it SHALL show the observed contract and uplift outcomes for the audited cases
- **AND** it SHALL classify each case as `correct`, `incorrect`, or `dudoso`
- **AND** it SHALL summarize a small set of actionable error patterns
