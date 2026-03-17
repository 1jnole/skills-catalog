# Tasks: phase-8d-remove-skill-eval-forge-and-empty-dirs

## 1. Remove the legacy skill from the active core pack

- [x] 1.1 Delete `packs/core/skill-eval-forge/`.
  - Verification command: `Test-Path packs/core/skill-eval-forge`

## 2. Retarget active Promptfoo suites away from the removed skill

- [x] 2.1 Replace active `skill-contract-forge` refactor/rewrite prompts so they no longer name `skill-eval-forge`.
  - Verification command: `rg -n "skill-eval-forge" evals/engines/promptfoo/tests packs/core README.md AGENTS.md openspec/specs -g '!openspec/changes/archive/**'`

## 3. Refresh stale generated outputs and remove empty directories if any appear

- [x] 3.1 Delete stale Promptfoo generated outputs and regenerate the supported offline outputs.
  - Verification command: `Get-ChildItem evals/engines/promptfoo/generated | Select-Object Name`
- [x] 3.2 Remove empty directories created by this cleanup if they appear.
  - Verification command: `Get-ChildItem -Directory -Recurse packs/core,evals/engines/promptfoo/generated | Where-Object { (@(Get-ChildItem $_.FullName -Force | Select-Object -First 1)).Count -eq 0 } | Select-Object -ExpandProperty FullName`

## 4. Verify the active repo tree is free of the removed skill

- [x] 4.1 Validate the OpenSpec change artifacts.
  - Verification command: `openspec validate "phase-8d-remove-skill-eval-forge-and-empty-dirs" --type change`
- [x] 4.2 Confirm no active references to `skill-eval-forge` remain outside archived history.
  - Verification command: `rg -n "skill-eval-forge" . -g '!node_modules/**' -g '!openspec/changes/archive/**' -g '!openspec/changes/phase-8d-remove-skill-eval-forge-and-empty-dirs/**'`
- [x] 4.3 Validate the supported Promptfoo configs and offline replays after retargeting the examples.
  - Verification command: `npm run promptfoo:validate`
  - Verification command: `npm run promptfoo:validate:uplift:with-skill`
  - Verification command: `npm run promptfoo:validate:uplift:without-skill`
  - Verification command: `npm run promptfoo:run:offline`
  - Verification command: `npm run promptfoo:run:offline:uplift:with-skill`
  - Verification command: `npm run promptfoo:run:offline:uplift:without-skill`

## Evidence

- `Test-Path packs/core/skill-eval-forge` -> `False`
- Active suite and doc references were retargeted away from `skill-eval-forge`, and `rg -n "skill-eval-forge" . -g '!node_modules/**' -g '!openspec/changes/archive/**' -g '!openspec/changes/phase-8d-remove-skill-eval-forge-and-empty-dirs/**'` returned no matches.
- `Get-ChildItem evals/engines/promptfoo/generated | Select-Object -ExpandProperty Name` ->
  - `skill-contract-forge.eval.json`
  - `skill-contract-forge.uplift.with-skill.offline.eval.json`
  - `skill-contract-forge.uplift.without-skill.offline.eval.json`
- `Get-ChildItem -Directory -Recurse evals,packs/core | Where-Object { -not (Get-ChildItem $_.FullName -Force | Select-Object -First 1) } | Select-Object -ExpandProperty FullName` -> no output
- `openspec validate "phase-8d-remove-skill-eval-forge-and-empty-dirs" --type change` -> `Change 'phase-8d-remove-skill-eval-forge-and-empty-dirs' is valid`
- `npm run promptfoo:validate` -> `Configuration is valid.`
- `npm run promptfoo:validate:uplift:with-skill` -> `Configuration is valid.`
- `npm run promptfoo:validate:uplift:without-skill` -> `Configuration is valid.`
- `npm run promptfoo:run:offline` -> `12 passed, 0 failed, 0 errors`
- `npm run promptfoo:run:offline:uplift:with-skill` -> `8 passed, 0 failed, 0 errors`
- `npm run promptfoo:run:offline:uplift:without-skill` -> `8 passed, 0 failed, 0 errors`
