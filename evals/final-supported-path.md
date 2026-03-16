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

- canonical Promptfoo config:
  - `evals/engines/promptfoo/promptfooconfig.yaml`
- canonical Promptfoo execution suite:
  - `evals/engines/promptfoo/tests/skill-contract-forge.yaml`
- hardened trigger schema:
  - `evals/contracts/skill-contract-forge/eval-brief-output.schema.json`
- local eval authoring contract:
  - `evals/cases/skill-contract-forge/suite.v1.json`
- skill prompt source:
  - `packs/core/skill-contract-forge/SKILL.md`
- engine fixtures:
  - `evals/engines/promptfoo/fixtures/`
- generated outputs:
  - `evals/engines/promptfoo/generated/skill-contract-forge.eval.json`

## Historical or deprecated pieces

- `packs/core/skill-contract-forge/evals/evals.json`
  - historical compatibility only, not the supported suite source
- `evals/cases/skill-contract-forge/pilot-suite.v1.json`
  - historical Phase 4 bootstrap snapshot only
- `scripts/evals/`
  - retired wrapper runtime from the Phase 6 flow, not part of the supported path

## Out of scope for the closed migration

- `previous-skill`
- a second engine
- extra observability beyond the current local artifacts
- broader CI automation beyond the current local verification gates
