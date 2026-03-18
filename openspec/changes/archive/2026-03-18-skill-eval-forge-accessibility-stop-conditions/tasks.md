# Tasks

## 1. Change artifacts
- [x] 1.1 Create proposal, design, tasks, and spec deltas for `skill-eval-forge-accessibility-stop-conditions`

## 2. Stop-and-ask accessibility coverage
- [x] 2.1 Update `packs/core/skill-eval-forge/SKILL.md` only if needed to clarify accessibility as part of the minimum eval-authoring inputs
- [x] 2.2 Update `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml` to cover inaccessible or insufficient contract authority, implementation authority, and eval context
- [x] 2.3 Keep stop-and-ask assertions semantic rather than phrasing-locked

## 3. Verification
- [x] 3.1 Run `openspec validate "skill-eval-forge-accessibility-stop-conditions" --type change`
- [x] 3.2 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml`
- [x] 3.3 Run a live contract run for `skill-eval-forge` and record the result

## Evidence

- 2026-03-18: Updated `packs/core/skill-eval-forge/SKILL.md` so contract and implementation authority must be identified specifically enough to inspect, and added edge-case guidance for exact repo-local authority versus vague "somewhere in the repo" inputs.
- 2026-03-18: Updated `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml` to cover vague contract authority, vague implementation authority, insufficient eval context, deferred runtime work, and semantic stop-and-ask assertions.
- 2026-03-18: `openspec validate "skill-eval-forge-accessibility-stop-conditions" --type change` -> PASS.
- 2026-03-18: `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml` -> PASS.
- 2026-03-18: `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml -o evals/engines/promptfoo/generated/skill-eval-forge.accessibility-stop-conditions.contract.live.eval.json --no-progress-bar --table-cell-max-length 80` -> PASS (`15 passed, 0 failed, 0 errors`).
