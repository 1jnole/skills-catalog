# Tasks: phase-8c-remove-sync-and-skill-local-eval-authoring

## 1. Remove obsolete sync tooling and skill-local eval artifacts

- [x] 1.1 Delete the `skill-contract-forge` Promptfoo sync script and its test.
  - Verification command: `Test-Path scripts/sync-skill-contract-forge-promptfoo.ts; Test-Path scripts/sync-skill-contract-forge-promptfoo.test.ts`
- [x] 1.2 Remove `promptfoo:sync` and `promptfoo:sync:check` from `package.json`.
  - Verification command: `node -e "const p=require('./package.json'); console.log(JSON.stringify({sync:p.scripts['promptfoo:sync'] ?? null, check:p.scripts['promptfoo:sync:check'] ?? null}))"`
- [x] 1.3 Delete `packs/core/skill-contract-forge/evals/evals.json`, `packs/core/skill-contract-forge/evals/README.md`, and the folder if it becomes empty.
  - Verification command: `Test-Path packs/core/skill-contract-forge/evals/evals.json; Test-Path packs/core/skill-contract-forge/evals/README.md; Test-Path packs/core/skill-contract-forge/evals`

## 2. Close the transitional allowance in specs

- [x] 2.1 Tighten stable specs so they no longer permit transitional obsolete files for `skill-contract-forge`.
  - Verification command: `rg -n "transitional|obsolete file MAY remain|before the cleanup slug lands|before cleanup" openspec/specs/skill-contract-forge-promptfoo-eval-runtime/spec.md openspec/specs/skill-contract-forge-dataset-maintenance/spec.md openspec/specs/skill-contract-forge-packaging-alignment/spec.md`

## 3. Verify the Promptfoo-native model remains intact

- [x] 3.1 Confirm no active `skill-contract-forge` residue still references the removed workflow.
  - Verification command: `rg -n "promptfoo:sync|promptfoo:sync:check|sync-skill-contract-forge-promptfoo|This file is the authoring source for this skill|is the active authoring contract|derived from this file" AGENTS.md package.json evals packs/core/skill-contract-forge scripts -g '!openspec/changes/archive/**'`
- [x] 3.2 Validate the OpenSpec change artifacts.
  - Verification command: `openspec validate "phase-8c-remove-sync-and-skill-local-eval-authoring" --type change`
- [x] 3.3 Validate the Promptfoo configs and offline replays after cleanup.
  - Verification command: `npm run promptfoo:validate`
  - Verification command: `npm run promptfoo:validate:uplift:with-skill`
  - Verification command: `npm run promptfoo:validate:uplift:without-skill`
  - Verification command: `npm run promptfoo:run:offline`
  - Verification command: `npm run promptfoo:run:offline:uplift:with-skill`
  - Verification command: `npm run promptfoo:run:offline:uplift:without-skill`

## Evidence

- **Command:** `Test-Path scripts/sync-skill-contract-forge-promptfoo.ts; Test-Path scripts/sync-skill-contract-forge-promptfoo.test.ts`
  - **Result:** PASS
    - `False`
    - `False`
  - **Date:** `2026-03-17`
  - **Note:** The repo-owned sync script and its dedicated test file were removed.

- **Command:** `node -e "const p=require('./package.json'); console.log(JSON.stringify({sync:p.scripts['promptfoo:sync'] ?? null, check:p.scripts['promptfoo:sync:check'] ?? null}))"`
  - **Result:** PASS
    - `{"sync":null,"check":null}`
  - **Date:** `2026-03-17`
  - **Note:** The sync package commands no longer exist in the supported command surface.

- **Command:** `Test-Path packs/core/skill-contract-forge/evals/evals.json; Test-Path packs/core/skill-contract-forge/evals/README.md; Test-Path packs/core/skill-contract-forge/evals`
  - **Result:** PASS
    - `False`
    - `False`
    - `False`
  - **Date:** `2026-03-17`
  - **Note:** The obsolete `skill-contract-forge/evals/` subtree has been removed entirely.

