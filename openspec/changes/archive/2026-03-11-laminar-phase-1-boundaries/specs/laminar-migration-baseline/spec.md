## MODIFIED Requirements

### Requirement: Phase 0 SHALL align migration planning documents with the real current state
If phase 0 finds that `PLAN.md` or the roadmap describe an outdated current state, the migration planning documents SHALL be updated so that the documented starting point matches the real repo state before later migration phases are applied, including transitional structures such as an existing `scripts/evals/lmnr/` source directory.

#### Scenario: Planning documents reflect the actual starting point
- **WHEN** a maintainer compares the phase 0 baseline with `PLAN.md`, `roadmap/`, and the real source tree
- **THEN** the documented current state MUST match the real current file and folder structure used by the runner, including any existing transitional Laminar source location
