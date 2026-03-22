## Design

This change stays at the workflow-guidance layer.

`low-token-execution` already covers:
- one active unit
- frozen `done`
- focused verification first
- compact closure

What it does not own is repo-wide process policy for how OpenSpec work should avoid needless context reload and phase churn. That belongs in `openspec/AGENTS.override.md`.

The refinement therefore adds only workflow heuristics:
- prefer diff-first rereads after the initial context pass
- rerun the narrowest affected surface before broad reruns
- treat `openspec list --json`, `git status`, and similar state snapshots as phase-boundary checks instead of per-micro-step rituals
- on already-applied or already-clean closeout failures, use the smallest deterministic reconciliation that preserves correctness

This does not:
- change forge phase boundaries
- create a new skill
- replace validation with summarization
- alter public npm surface or Promptfoo semantics
