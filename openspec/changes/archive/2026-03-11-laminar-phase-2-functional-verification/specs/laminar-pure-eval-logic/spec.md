## MODIFIED Requirements

### Requirement: Phase 2 SHALL preserve current benchmark semantics
Phase 2 SHALL preserve the current benchmark semantics for `benchmark.json`, including current pass-rate thresholds, `overall_passed`, and `with_skill` versus `without_skill` comparisons, and SHALL back that claim with evidence from a newly generated post-change iteration.

#### Scenario: Benchmark meaning is unchanged
- **WHEN** `skill-forge` benchmark behavior is compared before and after phase 2
- **THEN** the benchmark semantics MUST remain aligned with the frozen parity baseline from phase 0 and the comparison MUST be supported by evidence from a new post-change iteration
