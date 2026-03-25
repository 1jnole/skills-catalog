## 1. OpenSpec artifacts

- [x] 1.1 Keep the proposal, design, and spec deltas aligned to the forge-family hardening scope.

## 2. Forge skill contract updates

- [x] 2.1 Update `packs/core/skill-contract-forge/SKILL.md` to route maintained `assets/` explicitly with forward-slash relative paths and decision-point guidance.
- [x] 2.2 Align maintained forge-family frontmatter descriptions and `skill-contract-forge` brief-description guidance to third-person routing metadata.
- [x] 2.3 Update `packs/core/skill-implementation-forge/SKILL.md` and its support examples to define the exact `Result:` response envelope for trigger, non-trigger, and stop-and-ask paths.
- [x] 2.4 Update `packs/core/skill-eval-forge/SKILL.md` and its support examples to define the exact `Result:` response envelope for trigger, non-trigger, and stop-and-ask paths.

## 3. Promptfoo contract alignment

- [x] 3.1 Update the focused Promptfoo tests for `skill-implementation-forge` to validate the new response envelope without widening the suite.
- [x] 3.2 Update the focused Promptfoo tests for `skill-eval-forge` to validate the new response envelope without restoring `Classification:` or `Workflow:` expectations.
- [x] 3.3 Align maintained Promptfoo `with_skill` harness guidance for `skill-implementation-forge` and `skill-eval-forge` to the `Result:` response boundary they now require.

## 4. Verification

- [x] 4.1 Run `npm run validate:skill-metadata` and record evidence.
- [x] 4.2 Run focused Promptfoo family validation for the affected forge families, then record evidence.
- [x] 4.3 Re-run `openspec validate "harden-forge-skill-authoring-contracts" --type change` and record evidence.

## Evidence

- **Command:** `npm run validate:skill-metadata`
  **Result:** PASS
  `> validate:skill-metadata`
  `> tsx scripts/validate-skill-metadata.ts`
  `Skill metadata validation passed.`
  **Date:** `2026-03-25`
  **Note:** The edited forge skill metadata remained valid after the response-boundary changes and the third-person routing-metadata alignment.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml`
  **Result:** PASS
  `Configuration is valid.`
  **Date:** `2026-03-25`
  **Note:** The implementation-family contract config still parses after adding `Result:` envelope assertions and aligning the maintained `with_skill` harness guidance to the same boundary.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml`
  **Result:** PASS
  `Configuration is valid.`
  **Date:** `2026-03-25`
  **Note:** The eval-family contract config still parses after aligning the maintained `with_skill` harness guidance to the `Result:` boundary.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml`
  **Result:** PASS
  `Configuration is valid.`
  **Date:** `2026-03-25`
  **Note:** The contract-family config still parses after flattening the Eval Brief template path, explicitly routing the remaining asset surfaces, and aligning description assertions to third-person routing metadata.

- **Command:** `openspec validate "harden-forge-skill-authoring-contracts" --type change`
  **Result:** PASS
  `Change 'harden-forge-skill-authoring-contracts' is valid`
  **Date:** `2026-03-25`
  **Note:** The proposal, design, specs, and tasks remain consistent after apply.
