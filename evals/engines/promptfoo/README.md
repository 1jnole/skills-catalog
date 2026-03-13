# Promptfoo Engine Boundary

This directory is the native Promptfoo boundary used by the eval system.

## Intent
Promptfoo is the supported eval tool for this repository.

This directory owns:
- engine configuration,
- Promptfoo-specific execution assets,
- engine-specific assertions when needed,
- and engine run entrypoints.

## Boundary rule
Promptfoo is the operational tool target, but the repo MAY still keep authoring artifacts outside this folder when they add real value, such as:
- case authoring files,
- reusable fixtures,
- minimal post-processing docs or contracts,
- and migration notes.

What must not survive is a parallel repo-owned eval runtime around Promptfoo.

## Current status
Supported commands:
- `npm run promptfoo:validate`
- `npm run promptfoo:run`
- `npm run promptfoo:run:offline`

Supported runtime:
- native Promptfoo execution from `evals/engines/promptfoo/` with repo-owned wrappers removed

For `skill-forge`, this command now resolves the canonical suite at:
- `evals/cases/skill-forge/suite.v1.json`

The smaller `pilot-suite.v1.json` file remains as historical Phase 4 bootstrap context only.

Canonical Promptfoo config is read from:
- `evals/engines/promptfoo/promptfooconfig.mjs`

Promptfoo raw eval output is written to:
- `evals/engines/promptfoo/generated/skill-forge.eval.json`

Local benchmark summary is written to:
- `evals/engines/promptfoo/generated/skill-forge.benchmark.json`

The config runs both baseline modes:
- `with_skill` prompt path (skill context injected from `SKILL.md`)
- `without_skill` prompt path (same user request without skill context)

Offline smoke execution uses Promptfoo-native fixture replay:
- `npm run promptfoo:run:offline`
