- [x] 1. Tighten the `skill-implementation-forge` implementation contract around frontmatter authority.
  - [x] 1.1 Update the stable `skill-implementation-forge` capability spec to require canonical `skill.name` + `skill.description` authority and metadata validation before terminal closure.
  - [x] 1.2 Update the maintained `packs/core/skill-implementation-forge/SKILL.md` text so approved contracts missing `skill.description` trigger stop-and-ask.
  - **Date:** `2026-03-23`
  - **Note:** The stable spec delta and maintained skill text now treat `skill.name` plus `skill.description` as required implementation authority and add `npm run validate:skill-metadata` to the closure path.
- [x] 2. Harden the active Promptfoo family for the new implementation boundary.
  - [x] 2.1 Add contract coverage proving that missing `skill.description` in the approved contract artifact blocks trigger-path completion.
  - [x] 2.2 Add comparative uplift coverage proving that valid trigger completion remains tied to the metadata-validation gate.
  - **Date:** `2026-03-23`
  - **Note:** The contract suite now checks explicit frontmatter authority and missing-description stop-and-ask behavior; the uplift suite adds the same regression and keeps the trigger case validation-aware after one wording fix.
- [x] 3. Verify, review, and archive the slug.
  - [x] 3.1 Run `openspec validate "skill-implementation-forge-enforce-skill-frontmatter" --type change`.
    - **Command:** `openspec validate "skill-implementation-forge-enforce-skill-frontmatter" --type change`
    - **Result:** PASS
      `Change 'skill-implementation-forge-enforce-skill-frontmatter' is valid`
    - **Date:** `2026-03-23`
    - **Note:** The change artifacts remained apply-valid before archive.
  - [x] 3.2 Run `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml`.
    - **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml`
    - **Result:** PASS
      `Configuration is valid.`
    - **Date:** `2026-03-23`
    - **Note:** The maintained contract gate stayed structurally valid after the new cases and assertions.
  - [x] 3.3 Run the maintained `skill-implementation-forge` family live contract gate and record evidence.
    - **Command:** `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml -o evals/engines/promptfoo/generated/skill-implementation-forge.contract.live.eval.json --no-progress-bar --table-cell-max-length 80`
    - **Result:** PASS
      `Results: ✓ 17 passed, 0 failed, 0 errors (100%)`
      `Writing output to evals/engines/promptfoo/generated/skill-implementation-forge.contract.live.eval.json`
    - **Date:** `2026-03-23`
    - **Note:** Live contract coverage passed, including the new missing-description regression and the validation-gate assertion on the trigger case.
  - [x] 3.4 Run `npm run validate:skill-metadata`.
    - **Command:** `npm run validate:skill-metadata`
    - **Result:** PASS
      `Skill metadata validation passed.`
    - **Date:** `2026-03-23`
    - **Note:** The maintained skill frontmatter still satisfies the repo-local validator after the implementation-phase tightening.
  - [x] 3.5 Review the diff for errors, fix any findings, and archive the slug.
    - **Review:** PASS
      No blocking findings after diff review; the only discovered issue was a failing uplift trigger assertion for the validation gate, which was fixed by making the uplift prompt request that gate explicitly and then re-running the suite.
    - **Additional evidence:** PASS
      `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.with-skill.yaml` -> `Configuration is valid.`
      `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.with-skill.yaml -o evals/engines/promptfoo/generated/skill-implementation-forge.uplift.with-skill.live.eval.json --no-progress-bar --table-cell-max-length 80` -> `Results: ✓ 7 passed, 0 failed, 0 errors (100%)`
    - **Date:** `2026-03-23`
    - **Note:** The changed uplift surface is now green and ready to archive with the contract surface.
