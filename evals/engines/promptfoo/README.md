# Promptfoo Engine Boundary

This directory is reserved for the Promptfoo engine adapter in Phase 3.

## Intent
Promptfoo should live here as:
- engine configuration,
- thin execution adapters,
- engine-specific assertions when needed,
- and engine run entrypoints.

## Boundary rule
Promptfoo must not become the source of truth for:
- contracts,
- cases,
- scoring semantics,
- benchmark semantics,
- or the baseline definition.

Those concerns stay outside `evals/engines/promptfoo/`.

## Current status
This folder is intentionally introduced before the full engine integration so the future ownership boundary is explicit.
