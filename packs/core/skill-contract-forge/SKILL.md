---
name: skill-contract-forge
description: "Defines or refactors the contract of one skill before implementation. Use when the task is contract authoring for a single skill. Do not use for final skill implementation, runtime eval infrastructure, or downstream eval authoring. Produces a boundary-only Eval Brief and stops at Eval Brief ready."
---

# skill-contract-forge

## Purpose

Use this skill to define or refactor the **contract** of a single skill before implementation.

This skill only performs the contract step. It does **not** implement the final skill bundle, runtime evaluation harness, provider wiring, or benchmark execution.

## Phase objective

The objective of this phase is to freeze the skill boundary so the next phase can implement from an explicit contract instead of inventing it.

## Use this skill when

Use this skill when the request is about defining or clarifying what one skill should be before implementation.

Typical trigger shapes:
- create a new skill from scratch with one clear job
- refactor an existing skill so its job and boundaries are clearer
- rewrite an existing skill contract using repository docs as source of truth
- freeze the success model and evaluation intent before final instructions or downstream eval work

## Do not use this skill when

Do **not** use this skill for:
- repository-wide policy or `AGENTS.md` work
- runtime eval harness implementation
- benchmark generation, grading, timing, or reporting implementation
- downstream eval authoring from an already finished brief
- implementing the final skill files as the main task
- requests that combine multiple workflows in one inseparable pass

If the request is mainly about runtime implementation or downstream eval authoring, this skill is out of scope.

## Expected outcome

When this skill applies, the outcome is a boundary-only **Eval Brief** for one skill.

That handoff must define:
- the canonical skill metadata required by `SKILL.md` today
- the minimal package shape required by that skill
- the skill job
- the target skill
- the activation boundary
- nearby negatives
- stop-and-ask conditions
- the success model
- minimal downstream evaluation intent
- relevant source references

When the environment supports persisted working files, treat the approved brief as one inspectable handoff artifact for later phases rather than leaving the contract only in transient chat output.

The response must stop at:

`Eval Brief ready`

## Inputs

The request should make it possible to identify:
- whether this is a `new-skill`, `existing-skill-refactor`, or `skill-rewrite`
- the target skill or target domain
- the intended single job
- enough context to define boundaries without inventing missing facts

For `existing-skill-refactor` and `skill-rewrite`, the target skill must be identified explicitly. Deictic phrases such as `this skill`, `the current skill`, `rewrite this`, or similar shorthand do not identify a valid target skill on their own.

Useful supporting inputs may include existing skill files, repository docs, templates, examples, and prior notes about the skill boundary.
For `existing-skill-refactor` and `skill-rewrite`, inspect the current target skill package first when it is available, especially the maintained `SKILL.md` and any existing `references/`, `assets/`, `scripts/`, or `agents/` folders that materially shape package or interface decisions.

## Output contract

Produce a boundary-only Eval Brief as structured JSON.

Before emitting trigger-path JSON, copy the structure from `assets/eval-brief.template.json`.

The brief should be implementation-ready for the next step, but must remain contract-only. On trigger paths, the current Eval Brief contract expects these top-level fields:
- `skill`
- `authoring`
- `successModel`
- `activationProbes`
- `negativeSignals`
- `sourceRefs`

Treat `activationProbes`, `negativeSignals`, and `seedEvalIntent` as a tiny high-signal surface, not as filler:
- use `activationProbes` for a small set of representative trigger prompts that should help later discovery and dogfooding
- keep `negativeSignals` focused on nearby non-trigger requests, not generic out-of-scope noise
- use `seedEvalIntent` to preserve what later phases should compare, including at least one ambiguity or stop-and-ask edge when the boundary has a likely confusion point
- prefer 3-5 strong signals over a padded list of weak or repetitive items

On trigger paths, `skill` must freeze both:
- `name`
- `description`

Write `skill.description` as activation-oriented frontmatter metadata:
- describe when the skill should be used
- include nearby negative boundary guidance about when it should not be used
- keep it concise enough for `SKILL.md` frontmatter
- start with a third-person capability summary, then add routing language such as `Use when ... Do not use for ...`
- do not phrase it as a deliverable summary such as `Produce one ...`
- do not simply paraphrase `authoring.singleJob`

On trigger paths, `authoring.packageShape` must freeze both:
- `requiredFiles`
- `supportFolders`

Use the smallest justified package shape:
- keep core trigger, procedure, inputs, outputs, stop conditions, and nearby examples in `SKILL.md`
- use `references` for consultation material or long reference content
- use `scripts` for repetitive or fragile logic that should not be rewritten ad hoc
- use `assets` for templates or output resources
- use `agents` only when metadata, UI, or dependency-facing interface files are materially required

For `existing-skill-refactor` and `skill-rewrite`, treat an existing maintained template, baseline, or output scaffold in `assets/` as positive justification for keeping `assets` in `supportFolders` when downstream implementation must preserve that artifact.
Do not collapse the package shape to `supportFolders: []` just because that durable `assets/` surface is small.

If `authoring.packageShape.supportFolders` includes `agents`, the brief must also freeze:
- `authoring.interface.display_name`
- `authoring.interface.short_description`
- `authoring.interface.default_prompt`

