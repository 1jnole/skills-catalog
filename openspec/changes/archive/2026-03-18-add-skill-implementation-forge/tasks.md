# Tasks: add-skill-implementation-forge

## 1. OpenSpec scaffolding

- [x] 1.1 Create the OpenSpec change artifacts for `add-skill-implementation-forge`.
- [x] 1.2 Add the new capability spec for `skill-implementation-forge`.
- [x] 1.3 Validate the OpenSpec change before applying repo edits.

## 2. Skill implementation

- [x] 2.1 Create `packs/core/skill-implementation-forge/`.
- [x] 2.2 Author `packs/core/skill-implementation-forge/SKILL.md` from the approved Eval Brief, keeping the skill self-contained for v1.
- [x] 2.3 Encode explicit inputs, outputs, stop-and-ask behavior, negative examples, and edge cases.
- [x] 2.4 Keep Promptfoo-native eval authoring and eval runtime architecture explicitly out of scope.

## 3. Minimal catalog alignment

- [x] 3.1 Update `README.md` only as needed so the core skill list reflects the new skill.

## 4. Verification and evidence

- [x] 4.1 Run `openspec status --change "add-skill-implementation-forge" --json`.
- [x] 4.2 Run `openspec validate "add-skill-implementation-forge" --type change`.
- [x] 4.3 Run `npm run validate:skill-metadata`.
- [x] 4.4 Record command/result/date/note evidence here.

## Evidence

- **Command:** `openspec status --change "add-skill-implementation-forge" --json`
  **Result:** PASS - `isComplete: true`
  **Date:** `2026-03-18`
  **Note:** The slug reached apply-ready state with proposal, design, specs, and tasks all marked done.

- **Command:** `openspec validate "add-skill-implementation-forge" --type change`
  **Result:** PASS - `Change 'add-skill-implementation-forge' is valid`
  **Date:** `2026-03-18`
  **Note:** The change validates cleanly before archive and review.

- **Command:** `npm run validate:skill-metadata`
  **Result:** PASS - `Skill metadata validation passed.`
  **Date:** `2026-03-18`
  **Note:** The new skill frontmatter and metadata shape match repo validation rules.
