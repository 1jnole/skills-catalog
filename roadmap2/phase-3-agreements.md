# Phase 3 Agreements

These agreements are the operational contract for Phase 3 after reviewing the current repo state against `PLAN.md`.

## Fixed Agreements

1. Laminar becomes the active observability/eval platform, but benchmark semantics stay local to the repo.
2. AI SDK stays inside the executor and OpenAI remains the only real model provider in this phase.
3. `platform = laminar` and `provider = openai` stay separate concepts in both implementation and docs.
4. `run-evals` remains the only supported public execution entrypoint.
5. `--iteration` and `--retry-errors` remain part of the public local contract.
6. Retry and resume stay local to `iteration-N`, `benchmark.json`, and `run.json`; they do not become Laminar-native behavior.
7. The supported flow persists only `benchmark.json` and `run.json`.
8. The legacy runner is removed from the supported flow only after `skill-forge` proves parity.
9. `--group-name` is not part of the Phase 3 contract.

## Corner Cases To Treat As Explicit Decisions

### Retry and resume after Laminar activation

- Local iteration state remains the control plane for reruns.
- `benchmark.json` decides which cases are completed or errored.
- `run.json` may carry Laminar references for traceability, but not benchmark semantics.

### Fail-fast behavior

- Validation order must be:
  1. CLI args
  2. `evals.json`
  3. required credentials and SDK availability
  4. creation of `iteration-N`
- No empty iteration folder may be created on missing auth or dependency failures.

### Provider versus platform coupling

- `run.json.platform` must switch to `laminar` when the active path migrates.
- `run.json.provider` may remain `openai`.
- Domain logic must not start treating Laminar as the owner of pass or fail semantics.

### Parity versus operational noise

- Verification runs should use an explicit timeout profile.
- A single `timeout` or `execution_error` in a verification run is not enough to call regression.
- One additional fresh verification run is allowed before declaring a real parity failure.

### Historical iterations

- Older local iterations may still contain legacy layout.
- Historical compatibility may be retained, but it must not define the supported path for new runs.

## Edge Cases That Must Stay Out of Scope

- Adding a second platform.
- Adding a generic `EvalPlatformAdapter`.
- Broadening the pilot beyond `skill-forge`.
- Expanding the CLI contract beyond what the revised Phase 3 section defines.
