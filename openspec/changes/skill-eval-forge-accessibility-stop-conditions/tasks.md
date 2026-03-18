# Tasks

## 1. Change artifacts
- [x] 1.1 Create proposal, design, tasks, and spec deltas for `skill-eval-forge-accessibility-stop-conditions`

## 2. Stop-and-ask accessibility coverage
- [ ] 2.1 Update `packs/core/skill-eval-forge/SKILL.md` only if needed to clarify accessibility as part of the minimum eval-authoring inputs
- [ ] 2.2 Update `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml` to cover inaccessible or insufficient contract authority, implementation authority, and eval context
- [ ] 2.3 Keep stop-and-ask assertions semantic rather than phrasing-locked

## 3. Verification
- [ ] 3.1 Run `openspec validate "skill-eval-forge-accessibility-stop-conditions" --type change`
- [ ] 3.2 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml`
- [ ] 3.3 Run a live contract run for `skill-eval-forge` and record the result

## Evidence

- Pending implementation.
