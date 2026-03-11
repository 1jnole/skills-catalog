# Phase 3 Gates and Parity

## Entry Gate

Phase 3 preparation is ready to turn into implementation only when:

- Phase 2 is closed.
- `skill-forge` has a green accepted baseline.
- New supported iterations already persist only `benchmark.json` and `run.json`.
- The revised Phase 3 section of `PLAN.md` is in place.
- `roadmap2/` has closed the agreements and alignment gaps.

## Batch Gates

### Batch 0

- All operational decisions are explicit.
- No unresolved drift remains for CLI, retry, or credentials.

### Batch 1

- The Laminar boundary modules are defined.
- The executor contract is frozen.

### Batch 2

- `run-evals` routes through Laminar.
- Missing Laminar or OpenAI credentials fail before `iteration-N`.

### Batch 3

- `benchmark.json` is rebuilt from Laminar-derived normalized results.
- `run.json` remains neutral and records the Laminar platform.
- No supported path writes extra artifacts.

### Batch 4

- `skill-forge` reaches `overall_passed: true`.
- `with_skill` still outperforms `without_skill`.
- trigger / non-trigger / stop-and-ask remain aligned.
- retry and resume still work locally on the green iteration.

### Batch 5

- The supported flow no longer depends on the previous execution path.
- Any retained historical compatibility is clearly isolated.

### Batch 6

- Docs and Mermaid diagrams match the implemented state.
- Legacy is no longer documented as part of the supported path.

## Parity Policy

- Verification runs should use an explicit timeout profile.
- A single `timeout` or `execution_error` during verification is treated as operational noise first, not immediate semantic regression.
- One additional fresh verification run is allowed after a transient operational failure.
- If a semantic mismatch repeats after that rerun, parity is considered failed.

## Final Done Gate

Phase 3 is complete only when:

- `run-evals` uses Laminar as the supported flow.
- `skill-forge` maintains `overall_passed: true`.
- `with_skill` continues to beat `without_skill`.
- trigger / non-trigger / stop-and-ask remain aligned.
- only `benchmark.json` and `run.json` remain supported as persisted artifacts.
- the supported flow no longer depends on the legacy runner.
