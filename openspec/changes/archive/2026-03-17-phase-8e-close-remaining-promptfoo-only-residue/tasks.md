# Tasks: phase-8e-close-remaining-promptfoo-only-residue

## 1. Remove the last active retired-authoring residue

- [x] 1.1 Update the active Eval Brief template so its non-goals no longer mention `evals.json`.
  - Verification command: `rg -n "evals\\.json" packs/core/skill-contract-forge/assets/contracts/eval-brief.template.json`
- [x] 1.2 Update the active spec template so it no longer tells maintainers to turn the artifact into `evals.json`.
  - Verification command: `rg -n "evals\\.json" packs/core/skill-contract-forge/assets/spec-template.md`

## 2. Align active docs with the supported Promptfoo command surface

- [x] 2.1 Update the root README Promptfoo command list to include the supported uplift validate and replay commands.
  - Verification command: `rg -n "promptfoo:validate:uplift:with-skill|promptfoo:validate:uplift:without-skill|promptfoo:run:uplift:with-skill|promptfoo:run:uplift:without-skill|promptfoo:run:offline:uplift:with-skill|promptfoo:run:offline:uplift:without-skill" README.md`
- [x] 2.2 Update the active eval READMEs so their supported-command sections match the current supported Promptfoo surface.
  - Verification command: `rg -n "promptfoo:validate:uplift:with-skill|promptfoo:validate:uplift:without-skill|promptfoo:run:uplift:with-skill|promptfoo:run:uplift:without-skill|promptfoo:run:offline:uplift:with-skill|promptfoo:run:offline:uplift:without-skill" evals/README.md evals/engines/promptfoo/README.md`
- [x] 2.3 Add or preserve a clear statement in active evaluation docs that the Promptfoo-native suites are the active `skill-contract-forge` case-definition authority.
  - Verification command: `rg -n "only supported case-authoring source|three Promptfoo-native suites|case-definition authority" README.md evals/README.md evals/engines/promptfoo/README.md`

## 3. Verify the closeout without changing runtime scope

- [x] 3.1 Confirm the active tree no longer teaches the removed workflow.
  - Verification command: `$matches = rg -n --hidden -g '!openspec/changes/archive/**' -g '!node_modules/**' -g '!dist/**' -g '!coverage/**' -e 'evals\\.json' -e 'promptfoo:sync' -e 'promptfoo:sync:check' -e 'sync-skill-contract-forge-promptfoo' -e 'skill-local authoring source' -e 'authoring source for this skill' -e 'canonical authoring source' AGENTS.md README.md package.json evals packs scripts openspec/specs | rg -v "SHALL NOT|must not survive"; if ($LASTEXITCODE -eq 0) { $matches; exit 1 } else { "No disallowed matches" }`
- [x] 3.2 Validate the OpenSpec change artifacts.
  - Verification command: `openspec validate "phase-8e-close-remaining-promptfoo-only-residue" --type change`
- [x] 3.3 Validate the supported Promptfoo configs.
  - Verification command: `npm run promptfoo:validate`
  - Verification command: `npm run promptfoo:validate:uplift:with-skill`
  - Verification command: `npm run promptfoo:validate:uplift:without-skill`
- [x] 3.4 Replay the supported offline Promptfoo surfaces and review anchor cases.
  - Verification command: `npm run promptfoo:run:offline`
  - Verification command: `npm run promptfoo:run:offline:uplift:with-skill`
  - Verification command: `npm run promptfoo:run:offline:uplift:without-skill`
  - Follow-up: `phase-8f-fix-uplift-with-skill-offline-drift`

## Evidence

- **Command:** `$matches = rg -n "evals\\.json" packs/core/skill-contract-forge/assets/contracts/eval-brief.template.json; if ($LASTEXITCODE -eq 0) { $matches; exit 1 } else { "No matches" }`
  - **Result:** PASS
    - `No matches`
  - **Date:** `2026-03-17`
  - **Note:** The active Eval Brief template no longer mentions `evals.json`.

- **Command:** `$matches = rg -n "evals\\.json" packs/core/skill-contract-forge/assets/spec-template.md; if ($LASTEXITCODE -eq 0) { $matches; exit 1 } else { "No matches" }`
  - **Result:** PASS
    - `No matches`
  - **Date:** `2026-03-17`
  - **Note:** The active spec template no longer teaches `evals.json` as a downstream target.

- **Command:** `rg -n "promptfoo:validate:uplift:with-skill|promptfoo:validate:uplift:without-skill|promptfoo:run:uplift:with-skill|promptfoo:run:uplift:without-skill|promptfoo:run:offline:uplift:with-skill|promptfoo:run:offline:uplift:without-skill" README.md`
  - **Result:** PASS
    - `133:- \`npm run promptfoo:validate:uplift:with-skill\``
    - `134:- \`npm run promptfoo:validate:uplift:without-skill\``
    - `137:- \`npm run promptfoo:run:uplift:with-skill\``
    - `138:- \`npm run promptfoo:run:uplift:without-skill\``
    - `139:- \`npm run promptfoo:run:offline:uplift:with-skill\``
    - `140:- \`npm run promptfoo:run:offline:uplift:without-skill\``
  - **Date:** `2026-03-17`
  - **Note:** The root README now documents the supported uplift validation and replay commands.

