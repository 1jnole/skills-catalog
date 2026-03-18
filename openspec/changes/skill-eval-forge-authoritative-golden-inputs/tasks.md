# Tasks

## 1. Change artifacts
- [x] 1.1 Create proposal, design, tasks, and spec deltas for `skill-eval-forge-authoritative-golden-inputs`

## 2. Trigger-path input authority
- [ ] 2.1 Update `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml` so trigger-path goldens identify concrete authoritative repo-local inputs
- [ ] 2.2 Update `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml` so trigger-path goldens identify concrete authoritative repo-local inputs
- [ ] 2.3 Preserve semantic assertions so the model is not required to echo file paths verbatim

## 3. Verification
- [ ] 3.1 Run `openspec validate "skill-eval-forge-authoritative-golden-inputs" --type change`
- [ ] 3.2 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml`
- [ ] 3.3 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml`
- [ ] 3.4 Run one live run of the `skill-eval-forge` trigger paths and record the result

## Evidence

- Pending implementation.
