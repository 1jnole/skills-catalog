# Tasks — phase6a-enable-extended-evals-with-core-contract

## Checklist
- [x] Confirm core dataset validation lives in `scripts/verify-skills.mjs` and prints the core contract lines.
- [x] Add `evals/prompts.extended.csv` (same schema as `evals/prompts.csv`).
- [x] Update `scripts/run-evals.mjs` to load core + (optional) extended dataset.
- [x] Update `scripts/verify-skills.mjs` to validate extended dataset by schema + invariants (no fixed size), without changing the core dataset checks.
- [x] Document the contract in docs (`docs/RUN_EVALS.md`).
- [x] Run validations and capture outputs.

## Notes / repo evidence

### Where the core contract is enforced
- `scripts/verify-skills.mjs` validates core coverage via `evals/core-skills.json` and prints:
  - `ok(\`Validated core eval coverage: ${coreSkills.length} skills\`)`
  - `ok(\`Validated eval dataset: ${ids.size} rows\`)`

See around lines **437–440** (after scanning `evals/prompts.csv` and enforcing per-core-skill coverage).

### Extended dataset validation shape
- `evals/prompts.extended.csv` is optional. If present:
  - header must include required columns (`id,skill,invocation,should_trigger,fixture,run_mode,prompt,checks_json`)
  - ids must be unique and must not collide with `evals/prompts.csv`
  - referenced skills must exist in the canonical catalog
  - `invocation` must be one of `explicit|implicit|contextual|negative`
  - checks must be known (simple checks or recognized check kinds)
  - negatives (`invocation=negative`) must use `run_mode=workspace-write` and include `no_writes`

### Runner behavior
- `scripts/run-evals.mjs` always loads `evals/prompts.csv`, then appends rows from `evals/prompts.extended.csv` when the file exists and has at least 1 data row.
- Prevents duplicate eval ids across datasets (would overwrite trace paths).

## Evidence

### npm run verify

```sh
npm run verify
```

```text
> verify
> node scripts/verify-skills.mjs

✅ Required instruction docs exist and are within size limits
✅ Required bootstrap assets are present
✅ Validated 54 skills (frontmatter + naming + duplicates + structure)
✅ Validated core eval coverage: 7 skills
✅ Validated eval dataset: 28 rows
✅ Validated extended eval dataset: 0 rows (empty)
✅ No obvious secrets detected
✅ verify: OK
```

### node scripts/run-evals.mjs (no-codex path)

```sh
node scripts/run-evals.mjs --id EV-001
```

```text
ERROR: codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).

=== EV-001 (agents-bootstrap) ===
[EV-001] FAIL
 - codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).

Summary: 0/1 passing
Report: /mnt/data/phase6a/skills-catalog/evals/artifacts/runs/2026-02-03T10-40-57-144Z_478/report.json
```
