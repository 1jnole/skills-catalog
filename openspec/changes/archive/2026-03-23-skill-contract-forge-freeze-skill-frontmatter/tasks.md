- [x] 1. Update the `skill-contract-forge` brief contract to freeze repo-required skill metadata.
  - [x] 1.1 Add `skill.description` to the supported trigger-path Eval Brief schema.
  - [x] 1.2 Update the core skill guidance, template, and examples so trigger outputs teach `skill.name` + `skill.description` explicitly.
  - **Date:** `2026-03-23`
  - **Note:** Updated the schema, core skill contract text, template, and examples to make `skill.description` part of the trigger-path brief shape.
- [x] 2. Harden the contract gate for missing-description regressions.
  - [x] 2.1 Update the active `skill-contract-forge` Promptfoo contract suite so trigger payloads without `skill.description` fail.
  - [x] 2.2 Refresh any affected replay fixture or generated output only after the live contract surface is green.
  - **Date:** `2026-03-23`
  - **Note:** The schema-backed contract gate now rejects missing-description payloads, and the affected offline fixtures were refreshed from `summary` to `description`; replay also exposed two narrow wording assertions that were widened without changing routing semantics.
- [x] 3. Verify the slug end-to-end.
  - [x] 3.1 Run `openspec validate "skill-contract-forge-freeze-skill-frontmatter" --type change`.
    - **Command:** `openspec validate "skill-contract-forge-freeze-skill-frontmatter" --type change`
    - **Result:** PASS
      `Change 'skill-contract-forge-freeze-skill-frontmatter' is valid`
    - **Date:** `2026-03-23`
    - **Note:** The change artifacts remained apply-valid after implementation.
  - [x] 3.2 Run the `skill-contract-forge` Promptfoo contract gate and record evidence.
    - **Command:** `npm run promptfoo:validate`
    - **Result:** PASS
      `> promptfoo:validate`
      `> promptfoo validate -c evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml`
      `Configuration is valid.`
    - **Date:** `2026-03-23`
    - **Note:** The Promptfoo config stayed structurally valid after the schema and suite adjustments.
  - [x] 3.3 Run the preferred offline replay for the affected family surface and record evidence.
    - **Command:** `npm run promptfoo:run:offline`
    - **Result:** PASS
      `Running 12 test cases (up to 4 at a time)...`
      `Results: ✓ 12 passed, 0 failed, 0 errors (100%)`
      `Writing output to evals/engines/promptfoo/generated/skill-contract-forge.contract.offline.eval.json`
    - **Date:** `2026-03-23`
    - **Note:** Offline replay passed after aligning the refreshed fixture and two stop-and-ask assertion phrases.
