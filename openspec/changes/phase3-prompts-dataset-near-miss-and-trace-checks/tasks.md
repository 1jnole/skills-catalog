# Tasks — phase3-prompts-dataset-near-miss-and-trace-checks

## Checklist
- [x] Create OpenSpec change folder with `spec.md` and `tasks.md`.
- [x] Update `evals/prompts.csv` to include explicit/implicit/contextual/negative (near-miss) per core skill.
- [x] Ensure negatives run in `workspace-write` and include `no_writes` plus trace-based no-write constraints.
- [x] Add at least one cheap trace-based check (event/JSONL parsing): `no_shell` and `no_file_writes_trace`.
- [x] Update eval dataset validation to require contextual + negative coverage for core skills.
- [x] Validation:
  - [x] `npm run verify`
  - [x] `node scripts/run-evals.mjs` (expected controlled error if `codex` not installed; still validates CSV parsing + wiring)

## Evidence

### npm run verify

```sh
$ npm run verify
```

Output:

```
> verify
> node scripts/verify-skills.mjs

✅ Required instruction docs exist and are within size limits
✅ Required bootstrap assets are present
✅ Validated 54 skills (frontmatter + naming + duplicates + structure)
✅ Validated core eval coverage: 7 skills
✅ Validated eval dataset: 28 rows
✅ No obvious secrets detected
✅ verify: OK
```

### node scripts/run-evals.mjs

```sh
$ node scripts/run-evals.mjs
```

Output:

```
ERROR: codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).

=== EV-001 (agents-bootstrap) ===
[EV-001] FAIL
 - codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).

...

=== EV-028 (spec-spec-lint) ===
[EV-028] FAIL
 - codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).

Summary: 0/28 passing
Report: evals/artifacts/runs/2026-02-02T23-07-14-344Z_1090/report.json
```
