# Spec — phase3-prompts-dataset-near-miss-and-trace-checks

## Objective
Make `evals/prompts.csv` provide **real signal** (especially for near-miss negatives) and add **cheap, objective trace-based checks** so we can validate process constraints from the saved JSONL trace.

## Scope
- Update `evals/prompts.csv` for each canonical core skill in `evals/core-skills.json`:
  - 1 explicit prompt
  - 1 implicit prompt
  - 1 contextual prompt (references repo files)
  - 1 negative near-miss prompt (very similar intent, but should not trigger the skill)
- Ensure negatives run in `workspace-write` with `no_writes` (and trace-based no-write constraints).
- Add minimal trace-based checks (event/trace parsing) without adding dependencies.
- Keep dataset small (core skills only) so runtime remains bounded.

## Out of scope
- Adding more skills to the core dataset beyond `evals/core-skills.json`.
- Changing skill content/behavior.
- Changing the eval runner architecture.

## Acceptance criteria
1. For every skill listed in `evals/core-skills.json`, `evals/prompts.csv` contains:
   - explicit + should_trigger=true
   - implicit + should_trigger=true
   - contextual + should_trigger=true
   - negative + should_trigger=false (near-miss)
2. All negative cases:
   - use `run_mode=workspace-write`
   - include `no_writes` and trace-based no-write constraints
3. At least one simple check is trace/event based (e.g. `no_shell`, `no_file_writes_trace`, `no_web_search`).
4. `npm run verify` passes.
