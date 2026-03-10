---
name: skill-forge
description: "Builds or rewrites one skill through a contract-first workflow and stops at Eval Brief ready. Use when the request is one skill-authoring job with clear boundaries. Don't use when the task is repository policy, downstream eval authoring, or shared eval runtime implementation."
---

# skill-forge

This folder is the operational source of truth for `skill-forge`. Use it to route requests, define success, and produce the handoff artifact.

## Routing precedence
Apply these decisions in order. Do not skip ahead to missing-input checks before routing the request.

1. If the request starts from a finished `Eval Brief`, asks for `golden` or `negative` cases, or asks to write `packs/core/<skill>/evals/evals.json`, return `Classification: non-trigger` immediately.
2. If the request is obvious non-authoring work such as `AGENTS.md`, repo policy, runtime-only implementation, or downstream eval authoring, return `Classification: non-trigger` immediately.
3. If the request is clearly skill authoring and eval or runtime work is only secondary or deferred, return `Classification: trigger` and keep skill authoring as the active responsibility.
4. Only return `Classification: stop-and-ask` when the request still plausibly belongs to skill authoring but the skill target, single job, or authoring boundary is genuinely unclear.

Routing examples:
- `Take this finished Eval Brief and turn it into golden and negative cases in packs/core/my-skill/evals/evals.json.` -> `Classification: non-trigger`
- `Write a new skill for PR review routing and leave eval scaffold for later.` -> `Classification: trigger`
- `Create a skill, reorganize repo policies, and build the first runner in one pass.` -> `Classification: stop-and-ask`

## Single job
Produce one `Eval Brief ready` artifact for one skill by freezing: single job, trigger boundary, non-trigger boundary, success model, activation probes, nearby negatives, and stop conditions.

## When to use
Use this skill when the request is to create a new reusable skill or refactor one existing skill and you need a contract-first output that downstream eval authoring can consume without guessing intent.

## Do not use when
Do not use this skill when:
- the request is repository-wide policy (`AGENTS.md`);
- the request is to implement eval runtime behavior, grading, or suite orchestration;
- the request is eval authoring downstream from an already-finished brief, including requests to turn a finished Eval Brief into `evals.json` cases;
- the request mixes multiple independent workflows in one skill and authoring is not clearly primary.

## Required output
Use one of these response modes exactly.

For trigger cases:
1. Start with `Classification: trigger`.
2. Name the workflow explicitly as one of: `Workflow: new-skill`, `Workflow: existing-skill-refactor`, or `Workflow: skill-rewrite`.
3. If eval or runtime work appears but skill authoring is clearly primary, keep skill authoring as the active responsibility and add the exact sentence `Downstream eval work is out of scope here.` before the JSON artifact. Keep that note short and do not mention runner or benchmark behavior.
4. Do not ask for confirmation if the skill target and authoring job are already clear.
5. Produce the boundary-only JSON artifact.
6. End with the exact line `Eval Brief ready`.

For non-trigger cases:
1. Start with `Classification: non-trigger`.
2. Say exactly `Out of scope for skill-forge.`
3. Name the reason in one sentence.
4. Use this mode for obvious non-authoring work such as AGENTS policy, runtime-only implementation, or eval-authoring-only requests, even if the request is missing inputs or the referenced brief content is not attached.
5. Do not produce an Eval Brief.

For stop-and-ask cases:
1. Start with `Classification: stop-and-ask`.
2. Say exactly `Scope clarification required.`
3. Use stop-and-ask only when the request is still plausibly skill authoring and the skill target, single job, or authoring boundary is genuinely unclear.
4. Do not use stop-and-ask for obvious non-trigger requests.
5. State which part of the authoring target or boundary is unclear.
6. Do not produce an Eval Brief.

For this repository, the canonical template is:
- `packs/core/skill-forge/assets/contracts/eval-brief.template.json`

For the current in-repo eval example of this skill, the cases live at:
- `packs/core/skill-forge/evals/evals.json`

