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

Suite responsibilities:
- `tests/contract.yaml` carries the normative contract boundary for the family
- `tests/uplift.yaml` demonstrates comparative improvement with the skill active and should stay lighter than `contract`
- `tests/uplift.without-skill.yaml` is baseline-only and should measure non-impersonation rather than trigger-path correctness

## Suite maintenance checklist
Use this checklist when editing Promptfoo family prompts or tests:
- treat the target skill's `SKILL.md` as the source of truth; helper prompts and YAML suites should translate that contract, not replace it
- keep `prompts/with-skill.txt` as harness guidance; do not let it become a second contract with narrower or broader routing rules
- preserve distinct suite roles: `contract` for normative boundary checks, `uplift` for lighter comparative improvement, and `uplift.without-skill` for baseline non-impersonation only
- prefer small structural assertions over long wording lists; rely first on terminal markers, routing boundary, and the primary stop reason
- use `not-icontains` and `not-icontains-any` for load-bearing negatives such as terminal markers, wrong response-mode labels, and baseline impersonation; do not use them to police courtesy wording or incidental style
- protect routing edge cases when simplifying YAML, especially deictic target, authority-mentioned-only, mixed-phase requests, conflicting authority, and baseline impersonation guards
- run `promptfoo validate -c evals/engines/promptfoo/<skill-name>/promptfooconfig*.yaml` after meaningful family edits

## Family support matrix

| Family | Baseline shape | Validate | Live run | Offline replay | Public npm surface | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `skill-contract-forge` | yes | yes | yes | yes | yes | canonical public contract surface |
| `skill-implementation-forge` | yes | yes | yes | no | no | family-specific work uses direct-config execution; current coverage includes accessible-authority forms, package-shape behavior, legacy package-shape fallback, and `agents` interface regression checks |
| `skill-eval-forge` | yes | yes | yes | no | no | family-specific work uses direct-config execution; current coverage includes authority-form routing, mixed-phase routing, and baseline non-impersonation |

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
- `without_skill` should stay focused on non-impersonation of skill-owned markers and boundary language, not on reproducing trigger-path routing

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

For `skill-eval-forge`, the maintained family also currently covers:
- approved brief + implementation + active eval context as the eval-authoring authority set
- implementation/eval and contract/eval mixed-phase requests that remain `stop-and-ask`
- explicitly deferred adjacent runtime work that remains in eval scope
- baseline non-impersonation of `Skill eval ready` and skill-owned boundary language

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
