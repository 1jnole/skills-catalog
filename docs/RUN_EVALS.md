# Running verify + evals

This repo is intentionally dependency-free. You can validate it and run evals with just **Node.js (20+)** and **npm**.

## Source of truth
- **Skills live in:** `packs/<pack>/skills/<skill>/SKILL.md` (and optional `assets/`).
- **Skill helper files live in:** `assets/` (a `templates/` directory inside a skill is forbidden).
- **Target repo OpenSpec templates live in:** `openspec/templates/*` (this is within the repo under test / fixture).

## Verify (fast, offline)

```sh
npm run verify
```

Expected output (high level):
- validates skill layout + frontmatter
- validates required docs/assets
- validates eval dataset (`evals/prompts.csv`)

## Eval datasets

- `evals/prompts.csv` — **core-only** dataset. **Contract:** must remain **28 rows** covering **7 core skills**. The verify gate asserts this and prints `Validated core eval coverage: 7 skills` and `Validated eval dataset: 28 rows`.
- `evals/prompts.extended.csv` — optional **extended** dataset for Tier B+ coverage. Verify validates only schema + invariants (no fixed size). The runner executes core + extended.

## Run evals

### Prerequisites
- Install the Codex CLI and make sure it is on PATH:

```sh
npm i -g @openai/codex
codex --help
```

### Run the full dataset (core + extended)

```sh
node scripts/run-evals.mjs
```

### Run a single case

```sh
node scripts/run-evals.mjs --id EV-001
```

### Keep workspaces for debugging

```sh
node scripts/run-evals.mjs --keep-workspaces
```

### Timeouts
The runner enforces a per-case timeout to avoid hanging CI.

```sh
EVAL_TIMEOUT_MS=600000 node scripts/run-evals.mjs
```

## Outputs / artifacts
By default, all outputs are written under `evals/artifacts/` (gitignored):

- `evals/artifacts/runs/<runId>/report.json` — machine-readable report
- `evals/artifacts/runs/<runId>/traces/<EV-###>.jsonl` — Codex JSONL trace (`codex exec --json`)
- `evals/artifacts/runs/<runId>/traces/<EV-###>.stderr.log` — stderr capture (useful when a case fails)
- `evals/artifacts/runs/<runId>/workspaces/<EV-###>/` — materialized fixture workspace (only kept with `--keep-workspaces`)
- `evals/artifacts/codex-home/<runId>/<EV-###>/` — isolated `CODEX_HOME` per case

## Common failure modes
- **`codex not found on PATH`**: install it globally and verify `codex --help` works.
- **Timeout**: increase `EVAL_TIMEOUT_MS` or reduce dataset size while iterating.
