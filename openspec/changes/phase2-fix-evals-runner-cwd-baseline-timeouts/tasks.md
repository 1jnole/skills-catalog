# Tasks — phase2-fix-evals-runner-cwd-baseline-timeouts

## Checklist
- [x] Create OpenSpec change folder with `spec.md` and `tasks.md`.
- [x] Fix eval runner critical issues:
  - [x] Spawn `codex` with `cwd = wsDir` (materialized fixture).
  - [x] Move `CODEX_HOME` outside `wsDir` under `evals/artifacts/codex-home/<runId>/<caseId>`.
  - [x] Add robust baseline BEFORE/AFTER:
    - [x] `git init` + `git add -A` + `git commit -m "baseline"` when git is available.
    - [x] Snapshot hashes (file list + sha256) to compute `changedPaths` regardless of git.
  - [x] Add per-case timeouts (AbortController / kill fallback) so CI can't hang.
  - [x] Save `--json` traces per run/case outside the workspace (under `evals/artifacts/runs/<runId>/traces/`).
  - [x] Ensure missing `codex` produces a clear, actionable error and still writes a run report.
- [x] Validation:
  - [x] `npm run verify`
  - [x] `node scripts/run-evals.mjs` (expected controlled failure when `codex` is not installed)

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
✅ Validated eval dataset: 21 rows
✅ No obvious secrets detected
✅ verify: OK
```

### node scripts/run-evals.mjs

```sh
$ node scripts/run-evals.mjs
```

Output (on this environment where `codex` is not on PATH):

```
ERROR: codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).

=== EV-001 (agents-bootstrap) ===
[EV-001] FAIL
 - codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).

...

Summary: 0/21 passing
Report: evals/artifacts/runs/2026-02-02T22-50-36-156Z_750/report.json
```

Notes:
- Even without Codex installed, the runner generates:
  - a `runs/<runId>/report.json` run report, and
  - per-case stub traces (`traces/<caseId>.jsonl`) explaining the failure reason.