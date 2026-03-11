## ADDED Requirements

### Requirement: Phase 0 SHALL inventory the current eval runner state
The phase 0 baseline SHALL identify the current eval runner commands, the relevant folders under `scripts/evals/`, and the documents that describe the runner as it exists today.

#### Scenario: Runner inventory is captured
- **WHEN** phase 0 documentation is reviewed
- **THEN** it MUST name the current runner commands, the relevant `scripts/evals/` folders, and the documents that describe the current runner shape

### Requirement: Phase 0 SHALL classify current runner pieces by migration relevance
The phase 0 baseline SHALL classify current eval runner pieces into `source of truth`, `legacy but still needed`, or `stale / safe to ignore during migration`, and SHALL make that classification reusable by later migration phases.

#### Scenario: Classification is explicit
- **WHEN** a maintainer reads the phase 0 baseline
- **THEN** each documented runner piece MUST be assigned to one of the three classification groups with enough context to support later migration work

### Requirement: Phase 0 SHALL freeze the migration pilot and parity baseline
The phase 0 baseline SHALL name `skill-forge` as the only migration pilot and SHALL document the accepted parity target as `overall_passed: true`, `with_skill` outperforming `without_skill`, and aligned trigger, non-trigger, and stop-and-ask decisions in a canonical phase 0 note under `roadmap/`.

#### Scenario: Pilot and parity target are fixed
- **WHEN** the migration baseline is consulted before later phases
- **THEN** it MUST identify `skill-forge` as the only pilot and MUST state the accepted parity expectations and the artifact paths used as the baseline reference

### Requirement: Phase 0 SHALL use a roadmap note as its canonical baseline document
The phase 0 migration baseline SHALL live in a dedicated note under `roadmap/` so that inventory, classification, baseline expectations, legacy coupling, and documented drift are centralized in a phase-specific operational document.

#### Scenario: Baseline location is explicit
- **WHEN** a maintainer looks for the authoritative phase 0 migration baseline
- **THEN** the repo MUST contain a dedicated phase 0 note under `roadmap/` that centralizes the operational baseline instead of scattering it across `PLAN.md` or `tasks.md`

### Requirement: Phase 0 SHALL record legacy artifact coupling and drift without resolving it
The phase 0 baseline SHALL identify runner dependencies on legacy artifact structures and SHALL record stale naming or documentation references that require action in later phases without renaming or deleting them in phase 0.

#### Scenario: Legacy coupling is documented for later phases
- **WHEN** phase 2 or later migration work is planned
- **THEN** the baseline MUST show which parts of the current runner still depend on legacy artifacts and which stale names or documents remain to be updated later

### Requirement: Phase 0 SHALL align migration planning documents with the real current state
If phase 0 finds that `PLAN.md` or the roadmap describe an outdated current state, the migration planning documents SHALL be updated so that the documented starting point matches the real repo state before later migration phases are applied.

#### Scenario: Planning documents reflect the actual starting point
- **WHEN** a maintainer compares the phase 0 baseline with `PLAN.md` and `roadmap/`
- **THEN** the documented current state MUST match the real current file and folder structure used by the runner
