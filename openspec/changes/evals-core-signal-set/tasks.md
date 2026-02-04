# Tasks — evals-core-signal-set

## Objective
Ensure evals are not 'for show' by enforcing explicit/implicit/negative control coverage for a small core skill set.

## Checklist
- [x] Define `evals/core-skills.json` with rationale and keep it small (signal > coverage).
- [x] Ensure `evals/prompts.csv` includes 3 cases per core skill (explicit, implicit, negative).
- [x] Ensure all prompts/fixtures are domain-agnostic.
- [x] Verify script enforces coverage for core skills.

## Evidence (commands + outputs)
- [x] `npm run verify` — OK (core coverage enforced)
