# Tasks: tighten-forge-promptfoo-semantic-baselines

- [x] 1.1 Narrow `skill-implementation-forge` `without_skill` negatives to skill-owned impersonation markers only.
- [x] 1.2 Narrow `skill-eval-forge` `without_skill` negatives to skill-owned impersonation markers only.
- [x] 1.3 Simplify `skill-contract-forge` ambiguous-target stop-and-ask assertions to smaller semantic anchors.
- [x] 1.4 Simplify the maintained `skill-contract-forge` uplift ambiguous-target stop-and-ask assertions to smaller semantic anchors.
- [x] 1.5 Align top-level Promptfoo docs to the supported public surface without advertising an unsupported offline replay command.
- [x] 1.6 Remove or relax stale `skill-contract-forge` assertions that fail valid semantic behavior, while preserving real routing coverage.
- [x] 1.7 Tighten `skill-contract-forge` response-format guidance so trigger outputs cannot substitute workflow tokens for the required classification line.
- [x] 2.1 Run `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.without-skill.yaml`.
- [x] 2.2 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml`.
- [x] 2.3 Run `promptfoo validate -c evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml`.
- [x] 2.4 Run `promptfoo validate -c evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.with-skill.yaml`.
- [x] 2.5 Run `openspec validate "tighten-forge-promptfoo-semantic-baselines" --type change` after the doc-alignment edits.

## Evidence

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.without-skill.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-25`
  **Note:** The narrowed `without_skill` baseline remains structurally valid after removing generic stop wording negatives.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-25`
  **Note:** The eval-authoring baseline still validates after focusing negatives on skill-owned markers only.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-25`
  **Note:** The contract gate remains valid after simplifying ambiguous-target assertions to smaller semantic anchors.

- **Command:** `openspec validate "tighten-forge-promptfoo-semantic-baselines" --type change`
  **Result:** PASS - `Change 'tighten-forge-promptfoo-semantic-baselines' is valid`
  **Date:** `2026-03-25`
  **Note:** The slug is apply-ready and internally consistent with proposal, specs, design, and tasks artifacts.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.with-skill.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-25`
  **Note:** The maintained `with_skill` uplift remains structurally valid after simplifying the ambiguous stop-and-ask assertions.

- **Command:** `openspec validate "tighten-forge-promptfoo-semantic-baselines" --type change`
  **Result:** PASS - `Change 'tighten-forge-promptfoo-semantic-baselines' is valid`
  **Date:** `2026-03-25`
  **Note:** The slug remains valid after aligning top-level docs to the supported public Promptfoo surface.

- **Command:** `promptfoo eval -c evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml`
  **Result:** REVIEWED
  **Date:** `2026-03-25`
  **Note:** Live semantic review showed one real skill-format bug (`existing-skill-refactor` emitted as the classification line) plus stale lexical assertions on valid non-trigger behavior; this follow-up hardens the skill and relaxes only the obsolete lexical checks.
