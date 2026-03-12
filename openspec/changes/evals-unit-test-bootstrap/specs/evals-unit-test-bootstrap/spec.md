# evals-unit-test-bootstrap Specification

## ADDED Requirements

### Requirement: Shared eval runner SHALL provide a supported local unit-test command
The repository SHALL provide a repo-supported local unit-test command for deterministic logic under `scripts/evals/`, including a watch-mode workflow suitable for TDD.

#### Scenario: Maintainer runs local eval-runner unit tests
- **WHEN** a maintainer runs the documented test command from the repository root
- **THEN** the repo MUST invoke the supported unit-test runner for `scripts/evals/`
- **AND** the repo MUST provide a watch-mode variant for iterative TDD work

### Requirement: Shared eval runner build SHALL NOT emit colocated test files
The `scripts/evals/` TypeScript build SHALL allow colocated `*.test.ts` files without compiling them into `dist/`.

#### Scenario: Maintainer builds the shared eval runner
- **WHEN** a maintainer runs `npx tsc -p scripts/evals/tsconfig.json`
- **THEN** the build MUST remain valid
- **AND** colocated `*.test.ts` files MUST NOT be emitted into the build output

### Requirement: Shared eval runner docs SHALL describe the supported unit-test workflow
The shared eval runner documentation SHALL describe the supported local unit-test commands, the expected test placement, and the intended Red -> Green -> Refactor loop.

#### Scenario: Maintainer reads the shared eval runner README
- **WHEN** a maintainer reads `scripts/evals/README.md`
- **THEN** the maintainer MUST find the supported unit-test commands
- **AND** the maintainer MUST find the expected colocated test placement
- **AND** the maintainer MUST find a concise Red -> Green -> Refactor workflow description