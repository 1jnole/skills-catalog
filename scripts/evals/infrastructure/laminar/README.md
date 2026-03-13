# Laminar platform boundary

This folder is the canonical source location for Laminar as an observability and eval platform.

The supported `run-evals` flow reaches this folder through the application layer, while Laminar-specific execution and reporting stay here.

Current module ownership:

- `prompt-builder.ts`: prepares Laminar-owned prompts and attached eval files
- `execute-mode.ts`: executes `with_skill` and `without_skill` through the Laminar executor and local grader
- `executor.ts`: owns the internal `runText(...)` contract, Laminar SDK readiness, and the current OpenAI SDK wiring used by the engine
- `evaluators-adapter.ts`: translates platform execution outputs into local per-mode summaries
- `report.ts`: prepares Laminar-derived results for the local benchmark and run manifest builders

Shared helpers that remain outside this folder are allowed only when they are not platform-owned concerns, such as eval definition loading, iteration workspace management, or supported artifact persistence.
