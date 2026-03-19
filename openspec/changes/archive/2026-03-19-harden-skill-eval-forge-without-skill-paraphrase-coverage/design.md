# Design

## Summary

This change hardens the `skill-eval-forge` baseline by adding a few adversarial paraphrase prompts that exercise the same semantic boundary as the current mention-only cases.

## Decisions

- Keep assertions deterministic and Promptfoo-native.
- Use paraphrased authority and boundary prompts instead of introducing judge layers.
- Prefer small coverage increments over a broad synonym catalog.
- Leave `without-skill` minimal unless validation shows a concrete need to reword it.
- Reword `without-skill` narrowly when the baseline keeps drifting into repo-shaped guidance under paraphrased missing-reference prompts.

## Non-goals

- No `llm-rubric`
- No custom semantic judge
- No changes to `contract.yaml` or `uplift.yaml`
- No runtime, provider, or npm surface changes
- No expansion to other forge skills
