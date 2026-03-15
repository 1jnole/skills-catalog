# Evals Scaffold

This directory is the stable top-level home for the Promptfoo-first eval system.

## Intent
`evals/` is the stable top-level home for the evaluation scaffold, separated from skill authoring concerns.

The stable shape is:

```text
evals/
  contracts/
  cases/
  fixtures/
  reports/
  engines/
    promptfoo/
```

The first visible contract boundary already exists at:
- `evals/contracts/README.md`
- `evals/cases/README.md`
- `evals/fixtures/README.md`

## Supported state

Promptfoo is the supported eval tool for this repository.

Supported command surface:
- `npm run promptfoo:validate`
- `npm run promptfoo:run`
- `npm run promptfoo:run:offline`

Supported runtime shape:
- native Promptfoo config, prompt templates, tests, assertions, fixtures, and generated outputs live under `evals/engines/promptfoo/`
- the canonical Promptfoo contract suite lives in `evals/engines/promptfoo/tests/skill-forge.contract.yaml`
- trigger cases in that suite now require schema-backed Eval Brief JSON using `evals/contracts/skill-forge/eval-brief-output.schema.json`
- `evals/cases/skill-forge/suite.v1.json` remains a local authoring contract, not the runtime entrypoint
- the supported offline path uses Promptfoo `--model-outputs` fixtures under `evals/engines/promptfoo/fixtures/`
- the canonical generated runtime artifact is `evals/engines/promptfoo/generated/skill-forge.eval.json`

Current `skill-forge` supported artifacts:
- `evals/engines/promptfoo/promptfooconfig.yaml`
- `evals/engines/promptfoo/tests/skill-forge.contract.yaml`
- `evals/engines/promptfoo/prompts/with-skill.txt`
- `evals/engines/promptfoo/prompts/without-skill.txt`
- `evals/cases/skill-forge/pilot-suite.v1.json`
- `evals/cases/skill-forge/suite.v1.json`
- `evals/cases/skill-forge/README.md`
- `evals/fixtures/skill-forge/README.md`
- `evals/final-supported-path.md`

Current contractual behavior:
- Promptfoo runs the canonical `skill-forge` contract suite with the `with_skill` prompt path only.
- Promptfoo executes the declarative YAML test suite directly and derives pass/fail from native per-case assertions.
- trigger outputs are expected to include contract markers plus embedded JSON that satisfies the Eval Brief schema.
- `without_skill` is retained as a prompt asset for a later uplift/comparison phase and is not part of the canonical contract gate today.
- The repo does not ship a separate local eval runner.

Current operational reference:
- live:
  - `npm run promptfoo:run`
- offline:
  - `npm run promptfoo:run:offline`
- `pilot-suite.v1.json` remains as historical Phase 4 bootstrap context only

## What this means now
- The scaffold is explicit and visible at the repo root.
- Promptfoo is the active eval tool and the supported runtime boundary.
- The canonical Promptfoo run is now contract-first rather than mixed with baseline comparison.
- the old wrapper runtime no longer participates in the supported flow.
- The inherited physical layout under `packs/core/<skill>/evals/` is historical compatibility only and not the supported path.

## Ownership intent
- `contracts/` will own eval contracts that survive engine changes.
- `cases/` will own case definitions and authoring-oriented organization.
- `fixtures/` will own reusable eval files and test inputs.
- `reports/` will own generated outputs that do not define the domain.
- `engines/` will own engine-specific execution assets, with `engines/promptfoo/` as the target native tool boundary.

## Closeout references

- final supported path:
  - `evals/final-supported-path.md`
