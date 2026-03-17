# Tasks: phase-7c-add-promptfoo-native-sync-guardrails

## 1. Add deterministic Promptfoo suite sync

- [ ] 1.1 Add a repo-local sync/check script for `skill-contract-forge` Promptfoo suites.
  - Verification command: `Test-Path scripts/sync-skill-contract-forge-promptfoo.ts`
- [ ] 1.2 Add automated tests for the sync/check logic and authoring validation.
  - Verification command: `Test-Path scripts/sync-skill-contract-forge-promptfoo.test.ts`

## 2. Add sync package commands

- [ ] 2.1 Add `promptfoo:sync` and `promptfoo:sync:check` scripts.
  - Verification command: `node -e "const p=require('./package.json'); console.log(JSON.stringify({sync:p.scripts['promptfoo:sync'],check:p.scripts['promptfoo:sync:check']}));"`

## 3. Keep the sync boundary runner-free

- [ ] 3.1 Ensure the sync script only writes or checks Promptfoo YAML and does not execute Promptfoo or introduce grading logic.
  - Verification command: `rg -n "promptfoo eval|promptfoo validate|spawn\\(|exec\\(|grading override|local runner" scripts/sync-skill-contract-forge-promptfoo.ts`
- [ ] 3.2 Regenerate or verify the three Promptfoo suites from the authoring source.
  - Verification command: `npm run promptfoo:sync:check`

## Evidence

