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
- the canonical Promptfoo contract suite lives in `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- the comparative Promptfoo uplift suite lives in `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- Promptfoo entrypoints stay single-purpose: one contract gate config and two uplift comparison configs
- trigger cases in the contract suite require schema-backed Eval Brief JSON using `evals/contracts/skill-contract-forge/eval-brief-output.schema.json`
- `packs/core/skill-contract-forge/evals/evals.json` is the canonical skill-local authoring contract
- the supported offline path uses Promptfoo `--model-outputs` fixtures under `evals/engines/promptfoo/fixtures/`
- the canonical generated runtime artifact is `evals/engines/promptfoo/generated/skill-contract-forge.eval.json`

Current `skill-contract-forge` supported artifacts:
- `evals/engines/promptfoo/promptfooconfig.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
- `evals/engines/promptfoo/providers/default.openai.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`
- `evals/engines/promptfoo/prompts/with-skill.txt`
- `evals/engines/promptfoo/prompts/without-skill.txt`
- `packs/core/skill-contract-forge/evals/evals.json`
- `evals/cases/skill-contract-forge/README.md`
- `evals/fixtures/skill-contract-forge/README.md`

Current contractual behavior:
- Promptfoo runs the canonical `skill-contract-forge` contract suite with the `with_skill` prompt path only.
- the contract suite reads its provider from the default provider adapter rather than declaring a vendor inline.
- Promptfoo executes the declarative YAML test suite directly and derives pass/fail from native per-case assertions.
- trigger outputs are expected to include contract markers plus embedded JSON that satisfies the Eval Brief schema.
- `without_skill` is not part of the canonical contract gate.
- The repo does not ship a separate local eval runner.

Current uplift behavior:
- Promptfoo compares `skill-contract-forge` behavior through two separate executions with separate baseline/gate suites and separate offline replay fixtures.
- `promptfooconfig.uplift.with-skill.yaml` runs `tests/skill-contract-forge.uplift.yaml` with `with_skill` as the semantic uplift gate.
- `promptfooconfig.uplift.without-skill.yaml` runs `tests/skill-contract-forge.uplift.without-skill.yaml` with `without_skill` as an informational baseline surface.
- both uplift configs read the active provider from the same default provider adapter.
- the uplift gate measures comparative signals such as classification, workflow selection, and stop boundaries.
- the `without_skill` baseline is not designed to prove contractual conformance for the baseline path and is not a hard semantic gate.
- the `without_skill` baseline still rejects outputs that accidentally imitate the skill-owned contract envelope, such as classification headers, workflow headers, `Eval Brief ready`, or contract-brief schema keys.
- offline replay uses one fixture per surface so contract, uplift `with_skill`, and uplift `without_skill` each replay the correct prompt/case ordering.

Current operational reference:
- live:
  - `npm run promptfoo:run`
  - `npm run promptfoo:run:uplift:with-skill`
  - `npm run promptfoo:run:uplift:without-skill`
- offline:
  - `npm run promptfoo:run:offline`
  - `npm run promptfoo:run:offline:uplift:with-skill`
  - `npm run promptfoo:run:offline:uplift:without-skill`
- `evals/_phase_a_quarantine/cases/skill-contract-forge/pilot-suite.v1.json` remains as historical Phase 4 bootstrap context only

## What this means now
- The scaffold is explicit and visible at the repo root.
- Promptfoo is the active eval tool and the supported runtime boundary.
- The repo currently ships a default provider adapter, but provider choice is external to the suite contract.
- The canonical Promptfoo run is contract-first and remains the only contract gate.
- Comparative uplift execution now exists as a separate surface and does not replace the gate.
- The Promptfoo layer is organized by responsibility across `prompts/`, `tests/`, and `providers/`.
- the old wrapper runtime no longer participates in the supported flow.
- `packs/core/<skill>/evals/` is the supported home for skill-local eval authoring when a skill owns that contract.
- The repo does not ship a local runner around Promptfoo for `skill-contract-forge`.

## Ownership intent
- `contracts/` will own eval contracts that survive engine changes.
- `cases/` will own case definitions and authoring-oriented organization.
- `fixtures/` will own reusable eval files and test inputs.
- `reports/` will own generated outputs that do not define the domain.
- `engines/` will own engine-specific execution assets, with `engines/promptfoo/` as the target native tool boundary.

## Closeout references

- runtime boundary:
  - `evals/engines/promptfoo/README.md`
- local authoring boundary:
  - `evals/cases/skill-contract-forge/README.md`
