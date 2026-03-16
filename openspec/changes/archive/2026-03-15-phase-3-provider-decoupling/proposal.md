# Proposal: phase-3-provider-decoupling

## Summary

Decouple provider selection from the canonical Promptfoo suite configs by moving the current OpenAI provider into a dedicated provider adapter file.

## Why

After the contract and uplift surfaces were split, the remaining structural coupling is vendor selection embedded directly inside the canonical Promptfoo configs.

That keeps OpenAI/model choice tied to the identity of the suite files themselves, which makes provider choice look like part of the evaluation contract instead of an interchangeable runtime adapter.

## What Changes

- create a dedicated Promptfoo `providers/` folder;
- move the current OpenAI provider declaration into `providers/default.openai.yaml`;
- update the contract and uplift configs to reference that provider file;
- update eval docs so Promptfoo remains the engine while provider selection becomes an explicit adapter concern.

## Scope

### In scope

- `evals/engines/promptfoo/providers/default.openai.yaml`;
- the three Promptfoo config files;
- minimum documentation updates in `evals/README.md` and `evals/engines/promptfoo/README.md`.

### Out of scope

- provider matrix work;
- model changes;
- test changes;
- prompt changes;
- `SKILL.md` changes;
- schema or contract changes.

## Success criteria

1. None of the canonical Promptfoo configs declare the provider inline anymore.
2. A dedicated provider adapter file exists and preserves the current provider/model.
3. Documentation clearly states that Promptfoo is the engine and the provider is replaceable.
4. Tests, prompts, contracts, and cases remain semantically unchanged.

## Assumptions and defaults

- The existing provider remains `openai:gpt-4.1-mini`; this slug changes placement, not model choice.
- Promptfoo provider composition uses documented `file://...` provider references.
