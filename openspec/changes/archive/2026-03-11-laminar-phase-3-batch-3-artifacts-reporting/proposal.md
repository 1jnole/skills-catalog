# Proposal: laminar-phase-3-batch-3-artifacts-reporting

## Why

Batch 2 switched the supported execution path to the Laminar boundary and enforced fail-fast behavior. The next step is to make the Laminar path produce the final local reporting surface in a way that preserves the repo's benchmark semantics.

Without Batch 3, the supported execution path is Laminar-backed but its reporting contract is not yet formally closed against the Phase 3 plan.

## What Changes

This change defines Batch 3 of Phase 3:

- normalize Laminar-derived execution results into the local result shape
- rebuild `benchmark.json` from those normalized results
- write `run.json` with the neutral schema and `platform: laminar`
- preserve the supported artifact set as only `benchmark.json` and `run.json`

This change does not:

- prove parity yet
- retire legacy modules
- broaden the public CLI contract
- change benchmark semantics

## Scope

- `scripts/evals/`
- `roadmap2/`
- `openspec/changes/laminar-phase-3-batch-3-artifacts-reporting/`

## Specs

- `laminar-artifacts-reporting`: Defines the reporting and artifact behavior required once Laminar is the active execution path.
