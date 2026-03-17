# Tasks: phase-7c-add-promptfoo-native-sync-guardrails

## 1. Add deterministic Promptfoo suite sync

- [x] 1.1 Add a repo-local sync/check script for `skill-contract-forge` Promptfoo suites.
  - Verification command: `Test-Path scripts/sync-skill-contract-forge-promptfoo.ts`
- [x] 1.2 Add automated tests for the sync/check logic and authoring validation.
  - Verification command: `Test-Path scripts/sync-skill-contract-forge-promptfoo.test.ts`

## 2. Add sync package commands

- [x] 2.1 Add `promptfoo:sync` and `promptfoo:sync:check` scripts.
  - Verification command: `node -e "const p=require('./package.json'); console.log(JSON.stringify({sync:p.scripts['promptfoo:sync'],check:p.scripts['promptfoo:sync:check']}));"`

## 3. Keep the sync boundary runner-free

- [x] 3.1 Ensure the sync script only writes or checks Promptfoo YAML and does not execute Promptfoo or introduce grading logic.
  - Verification command: `rg -n "promptfoo eval|promptfoo validate|spawn\\(|exec\\(|grading override|local runner" scripts/sync-skill-contract-forge-promptfoo.ts`
- [x] 3.2 Regenerate or verify the three Promptfoo suites from the authoring source.
  - Verification command: `npm run promptfoo:sync:check`

## Evidence

- **Command:** `Test-Path scripts/sync-skill-contract-forge-promptfoo.ts`
  - **Result:** PASS
    - `True`
  - **Date:** `2026-03-17`
  - **Note:** The repo-local projection/check script exists and is scoped to `skill-contract-forge`.

- **Command:** `Test-Path scripts/sync-skill-contract-forge-promptfoo.test.ts`
  - **Result:** PASS
    - `True`
  - **Date:** `2026-03-17`
  - **Note:** The sync/check script has a dedicated automated test file.

- **Command:** `node -e "const p=require('./package.json'); console.log(JSON.stringify({sync:p.scripts['promptfoo:sync'],check:p.scripts['promptfoo:sync:check']}));"`
  - **Result:** PASS
    - `{"sync":"tsx scripts/sync-skill-contract-forge-promptfoo.ts","check":"tsx scripts/sync-skill-contract-forge-promptfoo.ts --check"}`
  - **Date:** `2026-03-17`
  - **Note:** Package commands now expose projection and drift-check entrypoints without changing the Promptfoo runtime commands.

- **Command:** `rg -n "promptfoo eval|promptfoo validate|spawn\\(|exec\\(|grading override|local runner" scripts/sync-skill-contract-forge-promptfoo.ts`
  - **Result:** PASS
    - `No matches`
  - **Date:** `2026-03-17`
  - **Note:** The sync script does not execute Promptfoo, spawn a subprocess, or introduce a second runner layer.

- **Command:** `npm run promptfoo:sync`
  - **Result:** PASS
    - `Synced contract -> C:\Users\Jorge\WebstormProjects\skills-catalog\evals\engines\promptfoo\tests\skill-contract-forge.contract.yaml`
    - `Synced uplift.with_skill -> C:\Users\Jorge\WebstormProjects\skills-catalog\evals\engines\promptfoo\tests\skill-contract-forge.uplift.yaml`
    - `Synced uplift.without_skill -> C:\Users\Jorge\WebstormProjects\skills-catalog\evals\engines\promptfoo\tests\skill-contract-forge.uplift.without-skill.yaml`
  - **Date:** `2026-03-17`
  - **Note:** The checked-in Promptfoo suites were regenerated directly from the canonical skill-local authoring source.

- **Command:** `npm run promptfoo:sync:check`
  - **Result:** PASS
    - `> promptfoo:sync:check`
    - `> tsx scripts/sync-skill-contract-forge-promptfoo.ts --check`
    - `Promptfoo suites are in sync with packs/core/skill-contract-forge/evals/evals.json.`
  - **Date:** `2026-03-17`
  - **Note:** Drift detection now passes cleanly after suite regeneration.

- **Command:** `npx vitest run scripts/sync-skill-contract-forge-promptfoo.test.ts`
  - **Result:** PASS
    - `Test Files  1 passed (1)`
    - `Tests  7 passed (7)`
  - **Date:** `2026-03-17`
  - **Note:** The sync/check logic, duplicate-ID guardrail, and surface-validation paths are covered by automated tests.

- **Command:** `openspec validate "phase-7c-add-promptfoo-native-sync-guardrails" --type change`
  - **Result:** PASS
    - `Change 'phase-7c-add-promptfoo-native-sync-guardrails' is valid`
  - **Date:** `2026-03-17`
  - **Note:** The phase-7c change artifacts remain valid after adding sync/check guardrails and regenerating the Promptfoo suites.
