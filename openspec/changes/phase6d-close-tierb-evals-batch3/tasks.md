# Tasks — phase6d-close-tierb-evals-batch3

## Plan
- [x] Add Tier B eval rows for `spec-change-slugger`, `spec-drift-check`, `spec-tasks-lint`, `core-error-fix-loop` in `evals/prompts.extended.csv` (EV-125..EV-140).
- [x] Reuse existing fixtures (`tt_scaffold`, `tierb_batch2`).
- [x] Run repo gate: `npm run verify`.
- [x] Run wiring check: `node scripts/run-evals.mjs --id EV-125` (expected actionable error if `codex` is not installed).

## Backlog update (Tier B remaining)
Tier B is now fully covered in `evals/prompts.extended.csv`.

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
✅ Validated extended eval dataset: 40 rows
✅ No obvious secrets detected
✅ verify: OK
```

### node scripts/run-evals.mjs --id EV-125
```sh
node scripts/run-evals.mjs --id EV-125
```

```text
=== EV-125 (spec-change-slugger) ===
[EV-125] FAIL
 - codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).

Summary: 0/1 passing
Report: /mnt/data/phase6d/skills-catalog/evals/artifacts/runs/2026-02-03T22-50-39-339Z_581/report.json
ERROR: codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).
```
