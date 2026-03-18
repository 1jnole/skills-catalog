# Tasks: phase-9c-refresh-replay-fixtures-after-live-recovery

## 1. Change scaffolding

- [x] 1.1 Create the OpenSpec change artifacts for this slug and validate the slug shape.
- [x] 1.2 Add a runtime spec delta that requires live confirmation before replay fixture refresh.

## 2. Live confirmation and fixture refresh

- [x] 2.1 Re-run `npm run promptfoo:run` and `npm run promptfoo:run:uplift:with-skill` and confirm the affected ambiguous cases still classify as `stop-and-ask`.
- [x] 2.2 Refresh `evals/engines/promptfoo/fixtures/skill-contract-forge-suite-model-outputs.json` from the confirmed live contract outputs.
- [x] 2.3 Refresh `evals/engines/promptfoo/fixtures/skill-contract-forge.uplift.with-skill.model-outputs.json` from the confirmed live uplift-with-skill outputs.

## 3. Replay verification and evidence

- [x] 3.1 Run `npm run promptfoo:run:offline` and `npm run promptfoo:run:offline:uplift:with-skill`.
- [x] 3.2 Verify the refreshed replay surfaces now pass for `ambiguous-refactor-missing-target` and `ambiguous-rewrite-missing-target`.
- [x] 3.3 Record command/result/date/note evidence and confirm that this slug does not change Promptfoo semantics, only replay fixtures.

## Evidence

- **Command:** `openspec status --change "phase-9c-refresh-replay-fixtures-after-live-recovery" --json`
  **Result:** PASS - `isComplete: true`
  **Date:** `2026-03-18`
  **Note:** The slug artifacts are complete and apply-ready before fixture refresh.

- **Command:** `openspec validate "phase-9c-refresh-replay-fixtures-after-live-recovery" --type change`
  **Result:** PASS - `Change 'phase-9c-refresh-replay-fixtures-after-live-recovery' is valid`
  **Date:** `2026-03-18`
  **Note:** The OpenSpec change validates after adding the live-before-refresh requirement.

- **Command:** `npm run promptfoo:run`
  **Result:** PASS - `12 passed, 0 failed, 0 errors`
  **Date:** `2026-03-18`
  **Note:** The live contract surface remained green, including `ambiguous-refactor-missing-target` and `ambiguous-rewrite-missing-target` as `stop-and-ask`.

- **Command:** `npm run promptfoo:run:uplift:with-skill`
  **Result:** PASS - `8 passed, 0 failed, 0 errors`
  **Date:** `2026-03-18`
  **Note:** The live uplift-with-skill surface remained green before replay fixture refresh.

- **Command:** `npm run promptfoo:run:offline`
  **Result:** PASS - `12 passed, 0 failed, 0 errors`
  **Date:** `2026-03-18`
  **Note:** The refreshed contract replay fixture now reproduces the recovered live behavior.

- **Command:** `npm run promptfoo:run:offline:uplift:with-skill`
  **Result:** PASS - `8 passed, 0 failed, 0 errors`
  **Date:** `2026-03-18`
  **Note:** The refreshed uplift-with-skill replay fixture now reproduces the recovered live behavior.

## Notes

- This slug refreshes only Promptfoo-native replay fixtures for the contract and uplift-with-skill surfaces.
- This slug does not change Promptfoo prompts, tests, assertions, configs, scripts, or runtime semantics.
- The refreshed fixtures were taken from confirmed live outputs in the generated Promptfoo eval JSON files.
