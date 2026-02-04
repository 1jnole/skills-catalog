# Phase 6B — Close Tier B evals (batch 1)

## Objective
Add the first Tier B (P1) batch of extended eval prompts **without changing** the core dataset contract.

## Scope
- Add **12** Tier B prompts to `evals/prompts.extended.csv` (IDs `EV-101..EV-112`).
- Cover **3 Tier B skills** with **4 prompts each**:
  - explicit (names the skill)
  - implicit (intent only)
  - contextual (references repo/fixture files)
  - negative near-miss (should_trigger=false, workspace-write, includes `no_writes`)
- Reuse existing deterministic checks (no new check kinds).
- Reuse existing fixtures where possible; add **one minimal fixture** only if needed to make the prompts objectively checkable.

## Out of scope
- Any change to `evals/prompts.csv` (core-only, fixed at 28 rows).
- Adding new dependencies or refactoring the eval runner.
- Adding full Tier B coverage across all Tier B skills.

## Acceptance criteria
- `evals/prompts.csv` remains byte-for-byte unchanged (core-only; 28 rows).
- `evals/prompts.extended.csv`:
  - has the same schema as core prompts
  - contains exactly 12 new rows with unique IDs `EV-101..EV-112`
  - uses only known skills and existing check kinds
  - negative rows comply with: `invocation=negative`, `should_trigger=false`, `run_mode=workspace-write`, and include `no_writes`
- `npm run verify` passes and still prints the **core** validation lines:
  - `Validated eval dataset: 28 rows`
  - `Validated core eval coverage: 7 skills`
  - plus the extended validation line.
- (Optional) `node scripts/run-evals.mjs --id EV-101` fails **actionably** when Codex CLI is missing, and otherwise runs.
