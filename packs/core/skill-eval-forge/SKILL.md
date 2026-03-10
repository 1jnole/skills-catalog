---
name: skill-eval-forge
description: "Turns one `Eval Brief` into a skill-local eval definition and prepares the shared offline runner inputs for a single skill. Use when eval authoring should start from `Eval Brief`, `evals.json`, and skill-local `evals/runs/` without redefining the skill contract."
---

# skill-eval-forge

## Single job
Turn one stable `Eval Brief` into eval-authoring artifacts for the same skill without redefining authoring intent and without implementing the shared runtime.

## When to use
Use this skill when the authoring boundary is already frozen and you need to:
- write or refine `packs/core/<skill-name>/evals/evals.json`;
- define `with_skill` vs `without_skill` comparison intent;
- prepare one skill so the shared runner in `scripts/evals/` can execute it against `packs/core/<skill-name>/evals/runs/`.

## Do not use when
Do not use this skill when:
- the skill contract itself is still changing;
- the task belongs to `skill-forge` or catalog governance;
- the request is to build shared runner behavior, grader internals, or provider plumbing;
- the request mixes multiple skills or multiple independent eval workflows.

## Required inputs
- `Eval Brief ready`
- target skill folder under `packs/core/<skill-name>/`
- skill-local eval definition at `packs/core/<skill-name>/evals/evals.json` if it already exists

`Eval Brief` is not `evals.json`.

`evals.json` is not the same as run outputs under `packs/core/<skill-name>/evals/runs/`.

The success contract is defined upstream in `skill-forge` before the skill is written or refactored. `skill-eval-forge` consumes that contract; it does not invent or renegotiate it.

## Required outputs
- `packs/core/<skill-name>/evals/evals.json`
- optional files under `packs/core/<skill-name>/evals/files/`
- run-ready layout under `packs/core/<skill-name>/evals/runs/iteration-N/` once the shared runner executes

The iteration layout is organized as:
- `benchmark.json` at the iteration root
- one folder per case
- `with_skill/`, `without_skill/`, `outputs/`, `timing.json`, `grading.json`, and `feedback.json` inside each case folder

## Procedure
Step 1: Freeze the handoff.
1. Read `Eval Brief` as the authoring boundary.
2. Preserve the skill contract exactly as received.
3. Preserve the upstream success contract exactly as received.
4. Stop if eval work would require redefining the skill job, trigger boundary, non-goals, or success contract.

Step 2: Author the skill-local eval definition.
1. Write or refine `packs/core/<skill-name>/evals/evals.json`.
2. Make comparison intent explicit: `with_skill` versus `without_skill`.
3. Derive cases and assertions from the already-frozen success contract.
4. Keep the first pass small, offline, and deterministic-first.
5. Group cases into `golden` and `negative`.
6. Keep each case explicit about `expected_output`, `should_trigger`, `stop_at`, and `assertions`.

Step 3: Prepare the skill-local run layout.
1. Keep referenced files under `packs/core/<skill-name>/evals/files/`.
2. Keep run artifacts local to `packs/core/<skill-name>/evals/runs/`.
3. Let the shared runner create `iteration-N/` only when an actual run starts.
4. Reserve `benchmark.json` for iteration aggregate output.

Step 4: Record gates and open needs.
1. Keep gates explicit for `golden` and `negative` coverage.
2. Record deterministic checks before any judge-model idea.
3. If a missing shared-runtime capability is discovered, record it as downstream work instead of inventing runtime behavior here.

## Definition of done
Done means all are true:
- `Eval Brief` was consumed without redefining the skill contract;
- the upstream success contract was consumed without redefining it;
- `packs/core/<skill-name>/evals/evals.json` clearly expresses comparison intent and curated cases;
- the skill-local run layout is unambiguous;
- the output stops before shared runtime implementation.

## Stop conditions
Stop and ask when:
- the incoming `Eval Brief` is incomplete or contradicts the skill contract;
- the upstream success contract is missing, vague, or contradictory;
- runtime behavior must change to keep authoring moving;
- catalog governance rules conflict with the requested eval behavior;
- the request mixes eval authoring with general skill authoring.
