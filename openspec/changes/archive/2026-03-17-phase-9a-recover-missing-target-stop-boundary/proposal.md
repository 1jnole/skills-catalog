## Why

`skill-contract-forge` already says refactor and rewrite requests need a clear target skill, but the active wording and supportive examples still leave enough room for the model to treat deictic phrases such as `this skill` as an implicit target. That ambiguity is currently visible in the maintained `ambiguous-refactor-missing-target` regression boundary and needs a contract-side repair before any replay fixture refresh.

## What Changes

- Tighten the normative `skill-contract-forge` contract so deictic refactor/rewrite phrasing does not count as a valid existing-skill target.
- Update supportive routing and edge-case references to show the correct `stop-and-ask` behavior for missing-target prompts and to remove misleading trigger-like examples.
- Record the change in OpenSpec and verify that Promptfoo config remains valid while offline replay evidence is left for a later fixture-refresh slug.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `skill-contract-forge-eval-coverage-hardening`: clarify that missing-target refactor/rewrite requests remain `stop-and-ask` when they only use deictic target references.
- `skill-contract-forge-uplift-surface`: clarify that comparative uplift recovery for ambiguous refactor wording may be recovered through skill-side normative guidance and supportive references without changing the runtime topology.

## Impact

- Affected code: `packs/core/skill-contract-forge/SKILL.md`, `packs/core/skill-contract-forge/references/routing.md`, `packs/core/skill-contract-forge/references/edge-cases.md`
- Affected systems: OpenSpec change artifacts and `skill-contract-forge` contract wording
- Out of scope: Promptfoo topology, Eval Brief schema, snapshot refresh, live/offline policy docs
