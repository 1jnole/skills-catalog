# evals-grade-case-test-consolidation Specification

## MODIFIED Requirements

### Requirement: grade-case parity coverage SHALL remain visible after seam extraction cleanup
The repository SHALL keep the legacy `skill-forge` parity checks for `grade-case`, but it SHALL no longer require a dedicated characterization filename once the assertion seam is stable.

#### Scenario: Maintainer runs the grade-case suite after test consolidation
- **WHEN** the colocated `grade-case` unit tests run
- **THEN** the suite MUST still cover the legacy `skill-forge` parity behaviors
- **AND** those checks MUST remain visible as a dedicated block inside the main `grade-case.test.ts` file
- **AND** the standalone `grade-case.characterization.test.ts` file MUST no longer be required
