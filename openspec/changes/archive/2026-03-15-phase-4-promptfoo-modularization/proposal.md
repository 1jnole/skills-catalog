# Proposal: phase-4-promptfoo-modularization

## Summary

Modularize the Promptfoo engine layer so the entrypoints, shared assets, and responsibilities are explicit without changing contract or uplift semantics.

## Why

After separating contract and uplift surfaces and extracting provider selection, the remaining work is structural clarity inside `evals/engines/promptfoo/`.

The current layout is already close to the desired shape, but this phase closes the gap by:

- making the purpose of each config explicit;
- documenting the final topology by responsibility;
- recording the decision not to introduce shared `tests/defaults.yaml` because it would not reduce enough duplication to justify another abstraction layer yet.

## What Changes

- normalize Promptfoo config descriptions and entrypoint wording;
- update engine and top-level eval docs to describe the modular Promptfoo topology clearly;
- record that `tests/defaults.yaml` is intentionally not introduced in this phase.

## Scope

### In scope

- the three Promptfoo config entrypoints;
- `evals/engines/promptfoo/README.md`;
- `evals/README.md`;
- minimal OpenSpec artifacts for the structural decision.

### Out of scope

- test semantics changes;
- prompt changes;
- provider changes;
- new shared defaults files;
- new runners or wrappers.

## Success criteria

1. Each Promptfoo config has one clear, documented purpose.
2. The topology `prompts/`, `tests/`, and `providers/` is described consistently in docs.
3. `tests/defaults.yaml` is omitted intentionally because it does not provide enough value yet.
4. Contract and uplift semantics remain unchanged.

## Assumptions and defaults

- The current file layout is already good enough structurally; this slug focuses on normalization and clarity rather than moving files again.
- `tests/defaults.yaml` is deferred because the repeated YAML today is small and semantically meaningful.
