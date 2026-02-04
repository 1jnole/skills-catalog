# Spec — phase6d-close-tierb-evals-batch3

## Objective
Add Tier B (P1) extended eval coverage for the remaining Tier B skills:
- `spec-change-slugger`
- `spec-drift-check`
- `spec-tasks-lint`
- `core-error-fix-loop`

Coverage is added to **evals/prompts.extended.csv** only. Core eval dataset (`evals/prompts.csv`) must remain unchanged.

## Scope
- Add 16 extended eval rows (explicit/implicit/contextual/negative) for the 4 skills above (EV-125..EV-140).
- Reuse existing fixtures (`tt_scaffold`, `tierb_batch2`).
- Reuse existing check kinds; no new check kinds are introduced in this phase.

## Design notes
These 4 skills are output-only (no file writes), so the prompts are designed to be objectively checkable using:
- `trace_contains:<needle>` on the saved JSONL trace (asserts specific expected output fragments).
- `no_writes` + `no_file_writes_trace` to enforce no workspace contamination.

## Acceptance criteria
- `evals/prompts.csv` is unchanged.
- `evals/prompts.extended.csv` gains 16 new rows with unique IDs (EV-125..EV-140).
- All new negative near-miss rows are `workspace-write` and include: `no_writes`, `no_file_writes_trace`, `no_shell`, `no_web_search`.
- `npm run verify` passes and still prints the core validation lines (28 rows core dataset and 7 core skills).
