# laminar-phase-3-readiness Specification

## Purpose
TBD - created by archiving change laminar-phase-3-batch-0-readiness. Update Purpose after archive.
## Requirements
### Requirement: The repository SHALL freeze Batch 0 Phase 3 readiness decisions before implementation

Before Laminar integration code is added, the repository SHALL record a concrete readiness decision set for dependency strategy, retry or resume behavior, fail-fast order, and parity policy.

#### Scenario: Batch 0 closes the remaining implementation defaults

- **WHEN** a maintainer reviews the Phase 3 readiness note
- **THEN** the note MUST state the Laminar SDK or dependency strategy to be used
- **AND** it MUST state that retry and resume remain local to `iteration-N`, `benchmark.json`, and `run.json`
- **AND** it MUST state the fail-fast validation order before iteration creation
- **AND** it MUST state the parity policy for transient operational failures

### Requirement: The repository SHALL align Batch 0 with the revised Phase 3 contract

The readiness decisions SHALL be consistent with the revised Phase 3 section of `PLAN.md` and the existing `roadmap2/` preparation documents.

#### Scenario: Readiness note is contract-aligned

- **WHEN** the readiness note is compared against `PLAN.md` and `roadmap2/`
- **THEN** it MUST NOT reintroduce unsupported CLI scope such as `--group-name`
- **AND** it MUST keep `platform = laminar` and `provider = openai` as separate concerns
- **AND** it MUST NOT delegate benchmark semantics or retry control to Laminar

