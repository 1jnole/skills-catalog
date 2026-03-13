# Baseline Boundary

This directory marks the Phase 3 destination for the supported comparison baseline.

## Current supported baseline
The surviving core only assumes:
- `with_skill`
- `without_skill`

The comparison intent currently in scope is:
- `with_skill_vs_without_skill`

Current execution path:
- `npm run promptfoo:run`
- `npm run promptfoo:run:offline`
- both commands run the two baseline modes directly through the native Promptfoo config.

## Out of scope for this phase
These do not belong to the current baseline:
- `previous-skill`
- multi-engine comparison matrices
- extra experimental modes

## Why this exists now
The supported runtime already uses Promptfoo directly, but the baseline it depends on should stay explicit and engine-agnostic.

This boundary keeps that comparison intent visible without reintroducing a wrapper runtime.
