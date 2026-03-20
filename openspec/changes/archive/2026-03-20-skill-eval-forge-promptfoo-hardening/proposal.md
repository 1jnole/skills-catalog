## Why

`skill-eval-forge` already has a stronger contract gate after the first slug, but its Promptfoo uplift family is still uneven. The `with_skill` suite duplicates too much of the contract gate, while the `without_skill` baseline still needs a tighter definition of what it must not impersonate when repo-local authority is only mentioned or paraphrased.

## What Changes

- Tighten the permanent `skill-eval-forge-promptfoo-family` spec around a lighter comparative uplift and a stricter informational baseline.
- Reduce `tests/uplift.yaml` to a compact set of high-signal comparative cases.
- Rework `tests/uplift.without-skill.yaml` so the baseline acknowledges missing inspectable references, requests concrete material, and avoids repo-shaped authority or workflow impersonation.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-eval-forge-promptfoo-family`: clarify the comparative role of `uplift.with-skill` and the anti-impersonation guardrails for `uplift.without-skill`.

## Impact

- Affected capability spec: `openspec/specs/skill-eval-forge-promptfoo-family/spec.md`
- Affected comparative uplift suite: `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml`
- Affected informational baseline suite: `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml`
