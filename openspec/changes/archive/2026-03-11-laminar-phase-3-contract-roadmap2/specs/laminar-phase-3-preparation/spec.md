## ADDED Requirements

### Requirement: The repository SHALL revise the phase 3 contract before implementation
Before phase 3 implementation work starts, the repository SHALL revise the phase 3 section of `PLAN.md` so that its operational contract matches the current repo reality and leaves no critical implementation decisions implicit.

#### Scenario: Phase 3 contract removes current drift
- **WHEN** a maintainer reads the revised phase 3 section of `PLAN.md`
- **THEN** the contract MUST explicitly cover platform versus provider responsibilities, retry or resume behavior, fail-fast credential validation, parity criteria, and legacy retirement semantics
- **AND** the contract MUST NOT keep unsupported CLI options such as `--group-name` as part of the phase 3 requirement set

### Requirement: The repository SHALL prepare phase 3 in `roadmap2/` before implementation
Before opening the implementation of phase 3, the repository SHALL provide a dedicated `roadmap2/` workspace that decomposes the revised phase 3 contract into agreements, alignment checks, tangible task batches, and gates.

#### Scenario: `roadmap2/` is ordered for decision-first execution
- **WHEN** a maintainer opens `roadmap2/`
- **THEN** they MUST find the phase 3 agreements and edge cases before the task batches
- **AND** the workspace MUST include a comparison against `PLAN.md` showing that the roadmap covers every phase 3 requirement

### Requirement: `roadmap2/` SHALL define tangible task batches without hidden decisions
The phase 3 preparation workspace SHALL translate the revised phase 3 contract into batches with explicit goals, prerequisites, tasks, expected outputs, and advance blockers.

#### Scenario: Task batches are implementation-ready
- **WHEN** an implementer reads the phase 3 task batches in `roadmap2/`
- **THEN** each batch MUST identify what is being decided or built, what blocks the next batch, and what evidence closes it
- **AND** no critical decision required for implementation MAY remain hidden inside a task bullet
