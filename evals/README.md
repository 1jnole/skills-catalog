# Evals

`prompts.csv` is the executable regression set for this catalog.

## Run
Requires `codex` installed and on PATH.

```bash
npm run evals
# optional rubric pass (if your Codex CLI supports --output-schema)
npm run evals -- --with-rubric
```

## Inputs
- `fixtures/<name>/` — workspace templates copied per eval row
- `core-skills.json` — skills that must have explicit/implicit/negative coverage
- `rubric/` — optional structured rubric (opt-in)

## Outputs
- `artifacts/workspaces/<EV-ID>/` — per-eval workspace + isolated CODEX_HOME
- `artifacts/<EV-ID>.jsonl` — Codex JSONL trace
- `artifacts/<EV-ID>.stderr.log` — stderr capture
- `artifacts/report.json` — summary report
