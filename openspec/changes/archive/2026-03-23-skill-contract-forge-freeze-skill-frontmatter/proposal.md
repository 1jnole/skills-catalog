## Why

`skill-contract-forge` can currently produce trigger-path Eval Briefs that identify the skill name but do not freeze the repo-required `description` metadata needed by `SKILL.md`. That leaves a real handoff gap: downstream implementation can stay inside phase boundaries and still produce an incomplete skill package.

## What Changes

- Require trigger-path Eval Briefs from `skill-contract-forge` to carry canonical `skill.name` and `skill.description`.
- Update the active Eval Brief schema, templates, and examples so the metadata requirement is taught and structurally enforced.
- Harden the Promptfoo contract gate so trigger outputs that omit `skill.description` fail even when routing markers are otherwise correct.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-contract-forge-brief-boundary-neutrality`: the neutral brief contract now freezes repo-required skill metadata, not just the skill name.
- `skill-contract-forge-eval-coverage-hardening`: schema-backed trigger coverage now rejects trigger payloads that omit required skill metadata such as `skill.description`.

## Impact

- Affected code: `packs/core/skill-contract-forge/`, `evals/contracts/skill-contract-forge/`, and the active Promptfoo contract suite for `skill-contract-forge`.
- Affected interface: trigger-path Eval Brief JSON now requires `skill.description`.
- Out of scope: `agents/openai.yaml`, package-shape modeling, implementation-phase behavior, and new validators.
