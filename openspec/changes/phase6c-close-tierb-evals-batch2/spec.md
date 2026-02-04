# Spec — phase6c-close-tierb-evals-batch2

## Objective
Add Tier B (P1) eval coverage for:
- `spec-spec-from-brief`
- `spec-intake-router`
- `spec-apply-with-evidence`

Coverage is added to **evals/prompts.extended.csv** only. Core contract remains unchanged (`evals/prompts.csv` stays 28 rows, core coverage stays 7 skills).

## Scope
- Add 12 extended eval rows (explicit/implicit/contextual/negative) for the 3 skills above.
- Reuse existing checks; add at most one new, cheap check kind if required.
- Reuse existing fixtures when possible; add at most one small new fixture if required.

## Design notes
### New check kind (if needed)
- `trace_contains:<needle>`
  - Purpose: make output-only skills objectively checkable via the saved JSONL trace.
  - Implementation: case-insensitive substring search over the JSONL text.

## Acceptance criteria
- `evals/prompts.csv` is unchanged.
- `evals/prompts.extended.csv` gains 12 new rows with unique IDs (EV-113..EV-124).
- Any new fixture is minimal and stable.
- `npm run verify` passes and still prints the core validation lines (28 rows + 7 skills).
