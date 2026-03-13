# Laminar platform boundary

This folder is the canonical source location for Laminar as an observability and eval platform.

It now owns the active supported `run-evals` path for live eval execution.

Current module ownership:

- `run-eval-iteration.ts`: owns the active supported iteration orchestration for Laminar-backed runs
- `prompt-builder.ts`: prepares Laminar-owned prompts and attached eval files
- `execute-mode.ts`: executes `with_skill` and `without_skill` through the Laminar executor and local grader
- `dataset-adapter.ts`: derives the platform-facing dataset shape from the local eval definition
- `executor.ts`: owns the internal `runText(...)` contract and Laminar SDK readiness
- `evaluators-adapter.ts`: translates platform execution outputs into local per-mode summaries
- `report.ts`: prepares Laminar-derived results for the local benchmark and run manifest builders

Shared helpers that remain outside this folder are allowed only when they are not platform-owned concerns, such as eval definition loading, iteration workspace management, or supported artifact persistence.
