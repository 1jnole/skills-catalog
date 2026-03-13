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
Promptfoo now has a minimal Fase 4 pilot entrypoint through:
- `npm run run-promptfoo-pilot -- -- --skill-name skill-forge --dry-run`

Generated Promptfoo config is written to:
- `evals/engines/promptfoo/generated/skill-forge.pilot.promptfoo.json`

Promptfoo raw eval output is written to:
- `evals/engines/promptfoo/generated/skill-forge.pilot.eval.json`

Local scoring artifact (core scoring semantics) is written to:
- `evals/engines/promptfoo/generated/skill-forge.pilot.scoring.json`

The generated config currently runs both baseline modes:
- `with_skill` prompt path (skill context injected from `SKILL.md`)
- `without_skill` prompt path (same user request without skill context)

Offline smoke execution (no live model call) is available via:
- `npm run run-promptfoo-pilot -- -- --skill-name skill-forge --model-outputs evals/engines/promptfoo/fixtures/pilot-model-outputs.json --output evals/engines/promptfoo/generated/skill-forge.pilot.eval.json`

The same command now also produces local scoring output through the promptfoo scoring adapter.
