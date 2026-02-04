# Spec — phase7-close-tierc-evals-core-pack

## Objective
Extend the **extended** eval dataset (Tier B+/C coverage) to include the remaining *core-pack* skills that were not yet represented in `evals/prompts.extended.csv`, without changing the core dataset contract.

## Scope
- Add a minimal set of extended prompts (explicit/implicit/contextual/near-miss) for the remaining core-pack skills.
- Reuse existing checks and add **no new dependencies**.
- Add a single reusable fixture under `evals/fixtures/` if needed.

## Out of scope
- Any change to `evals/prompts.csv` (core-only; fixed 28 rows contract).
- Refactors of the eval runner or verify script beyond what’s needed for dataset wiring.

## Acceptance criteria
- `evals/prompts.csv` remains unchanged.
- `evals/prompts.extended.csv` includes 4 prompts (explicit/implicit/contextual/negative near-miss) for each of these skills:
  - core-minimal-diff-implementer
  - core-pr-ready-packager
  - repo-runbook-command-extractor
  - repo-testing-suites-discovery
  - spec-archive-change
  - spec-commit-message-from-slug
  - spec-slice-into-iterations-from-brief
  - spec-slice-into-iterations-from-readme
- Near-miss rows are `invocation=negative`, `should_trigger=false`, `run_mode=workspace-write`, and include `no_writes`.
- `npm run verify` passes.
