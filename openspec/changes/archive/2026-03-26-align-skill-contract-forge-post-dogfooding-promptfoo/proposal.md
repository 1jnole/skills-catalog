## Why

Dogfooding changed the maintained `skill-contract-forge` contract enough that live Promptfoo `contract` now fails in two distinct ways: trigger outputs drift into a weaker `seedEvalIntent` shape, and the rewrite missing-target edge still sometimes self-targets the current skill instead of stopping and asking. The repo already documents that `SKILL.md` is the source of truth for behavior and that Promptfoo `contract` is the authoritative gate, so the fix needs to reassert one contract authority instead of relaxing the eval to match accidental drift.

## What Changes

- Tighten `packs/core/skill-contract-forge/SKILL.md` so trigger-path briefs explicitly freeze `seedEvalIntent` as a structured object and so missing-target rewrite/refactor prompts cannot infer the current skill from local context.
- Keep supportive routing and edge-case references aligned with the same boundary so dogfooding docs and maintained examples do not re-teach the drift.
- Align the supported Eval Brief schema with the now-explicit trigger contract by requiring `seedEvalIntent` and its minimum object fields.
- Record the contract and Promptfoo coverage updates in OpenSpec without changing Promptfoo topology, npm surface, or baseline suite roles.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `skill-contract-forge`: clarify the structured trigger-path discovery surface and forbid current-context target inference for missing-target rewrites/refactors.
- `skill-contract-forge-brief-boundary-neutrality`: clarify that the brief remains engine-neutral while still freezing the explicit `seedEvalIntent` object shape.
- `skill-contract-forge-eval-coverage-hardening`: require trigger payloads to reject array-shaped `seedEvalIntent` drift.
- `skill-contract-forge-uplift-surface`: preserve the missing-target stop-and-ask boundary for ambiguous rewrites as well as refactors.

## Impact

- Affected code: `packs/core/skill-contract-forge/`, `evals/contracts/skill-contract-forge/`
- Affected systems: OpenSpec change artifacts and live Promptfoo contract behavior for `skill-contract-forge`
- Out of scope: Promptfoo runtime topology, new npm commands, fixture refresh policy, or baseline `without_skill` scope changes
