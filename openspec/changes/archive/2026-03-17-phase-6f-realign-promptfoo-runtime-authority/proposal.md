## Why

The repository now executes `skill-contract-forge` through split Promptfoo surfaces (`contract`, `uplift with-skill`, and `uplift without-skill`), but several docs and specs still point to the inherited `evals/engines/promptfoo/tests/skill-contract-forge.yaml` path or to non-existent closeout files. That drift makes Phase A planning and cleanup decisions unreliable because historical documentation can still look authoritative.

## What Changes

- Realign the active runtime authority docs to the split Promptfoo entrypoints that the repo actually executes today.
- Update `PLAN.md` so Phase A uses real workspace paths and classifies active, historical, and ephemeral eval artifacts without treating README files as source of truth.
- Remove or replace broken references that point to missing files such as `evals/final-supported-path.md`.
- Mark the inherited `skill-contract-forge.yaml` surface as migration residue rather than supported runtime authority.

## Capabilities

### Modified Capabilities

- `skill-contract-forge-promptfoo-eval-runtime`: repository docs and spec language align with the split Promptfoo runtime surfaces that are actually active.

## Impact

- Affected code: `PLAN.md`, `evals/README.md`, `evals/cases/README.md`, `evals/fixtures/skill-contract-forge/README.md`, `openspec/specs/skill-contract-forge-promptfoo-eval-runtime/spec.md`
- Affected systems: Promptfoo runtime authority documentation and Phase A cleanup framing
- Dependencies: none
