## Why

The progressive-disclosure refactor of `skill-contract-forge` made the package structure cleaner, but it also changed live Promptfoo behavior on the skill-enabled paths. `contract` and `uplift with-skill` are no longer green, so the repo needs a follow-up change that restores meaningful gate coverage without undoing the packaging split or widening the contract.

## What Changes

- Recalibrate the `skill-contract-forge` Promptfoo contract suite against the current post-refactor skill behavior.
- Recalibrate the `with_skill` uplift suite so it stays aligned with the current skill-owned routing contract.
- Reintroduce only the minimum normative guidance needed in `SKILL.md` or the `with_skill` wrapper to recover the failing trigger, non-trigger, and stop-and-ask boundaries.
- Refresh offline fixtures only if the recalibrated live behavior satisfies the intended contract.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-contract-forge-contract-gate`: recover a meaningful green contract gate after the progressive-disclosure refactor.
- `skill-contract-forge-uplift-surface`: recover the `with_skill` comparative gate while keeping `without_skill` as the informational baseline.
- `skill-contract-forge-eval-coverage-hardening`: keep fixtures and local eval coverage aligned with the restored live behavior.

## Impact

- Affected code: `packs/core/skill-contract-forge/SKILL.md`, `evals/engines/promptfoo/prompts/with-skill.txt`, `evals/engines/promptfoo/tests/*.yaml`, `evals/engines/promptfoo/fixtures/*.json`, `evals/engines/promptfoo/README.md`, `evals/cases/skill-contract-forge/README.md`
- Affected systems: Promptfoo live/offline contract and uplift verification
- Dependencies: none
