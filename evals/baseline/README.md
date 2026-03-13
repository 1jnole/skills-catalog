# Baseline Boundary

This directory marks the Phase 3 destination for the supported comparison baseline.

## Current supported baseline
The surviving core only assumes:
- `with_skill`
- `without_skill`

The comparison intent currently in scope is:
- `with_skill_vs_without_skill`

Current Fase 4 pilot execution path:
- `npm run run-promptfoo-pilot -- -- --skill-name skill-forge ...`
- runs both baseline modes through Promptfoo config generation.

## Out of scope for this phase
These do not belong to the current baseline:
- `previous-skill`
- multi-engine comparison matrices
- extra experimental modes

## Why this exists now
The executable core still lives in `scripts/evals/domain/`, but the baseline it depends on is no longer implicit.

This boundary makes it explicit before the concrete baseline-owned files are rehomed into the new scaffold.
