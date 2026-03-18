# Evals Scaffold

This directory is the stable top-level home for the Promptfoo-first eval system.

## Intent
`evals/` is the stable top-level home for the evaluation scaffold, separated from skill authoring concerns.

The stable shape is:

```text
evals/
  contracts/
  engines/
    promptfoo/
      skill-contract-forge/
      skill-implementation-forge/
      skill-eval-forge/
      fixtures/
      generated/
      providers/
```

The first visible contract boundary already exists at:
- `evals/contracts/README.md`

## Supported state

Promptfoo is the supported eval tool for this repository.

Supported command surface:
- `npm run promptfoo:validate`
- `npm run promptfoo:run`
- `npm run promptfoo:run:offline`

Direct config entrypoints:
- use `promptfoo validate -c <config>` for family-specific validation outside the public npm surface
- use `promptfoo eval -c <config> ...` for family-specific live runs outside the public npm surface
- keep new families scalable by adding configs under `evals/engines/promptfoo/<skill-name>/`, not new public npm aliases by default

Supported runtime shape:
- native Promptfoo config, prompt templates, tests, assertions, fixtures, and generated outputs live under `evals/engines/promptfoo/`
- provider selection is externalized through Promptfoo provider adapter files under `evals/engines/promptfoo/providers/`
- Promptfoo families live under `evals/engines/promptfoo/<skill-name>/`
- each maintained family keeps three single-purpose entrypoints: one contract gate config and two uplift comparison configs
- the canonical `skill-contract-forge` contract suite lives in `evals/engines/promptfoo/skill-contract-forge/tests/contract.yaml`
- the comparative `skill-contract-forge` uplift suite lives in `evals/engines/promptfoo/skill-contract-forge/tests/uplift.yaml`
- the informational `skill-contract-forge` uplift baseline lives in `evals/engines/promptfoo/skill-contract-forge/tests/uplift.without-skill.yaml`
- trigger cases in the contract suite require schema-backed Eval Brief JSON using `evals/contracts/skill-contract-forge/eval-brief-output.schema.json`
- for `skill-contract-forge`, the three Promptfoo-native suites are also the only supported case-authoring source
- the supported offline path uses Promptfoo `--model-outputs` fixtures under `evals/engines/promptfoo/fixtures/`
- the canonical generated runtime artifact is `evals/engines/promptfoo/generated/skill-contract-forge.eval.json`
- `skill-contract-forge` currently exposes the maintained offline replay surface; `skill-implementation-forge` currently exposes validate and live runs only
- `skill-eval-forge` currently exposes direct Promptfoo config entrypoints only and is not yet part of the supported public npm command surface

Current `skill-contract-forge` supported artifacts:
- `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml`
- `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.with-skill.yaml`
- `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.without-skill.yaml`
- `evals/engines/promptfoo/providers/default.openai.yaml`
- `evals/engines/promptfoo/skill-contract-forge/tests/contract.yaml`
- `evals/engines/promptfoo/skill-contract-forge/tests/uplift.yaml`
- `evals/engines/promptfoo/skill-contract-forge/tests/uplift.without-skill.yaml`
- `evals/engines/promptfoo/skill-contract-forge/prompts/with-skill.txt`
- `evals/engines/promptfoo/skill-contract-forge/prompts/without-skill.txt`

Current `skill-implementation-forge` eval artifacts:
- `evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml`
- `evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.with-skill.yaml`
- `evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.without-skill.yaml`
- `evals/engines/promptfoo/skill-implementation-forge/prompts/with-skill.txt`
- `evals/engines/promptfoo/skill-implementation-forge/prompts/without-skill.txt`
- `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml`
- `evals/engines/promptfoo/skill-implementation-forge/tests/uplift.yaml`
- `evals/engines/promptfoo/skill-implementation-forge/tests/uplift.without-skill.yaml`

Current `skill-eval-forge` eval artifacts:
- `evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml`
- `evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml`
- `evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml`
- `evals/engines/promptfoo/skill-eval-forge/prompts/with-skill.txt`
- `evals/engines/promptfoo/skill-eval-forge/prompts/without-skill.txt`
- `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml`
- `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml`
- `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml`

