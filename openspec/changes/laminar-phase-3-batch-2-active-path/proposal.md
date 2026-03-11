# Proposal: laminar-phase-3-batch-2-active-path

## Why

Batch 1 already froze the Laminar boundary shape. The next step is to make `run-evals` execute through that boundary with explicit fail-fast behavior, while still deferring parity proof and legacy retirement to later batches.

Without Batch 2, Laminar exists only as an internal skeleton and the supported path still depends on the legacy runner.

## What Changes

This change defines Batch 2 of Phase 3:

- route `run-evals` through the Laminar path
- validate `LMNR_PROJECT_API_KEY`, `OPENAI_API_KEY`, timeout configuration, and Laminar SDK readiness before `iteration-N`
- preserve the local `--iteration` and `--retry-errors` contract
- ensure `with_skill` injects `SKILL.md` and `without_skill` stays the baseline path

This change does not:

- prove parity yet
- retire legacy modules from the supported flow
- change benchmark semantics
- broaden the public CLI contract

## Scope

- `scripts/evals/`
- `roadmap2/`
- `openspec/changes/laminar-phase-3-batch-2-active-path/`

## Specs

- `laminar-active-execution-path`: Defines the supported routing and fail-fast behavior for Batch 2.