## Local materials
Use these local files only when they help the current authoring run:
- `packs/core/skill-forge/assets/contracts/eval-brief.template.json` to structure the boundary-only handoff artifact.
- `packs/core/skill-forge/assets/spec-template.md` to sanity-check that the brief stops at `Eval Brief ready`.
- `packs/core/skill-forge/assets/skill-template.job.md` and `packs/core/skill-forge/assets/skill-template.guardrail.md` only when the target skill itself needs a local starting shape.
- `packs/core/skill-forge/evals/evals.json` as a downstream validation example for this skill, not as an input required to author the brief.

## Procedure
Step 1: Define success before writing or refactoring the skill.
1. Freeze a small success contract before touching final skill instructions.
2. Record outcome goals: what the skill must successfully produce when it applies.
3. Record boundary goals: trigger, non-trigger, and stop-and-ask.
4. Record style goals: the required output shape and stop marker.
5. Keep the list small and limited to must-pass checks for this skill.

Step 2: Route the request before authoring.
1. Apply the routing precedence section above first.
2. If the request is obvious non-authoring work, return `Classification: non-trigger` immediately.
3. If the request mixes authoring with eval or runtime work but skill authoring is clearly primary, continue and defer the downstream work explicitly.
4. Only use `stop-and-ask` if the request still looks like skill authoring but the target or boundary is unclear.

Step 3: Freeze scope for one skill.
1. Confirm one skill target and one single job.
2. Confirm whether the workflow is `new-skill`, `existing-skill-refactor`, or `skill-rewrite`.
3. Freeze trigger boundary and stop conditions.
4. Freeze activation probes and nearby negatives.

Step 4: Capture boundary input.
1. Start from `packs/core/skill-forge/assets/contracts/eval-brief.template.json`.
2. Fill only boundary fields: skill identity, authoring boundary, success model, probes, negative signals, source refs.
3. Keep the brief free of runtime, dataset, benchmark, or grader detail.
4. Treat the success contract from Step 1 as required input to the brief, not as optional commentary.
5. Keep `sourceRefs` limited to source material that justifies the target skill contract. Do not list repo planning documents as required inputs for the brief.

Step 5: Stabilize the local contract before handoff.
1. Check one trigger, one nearby non-trigger, and one edge case against the frozen boundary.
2. Fold any failure back into routing, stop conditions, or success criteria before writing the final brief.
3. Keep support files lean. Only rely on local templates that add real authoring value.

Step 6: Produce the Eval Brief.
1. Materialize the JSON artifact from the filled template.
2. Keep the artifact boundary-only: no runtime implementation detail, no eval scaffold layout, no scorer logic. Keep any downstream defer note outside the JSON payload.
3. Record any unresolved downstream dependency as a short note outside the JSON payload instead of inventing runtime behavior. Do not mention runner, grading, or benchmark behavior inside the brief payload.
4. End the response with the exact line `Eval Brief ready`.

Step 7: Metadata discipline.
1. Keep the frontmatter name and description aligned with the actual skill boundary.
2. Do not add runtime, grading, or benchmark promises to the metadata.

## Definition of done
Done means all are true:
- `Eval Brief ready` exists for the target skill when the case is a trigger;
- the success contract was defined before writing or refactoring the skill;
- authoring boundary, success model, and probes are explicit and source-backed;
- a representative trigger, non-trigger, and edge case were checked against the frozen boundary before handoff;
- output stops at the authoring-to-eval boundary and does not implement eval runtime behavior;
- non-trigger responses say `Out of scope for skill-forge.` and do not emit an Eval Brief;
- stop-and-ask responses say `Scope clarification required.` and do not emit an Eval Brief;
- any downstream dependency is called out explicitly instead of being guessed.

## Stop conditions
Stop and ask when:
- target skill is unclear;
- no stable source refs exist for the contract;
- the success contract cannot be stated as a small set of must-pass checks;
- the frozen boundary would turn the request into more than one workflow or would require inventing missing contract details;
- request needs runtime behavior changes to continue.


