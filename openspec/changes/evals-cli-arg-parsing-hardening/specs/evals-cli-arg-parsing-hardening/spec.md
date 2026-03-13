# evals-cli-arg-parsing-hardening Specification

## ADDED Requirements

### Requirement: run-evals argument parsing SHALL be directly unit-testable
The `run-evals` command SHALL parse argv through a pure module that can be exercised directly by colocated unit tests.

#### Scenario: Maintainer validates run-evals parser behavior
- **WHEN** a maintainer runs the shared eval runner unit tests
- **THEN** the suite MUST verify valid parsing for supported flags
- **AND** the suite MUST verify errors for invalid argv combinations and missing values

### Requirement: shared positive integer parsing SHALL reject non-canonical values
The shared CLI positive integer parser SHALL reject values that are not canonical positive integers.

#### Scenario: Maintainer passes an invalid integer-like argv value
- **WHEN** the parser receives `0`, a negative value, a decimal, a suffixed integer, or a blank value
- **THEN** parsing MUST fail with an invalid value error

### Requirement: run-evals entrypoint SHALL preserve command behavior after parser extraction
The `run-evals` entrypoint SHALL keep the same supported flags and continue delegating only the parsed execution input to the Laminar runner.

#### Scenario: Maintainer executes run-evals with valid argv
- **WHEN** the command entrypoint receives valid argv
- **THEN** it MUST pass the parsed source, iteration, model, and retry flag to the executor
- **AND** it MUST keep the command output and error handling behavior unchanged