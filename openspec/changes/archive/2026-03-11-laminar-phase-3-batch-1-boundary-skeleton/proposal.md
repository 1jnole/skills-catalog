# Proposal: laminar-phase-3-batch-1-boundary-skeleton

## Why

Batch 0 already froze the decisions that Phase 3 implementation must respect. The next step is to create the Laminar boundary skeleton so that future implementation work has stable module ownership and contracts before any active routing is changed.

The repo currently has only `scripts/evals/platforms/laminar/README.md`. Batch 1 closes that gap by defining the concrete internal shape of the Laminar integration.

## What Changes

This change defines and applies Batch 1 of Phase 3:

- create the Laminar boundary skeleton under `scripts/evals/platforms/laminar/`
- define the role of `dataset-adapter`
- define the role of `executor`
- define the role of `evaluators-adapter`
- define the role of `report`
- define the internal `runText({ mode, model, systemPrompt, userPrompt, files, timeoutMs })` contract used by the executor
- align `roadmap2/` with the resulting Batch 1 boundary shape

This change does not:

- route `run-evals` through Laminar
- add the Laminar SDK dependency
- validate Laminar credentials at runtime
- remove any legacy execution path

## Scope

- `scripts/evals/platforms/laminar/`
- `roadmap2/`
- `openspec/changes/laminar-phase-3-batch-1-boundary-skeleton/`

## Specs

- `laminar-platform-boundary`: Defines the Batch 1 Laminar boundary skeleton and its internal ownership.
