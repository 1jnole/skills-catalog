- [x] 1. Create the workflow-authority OpenSpec change artifacts.
  - [x] 1.1 Add proposal, design, tasks, and spec delta for the forge workflow policy.
- [x] 2. Align repo-level workflow documentation.
  - [x] 2.1 Update `README.md` so each forge phase has an explicit objective, handoff marker, and built-in relationship.
  - [x] 2.2 Update `AGENTS.md` so the root routing summary matches the forge workflow and current Promptfoo boundary.
- [x] 3. Align forge skill contracts.
  - [x] 3.1 Update `packs/core/skill-contract-forge/SKILL.md` only as needed to keep the phase objective and guardrails explicit.
  - [x] 3.2 Update `packs/core/skill-implementation-forge/SKILL.md` only as needed to keep the phase objective and guardrails explicit.
  - [x] 3.3 Update `packs/core/skill-eval-forge/SKILL.md` only as needed to keep the phase objective and guardrails explicit.
- [x] 4. Verify the workflow-policy change.
  - [x] 4.1 Run `openspec validate "codify-skill-forge-workflow-authority" --type change`.
  - [x] 4.2 If any forge `SKILL.md` changed, run `npm run validate:skill-metadata`.
  - [x] 4.3 Record evidence in the standard OpenSpec format.

## Evidence

- Content alignment completed across `README.md`, `AGENTS.md`, and the three forge `SKILL.md` files.
- **Command:** `openspec validate "codify-skill-forge-workflow-authority" --type change`
  **Result:** PASS - `Change 'codify-skill-forge-workflow-authority' is valid`
  **Date:** `2026-03-18`
  **Note:** Workflow-policy change validates cleanly before archive.
- **Command:** `npm run validate:skill-metadata`
  **Result:** PASS - `Skill metadata validation passed.`
  **Date:** `2026-03-18`
  **Note:** Updated forge `SKILL.md` files satisfy repository metadata rules.