Current contractual behavior:
- Promptfoo runs the canonical `skill-contract-forge` contract suite with the `with_skill` prompt path only.
- the contract suite reads its provider from the default provider adapter rather than declaring a vendor inline.
- Promptfoo executes the declarative YAML test suite directly and derives pass/fail from native per-case assertions.
- trigger outputs are expected to include contract markers plus embedded JSON that satisfies the Eval Brief schema.
- `without_skill` is not part of the canonical contract gate.
- The repo does not ship a separate local eval runner.

Current uplift behavior:
- Promptfoo compares `skill-contract-forge` behavior through two separate executions with separate baseline/gate suites and separate offline replay fixtures.
- `skill-contract-forge/promptfooconfig.uplift.with-skill.yaml` runs `skill-contract-forge/tests/uplift.yaml` with `with_skill` as the semantic uplift gate.
- `skill-contract-forge/promptfooconfig.uplift.without-skill.yaml` runs `skill-contract-forge/tests/uplift.without-skill.yaml` with `without_skill` as an informational baseline surface.
- both uplift configs read the active provider from the same default provider adapter.
- the uplift gate measures comparative signals such as classification, workflow selection, and stop boundaries.
- the `without_skill` baseline is not designed to prove contractual conformance for the baseline path and is not a hard semantic gate.
- the `without_skill` baseline still rejects outputs that accidentally imitate the skill-owned contract envelope, such as classification headers, workflow headers, `Eval Brief ready`, or contract-brief schema keys.
- offline replay uses one fixture per surface so contract, uplift `with_skill`, and uplift `without_skill` each replay the correct prompt/case ordering.

Current operational reference:
- live:
  - `npm run promptfoo:run`
- offline:
  - `npm run promptfoo:run:offline`

Family-specific examples outside the public npm surface:
- `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml`
- `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.with-skill.yaml -o evals/engines/promptfoo/generated/skill-implementation-forge.uplift.with-skill.live.eval.json --no-progress-bar --table-cell-max-length 80`
- `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml`
- `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml -o evals/engines/promptfoo/generated/skill-eval-forge.uplift.with-skill.live.eval.json --no-progress-bar --table-cell-max-length 80`

Operational authority:
- `npm run promptfoo:validate` is the canonical public contract-validate entrypoint.
- `npm run promptfoo:run:offline` is the canonical low-cost public replay and smoke path.
- `npm run promptfoo:run` is the canonical public semantic authority when offline replay and live behavior disagree.
- direct `promptfoo -c <config>` execution is the standard path for family-specific validation and runs outside the small public npm surface.
- `without_skill` remains an informational baseline and does not close contractual conformance.
- `skill-eval-forge` currently ships direct config entrypoints only; its validation and live runs are not yet published as supported npm aliases.

## What this means now
- The scaffold is explicit and visible at the repo root.
- Promptfoo is the active eval tool and the supported runtime boundary.
- The repo currently ships a default provider adapter, but provider choice is external to the suite contract.
- The canonical Promptfoo run is contract-first and remains the only contract gate.
- Comparative uplift execution now exists as a separate surface and does not replace the gate.
- Offline replay is the preferred cheap health check, but it does not overrule current live behavior.
- The Promptfoo layer is organized as shared engine assets plus direct per-skill families.
- `skill-eval-forge` now participates in the direct per-skill topology through config-local entrypoints.
- the old wrapper runtime no longer participates in the supported flow.
- `skill-contract-forge` cases are maintained directly in the Promptfoo-native suites under `evals/engines/promptfoo/skill-contract-forge/tests/`.
- The repo does not ship a local runner around Promptfoo for `skill-contract-forge`.

## Ownership intent
- `contracts/` will own eval contracts that survive engine changes.
- `engines/` will own engine-specific execution assets, with `engines/promptfoo/` as the target native tool boundary.
- `engines/promptfoo/<skill-name>/tests/` will own active Promptfoo-native case definitions for each evaluated skill.
- `engines/promptfoo/fixtures/` will own reusable offline replay inputs.
- `engines/promptfoo/generated/` will own generated runtime outputs that do not define the domain.

## Closeout references

- runtime boundary:
  - `evals/engines/promptfoo/README.md`
