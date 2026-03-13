# Final Supported Path

This document defines the closed migration state for the eval harness.

## Supported command surface

- validate a canonical suite:
  - `npm run read-evals -- -- --skill-name skill-forge`
- run the supported eval flow:
  - `npm run run-evals -- -- --skill-name skill-forge --model-outputs evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json`

`run-evals` is the supported execution command.
`run-promptfoo-pilot` is a deprecated compatibility alias and is not part of the public script surface anymore.

## Supported layout

- canonical suite:
  - `evals/cases/skill-forge/suite.v1.json`
- skill prompt source:
  - `packs/core/skill-forge/SKILL.md`
- engine fixtures:
  - `evals/engines/promptfoo/fixtures/`
- generated outputs:
  - `evals/engines/promptfoo/generated/skill-forge.promptfoo.json`
  - `evals/engines/promptfoo/generated/skill-forge.eval.json`
  - `evals/engines/promptfoo/generated/skill-forge.scoring.json`
  - `evals/engines/promptfoo/generated/skill-forge.benchmark.json`

## Historical or deprecated pieces

- `packs/core/skill-forge/evals/evals.json`
  - historical compatibility only, not the supported suite source
- `evals/cases/skill-forge/pilot-suite.v1.json`
  - historical Phase 4 bootstrap snapshot only
- `scripts/evals/infrastructure/laminar/`
  - historical compatibility code, not the active supported path

## Out of scope for the closed migration

- `previous-skill`
- a second engine
- extra observability beyond the current local artifacts
- broader CI automation beyond the current local verification gates
