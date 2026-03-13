# Benchmark Boundary

This directory marks the stable home for benchmark aggregation semantics.

## Current scope
The supported benchmark summary is produced from native Promptfoo output by:
- `evals/engines/promptfoo/support/benchmark-summary.mjs`

## Ownership rule
Benchmark owns only:
- normalized-result aggregation,
- gate pass-rate semantics,
- improvement deltas and summaries.

Benchmark does not own:
- provider runtime wiring,
- engine-specific report formats,
- iteration filesystem mechanics.

Current `skill-forge` benchmark state:
- the canonical suite is `evals/cases/skill-forge/suite.v1.json`
- the local benchmark runs on Promptfoo results produced from that suite
- the inherited `packs/core/skill-forge/evals/evals.json` path is not required for the primary `skill-forge` benchmark flow
