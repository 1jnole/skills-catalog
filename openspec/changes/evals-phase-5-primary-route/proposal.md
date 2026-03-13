# Proposal: evals-phase-5-primary-route

## Why

Once the useful suite, scoring, and benchmark all run from the new scaffold, the repository docs must stop treating the inherited path as the main operational story for `skill-forge`. Phase 5 closes only when the new flow is documented as the primary route and the inherited layout is described as transitional compatibility.

## What Changes

- update the main eval docs to point at the canonical new-scaffold `skill-forge` suite and Promptfoo path as the primary route
- mark the inherited `packs/core/skill-forge/evals/` path as transitional compatibility for this skill
- refresh supporting READMEs so maintainers understand which path is primary versus historical
- record closeout evidence that the main path no longer depends on the inherited layout

## Capabilities

### New Capabilities
- `evals-primary-route-closeout`: Defines the documentation state required when the new-scaffold `skill-forge` flow becomes the primary route.

### Modified Capabilities
- None.

## Impact

- `scripts/evals/README.md`
- `evals/README.md`
- `evals/engines/promptfoo/README.md`
- `packs/core/skill-forge/evals/README.md`
- optional repo-level docs that summarize the supported path
