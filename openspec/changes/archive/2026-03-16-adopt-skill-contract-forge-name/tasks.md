# Tasks: adopt-skill-contract-forge-name

## Execution policy

- Keep the slug focused on the naming migration to `skill-contract-forge`.
- Rename both path names and textual references in the same slug.
- Verify by repository-wide reference search and key-path existence checks.

## Tasks

- [x] 0.1 Create OpenSpec artifacts for the rename slug.
- [x] 1.1 Rename the core skill package and local assets to `skill-contract-forge`.
- [x] 1.2 Rename eval, contract, fixture, and generated-artifact paths that carry the old name.
- [x] 1.3 Update textual references across docs, configs, tests, specs, and archived OpenSpec artifacts.
- [x] 1.4 Validate that old references are gone and renamed paths exist.

## Evidence

### 0.1
- **Command:** `openspec new change "adopt-skill-contract-forge-name"`
- **Result:** PASS.
  `Created change 'adopt-skill-contract-forge-name'`
- **Date:** `2026-03-16`
- **Note:** The rename work now has its own OpenSpec slug.

### 1.1
- **Command:** `rg --files . | rg "packs/core/skill-contract-forge|skill-contract-forge.zip"`
- **Result:** PASS.
  `The core skill package and zip now use the new name.`
- **Date:** `2026-03-16`
- **Note:** The primary authoring surface now presents the new canonical name.

### 1.2
- **Command:** `rg --files . | rg "evals/cases/skill-contract-forge|evals/contracts/skill-contract-forge|skill-contract-forge.contract.yaml|skill-contract-forge.uplift.yaml|skill-contract-forge-suite-model-outputs.json"`
- **Result:** PASS.
  `The main eval and contract path surfaces now use the new name.`
- **Date:** `2026-03-16`
- **Note:** Runtime-facing and authoring-facing eval assets now align on `skill-contract-forge`.

### 1.3
- **Command:** `rg -n "skill-contract-forge" README.md AGENTS.md evals openspec packs package.json PLAN.md`
- **Result:** PASS.
  `The repository text surfaces now point to skill-contract-forge instead of the old name.`
- **Date:** `2026-03-16`
- **Note:** This includes active docs, OpenSpec specs, and archived OpenSpec artifacts.

### 1.4
- **Command:** `rg -ni "skill-forge|skill forge|skill_forge" . --glob '!openspec/changes/adopt-skill-contract-forge-name/**' --glob '!*.zip'`
- **Result:** PASS.
  `No matches`
- **Date:** `2026-03-16`
- **Note:** No legacy-name textual references remain in repository source files after the rename sweep.

### 1.4a
- **Command:** `Test-Path packs/core/skill-contract-forge/SKILL.md; Test-Path evals/cases/skill-contract-forge/suite.v1.json; Test-Path evals/contracts/skill-contract-forge/eval-brief-output.schema.json; Test-Path evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml; Test-Path evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml; Test-Path evals/engines/promptfoo/fixtures/skill-contract-forge-suite-model-outputs.json`
- **Result:** PASS.
  `All key renamed paths exist`
- **Date:** `2026-03-16`
- **Note:** The main skill, contract, suite, and fixture surfaces resolve under the new canonical name.

### 1.4b
- **Command:** `npm run promptfoo:validate && npm run promptfoo:validate:uplift:with-skill && npm run promptfoo:validate:uplift:without-skill`
- **Result:** PASS.
  `Configuration is valid.`
- **Date:** `2026-03-16`
- **Note:** The active Promptfoo configs still validate after the path and reference rename.
