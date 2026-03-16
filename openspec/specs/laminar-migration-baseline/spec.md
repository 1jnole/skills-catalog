# laminar-migration-baseline Specification

## Purpose
Historical record of the archived Laminar migration baseline. This spec captures the starting state before the Promptfoo-first closeout and is not the current supported eval contract.
## Requirements
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
The phase 0 baseline SHALL name `skill-contract-forge` as the only migration pilot and SHALL document the accepted parity target as `overall_passed: true`, `with_skill` outperforming `without_skill`, and aligned trigger, non-trigger, and stop-and-ask decisions in the active repository planning artifacts.

#### Scenario: Pilot and parity target are fixed
- **WHEN** the migration baseline is consulted before later phases
- **THEN** it MUST identify `skill-contract-forge` as the only pilot and MUST state the accepted parity expectations and the artifact paths used as the baseline reference

### Requirement: Phase 0 SHALL keep its canonical baseline in active planning artifacts
The phase 0 migration baseline SHALL remain available in active planning artifacts so that inventory, classification, baseline expectations, legacy coupling, and documented drift stay centralized without requiring deleted roadmap folders.

#### Scenario: Baseline location is explicit
- **WHEN** a maintainer looks for the authoritative phase 0 migration baseline
- **THEN** the repo MUST expose that baseline through active planning artifacts instead of requiring a dedicated note under a deleted roadmap folder

### Requirement: Phase 0 SHALL record legacy artifact coupling and drift without resolving it
The phase 0 baseline SHALL identify runner dependencies on legacy artifact structures and SHALL record stale naming or documentation references that require action in later phases without renaming or deleting them in phase 0, so that phase 2 can intentionally reduce benchmark dependence on those artifacts as a source of truth.

#### Scenario: Legacy coupling is documented for later phases
- **WHEN** phase 2 or later migration work is planned
- **THEN** the baseline MUST show which parts of the current runner still depend on legacy artifacts and which of those dependencies are intended to be reduced or normalized in later phases

### Requirement: Phase 0 SHALL align migration planning documents with the real current state
If phase 0 finds that `PLAN.md` or the active planning artifacts describe an outdated current state, the migration planning documents SHALL be updated so that the documented starting point matches the real repo state before later migration phases are applied, including transitional structures such as an existing `scripts/evals/lmnr/` source directory.

#### Scenario: Planning documents reflect the actual starting point
- **WHEN** a maintainer compares the phase 0 baseline with `PLAN.md`, the active planning artifacts, and the real source tree
- **THEN** the documented current state MUST match the real current file and folder structure used by the runner, including any existing transitional Laminar source location


