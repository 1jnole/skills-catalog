## Why

Dogfooding `skill-implementation-forge` on the real implementation of `zod-normalize-inputs` exposed two places where the skill still relied on operator judgment that should live inside the maintained skill itself.

First, the skill allowed inspection of the current target state, but it did not foreground a concrete mapping from the approved brief into maintained files. During the run, the implementation had to translate contract fields into specific outputs such as frontmatter, routing sections in `SKILL.md`, and `agents/openai.yaml`.

Second, the skill did not teach clearly enough how to inspect and reuse an existing shallow package. The run needed to inspect existing support files and decide that `references/` already satisfied the contract, so only the files materially affected by the approved brief should change.

## What Changes

- Clarify how implementation runs should map approved brief fields into concrete maintained files.
- Clarify how implementation should inspect and reuse the existing target package before editing.
- Reinforce that contract-required support folders do not imply rewriting every support file; only files materially affected by the contract should change.

## Impact

- Makes `skill-implementation-forge` more self-sufficient during normal repo use.
- Reduces the need to consult `skill-authoring-doc.md` just to decide how to apply an approved brief to a maintained package.
- Keeps the phase boundary unchanged: implementation only, still stopping at `Skill implementation ready`.
