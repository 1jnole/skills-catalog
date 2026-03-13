# Promptfoo Engine Boundary

This directory owns the Promptfoo engine adapter used by the final supported eval path.

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
Promptfoo is exercised through the supported public command:
- `npm run run-evals -- -- --skill-name skill-forge --dry-run`

For `skill-forge`, this command now resolves the canonical suite at:
- `evals/cases/skill-forge/suite.v1.json`

The direct `run-promptfoo-pilot` entrypoint is a deprecated compatibility alias only.
The smaller `pilot-suite.v1.json` file remains as historical Phase 4 bootstrap context only.

Generated Promptfoo config is written to:
- `evals/engines/promptfoo/generated/skill-forge.promptfoo.json`

Promptfoo raw eval output is written to:
- `evals/engines/promptfoo/generated/skill-forge.eval.json`

Local scoring artifact (core scoring semantics) is written to:
- `evals/engines/promptfoo/generated/skill-forge.scoring.json`

Local benchmark artifact (core benchmark semantics) is written to:
- `evals/engines/promptfoo/generated/skill-forge.benchmark.json`

The generated config currently runs both baseline modes:
- `with_skill` prompt path (skill context injected from `SKILL.md`)
- `without_skill` prompt path (same user request without skill context)

Offline smoke execution (no live model call) is available via:
- `npm run run-evals -- -- --skill-name skill-forge --model-outputs evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json --output evals/engines/promptfoo/generated/skill-forge.eval.json`

The same command now also produces local scoring and local benchmark output through the promptfoo adapters.
