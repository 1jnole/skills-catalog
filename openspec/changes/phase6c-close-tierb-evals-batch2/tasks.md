# Tasks — phase6c-close-tierb-evals-batch2

## Plan
- [x] Add Tier B eval rows for `spec-spec-from-brief`, `spec-intake-router`, `spec-apply-with-evidence` in `evals/prompts.extended.csv` (EV-113..EV-124).
- [x] Add one minimal fixture `evals/fixtures/tierb_batch2/` (brief + 2 change scaffolds + verify gate) to support these evals.
- [x] Add one reusable check kind `trace_contains:<needle>` to allow objective checks for output-only routing (`spec-intake-router`).
- [x] Run repo gate: `npm run verify` and capture output.
- [x] (Optional) `node scripts/run-evals.mjs --id EV-117` to validate wiring (expect actionable error if `codex` is not installed).

## Backlog update (Tier B remaining)
After this batch, the remaining Tier B backlog is:
- `spec-change-slugger`
- `spec-drift-check`
- `spec-tasks-lint`
- `core-error-fix-loop`

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
✅ Validated extended eval dataset: 24 rows
✅ No obvious secrets detected
✅ verify: OK
```

### node scripts/run-evals.mjs (optional)
```sh
node scripts/run-evals.mjs --id EV-117
```

```text
ERROR: codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).

=== EV-117 (spec-intake-router) ===
[EV-117] FAIL
 - codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).

Summary: 0/1 passing
Report: evals/artifacts/runs/<runId>/report.json
```
