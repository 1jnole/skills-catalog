# laminar-v1-gate-closeout Specification

## ADDED Requirements

### Requirement: Active docs SHALL describe the accepted v1 state
After v1 closes, active repository docs SHALL describe Laminar as the owner of the supported path, SHALL keep `run-evals` as the supported command, and SHALL mark v1 accepted without claiming that v2 or v3 are already complete.

#### Scenario: Maintainer reads active migration docs after v1 closeout
- **WHEN** a maintainer reads the active runner docs and migration planning docs
- **THEN** the docs MUST describe Laminar as the owner of the supported path
- **AND** they MUST mark v1 as accepted
- **AND** they MUST keep v2 and v3 clearly unaccepted