- **Command:** `$matches = rg -n "transitional|obsolete file MAY remain|before the cleanup slug lands|before cleanup" openspec/specs/skill-contract-forge-promptfoo-eval-runtime/spec.md openspec/specs/skill-contract-forge-dataset-maintenance/spec.md openspec/specs/skill-contract-forge-packaging-alignment/spec.md; if ($LASTEXITCODE -eq 0) { $matches; exit 1 } else { "No matches" }`
  - **Result:** PASS
    - `No matches`
  - **Date:** `2026-03-17`
  - **Note:** The stable specs no longer permit transitional obsolete files for `skill-contract-forge`.

- **Command:** `$matches = rg -n "promptfoo:sync|promptfoo:sync:check|sync-skill-contract-forge-promptfoo|This file is the authoring source for this skill|is the active authoring contract|derived from this file" AGENTS.md package.json evals packs/core/skill-contract-forge scripts -g '!openspec/changes/archive/**'; if ($LASTEXITCODE -eq 0) { $matches; exit 1 } else { "No matches" }`
  - **Result:** PASS
    - `No matches`
  - **Date:** `2026-03-17`
  - **Note:** No active `skill-contract-forge` docs, scripts, or manifests still reference the removed sync workflow or skill-local authoring source.

- **Command:** `openspec validate "phase-8c-remove-sync-and-skill-local-eval-authoring" --type change`
  - **Result:** PASS
    - `Change 'phase-8c-remove-sync-and-skill-local-eval-authoring' is valid`
  - **Date:** `2026-03-17`
  - **Note:** The cleanup slug remains valid after the file deletions and spec tightening.

- **Command:** `npm run promptfoo:validate`
  - **Result:** PASS
    - `> promptfoo:validate`
    - `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.yaml`
    - `Configuration is valid.`
  - **Date:** `2026-03-17`
  - **Note:** The canonical contract config remains valid after removing sync and the skill-local eval subtree.

- **Command:** `npm run promptfoo:validate:uplift:with-skill`
  - **Result:** PASS
    - `> promptfoo:validate:uplift:with-skill`
    - `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
    - `Configuration is valid.`
  - **Date:** `2026-03-17`
  - **Note:** The uplift `with_skill` config remains valid after cleanup.

- **Command:** `npm run promptfoo:validate:uplift:without-skill`
  - **Result:** PASS
    - `> promptfoo:validate:uplift:without-skill`
    - `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
    - `Configuration is valid.`
  - **Date:** `2026-03-17`
  - **Note:** The uplift `without_skill` config remains valid after cleanup.

- **Command:** `npm run promptfoo:run:offline`
  - **Result:** PASS
    - `Results: ✓ 12 passed, 0 failed, 0 errors (100%)`
    - `Writing output to evals/engines/promptfoo/generated/skill-contract-forge.eval.json`
  - **Date:** `2026-03-17`
  - **Note:** The canonical offline contract replay still passes `12/12` after removing the obsolete workflow.

- **Command:** `npm run promptfoo:run:offline:uplift:with-skill`
  - **Result:** PASS
    - `Results: ✓ 8 passed, 0 failed, 0 errors (100%)`
    - `Writing output to evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.eval.json`
  - **Date:** `2026-03-17`
  - **Note:** The uplift `with_skill` offline replay still passes `8/8`.

- **Command:** `npm run promptfoo:run:offline:uplift:without-skill`
  - **Result:** PASS
    - `Results: ✓ 8 passed, 0 failed, 0 errors (100%)`
    - `Writing output to evals/engines/promptfoo/generated/skill-contract-forge.uplift.without-skill.offline.eval.json`
  - **Date:** `2026-03-17`
  - **Note:** The uplift `without_skill` offline replay still passes `8/8`.
