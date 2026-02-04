# Tasks — evals-determinism-baseline

## Objective
Stabilize eval execution by isolating skill scope per eval, disabling web search, and failing cleanly when Codex isn't available.

## Checklist
- [x] Runner places global flags after the subcommand (`codex exec -c ...`) per official docs.
- [x] Runner disables web search via `-c web_search=disabled`.
- [x] Runner isolates skills per eval using a temp `CODEX_HOME`.
- [x] Runner supports optional `--model` and `--profile` to pin behavior.
- [x] Runner prints `--help` and errors are actionable (no unhandled spawn events).

## Evidence (commands + outputs)
- [x] `npm run verify` — OK (structural checks + eval dataset validation)
- [x] `node scripts/run-evals.mjs --help` — OK (usage printed)
