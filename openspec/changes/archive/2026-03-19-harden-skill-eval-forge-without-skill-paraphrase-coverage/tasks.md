# Tasks

## 1. OpenSpec artifacts

- [x] 1.1 Create proposal, design, tasks, and spec deltas for `harden-skill-eval-forge-without-skill-paraphrase-coverage`
- [x] 1.2 Validate the OpenSpec change before completion

## 2. Paraphrase coverage

- [x] 2.1 Add 2-3 adversarial `without-skill` cases that paraphrase authority, workflow, and boundary framing
- [x] 2.2 Keep the existing mention-only cases intact
- [x] 2.3 Keep the assertions deterministic and concise

## 3. Verification

- [x] 3.1 Run `promptfoo validate` for `skill-eval-forge` `without-skill`
- [x] 3.2 Run focused evals for the new cases
- [x] 3.3 Run the full `without-skill` eval and record evidence

## Evidence

- `openspec validate harden-skill-eval-forge-without-skill-paraphrase-coverage --type change`
- `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml`
- Focused evals for `contract-authority-paraphrased`, `procedure-sequence-paraphrased`, and `boundary-framing-paraphrased`
- Full `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --no-progress-bar --table-cell-max-length 80` with `12 passed, 0 failed`

## Assumptions

- The change stays limited to `skill-eval-forge` baseline hardening.
- No rubric or runtime work is required for this pass.
