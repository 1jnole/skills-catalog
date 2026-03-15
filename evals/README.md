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
- provider selection is externalized through Promptfoo provider adapter files under `evals/engines/promptfoo/providers/`
- the canonical Promptfoo contract suite lives in `evals/engines/promptfoo/tests/skill-forge.contract.yaml`
- the comparative Promptfoo uplift suite lives in `evals/engines/promptfoo/tests/skill-forge.uplift.yaml`
- trigger cases in the contract suite require schema-backed Eval Brief JSON using `evals/contracts/skill-forge/eval-brief-output.schema.json`
- `evals/cases/skill-forge/suite.v1.json` remains a local authoring contract, not the runtime entrypoint
- the supported offline path uses Promptfoo `--model-outputs` fixtures under `evals/engines/promptfoo/fixtures/`
- the canonical generated runtime artifact is `evals/engines/promptfoo/generated/skill-forge.eval.json`

Current `skill-forge` supported artifacts:
- `evals/engines/promptfoo/promptfooconfig.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
- `evals/engines/promptfoo/providers/default.openai.yaml`
- `evals/engines/promptfoo/tests/skill-forge.contract.yaml`
- `evals/engines/promptfoo/tests/skill-forge.uplift.yaml`
- `evals/engines/promptfoo/prompts/with-skill.txt`
- `evals/engines/promptfoo/prompts/without-skill.txt`
- `evals/cases/skill-forge/pilot-suite.v1.json`
- `evals/cases/skill-forge/suite.v1.json`
- `evals/cases/skill-forge/README.md`
- `evals/fixtures/skill-forge/README.md`
- `evals/final-supported-path.md`

Current contractual behavior:
- Promptfoo runs the canonical `skill-forge` contract suite with the `with_skill` prompt path only.
- the contract suite reads its provider from the default provider adapter rather than declaring a vendor inline.
- Promptfoo executes the declarative YAML test suite directly and derives pass/fail from native per-case assertions.
- trigger outputs are expected to include contract markers plus embedded JSON that satisfies the Eval Brief schema.
- `without_skill` is not part of the canonical contract gate.
- The repo does not ship a separate local eval runner.

Current uplift behavior:
- Promptfoo compares `skill-forge` behavior through two separate executions that reuse the same comparative suite.
- `promptfooconfig.uplift.with-skill.yaml` runs `tests/skill-forge.uplift.yaml` with `with_skill`.
- `promptfooconfig.uplift.without-skill.yaml` runs `tests/skill-forge.uplift.yaml` with `without_skill`.
- both uplift configs read the active provider from the same default provider adapter.
- the uplift suite measures comparative signals such as classification, workflow selection, and stop boundaries.
- the uplift suite is not designed to prove full contractual conformance for the baseline path.

Current operational reference:
- live:
  - `npm run promptfoo:run`
- offline:
  - `npm run promptfoo:run:offline`
- `pilot-suite.v1.json` remains as historical Phase 4 bootstrap context only

## What this means now
- The scaffold is explicit and visible at the repo root.
- Promptfoo is the active eval tool and the supported runtime boundary.
- The repo currently ships a default provider adapter, but provider choice is external to the suite contract.
- The canonical Promptfoo run is contract-first and remains the only contract gate.
- Comparative uplift execution now exists as a separate surface and does not replace the gate.
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
