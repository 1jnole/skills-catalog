## 1. OpenSpec artifacts

- [x] 1.1 Keep the proposal, design, and spec deltas aligned to the narrow forge review follow-up scope.

## 2. Runtime surface and documentation

- [x] 2.1 Remove the unsupported public `promptfoo:run:offline` alias from `package.json`.
- [x] 2.2 Update repo-local eval docs and policy docs so they no longer advertise a supported public offline replay path.
- [x] 2.3 Update the affected stable OpenSpec specs so they treat fixture snapshots as optional support artifacts rather than a required public replay surface.

## 3. Repository integrity

- [x] 3.1 Track `packs/core/skill-contract-forge/assets/eval-brief.template.json` at its maintained packaged path.
- [x] 3.2 Track the archived `openspec/changes/archive/2026-03-25-harden-forge-skill-authoring-contracts/` directory.

## 4. Verification

- [x] 4.1 Run `npm run validate:skill-metadata` and record evidence.
- [x] 4.2 Run focused Promptfoo validation for `skill-contract-forge` and record evidence.
- [x] 4.3 Run `openspec validate "fix-forge-review-followups" --type change` and record evidence.

## Evidence

- **Command:** `git status --short`
  **Result:** PASS
  `A  openspec/changes/archive/2026-03-25-harden-forge-skill-authoring-contracts/tasks.md`
  `A  openspec/changes/fix-forge-review-followups/tasks.md`
  `A  packs/core/skill-contract-forge/assets/eval-brief.template.json`
  `D  packs/core/skill-contract-forge/assets/contracts/eval-brief.template.json`
  **Date:** `2026-03-25`
  **Note:** The moved Eval Brief template path and the archived OpenSpec change directory are now tracked instead of remaining untracked follow-up risk.

- **Command:** `npm run validate:skill-metadata`
  **Result:** PASS
  `> validate:skill-metadata`
  `> tsx scripts/validate-skill-metadata.ts`
  `Skill metadata validation passed.`
  **Date:** `2026-03-25`
  **Note:** The repo still accepts the maintained forge skill metadata after removing the unsupported offline public surface from docs and policy.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml`
  **Result:** PASS
  `⚠️ The current version of promptfoo 0.121.2 is lower than the latest available version 0.121.3.`
  `Configuration is valid.`
  **Date:** `2026-03-25`
  **Note:** The maintained `skill-contract-forge` Promptfoo config still parses after narrowing the public command surface to validate/live execution only.

- **Command:** `openspec validate "fix-forge-review-followups" --type change`
  **Result:** PASS
  `Change 'fix-forge-review-followups' is valid`
  **Date:** `2026-03-25`
  **Note:** The proposal, design, spec deltas, and task evidence are internally consistent for the narrow review-follow-up scope.
