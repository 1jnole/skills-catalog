# Tasks

## 1. Change artifacts
- [x] 1.1 Create proposal, design, tasks, and spec deltas for `skill-eval-forge-comparative-boundary-hardening`

## 2. Comparative-surface hardening
- [x] 2.1 Update `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml` to measure the highest-signal dogfooding guardrails comparatively
- [x] 2.2 Update `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml` so the baseline cannot impersonate the active skill-owned boundary
- [x] 2.3 Keep the comparative surfaces lighter than the contract gate and avoid phrasing lock-in

## 3. Verification
- [x] 3.1 Run `openspec validate "skill-eval-forge-comparative-boundary-hardening" --type change`
- [x] 3.2 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml`
- [x] 3.3 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml`
- [x] 3.4 Run live comparative evaluations and record the result

## Evidence

- Comparative surfaces updated:
  - `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml`
  - `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml`
- Baseline wrapper intentionally reduced to a minimal informational surface:
  - `evals/engines/promptfoo/skill-eval-forge/prompts/without-skill.txt`
- Promptfoo-official next step applied:
  - Added a small `llm-rubric` semantic non-impersonation check to the two golden `without_skill` comparative cases
  - Pinned the grader provider inline on the assertion to keep scoring stable
  - Grounded the rubric against both `{{prompt}}` and `{{output}}` so the grader can distinguish innocent prompt echoes from actual boundary impersonation
- Comparative goldens refined:
  - The two uplift goldens now ask for the normal phase completion marker instead of quoting `Skill eval ready` directly in the user request
  - This keeps the requests apples-to-apples while letting `with_skill` recover the marker from `SKILL.md` and reducing baited marker mirroring in `without_skill`
- Validation status:
  - `openspec validate "skill-eval-forge-comparative-boundary-hardening" --type change` PASS
  - `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml` PASS
  - `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml` PASS
- Latest live comparative evidence:
  - `with_skill` now reaches `8 passed, 0 failed` in `evals/engines/promptfoo/generated/skill-eval-forge.comparative.with-skill.live.eval.json`
  - `without_skill` now reaches `6 passed, 0 failed` in `evals/engines/promptfoo/generated/skill-eval-forge.comparative.without-skill.live.eval.json`
- Interpretation:
  - The remaining comparative problem was solved by removing the explicit quoted marker from the user request, not by re-hardening the `without_skill` wrapper.
  - `prompts/without-skill.txt` remains minimal; the comparative distinction now comes from the combination of skill context, deterministic checks, and the contextualized semantic grader.
