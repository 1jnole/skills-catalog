# Spec — phase2-fix-evals-runner-cwd-baseline-timeouts

## Objective
Fix **critical** issues in `scripts/run-evals.mjs` so eval checks measure the correct workspace and produce interpretable artifacts:

- Codex runs with `cwd = wsDir` (the materialized fixture).
- `CODEX_HOME` is outside the workspace.
- Baselines are robust (git baseline commit when possible + snapshot hashes).
- Per-case timeouts prevent CI hangs.
- Traces (`--json`) are saved per run/case outside the workspace.

## Scope
- Minimal fixes to `scripts/run-evals.mjs` and supporting helpers.
- No dependency additions.
- Keep repo layout and existing eval dataset intact.

## Out of scope
- Changing eval datasets, prompts, or skill behavior.
- Introducing new tooling or dependencies.

## Acceptance criteria
1. `codex` is spawned with `cwd = wsDir` for every eval case.
2. `CODEX_HOME` is created under `evals/artifacts/...` (outside `wsDir`) per run/case.
3. Baseline BEFORE/AFTER is robust:
   - Prefer: git init + baseline commit.
   - Always: snapshot hashes used to compute `changedPaths`.
4. Each Codex invocation has a timeout; timeouts surface as a clear failure reason.
5. Trace JSONL (`--json`) is saved per run/case outside `wsDir`.
6. `npm run verify` passes.