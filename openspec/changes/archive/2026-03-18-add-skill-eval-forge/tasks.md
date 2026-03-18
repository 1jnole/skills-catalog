# Tasks: add-skill-eval-forge

## 1. OpenSpec scaffolding

- [x] 1.1 Create the OpenSpec change artifacts for `add-skill-eval-forge`.
- [x] 1.2 Add the new capability spec for `skill-eval-forge`.
- [x] 1.3 Validate the OpenSpec change before applying repo edits.

## 2. Skill implementation

- [x] 2.1 Create `packs/core/skill-eval-forge/`.
- [x] 2.2 Author `packs/core/skill-eval-forge/SKILL.md` from the approved Eval Brief, keeping the skill self-contained for v1.
- [x] 2.3 Encode explicit inputs, outputs, stop-and-ask behavior, negative examples, and edge cases.
- [x] 2.4 Keep contract work, skill implementation, and eval runtime architecture explicitly out of scope.

## 3. Minimal catalog alignment

- [x] 3.1 Update `README.md` only as needed so the core skill list reflects the new skill.

## 4. Verification and evidence

- [x] 4.1 Re-run `openspec status --change "add-skill-eval-forge" --json` after the final content-alignment edits.
- [x] 4.2 Re-run `openspec validate "add-skill-eval-forge" --type change` after the final content-alignment edits.
- [x] 4.3 Re-run `npm run validate:skill-metadata` against the final staged artifact.
- [x] 4.4 Refresh command/result/date/note evidence here with the current verification state.

## Evidence

- **Command:** `openspec status --change "add-skill-eval-forge" --json`
  **Result:** PASS - `"isComplete": true`
  **Date:** `2026-03-18`
  **Note:** Final content-aligned change still reports all required OpenSpec artifacts as done.

- **Command:** `openspec validate "add-skill-eval-forge" --type change`
  **Result:** PASS - `Change 'add-skill-eval-forge' is valid`
  **Date:** `2026-03-18`
  **Note:** The final content-aligned change validates cleanly in OpenSpec.

- **Command:** `npm run validate:skill-metadata`
  **Result:** PASS - `Skill metadata validation passed.`
  **Date:** `2026-03-18`
  **Note:** Re-run from a normal local path succeeded against the final staged artifact.
