# Final Supported Path

This document defines the closed migration state for the eval harness.

## Supported command surface

- validate a canonical suite:
  - `npm run promptfoo:validate`
- run the supported eval flow:
  - `npm run promptfoo:run`
- run the supported offline eval flow:
  - `npm run promptfoo:run:offline`

Promptfoo is the supported execution tool.

## Supported layout

- canonical suite:
  - `evals/cases/skill-forge/suite.v1.json`
- skill prompt source:
  - `packs/core/skill-forge/SKILL.md`
- engine fixtures:
  - `evals/engines/promptfoo/fixtures/`
- generated outputs:
  - `evals/engines/promptfoo/generated/skill-forge.eval.json`
  - `evals/engines/promptfoo/generated/skill-forge.benchmark.json`

## Historical or deprecated pieces

- `packs/core/skill-forge/evals/evals.json`
  - historical compatibility only, not the supported suite source
- `evals/cases/skill-forge/pilot-suite.v1.json`
  - historical Phase 4 bootstrap snapshot only
- `scripts/evals/`
  - retired wrapper runtime from the Phase 6 flow, not part of the supported path

## Out of scope for the closed migration

- `previous-skill`
- a second engine
- extra observability beyond the current local artifacts
- broader CI automation beyond the current local verification gates
