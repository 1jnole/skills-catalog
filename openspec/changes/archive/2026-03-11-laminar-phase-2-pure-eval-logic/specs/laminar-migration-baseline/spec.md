## MODIFIED Requirements

### Requirement: Phase 0 SHALL record legacy artifact coupling and drift without resolving it
The phase 0 baseline SHALL identify runner dependencies on legacy artifact structures and SHALL record stale naming or documentation references that require action in later phases without renaming or deleting them in phase 0, so that phase 2 can intentionally reduce benchmark dependence on those artifacts as a source of truth.

#### Scenario: Legacy coupling is documented for later phases
- **WHEN** phase 2 or later migration work is planned
- **THEN** the baseline MUST show which parts of the current runner still depend on legacy artifacts and which of those dependencies are intended to be reduced or normalized in later phases
