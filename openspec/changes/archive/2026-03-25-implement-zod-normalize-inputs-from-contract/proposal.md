## Why

`zod-normalize-inputs` now has an approved contract artifact in `refactor-zod-normalize-inputs-contract/eval-brief.json`, but the maintained skill package has not yet been aligned to that contract.

The current implementation is directionally right, but it still under-specifies nearby negatives, stop conditions, and the dependency-facing `agents/openai.yaml` interface that the approved brief froze.

## What Changes

- Refactor `packs/zod/zod-normalize-inputs/SKILL.md` to match the approved contract boundary.
- Update `packs/zod/zod-normalize-inputs/agents/openai.yaml` to match the contract-frozen interface metadata.
- Keep the package shape unchanged: `SKILL.md`, `references/`, and `agents/`.

## Impact

- Produces a contract-aligned implementation of `zod-normalize-inputs`.
- Keeps phase 2 scoped to implementation only.
- Leaves eval authoring for a later phase.
