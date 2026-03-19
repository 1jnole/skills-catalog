# Promptfoo Engine Boundary

This directory is the native Promptfoo runtime boundary used by the eval system.

## Intent
Promptfoo is the supported eval tool for this repository.

This boundary owns:
- Promptfoo configs
- provider adapter files
- Promptfoo-specific prompts and suites
- offline fixtures and generated reports
- family-specific execution surfaces

It must not grow a parallel repo-owned eval runtime around Promptfoo.

## Baseline contract
The repo-level minimum family contract lives at:
- `evals/contracts/promptfoo-family-baseline.md`

The active Promptfoo families currently in scope are:
- `skill-contract-forge`
- `skill-implementation-forge`
- `skill-eval-forge`

## Family layout
Each maintained family under `evals/engines/promptfoo/<skill-name>/` keeps this minimum layout:
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
- `promptfooconfig.uplift.with-skill.yaml` = comparative uplift gate
- `promptfooconfig.uplift.without-skill.yaml` = informational baseline surface

## Support model
### Canonical public npm surface
- `npm run promptfoo:validate`
- `npm run promptfoo:run`
- `npm run promptfoo:run:offline`

### Direct-config family execution
- `promptfoo validate -c evals/engines/promptfoo/<skill-name>/promptfooconfig*.yaml`
- `promptfoo eval -c evals/engines/promptfoo/<skill-name>/promptfooconfig*.yaml ...`

### Family status
| Family | Validate | Live run | Offline replay | Public npm surface |
| --- | --- | --- | --- | --- |
| `skill-contract-forge` | yes | yes | yes | yes |
| `skill-implementation-forge` | yes | yes | no | no |
| `skill-eval-forge` | yes | yes | no | no |

Support status is the declared Phase A support model. Final closure still requires local validation and execution evidence.

## Shared assets
- `providers/` holds provider adapter files only
- `fixtures/` holds replay fixtures, scoped by family and surface
- `generated/` holds intentionally kept live reports, not source-of-truth contracts
- `<skill-name>/prompts/` holds prompts for that family only
- `<skill-name>/tests/` holds Promptfoo-native suites for that family only

## Reliability semantics
- the relevant `packs/core/<skill-name>/SKILL.md` file remains the authority for skill behavior
- `contract` answers whether output satisfies the structural skill boundary
- `uplift with_skill` answers whether the skill improves routing or stop-boundary behavior compared to the baseline prompt
- `uplift without_skill` answers what the baseline prompt does without the skill active
- `without_skill` is informational and is not a contractual conformance gate
- live behavior wins when live and offline replay disagree
- public offline replay must write a separate `*.offline.eval.json` artifact rather than overwriting a `*.live.eval.json` report

## Assertions policy
Phase A prefers deterministic assertions.

The maintained baseline relies on native Promptfoo assertions such as:
- `icontains`
- `not-icontains`
- `icontains-any`
- `not-icontains-any`
- `contains-json`
- `assert-set`

Model-graded assertions are not required for the Phase A baseline.

## Fixtures and generated reports
Maintained offline replay fixtures currently exist for `skill-contract-forge`:
- `fixtures/skill-contract-forge.contract.model-outputs.json`
- `fixtures/skill-contract-forge.uplift.with-skill.model-outputs.json`
- `fixtures/skill-contract-forge.uplift.without-skill.model-outputs.json`

Kept generated reports currently follow one naming convention:
- `generated/skill-contract-forge.contract.live.eval.json`
- `generated/skill-implementation-forge.contract.live.eval.json`
- `generated/skill-eval-forge.contract.live.eval.json`
- `generated/skill-eval-forge.uplift.with-skill.live.eval.json`
- `generated/skill-eval-forge.uplift.without-skill.live.eval.json`

When additional reports are kept, use only:
- `<skill-name>.contract.live.eval.json`
- `<skill-name>.uplift.with-skill.live.eval.json`
- `<skill-name>.uplift.without-skill.live.eval.json`

Public offline replay reports use:
- `<skill-name>.contract.offline.eval.json`

## Minimum structural edge cases per family
Each maintained family must cover these edge cases somewhere in its suites:
- clear trigger
- clear non-trigger
- missing precondition or insufficient target specificity
- deictic target reference
- mixed workflow request
- baseline impersonation guard for `without_skill`
- incompatible marker guard

## Boundary rules
- Keep `evals/engines/promptfoo/` as the runtime boundary.
- Keep Promptfoo families shallow and file-based.
- Do not add a repo-owned runner or projection layer around Promptfoo.
- Do not treat generated reports or fixture files as contract definitions.
- Do not treat `without_skill` as a hard closure gate.
