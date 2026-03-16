# Proposal: phase-1-contract-suite-split

## Summary

Split the canonical `skill-contract-forge` Promptfoo contract gate away from comparative baseline execution.

This change makes the main Promptfoo config contract-first by pointing it at a dedicated contractual suite that runs only the `with_skill` prompt path.

## Why

The current Promptfoo entrypoint mixes two different concerns in one execution path:

- contractual conformance of `skill-contract-forge` with the skill active;
- baseline comparison between `with_skill` and `without_skill`.

That makes the meaning of the canonical gate ambiguous because a baseline path is evaluated in the same logical loop as the contractual path.

## Goal

Make the supported canonical Promptfoo execution mean exactly:

> If this passes, `skill-contract-forge` still satisfies its contract with the skill active.

## What Changes

- add a dedicated contractual Promptfoo suite file;
- repoint the canonical Promptfoo config to that contractual suite;
- remove the old mixed suite entrypoint to avoid a double source of truth.

## Scope

### In scope

- create a dedicated contractual Promptfoo suite file;
- repoint the canonical Promptfoo config to that contractual suite;
- remove the old mixed suite entrypoint to avoid a double source of truth.

### Out of scope

- uplift or baseline comparison suites;
- provider matrix changes;
- prompt changes;
- case wording changes;
- schema changes;
- README updates beyond this phase's first three tasks.

## Success criteria

1. `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml` exists with the same functional content as the current suite.
2. `evals/engines/promptfoo/promptfooconfig.yaml` runs only `with_skill`.
3. The canonical Promptfoo config points to `tests/skill-contract-forge.contract.yaml`.
4. There is no ambiguity about the active contractual suite entrypoint.

## Assumptions and defaults

- The recommended option from the task brief is adopted: remove `evals/engines/promptfoo/tests/skill-contract-forge.yaml` instead of keeping a deprecated transitional copy.
- Documentation updates are intentionally deferred in this slug because the requested implementation scope is limited to the first three tasks.
