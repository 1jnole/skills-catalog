# evals-domain-unit-tests Specification

## ADDED Requirements

### Requirement: Shared eval runner grading SHALL be directly unit-testable
The deterministic grading behavior under `scripts/evals/grading/grade-case.ts` SHALL be covered by colocated unit tests for boundary checks and assertion evaluation.

#### Scenario: Maintainer changes grading behavior
- **WHEN** a maintainer runs the shared eval runner unit tests
- **THEN** the suite MUST verify trigger, non-trigger, and stop-and-ask boundary behavior
- **AND** the suite MUST verify structured and keyword-based assertion scoring

### Requirement: Shared eval runner benchmark aggregation SHALL be directly unit-testable
The deterministic aggregation behavior under `scripts/evals/domain/services/benchmark.ts` SHALL be covered by colocated unit tests for rates, deltas, error handling, and summary outputs.

#### Scenario: Maintainer changes benchmark aggregation
- **WHEN** a maintainer runs the shared eval runner unit tests
- **THEN** the suite MUST verify pass-rate and average calculations
- **AND** the suite MUST verify stronger-mode resolution and error-case accounting

### Requirement: Shared eval runner run-result mapping SHALL be directly unit-testable
The deterministic mapping behavior under `scripts/evals/domain/services/run-results.ts` SHALL be covered by colocated unit tests for normalization and run-manifest generation.

#### Scenario: Maintainer changes result mapping
- **WHEN** a maintainer runs the shared eval runner unit tests
- **THEN** the suite MUST verify normalized result shaping
- **AND** the suite MUST verify explicit and generated manifest timestamps