## Why

`skill-eval-forge` baseline coverage now handles the canonical mention-only cases well, but it still leans on hand-curated phrase checks. That leaves room for paraphrased authority framing or paraphrased workflow language to drift through while the suite remains green.

## What Changes

- Add a small set of adversarial paraphrase cases to `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml`.
- Reword `evals/engines/promptfoo/skill-eval-forge/prompts/without-skill.txt` only where needed to keep paraphrased authority and workflow prompts from collapsing into repo-shaped guidance.
- Codify the paraphrase-hardening intent in the `skill-eval-forge-promptfoo-family` spec.

## Impact

- Affected code: `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml`
- Affected prompt wrapper: `evals/engines/promptfoo/skill-eval-forge/prompts/without-skill.txt`
- Affected spec: `skill-eval-forge-promptfoo-family`
- Out of scope: `contract.yaml`, `uplift.yaml`, runtime/provider changes beyond the `without-skill` prompt wrapper, fixtures, other forge skills, rubric infrastructure
