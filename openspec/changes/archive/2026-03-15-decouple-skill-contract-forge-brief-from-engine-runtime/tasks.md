# Tasks: decouple-skill-contract-forge-brief-from-engine-runtime

## Phase 0 — Preflight

- [x] 0.1 Run `openspec --version`.
- [x] 0.2 Run `openspec schemas --json`.
- [x] 0.3 Run `openspec status --change "decouple-skill-contract-forge-brief-from-engine-runtime" --json`.
- [x] 0.4 Validate the change artifacts before apply.

## Phase 1 — Contract wording update

- [x] 1.1 Remove the direct Promptfoo runtime-suite block from `packs/core/skill-contract-forge/SKILL.md` and replace it with engine-neutral downstream guidance.
- [x] 1.2 Update the `Local materials` section to say downstream structural validation depends on the stable top-level keys.
- [x] 1.3 Update Step 6 so the brief structure is preserved for downstream structural validation without naming Promptfoo.
- [x] 1.4 Keep the local eval authoring contract reference to `evals/cases/skill-contract-forge/suite.v1.json`.

## Phase 2 — Metadata alignment

- [x] 2.1 Keep the maintained `skill-contract-forge` metadata aligned with the contract-first `Eval Brief ready` boundary.

## Phase 3 — Verification

- [x] 3.1 Run `npm run promptfoo:validate`.
- [x] 3.2 Confirm the core skill contract no longer names the Promptfoo runtime suite directly.
- [x] 3.3 Run `openspec validate "decouple-skill-contract-forge-brief-from-engine-runtime" --type change`.

## Evidence log

### 0.1
- **Command:** `openspec --version`
- **Result:** `1.2.0`
- **Date:** `2026-03-15`
- **Note:** OpenSpec CLI available and working.

### 0.2
- **Command:** `openspec schemas --json`
- **Result:** Returned the `spec-driven` schema with artifacts `proposal`, `specs`, `design`, and `tasks`.
- **Date:** `2026-03-15`
- **Note:** The repo still uses the default OpenSpec workflow.

### 0.3
- **Command:** `openspec status --change "decouple-skill-contract-forge-brief-from-engine-runtime" --json`
- **Result:** `isComplete: true` with `proposal`, `design`, `specs`, and `tasks` all marked `done`.
- **Date:** `2026-03-15`
- **Note:** The slug was apply-ready before file edits.

### 0.4
- **Command:** `openspec validate "decouple-skill-contract-forge-brief-from-engine-runtime" --type change`
- **Result:** `Change 'decouple-skill-contract-forge-brief-from-engine-runtime' is valid`
- **Date:** `2026-03-15`
- **Note:** Artifact validation passed before implementation.

### 1.1
- **Command:** manual edit of `packs/core/skill-contract-forge/SKILL.md`
- **Result:** Replaced the direct Promptfoo runtime-suite block with engine-neutral downstream guidance.
- **Date:** `2026-03-15`
- **Note:** `SKILL.md` now says engine-specific eval execution assets live outside the skill contract.

### 1.2
- **Command:** manual edit of `packs/core/skill-contract-forge/SKILL.md`
- **Result:** Changed the local-materials guardrail to `downstream structural validation depends on them`.
- **Date:** `2026-03-15`
- **Note:** The guardrail stays in place without naming a concrete engine.

### 1.3
- **Command:** manual edit of `packs/core/skill-contract-forge/SKILL.md`
- **Result:** Step 6 now says downstream structural validation can consume the brief without reshaping it.
- **Date:** `2026-03-15`
- **Note:** The contract no longer frames the brief as existing for Promptfoo checks.

### 1.4
- **Command:** inspection of `packs/core/skill-contract-forge/SKILL.md`
- **Result:** The local eval authoring contract reference to `evals/cases/skill-contract-forge/suite.v1.json` was preserved.
- **Date:** `2026-03-15`
- **Note:** Downstream eval authoring context remains discoverable from the skill contract.

### 2.1
- **Command:** metadata alignment review for maintained `skill-contract-forge` surfaces
- **Result:** The maintained skill metadata reflected the contract-first `Eval Brief ready` boundary at the time of the change.
- **Date:** `2026-03-15`
- **Note:** The metadata alignment requirement is preserved even if a legacy agent metadata file is later retired.

### 3.1
- **Command:** `npm run promptfoo:validate`
- **Result:** `Configuration is valid.`
- **Date:** `2026-03-15`
- **Note:** Docs-only changes did not disturb the supported runtime config.

### 3.2
- **Command:** `rg -n "Promptfoo|promptfoo|runtime execution suite|repo eval suite validates|downstream structural validation|engine-specific eval execution assets live outside this skill contract" packs/core/skill-contract-forge/SKILL.md`
- **Result:** `SKILL.md` contains the neutral wording and no longer contains Promptfoo runtime-suite references.
- **Date:** `2026-03-15`
- **Note:** Promptfoo references remain in downstream eval docs, not in the skill core.

### 3.3
- **Command:** `openspec validate "decouple-skill-contract-forge-brief-from-engine-runtime" --type change`
- **Result:** `Change 'decouple-skill-contract-forge-brief-from-engine-runtime' is valid`
- **Date:** `2026-03-15`
- **Note:** Final OpenSpec validation passed after implementation and evidence updates.