- **Command:** `rg -n "promptfoo:validate:uplift:with-skill|promptfoo:validate:uplift:without-skill|promptfoo:run:uplift:with-skill|promptfoo:run:uplift:without-skill|promptfoo:run:offline:uplift:with-skill|promptfoo:run:offline:uplift:without-skill" evals/README.md evals/engines/promptfoo/README.md`
  - **Result:** PASS
    - `evals/README.md:31:- \`npm run promptfoo:validate:uplift:with-skill\``
    - `evals/README.md:32:- \`npm run promptfoo:validate:uplift:without-skill\``
    - `evals/engines/promptfoo/README.md:23:- \`npm run promptfoo:validate:uplift:with-skill\``
    - `evals/engines/promptfoo/README.md:24:- \`npm run promptfoo:validate:uplift:without-skill\``
    - `evals/engines/promptfoo/README.md:29:- \`npm run promptfoo:run:offline:uplift:with-skill\``
    - `evals/engines/promptfoo/README.md:30:- \`npm run promptfoo:run:offline:uplift:without-skill\``
  - **Date:** `2026-03-17`
  - **Note:** The active eval READMEs now expose the same supported uplift command surface.

- **Command:** `rg -n "only supported case-authoring source|three Promptfoo-native suites|case-definition authority" README.md evals/README.md evals/engines/promptfoo/README.md`
  - **Result:** PASS
    - `README.md:59:- for \`skill-contract-forge\`, the active case-definition authority lives in the Promptfoo-native suites under \`evals/engines/promptfoo/tests/\``
    - `evals/README.md:48:- for \`skill-contract-forge\`, the three Promptfoo-native suites are also the only supported case-authoring source`
    - `evals/engines/promptfoo/README.md:81:The canonical case-definition authority for \`skill-contract-forge\` lives at:`
  - **Date:** `2026-03-17`
  - **Note:** Active evaluation docs explicitly identify the Promptfoo-native suites as the supported authority.

- **Command:** `$matches = rg -n --hidden -g '!openspec/changes/archive/**' -g '!node_modules/**' -g '!dist/**' -g '!coverage/**' -e 'evals\\.json' -e 'promptfoo:sync' -e 'promptfoo:sync:check' -e 'sync-skill-contract-forge-promptfoo' -e 'skill-local authoring source' -e 'authoring source for this skill' -e 'canonical authoring source' AGENTS.md README.md package.json evals packs scripts openspec/specs | rg -v "SHALL NOT|must not survive"; if ($LASTEXITCODE -eq 0) { $matches; exit 1 } else { "No disallowed matches" }`
  - **Result:** PASS
    - `No disallowed matches`
  - **Date:** `2026-03-17`
  - **Note:** The active tree no longer teaches the removed `evals.json` or sync workflow.

- **Command:** `openspec validate "phase-8e-close-remaining-promptfoo-only-residue" --type change`
  - **Result:** PASS
    - `Change 'phase-8e-close-remaining-promptfoo-only-residue' is valid`
  - **Date:** `2026-03-17`
  - **Note:** The closeout change artifacts are complete and valid.

- **Command:** `npm run promptfoo:validate`
  - **Result:** PASS
    - `> promptfoo:validate`
    - `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.yaml`
    - `Configuration is valid.`
  - **Date:** `2026-03-17`
  - **Note:** The canonical contract config remains structurally valid after the template and doc cleanup.

- **Command:** `npm run promptfoo:validate:uplift:with-skill`
  - **Result:** PASS
    - `> promptfoo:validate:uplift:with-skill`
    - `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
    - `Configuration is valid.`
  - **Date:** `2026-03-17`
  - **Note:** The uplift `with_skill` config remains structurally valid.

- **Command:** `npm run promptfoo:validate:uplift:without-skill`
  - **Result:** PASS
    - `> promptfoo:validate:uplift:without-skill`
    - `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
    - `Configuration is valid.`
  - **Date:** `2026-03-17`
  - **Note:** The uplift `without_skill` config remains structurally valid.

- **Command:** `npm run promptfoo:run:offline`
  - **Result:** PASS
    - `Results: ✓ 12 passed, 0 failed, 0 errors (100%)`
    - `Writing output to evals/engines/promptfoo/generated/skill-contract-forge.eval.json`
  - **Date:** `2026-03-17`
  - **Note:** The canonical contract replay still passes and preserves the expected trigger, non-trigger, stop-and-ask, and Eval Brief boundary anchor cases.

- **Command:** `npm run promptfoo:run:offline:uplift:without-skill`
  - **Result:** PASS
    - `Results: ✓ 8 passed, 0 failed, 0 errors (100%)`
    - `Writing output to evals/engines/promptfoo/generated/skill-contract-forge.uplift.without-skill.offline.eval.json`
  - **Date:** `2026-03-17`
  - **Note:** The baseline uplift replay still passes as an informational non-contract surface.

- **Command:** `npm run promptfoo:run:offline:uplift:with-skill`
  - **Result:** KNOWN FOLLOW-UP
    - `Results: ✓ 7 passed, ✗ 1 failed, 0 errors (87.50%)`
    - `ambiguous-refactor-missing-target -> Classification: trigger`
    - `expected stop-and-ask behavior`
  - **Date:** `2026-03-17`
  - **Note:** The supported `with_skill` offline uplift replay exposes a pre-existing semantic drift outside the documentation-only scope of this slug and is tracked by follow-up change `phase-8f-fix-uplift-with-skill-offline-drift`.
