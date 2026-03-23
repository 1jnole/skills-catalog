# Evals Scaffold

This directory is the stable top-level home for the Promptfoo-first eval system.

## Intent
`evals/` separates stable eval contracts from Promptfoo-specific execution assets.

The stable shape is:

```text
evals/
  contracts/
  engines/
    promptfoo/
      fixtures/
      generated/
      providers/
      skill-contract-forge/
      skill-implementation-forge/
      skill-eval-forge/
```

Primary references:
- family baseline contract: `evals/contracts/promptfoo-family-baseline.md`
- engine boundary: `evals/engines/promptfoo/README.md`

## Supported state
Promptfoo is the supported eval tool for this repository.

### Canonical public npm surface
- `npm run promptfoo:validate`
- `npm run promptfoo:run`
- `npm run promptfoo:run:offline`

### Direct-config family execution
Use native Promptfoo entrypoints for family-specific work outside the small public npm surface:
- `promptfoo validate -c evals/engines/promptfoo/<skill-name>/promptfooconfig*.yaml`
- `promptfoo eval -c evals/engines/promptfoo/<skill-name>/promptfooconfig*.yaml ...`

Do not add a new public npm alias for every family by default.

## Phase A family baseline
Every maintained family under `evals/engines/promptfoo/<skill-name>/` keeps the same minimum structure:
- `promptfooconfig.yaml`
- `promptfooconfig.uplift.with-skill.yaml`
- `promptfooconfig.uplift.without-skill.yaml`
- `prompts/with-skill.txt`
- `prompts/without-skill.txt`
- `tests/contract.yaml`
- `tests/uplift.yaml`
- `tests/uplift.without-skill.yaml`

Entrypoint roles:
- `promptfooconfig.yaml` = structural contract gate
- `promptfooconfig.uplift.with-skill.yaml` = comparative uplift gate for `with_skill`
- `promptfooconfig.uplift.without-skill.yaml` = informational baseline for `without_skill`

## Family support matrix

| Family | Baseline shape | Validate | Live run | Offline replay | Public npm surface | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `skill-contract-forge` | yes | yes | yes | yes | yes | canonical public contract surface |
| `skill-implementation-forge` | yes | yes | yes | no | no | family-specific work uses direct-config execution; current coverage includes package-shape behavior and `agents` without interface regression checks |
| `skill-eval-forge` | yes | yes | yes | no | no | family-specific work uses direct-config execution |

Support status is the declared Phase A support model. Final closure still requires local validation and execution evidence.

## Assertions policy
Phase A prefers deterministic assertions first.

Allowed by default:
- `icontains`
- `not-icontains`
- `icontains-any`
- `not-icontains-any`
- `contains-json`
- `assert-set`

Phase A does not require model-graded assertions as part of the baseline.

## Fixtures and offline policy
- the supported offline path uses Promptfoo `--model-outputs` fixtures under `evals/engines/promptfoo/fixtures/`
- live behavior is the semantic authority when live and offline disagree
- refresh fixtures only after live behavior is acceptable
- the public offline replay writes a dedicated `*.offline.eval.json` artifact and must not overwrite a `*.live.eval.json` report
- `without_skill` remains an informational baseline rather than a closure gate

Existing maintained fixtures:
- `evals/engines/promptfoo/fixtures/skill-contract-forge.contract.model-outputs.json`
- `evals/engines/promptfoo/fixtures/skill-contract-forge.uplift.with-skill.model-outputs.json`
- `evals/engines/promptfoo/fixtures/skill-contract-forge.uplift.without-skill.model-outputs.json`

## Generated artifact naming
When a live Promptfoo report is intentionally kept under `evals/engines/promptfoo/generated/`, it follows one naming convention:
- `<skill-name>.contract.live.eval.json`
- `<skill-name>.uplift.with-skill.live.eval.json`
- `<skill-name>.uplift.without-skill.live.eval.json`

Public offline replay outputs use a separate replay artifact:
- `<skill-name>.contract.offline.eval.json`

Phase A does not require every family to keep all three reports. It requires any kept reports to follow one convention.

Current generated artifacts in scope:
- `evals/engines/promptfoo/generated/skill-contract-forge.contract.live.eval.json`
- `evals/engines/promptfoo/generated/skill-implementation-forge.contract.live.eval.json`
- `evals/engines/promptfoo/generated/skill-eval-forge.contract.live.eval.json`
- `evals/engines/promptfoo/generated/skill-eval-forge.uplift.with-skill.live.eval.json`
- `evals/engines/promptfoo/generated/skill-eval-forge.uplift.without-skill.live.eval.json`

## Minimum structural edge cases per maintained family
Every maintained family must cover these edge cases somewhere in its contract or uplift suites:
- clear trigger
- clear non-trigger
- missing precondition or insufficient target specificity
- deictic target reference
- mixed workflow request
- baseline impersonation guard for `without_skill`
- incompatible marker guard

For `skill-implementation-forge`, the maintained family also currently covers:
- approved contracts that freeze `authoring.packageShape`
- legacy approved contracts that omit `packageShape` and therefore require a conservative `SKILL.md`-only fallback
- `agents` package-shape requests that omit `authoring.interface`, which must stay `stop-and-ask`

## Operational authority
- `evals/contracts/promptfoo-family-baseline.md` defines the minimum family contract
- `evals/engines/promptfoo/README.md` defines the active Promptfoo runtime boundary
- `npm run promptfoo:validate` is the canonical public contract-validate entrypoint
- `npm run promptfoo:run` is the canonical public live semantic authority
- `npm run promptfoo:run:offline` is the canonical public replay and smoke path
- direct `promptfoo -c <config>` execution is the standard path for family-specific runs outside the small public npm surface

## What this means now
- the eval boundary is Promptfoo-native and family-based
- the three forge families now share one documented baseline shape
- support levels are explicit rather than implied
- offline replay is cheap health-check support, not a second semantic authority
- generated artifact naming is standardized
- broader dogfooding and semantic expansion remain Phase B work
