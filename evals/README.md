# Evals Scaffold

This directory is the stable top-level home for the Promptfoo-first eval system.

## Intent
`evals/` is the stable top-level home for the evaluation scaffold, separated from skill authoring concerns.

The stable shape is:

```text
evals/
  contracts/
  baseline/
  cases/
  fixtures/
  scorers/
  benchmark/
  reports/
  engines/
    promptfoo/
```

The first visible contract boundary already exists at:
- `evals/contracts/README.md`
- `evals/baseline/README.md`
- `evals/scorers/README.md`
- `evals/benchmark/README.md`
- `evals/cases/README.md`
- `evals/fixtures/README.md`

## Supported state

Promptfoo is the supported eval tool for this repository.

Supported command surface:
- `npm run promptfoo:validate`
- `npm run promptfoo:run`
- `npm run promptfoo:run:offline`

Supported runtime shape:
- native Promptfoo config, prompt templates, assertions, fixtures, and generated outputs live under `evals/engines/promptfoo/`
- the canonical suite lives in `evals/cases/skill-forge/suite.v1.json`
- the supported offline path uses Promptfoo `--model-outputs` fixtures under `evals/engines/promptfoo/fixtures/`
- the minimal repo-specific post-processing step writes `evals/engines/promptfoo/generated/skill-forge.benchmark.json`

Current `skill-forge` supported artifacts:
- `evals/cases/skill-forge/suite.v1.json`
- `evals/cases/skill-forge/pilot-suite.v1.json`
- `evals/cases/skill-forge/README.md`
- `evals/fixtures/skill-forge/README.md`
- `evals/final-supported-path.md`

Current baseline behavior:
- Promptfoo runs both `with_skill` and `without_skill` prompt paths for the canonical `skill-forge` suite.

Current operational reference:
- live:
  - `npm run promptfoo:run`
- offline:
  - `npm run promptfoo:run:offline`
- `pilot-suite.v1.json` remains as historical Phase 4 bootstrap context only

## What this means now
- The scaffold is explicit and visible at the repo root.
- Promptfoo is the active eval tool and the supported runtime boundary.
- the old wrapper runtime no longer participates in the supported flow.
- The inherited physical layout under `packs/core/<skill>/evals/` is historical compatibility only and not the supported path.

## Ownership intent
- `contracts/` will own eval contracts that survive engine changes.
- `baseline/` will own the supported comparison baseline the core assumes.
- `cases/` will own case definitions and authoring-oriented organization.
- `fixtures/` will own reusable eval files and test inputs.
- `scorers/` will own reusable scoring logic.
- `benchmark/` will own local benchmark semantics.
- `reports/` will own generated outputs that do not define the domain.
- `engines/` will own engine-specific execution assets, with `engines/promptfoo/` as the target native tool boundary.

## Closeout references

- final supported path:
  - `evals/final-supported-path.md`
