# Tasks: phase-9a-recover-missing-target-stop-boundary

## 1. Change scaffolding

- [x] 1.1 Create the OpenSpec change artifacts for this slug and validate the slug shape.
- [x] 1.2 Add spec deltas for the modified capabilities tied to the missing-target boundary.

## 2. Contract wording recovery

- [x] 2.1 Tighten `packs/core/skill-contract-forge/SKILL.md` so deictic refactor/rewrite requests do not count as a valid target skill.
- [x] 2.2 Update `packs/core/skill-contract-forge/references/routing.md` so only named-target examples remain on `existing-skill-refactor` and `skill-rewrite`.
- [x] 2.3 Update `packs/core/skill-contract-forge/references/edge-cases.md` with an explicit missing-target `stop-and-ask` example and anti-example guidance.

## 3. Verification and evidence

- [x] 3.1 Run `openspec validate "phase-9a-recover-missing-target-stop-boundary" --type change`.
- [x] 3.2 Run `npm run promptfoo:validate` and `npm run promptfoo:validate:uplift:with-skill`.
- [x] 3.3 Run `npm run promptfoo:run:offline` and record the expected remaining snapshot mismatch if `ambiguous-refactor-missing-target` still fails before fixture refresh.

## Evidence

- 2026-03-18: `openspec status --change "phase-9a-recover-missing-target-stop-boundary" --json` returned `isComplete: true`.
- 2026-03-18: `openspec validate "phase-9a-recover-missing-target-stop-boundary" --type change` passed.
- 2026-03-18: `npm run promptfoo:validate` passed.
- 2026-03-18: `npm run promptfoo:validate:uplift:with-skill` passed.
- 2026-03-18: `npm run promptfoo:run` passed with `12 passed, 0 failed`; this included `ambiguous-refactor-missing-target` and `ambiguous-rewrite-missing-target` both classifying as `stop-and-ask`.
- 2026-03-18: `npm run promptfoo:run:uplift:with-skill` passed with `8 passed, 0 failed`.
- 2026-03-18: `npm run promptfoo:run:offline` was treated as replay evidence only; snapshot drift is expected until slug `phase-9c-refresh-replay-fixtures-after-live-recovery` refreshes the affected `*.model-outputs.json` after confirmed live recovery.

## Notes

- This slug intentionally does not refresh offline replay fixtures.
- This slug intentionally does not change Promptfoo topology, scripts, schema, or runtime authority rules.
- Semantic recovery is closed in live; replay alignment is deferred to slug `phase-9c-refresh-replay-fixtures-after-live-recovery`.
