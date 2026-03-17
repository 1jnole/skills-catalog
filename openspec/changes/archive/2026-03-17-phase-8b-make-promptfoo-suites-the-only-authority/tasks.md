# Tasks: phase-8b-make-promptfoo-suites-the-only-authority

## 1. Fix normative authority in OpenSpec and repo instructions

- [x] 1.1 Update stable specs so `skill-contract-forge` authority points only to Promptfoo-native suites.
  - Verification command: `rg -n "canonical authoring source SHALL live at|generated or verified from the canonical skill-local authoring source|sync guardrails are added|eval-authoring move|SHALL be the canonical authoring source" openspec/specs/skill-contract-forge-* openspec/specs/promptfoo-modular-config-topology/spec.md`
- [x] 1.2 Update root and active eval docs so they no longer present `evals.json` or sync/projection as the supported `skill-contract-forge` flow.
  - Verification command: `rg -n "promptfoo:sync|promptfoo:sync:check|sync-skill-contract-forge-promptfoo|is the active authoring contract|derived from this file|This file is the authoring source for this skill" AGENTS.md evals packs/core/skill-contract-forge/evals/evals.json`

## 2. Update active examples and templates

- [x] 2.1 Replace active example/template guidance that still teaches `packs/core/<skill-name>/evals/evals.json`.
  - Verification command: `rg -n "packs/core/<skill-name>/evals/evals.json|packs/core/my-skill/evals/evals.json" packs/core/skill-contract-forge evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`

## 3. Verify phase-8b closes the authority drift

- [x] 3.1 Validate the OpenSpec change artifacts.
  - Verification command: `openspec validate "phase-8b-make-promptfoo-suites-the-only-authority" --type change`
- [x] 3.2 Validate the supported Promptfoo configs after the authority/docs update.
  - Verification command: `npm run promptfoo:validate`
- [x] 3.3 Validate both uplift Promptfoo configs after the authority/docs update.
  - Verification command: `npm run promptfoo:validate:uplift:with-skill`
  - Verification command: `npm run promptfoo:validate:uplift:without-skill`

## Evidence

- **Command:** `$matches = rg -n "canonical authoring source SHALL live at|generated or verified from the canonical skill-local authoring source|sync guardrails are added|eval-authoring move|SHALL be the canonical authoring source" openspec/specs -g "skill-contract-forge-*/spec.md" -g "promptfoo-modular-config-topology/spec.md"; if ($LASTEXITCODE -eq 0) { $matches; exit 1 } else { "No matches" }`
  - **Result:** PASS
    - `No matches`
  - **Date:** `2026-03-17`
  - **Note:** Stable specs no longer describe `evals.json` or sync/projection as the supported `skill-contract-forge` authority model.

- **Command:** `$matches = rg -n "promptfoo:sync|promptfoo:sync:check|sync-skill-contract-forge-promptfoo|is the active authoring contract|derived from this file|This file is the authoring source for this skill" AGENTS.md evals packs/core/skill-contract-forge/evals/evals.json; if ($LASTEXITCODE -eq 0) { $matches; exit 1 } else { "No matches" }`
  - **Result:** PASS
    - `No matches`
  - **Date:** `2026-03-17`
  - **Note:** Root instructions, active eval docs, and the transitional `evals.json` file no longer teach `evals.json` or sync tooling as the supported `skill-contract-forge` flow.

- **Command:** `$matches = rg -n "packs/core/<skill-name>/evals/evals.json|packs/core/my-skill/evals/evals.json" packs/core/skill-contract-forge evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml; if ($LASTEXITCODE -eq 0) { $matches; exit 1 } else { "No matches" }`
  - **Result:** PASS
    - `No matches`
  - **Date:** `2026-03-17`
  - **Note:** Active `skill-contract-forge` examples and templates no longer instruct maintainers to author cases in `evals.json`.

- **Command:** `openspec validate "phase-8b-make-promptfoo-suites-the-only-authority" --type change`
  - **Result:** PASS
    - `Change 'phase-8b-make-promptfoo-suites-the-only-authority' is valid`
  - **Date:** `2026-03-17`
  - **Note:** The change artifacts are complete and valid before handing off to the cleanup slug.

- **Command:** `npm run promptfoo:validate`
  - **Result:** PASS
    - `> promptfoo:validate`
    - `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.yaml`
    - `Configuration is valid.`
  - **Date:** `2026-03-17`
  - **Note:** The canonical contract gate remains syntactically valid after the authority and example updates.

- **Command:** `npm run promptfoo:validate:uplift:with-skill`
  - **Result:** PASS
    - `> promptfoo:validate:uplift:with-skill`
    - `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
    - `Configuration is valid.`
  - **Date:** `2026-03-17`
  - **Note:** The uplift `with_skill` config remains valid after the Promptfoo-native authority documentation update.

- **Command:** `npm run promptfoo:validate:uplift:without-skill`
  - **Result:** PASS
    - `> promptfoo:validate:uplift:without-skill`
    - `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
    - `Configuration is valid.`
  - **Date:** `2026-03-17`
  - **Note:** The uplift `without_skill` baseline config remains valid after the Promptfoo-native authority documentation update.
