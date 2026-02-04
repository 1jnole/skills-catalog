# Spec — phase6a-enable-extended-evals-with-core-contract

## Objective
Enable an **extended** eval dataset (Tier B+) without breaking the existing **core** eval contract.

## Scope
- Keep `evals/prompts.csv` as the **core-only** dataset and preserve its current gate contract:
  - verify prints **exactly**:
    - `Validated core eval coverage: 7 skills`
    - `Validated eval dataset: 28 rows`
- Add `evals/prompts.extended.csv` (same schema) for Tier B+ prompts.
- Update the runner (`scripts/run-evals.mjs`) to execute:
  - core dataset always
  - extended dataset when present and non-empty
- Update the verifier (`scripts/verify-skills.mjs`) to:
  - keep the core checks unchanged for `evals/prompts.csv`
  - validate `evals/prompts.extended.csv` only for schema + invariants (no fixed row count, no coverage requirements).
- Document the contract in `docs/`.

## Out of scope
- Expanding Tier B coverage significantly.
- Changing the repo layout or adding new dependencies.

## Acceptance criteria
1) `evals/prompts.csv` remains unchanged in meaning and verify still emits:
   - `Validated core eval coverage: 7 skills`
   - `Validated eval dataset: 28 rows`
2) `evals/prompts.extended.csv` exists with the same header schema.
3) `scripts/run-evals.mjs` loads core + (optional) extended rows.
4) `scripts/verify-skills.mjs` validates extended dataset (if present) without enforcing fixed size.
5) `docs/RUN_EVALS.md` documents the core vs extended dataset contract.
6) `npm run verify` passes.
