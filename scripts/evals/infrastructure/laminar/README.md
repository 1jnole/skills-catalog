# Laminar Historical Compatibility

This folder is historical compatibility code from the inherited runner path.

It is not the active supported execution path after Fase 6 closeout.

Current historical ownership:

- `prompt-builder.ts`: historical Laminar prompt preparation
- `execute-mode.ts`: historical Laminar mode execution
- `executor.ts`: Laminar SDK and historical provider wiring
- `evaluators-adapter.ts`: historical platform-to-local translation
- `report.ts`: historical Laminar-derived report preparation

The supported path now runs through `run-evals` plus the Promptfoo adapter and canonical suite in `evals/cases/`.
