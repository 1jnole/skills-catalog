# Promptfoo Family Baseline Contract

This document defines the minimum Phase A baseline for Promptfoo eval families in this repository.

## Intent
The goal of Phase A is to keep the Promptfoo runtime native and shallow while making every maintained family look and behave predictably.

This baseline is structural and operational. It does not redefine skill contracts, rewrite skill implementations, or expand semantic coverage beyond the minimum edge cases required to keep the eval boundary stable.

## Phase A family shape
Every maintained family under `evals/engines/promptfoo/<skill-name>/` must keep this minimum shape:

```text
evals/engines/promptfoo/<skill-name>/
  promptfooconfig.yaml
  promptfooconfig.uplift.with-skill.yaml
  promptfooconfig.uplift.without-skill.yaml
  prompts/
    with-skill.txt
    without-skill.txt
  tests/
    contract.yaml
    uplift.yaml
    uplift.without-skill.yaml
```

## Entrypoint roles
- `promptfooconfig.yaml` is the structural contract gate.
- `promptfooconfig.uplift.with-skill.yaml` is the comparative uplift gate for the `with_skill` surface.
- `promptfooconfig.uplift.without-skill.yaml` is the informational baseline surface for the `without_skill` prompt.

## Support tiers
Phase A uses two support tiers.

### Tier 1 — canonical public surface
These are the stable public npm entrypoints for the repository:
- `npm run promptfoo:validate`
- `npm run promptfoo:run`
- `npm run promptfoo:run:offline`

### Tier 2 — direct-config family execution
Family-specific work outside the small public npm surface uses native Promptfoo entrypoints:
- `promptfoo validate -c evals/engines/promptfoo/<skill-name>/promptfooconfig*.yaml`
- `promptfoo eval -c evals/engines/promptfoo/<skill-name>/promptfooconfig*.yaml ...`

## Generated artifact naming
When a live Promptfoo report is intentionally kept under `evals/engines/promptfoo/generated/`, it uses this naming convention:
- `<skill-name>.contract.live.eval.json`
- `<skill-name>.uplift.with-skill.live.eval.json`
- `<skill-name>.uplift.without-skill.live.eval.json`

Public offline replay reports use a separate replay artifact:
- `<skill-name>.contract.offline.eval.json`

Phase A does not require every family to ship all three generated artifacts. It only requires that kept artifacts follow one naming convention.

## Fixtures and replay policy
- offline replay is a low-cost replay and smoke path, not the semantic authority
- live behavior wins when live and offline disagree
- refresh fixtures only after live behavior is acceptable
- fixture files must stay scoped to one family and one surface
- public offline replay must not overwrite a `*.live.eval.json` report

Recommended fixture naming:
- `<skill-name>.contract.model-outputs.json`
- `<skill-name>.uplift.with-skill.model-outputs.json`
- `<skill-name>.uplift.without-skill.model-outputs.json`

Phase A keeps one canonical fixture naming scheme for maintained replay surfaces. Avoid reintroducing alternate names for the same family and surface.

## Assertions policy
Phase A prefers deterministic checks.

Allowed by default:
- `icontains`
- `not-icontains`
- `icontains-any`
- `not-icontains-any`
- `contains-json`
- `assert-set`

Deferred unless a future spec justifies them:
- model-graded assertions as a baseline requirement
- prompt-generated shared test layers
- repo-owned wrappers around Promptfoo

## Required structural edge cases per family
Every maintained family must cover these edge cases somewhere in its contract or uplift suites:
- clear trigger
- clear non-trigger
- missing precondition or insufficient target specificity
- deictic target reference
- mixed workflow request
- baseline impersonation guard for `without_skill`
- incompatible marker guard

## Verification status
This baseline contract defines the intended Phase A support model and naming rules. Final closure still requires local validation and execution on the documented supported surfaces.

## Boundary rules
- Keep `evals/engines/promptfoo/` as the runtime boundary.
- Keep skill-specific eval definitions under the family folder, not in a repo-owned wrapper runtime.
- Do not add new public npm aliases for every family by default.
- Do not treat `without_skill` as contractual conformance.
