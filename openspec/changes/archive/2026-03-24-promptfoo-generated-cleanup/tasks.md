## 1. OpenSpec artifacts

- [x] 1.1 Write proposal, design, and tasks for `promptfoo-generated-cleanup`.

## 2. Implementation

- [x] 2.1 Add a public cleanup script for Promptfoo generated reports in `package.json`.
- [x] 2.2 Remove the currently retained JSON files under `evals/engines/promptfoo/generated/`.

## 3. Verification

- [x] 3.1 Run the cleanup command and confirm `evals/engines/promptfoo/generated/` no longer contains JSON files.
- [x] 3.2 Validate the OpenSpec change and record evidence.

## Evidence

- **Command:** `npm run promptfoo:clean`
  **Result:** PASS
  > `> promptfoo:clean`
  > `> node -e "const fs=require('fs'); const path=require('path'); ..."`
  **Date:** `2026-03-24`
  **Note:** The public cleanup command completed successfully.

- **Command:** `Get-ChildItem evals/engines/promptfoo/generated -File`
  **Result:** PASS
  > no files returned
  **Date:** `2026-03-24`
  **Note:** The generated Promptfoo report directory is empty after cleanup.

- **Command:** `openspec validate "promptfoo-generated-cleanup" --type change`
  **Result:** PASS
  > `Change 'promptfoo-generated-cleanup' is valid`
  **Date:** `2026-03-24`
  **Note:** The OpenSpec change now includes the required delta and validates cleanly.
