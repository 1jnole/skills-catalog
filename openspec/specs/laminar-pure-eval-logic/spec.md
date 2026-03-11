# laminar-pure-eval-logic Specification

## Purpose
TBD - created by archiving change laminar-phase-2-pure-eval-logic. Update Purpose after archive.
## Requirements
### Requirement: Phase 2 SHALL declare the local eval source of truth
Phase 2 SHALL document and enforce that `Eval Brief`, `packs/core/<skill>/evals/evals.json`, local Zod schemas, local domain types, and benchmark semantics are the authoritative source of truth for eval behavior.

#### Scenario: Source of truth is explicit
- **WHEN** a maintainer reads the phase 2 docs and code contracts
- **THEN** Laminar MUST be described only as execution or observability infrastructure and not as the source of benchmark semantics

### Requirement: Phase 2 SHALL make scoring, gates, and benchmark aggregation runner-neutral
Phase 2 SHALL isolate scoring, gate decisions, and benchmark aggregation so they can consume normalized run results without depending on Laminar-specific result shapes or the legacy detailed artifact layout.

#### Scenario: Pure logic consumes normalized results
- **WHEN** the benchmark logic is reviewed after phase 2
- **THEN** scoring, gates, and benchmark aggregation MUST be expressible from normalized run results instead of direct dependence on legacy detailed artifacts

### Requirement: Phase 2 SHALL define a neutral `run.json`
Phase 2 SHALL define `run.json` with neutral field names including `platform`, `run_ref`, `group_ref`, `provider`, `model`, `skill_name`, `eval_version`, `iteration`, and `created_at`.

#### Scenario: `run.json` naming is vendor-neutral
- **WHEN** a maintainer inspects the `run.json` contract after phase 2
- **THEN** the schema MUST use neutral field names and MUST not include Laminar-prefixed or vendor-specific field names

### Requirement: Phase 2 SHALL preserve current benchmark semantics
Phase 2 SHALL preserve the current benchmark semantics for `benchmark.json`, including current pass-rate thresholds, `overall_passed`, and `with_skill` versus `without_skill` comparisons, and SHALL back that claim with evidence from a newly generated post-change iteration.

#### Scenario: Benchmark meaning is unchanged
- **WHEN** `skill-forge` benchmark behavior is compared before and after phase 2
- **THEN** the benchmark semantics MUST remain aligned with the frozen parity baseline from phase 0 and the comparison MUST be supported by evidence from a new post-change iteration

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

