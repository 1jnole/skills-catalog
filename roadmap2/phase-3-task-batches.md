# Phase 3 Task Batches

These batches turn the revised Phase 3 contract into tangible work. Each batch must close before the next one starts.

## Batch 0 — Readiness and contract freeze

**Goal**
Lock the implementation decisions that must not be left implicit.

**Prerequisites**
- Phase 2 is closed.
- The revised Phase 3 section of `PLAN.md` is accepted.

**Tasks**
1. Confirm the Laminar integration mechanism and dependency strategy.
2. Freeze the local retry or resume contract for the Laminar path.
3. Freeze the fail-fast order for credentials and dependencies.
4. Freeze the parity policy for transient operational failures.

**Expected output**
- A decision-complete contract for implementation.

**Advance blocker**
- Do not start Batch 1 if any CLI, retry, or credential behavior is still implicit.

## Batch 1 — Laminar boundary skeleton

**Goal**
Create the internal structure of the Laminar integration without retiring legacy yet.

**Prerequisites**
- Batch 0 complete.

**Tasks**
1. Create `dataset-adapter`.
2. Create `executor`.
3. Create `evaluators-adapter`.
4. Create `report`.
5. Define the internal `runText({ mode, model, systemPrompt, userPrompt, files, timeoutMs })` boundary used by the executor.

**Expected output**
- A concrete Laminar boundary with fixed responsibilities.

**Advance blocker**
- Do not start Batch 2 until module ownership and interfaces are stable.

## Batch 2 — Active execution path

**Goal**
Make `run-evals` execute through Laminar.

**Prerequisites**
- Batch 1 complete.

**Tasks**
1. Route `run-evals` to the Laminar path.
2. Validate `LMNR_PROJECT_API_KEY`, `OPENAI_API_KEY`, timeout config, and Laminar SDK readiness before `iteration-N`.
3. Ensure `with_skill` injects `SKILL.md` and `without_skill` remains the baseline path.

**Expected output**
- `run-evals` uses Laminar as the supported execution path.

**Advance blocker**
- Do not start Batch 3 if the command still depends on the legacy execution path.

## Batch 3 — Artifacts and reporting

**Goal**
Produce the same local artifacts through Laminar without changing benchmark semantics.

**Prerequisites**
- Batch 2 complete.

**Tasks**
1. Convert Laminar execution output into the normalized local result shape.
2. Rebuild `benchmark.json` through the existing pure logic.
3. Write `run.json` with neutral fields and `platform: laminar`.
4. Preserve the supported artifact set as only `benchmark.json` and `run.json`.

**Expected output**
- The Laminar path produces the same local reporting surface as the current runner.

**Advance blocker**
- Do not start Batch 4 if benchmark reconstruction still depends on legacy execution internals.

## Batch 4 — Parity on `skill-forge`

**Goal**
Prove that Laminar preserves the accepted local benchmark behavior.

**Prerequisites**
- Batch 3 complete.

**Tasks**
1. Run a fresh `skill-forge` iteration through Laminar.
2. Verify `overall_passed: true`.
3. Verify `with_skill > without_skill`.
4. Verify trigger / non-trigger / stop-and-ask alignment.
5. If a run fails only because of `timeout` or `execution_error`, run one additional fresh verification iteration.
6. Re-run `--iteration` and `--retry-errors` against the green iteration.

**Expected output**
- Parity evidence sufficient to remove the legacy runner from the supported path.

**Advance blocker**
- Do not start Batch 5 until parity is green.

## Batch 5 — Legacy retirement from the supported flow

**Goal**
Remove supported reliance on the old execution path.

**Prerequisites**
- Batch 4 complete.

**Tasks**
1. Identify the legacy modules still used only by the previous execution path.
2. Remove or isolate public routing through the old runner.
3. Keep any historical compatibility code explicitly outside the supported path.

**Expected output**
- The supported flow no longer depends on the legacy runner.

**Advance blocker**
- Do not start Batch 6 while public docs still need to describe legacy as supported.

## Batch 6 — Docs and closeout

**Goal**
Make docs and diagrams match the new supported reality.

**Prerequisites**
- Batch 5 complete.

**Tasks**
1. Update README and `scripts/evals/README.md`.
2. Update Mermaid diagrams in `PLAN.md` if needed.
3. Make Laminar the active supported path in docs.
4. Remove wording that still presents the legacy runner as supported.

**Expected output**
- Code, docs, and architecture all tell the same story.

**Advance blocker**
- None. This batch closes the preparation and implementation sequence.
