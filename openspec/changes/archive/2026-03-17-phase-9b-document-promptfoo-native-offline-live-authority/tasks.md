# Tasks: phase-9b-document-promptfoo-native-offline-live-authority

## 1. Change scaffolding

- [x] 1.1 Create the OpenSpec change artifacts for this slug and validate the slug shape.
- [x] 1.2 Add a runtime spec delta for the offline/live authority rule.

## 2. Documentation alignment

- [x] 2.1 Update `evals/README.md` to distinguish Promptfoo `validate`, offline replay, live authority, and the informational `without_skill` baseline.
- [x] 2.2 Update `evals/engines/promptfoo/README.md` to describe `--model-outputs` replay as a supported smoke path, not the source of truth for current live behavior.
- [x] 2.3 Update `openspec/AGENTS.override.md` so `npm run promptfoo:run:offline` remains the preferred cheap gate while `live` is the authority when replay and live disagree.

## 3. Verification and evidence

- [x] 3.1 Run `openspec validate "phase-9b-document-promptfoo-native-offline-live-authority" --type change`.
- [x] 3.2 Run `npm run promptfoo:validate`, `npm run promptfoo:validate:uplift:with-skill`, and `npm run promptfoo:validate:uplift:without-skill`.
- [x] 3.3 Record command/result/date/note evidence and confirm that this slug does not change fixtures, scripts, or Promptfoo topology.

## Evidence

- **Command:** `openspec status --change "phase-9b-document-promptfoo-native-offline-live-authority" --json`
  **Result:** PASS - `isComplete: true`
  **Date:** `2026-03-18`
  **Note:** The slug artifacts are complete and apply-ready before implementation.

- **Command:** `openspec validate "phase-9b-document-promptfoo-native-offline-live-authority" --type change`
  **Result:** PASS - `Change 'phase-9b-document-promptfoo-native-offline-live-authority' is valid`
  **Date:** `2026-03-18`
  **Note:** The OpenSpec change validates after adding the runtime authority delta.

- **Command:** `npm run promptfoo:validate`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-18`
  **Note:** The contract Promptfoo config remains structurally valid after the documentation-only changes.

- **Command:** `npm run promptfoo:validate:uplift:with-skill`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-18`
  **Note:** The with-skill uplift config remains structurally valid.

- **Command:** `npm run promptfoo:validate:uplift:without-skill`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-18`
  **Note:** The without-skill uplift config remains structurally valid.

## Notes

- This slug changes documentation and OpenSpec guidance only.
- This slug does not change Promptfoo configs, npm scripts, fixtures, generated outputs, or runtime topology.
- The operational rule recorded by this slug is: offline replay is the preferred low-cost smoke path, while live remains the semantic authority on disagreement.