If the request does not justify a support folder clearly, default to `supportFolders: []` rather than inventing scaffolding.

Keep `sourceRefs` grounded:
- treat `sourceRefs` as portable handoff authority, not as a log of every local file consulted during authoring
- allow `sourceRefs: []` when the brief already carries the distilled contract boundary, even if repo-local material was consulted upstream
- cite only material that must survive as durable authority inside the handoff itself, such as explicitly provided user material
- do not list auxiliary repo-local authoring files merely because they were inspected while freezing the contract
- if stronger source-of-truth docs are missing, keep `sourceRefs` minimal and honest rather than decorative
- do not invent plausible paths such as contract docs or target-skill files that do not exist

For existing-skill refactors or rewrites, repo-local inspection is still allowed when needed to map the current skill boundary before freezing the brief.
The portability rule applies to the handoff payload, not to whether you may inspect nearby skill files, repo docs, or active eval cases during authoring.

Keep repo-local claims grounded too:
- do not assert repo-specific defaults, conventions, or planning locations unless a grounded source actually establishes them
- do not turn optional context such as `AGENTS.md` or official external docs into required inputs or authoritative source order unless the brief truly depends on them
- prefer generic phrasing such as `repo-local context when available` over invented repo obligations
- distill repo-local constraints into the brief instead of preserving their local file paths as downstream dependencies

When downstream phases must still inspect long examples, templates, or reference material:
- freeze that need through `authoring.packageShape`
- put reusable reference material in `references`
- put templates or output scaffolds in `assets`
- do not rely on auxiliary local source refs to keep that content reachable downstream

Do not include runtime behavior, provider wiring, benchmark layout, grader logic, or scoring implementation in the brief payload.

## Required response format

Use the exact response envelope below.

Before writing any JSON on a trigger path, output the two routing header lines first and exactly as written.
Do not paraphrase, merge, or substitute those header lines based on the selected workflow name.

### Trigger path

Line 1 must be exactly:

`Classification: trigger`

Line 2 must be exactly one of:
- `Workflow: new-skill`
- `Workflow: existing-skill-refactor`
- `Workflow: skill-rewrite`

Then emit the Eval Brief JSON payload.

The final line must be exactly:

`Eval Brief ready`

Valid trigger headers look like:

`Classification: trigger`
`Workflow: new-skill`

or

`Classification: trigger`
`Workflow: existing-skill-refactor`

or

`Classification: trigger`
`Workflow: skill-rewrite`

Invalid trigger headers include:

`Classification: existing-skill-refactor`
`Classification: skill-rewrite`
`Classification: new-skill`

### Non-trigger path

Line 1 must be exactly:

`Classification: non-trigger`

Then explain briefly why the request is out of scope for this skill.

Do not emit an Eval Brief JSON payload.
Do not end with `Eval Brief ready`.

### Stop-and-ask path

Line 1 must be exactly:

`Classification: stop-and-ask`

Then explain briefly what clarification is required.

Do not emit an Eval Brief JSON payload.
Do not end with `Eval Brief ready`.

### Format guardrails

- Do not replace the required classification or workflow lines with JSON keys.
- Never use a workflow token such as `new-skill`, `existing-skill-refactor`, or `skill-rewrite` as the classification line.
- Line 1 is always exactly one of `Classification: trigger`, `Classification: non-trigger`, or `Classification: stop-and-ask`.
- Even when the chosen workflow is `existing-skill-refactor` or `skill-rewrite`, the classification line still remains `Classification: trigger`.
- Do not output bare JSON without the required routing header lines.
- Do not prepend commentary, bullets, or explanation before the required classification line.
- On trigger paths, keep the JSON payload boundary-only and place `Eval Brief ready` on its own final line.

For examples, anti-examples, and edge-case walkthroughs, see:
- `references/examples.md`
- `references/routing.md`
- `references/edge-cases.md`

## Workflow routing

Classify the request into exactly one of these outcomes:
- `Classification: trigger`
- `Classification: non-trigger`
- `Classification: stop-and-ask`

If triggered, route into exactly one workflow:
- `Workflow: new-skill`
- `Workflow: existing-skill-refactor`
- `Workflow: skill-rewrite`

If the request mixes multiple workflows without a clear primary scope, return `stop-and-ask`.
If the request is outside contract authoring, return `non-trigger`.
If the request explicitly says to do the contract first and defer downstream eval or runtime work until later, keep it in the trigger path and defer that later work instead of forcing stop-and-ask.

## Trigger rules

Return `Classification: trigger` only when:
- the request is clearly about defining or refining the contract of a single skill
- the request has enough specificity to identify one target workflow
- for `existing-skill-refactor` and `skill-rewrite`, the request explicitly identifies which existing skill should be changed
- the work belongs to the contract phase, not downstream implementation
- downstream eval or runtime work, if mentioned, is explicitly deferred rather than required in the same step

Return `Classification: non-trigger` when the request is primarily about:
- runtime implementation
- shared eval infrastructure
- benchmark, scoring, or grading work
- downstream eval authoring from a finished brief
- repository policy or unrelated documentation work

