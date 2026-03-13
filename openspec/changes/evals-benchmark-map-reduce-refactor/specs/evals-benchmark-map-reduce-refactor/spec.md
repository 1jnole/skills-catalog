# evals-benchmark-map-reduce-refactor Specification

## MODIFIED Requirements

### Requirement: benchmark aggregation SHALL remain maintainable as case logic grows
The benchmark builder SHALL express per-case summarization separately from aggregate reduction so new metrics can be added with less accidental coupling.

#### Scenario: Maintainer reads the benchmark builder after refactor
- **WHEN** the benchmark module is updated without changing public behavior
- **THEN** the flow MUST separate case summarization, accumulator reduction, and artifact assembly
- **AND** the benchmark test suite MUST continue to pass unchanged
