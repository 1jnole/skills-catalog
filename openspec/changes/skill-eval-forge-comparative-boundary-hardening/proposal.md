## Why

`skill-eval-forge` has absorbed important dogfooding feedback about shared-infra widening, mixed-phase requests, incomplete eval context, and baseline non-impersonation. The family contract gate now covers more of that behavior than the comparative surfaces do.

That leaves two gaps:
- `uplift.yaml` under-measures whether the skill improves on the new guardrails
- `uplift.without-skill.yaml` can still be too permissive about boundary impersonation if it only checks the terminal marker

We need a focused hardening change for the comparative surfaces, separate from trigger-path input work and accessibility stop conditions.

## What Changes

- Expand `uplift.yaml` to measure the most important new guardrails comparatively.
- Tighten `uplift.without-skill.yaml` so the baseline does not impersonate the active repo-local boundary.
- Codify the comparative-surface intent in the stable Promptfoo family spec.

## Impact

- Affected code: `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml`, `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml`
- Affected specs: `skill-eval-forge-promptfoo-family`
- Out of scope: public npm command surface, replay fixtures, provider/runtime changes