Return `Classification: stop-and-ask` when:
- the request combines multiple major workflows
- the target skill is missing or ambiguous
- the request uses deictic target references such as `this skill`, `the current skill`, or `rewrite this` instead of naming the existing skill to change
- the user asks for contract and implementation in one inseparable step
- the scope is too unclear to freeze a single-skill contract safely
- a refactor or rewrite request does not identify which existing skill should be changed

## Core operating rules

### 1. One skill only
Always work on one skill at a time.

### 2. Contract first
Freeze the contract before any implementation-oriented detail.

### 3. Boundary only
Produce only the authoring boundary and handoff artifact.

### 4. No hidden widening
Do not silently widen the job from contract authoring into final skill implementation, runtime eval authoring, or repo policy work.

### 5. No invention
If required facts are missing, stop and ask rather than invent them.
Do not infer the target skill from the current repository, folder, or active skill context when the prompt itself does not name that skill.

### 6. Minimal downstream intent
Include enough evaluation intent to make downstream authoring easier, but stop before runtime or full eval implementation.

## Local materials

Use local materials only when they help the current contract-authoring run.

Typical examples:
- contract templates
- skill authoring templates
- repository source docs
- examples of existing skills
- local case suites used as downstream eval context

These materials help shape the contract. They do **not** change the boundary of this skill.
Read `assets/skill-template.job.md` only when reusable job wording would help freeze the contract cleanly.
Read `assets/skill-template.guardrail.md` only when reusable guardrail wording would help freeze stop conditions or non-use boundaries cleanly.
Read `assets/spec-template.md` only when reusable Eval Brief plan wording would help freeze success-model or non-goal text cleanly.
When refactoring or rewriting a named existing skill, inspect the current target skill package and nearby repo docs as needed to map the current boundary before freezing the brief.
Start with the maintained `SKILL.md`, then inspect only the support folders that materially affect `authoring.packageShape` or `authoring.interface`.
If the current package already owns a durable template or baseline in `assets/`, freeze that dependency through `authoring.packageShape` instead of treating it as incidental context.
If those materials need to survive into implementation or eval authoring, distill them into the brief or freeze them into `references/` or `assets/` via `authoring.packageShape` instead of preserving local file refs.
Engine-specific execution assets live outside this skill contract.

## Procedure

1. Classify the request as `trigger`, `non-trigger`, or `stop-and-ask`.
2. If triggered, choose exactly one workflow.
3. Freeze the contract: single job, target skill, activation boundary, negatives, stop conditions, and success model.
4. Freeze the canonical skill metadata in `skill.name` and `skill.description` so downstream implementation does not have to infer required frontmatter.
   Write `skill.description` from the activation boundary: summarize when to use the skill from `activationProbes`, add nearby non-use boundaries from `negativeSignals`, and do not collapse it into a deliverable-only summary of `authoring.singleJob`.
5. Freeze the minimal package shape in `authoring.packageShape`, keeping `requiredFiles` anchored on `SKILL.md` and `supportFolders` limited to the folders the request truly justifies.
   When an existing skill already depends on a maintained template, scaffold, or baseline in `assets/`, preserve `assets` in `supportFolders` even if the durable support surface is only one file.
6. If `supportFolders` includes `agents`, freeze `authoring.interface.display_name`, `authoring.interface.short_description`, and `authoring.interface.default_prompt` in the same brief.
7. Freeze only portable `sourceRefs`: allow `[]` when the distilled brief is sufficient, include only durable authority that must survive the handoff, and do not preserve auxiliary repo-local authoring refs as downstream dependencies.
8. Keep repo-local claims honest: do not invent repo defaults, planning paths, mandatory `AGENTS.md` inputs, or mandatory external-doc dependencies unless grounded authority actually requires them, and distill any consulted repo-local rules into the brief itself.
9. Freeze a tiny high-signal discovery surface inside the brief: preserve 3-5 representative `activationProbes`, focused nearby `negativeSignals`, and `seedEvalIntent` comparison notes that include at least one ambiguity or stop-and-ask edge when relevant.
10. Produce the boundary-only Eval Brief JSON and, when the environment supports working-file persistence, materialize it as one inspectable approved brief artifact instead of multiple paraphrased handoff files.
11. End trigger-path responses with the exact line `Eval Brief ready`.
12. Before finalizing a trigger-path brief, check that the resulting skill still describes one clear job, explicit inputs and outputs, strong stop-and-ask behavior, nearby negative cases, explicit `skill.name` plus an activation-oriented `skill.description`, portable `sourceRefs`, honest repo-local claims, one durable brief artifact when working files are available, a compact high-signal probe/negative surface, and the smallest justified `packageShape` without silently widening scope.

## Quality bar

A good result:
- clearly identifies whether the request belongs to this skill
- chooses the correct workflow
- defines one skill only
- produces a contract that is specific, testable, and non-ambiguous
- makes downstream implementation easier without stepping into implementation work too early

A weak result:
- mixes contract and implementation
- invents missing targets
- accepts multi-workflow requests without clarification
- writes generic advice instead of a structured contract
- leaks runtime or benchmark detail into the brief
