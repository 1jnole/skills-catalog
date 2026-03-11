## ADDED Requirements

### Requirement: Phase 2 SHALL make new supported iterations independent from legacy detailed artifacts
Phase 2 SHALL ensure that new supported eval iterations persist only `benchmark.json` and `run.json`, and SHALL ensure that scoring, gates, benchmark aggregation, and retry behavior for those new iterations do not depend on `outputs/`, `timing.json`, `grading.json`, `feedback.json`, `with_skill/`, or `without_skill/`.

#### Scenario: New supported iteration writes only hybrid artifacts
- **WHEN** a maintainer runs a new supported eval iteration after the phase 2 closeout
- **THEN** the new `iteration-N` directory MUST contain `benchmark.json` and `run.json` as the only supported persisted artifacts
- **AND** the benchmark semantics MUST remain unchanged

#### Scenario: Retry for new iteration uses benchmark-derived case state
- **WHEN** a maintainer reruns a new supported iteration with `--iteration` or `--retry-errors`
- **THEN** the runner MUST determine completed or errored cases from `benchmark.json`
- **AND** the supported retry path MUST NOT require the legacy detailed artifact layout

#### Scenario: Historical legacy iterations remain isolated from the supported path
- **WHEN** a maintainer inspects the closeout implementation after the phase 2 follow-up
- **THEN** any retained reader for the legacy detailed artifact layout MUST be isolated as historical compatibility
- **AND** the supported path for new iterations MUST NOT advertise that layout as part of the current contract
