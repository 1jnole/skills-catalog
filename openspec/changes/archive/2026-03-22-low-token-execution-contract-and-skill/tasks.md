## 1. OpenSpec artifacts

- [x] 1.1 Write proposal, design, and delta spec for `low-token-execution-contract-and-skill`.

## 2. Implementation

- [x] 2.1 Add the permanent `low-token-execution` capability spec with explicit trigger, non-trigger, stop-and-ask, and terminal-marker rules.
- [x] 2.2 Implement `packs/core/low-token-execution/SKILL.md` aligned to the contract and keep the package shallow.

## 3. Verification

- [x] 3.1 Validate the OpenSpec change and record evidence.
- [x] 3.2 Run quick validation on the new skill package and record evidence.

## Evidence

- **Command:** `openspec validate "low-token-execution-contract-and-skill" --type change`
  **Result:** PASS - `Change 'low-token-execution-contract-and-skill' is valid`
  **Date:** `2026-03-20`
  **Note:** The change artifacts and delta spec validate cleanly.
- **Command:** `python C:/Users/Jorge/.codex/skills/.system/skill-creator/scripts/quick_validate.py packs/core/low-token-execution`
  **Result:** PASS - `Skill is valid!`
  **Date:** `2026-03-20`
  **Note:** The new skill folder passes structural validation after removing non-ASCII punctuation from `SKILL.md`.
