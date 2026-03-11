# Phase 3 Batch 1 Boundary

This note records the concrete Laminar boundary skeleton introduced before Batch 2 changes the active execution path.

## Goal

Create a stable internal Laminar boundary so later batches can wire runtime behavior without inventing module ownership at the same time.

## Boundary Shape

The Laminar boundary is intentionally limited to four modules:

- `dataset-adapter.ts`
- `executor.ts`
- `evaluators-adapter.ts`
- `report.ts`

No extra orchestration layer or generic platform abstraction is introduced in this batch.

## Ownership

### `dataset-adapter.ts`

- derives platform-facing dataset entries from the local `EvalDefinition`
- preserves local case ids, prompt data, files, and stop expectations
- does not execute anything

### `executor.ts`

- owns the internal `runText({ mode, model, systemPrompt, userPrompt, files, timeoutMs })` contract
- is the future home of Laminar SDK wiring
- does not yet route the active runner

### `evaluators-adapter.ts`

- translates Laminar execution outputs into local `ModeArtifacts` and `CaseArtifacts`
- keeps grading and benchmark semantics outside the platform layer

### `report.ts`

- prepares Laminar-derived normalized results for the existing local builders
- keeps `benchmark.json` and `run.json` semantics anchored in domain services

## Explicit Non-Goals

- no active `run-evals` routing change
- no Laminar dependency install
- no credential validation
- no legacy retirement

## Exit Condition for Batch 1

Batch 1 is complete when:

- the four Laminar modules exist in source
- the executor contract is frozen
- module ownership is explicit
- Batch 2 can start wiring runtime behavior without redefining the boundary
