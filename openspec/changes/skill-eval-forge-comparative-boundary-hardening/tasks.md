# Tasks

## 1. Change artifacts
- [x] 1.1 Create proposal, design, tasks, and spec deltas for `skill-eval-forge-comparative-boundary-hardening`

## 2. Comparative-surface hardening
- [ ] 2.1 Update `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml` to measure the highest-signal dogfooding guardrails comparatively
- [ ] 2.2 Update `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml` so the baseline cannot impersonate the active skill-owned boundary
- [ ] 2.3 Keep the comparative surfaces lighter than the contract gate and avoid phrasing lock-in

## 3. Verification
- [ ] 3.1 Run `openspec validate "skill-eval-forge-comparative-boundary-hardening" --type change`
- [ ] 3.2 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml`
- [ ] 3.3 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml`
- [ ] 3.4 Run live comparative evaluations and record the result

## Evidence

- Pending implementation.
