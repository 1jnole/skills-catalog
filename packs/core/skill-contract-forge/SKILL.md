---
name: skill-contract-forge
description: "Use this skill when the task is to define or refactor the contract of one skill before implementation. Do not use it for final skill implementation, runtime eval infrastructure, or downstream eval authoring. Produces a boundary-only Eval Brief and stops at Eval Brief ready."
---

# skill-contract-forge

## Purpose

Use this skill to define or refactor the **contract** of a single skill before implementation.

This is **step 1 of 2** in the skill-authoring workflow:

1. **Contract step** — define the skill boundary, activation rules, success model, and evaluation intent.
2. **Implementation step** — materialize or refactor the final skill files and downstream evaluation assets.

This skill only performs the **contract step**.

It does **not** implement the final skill bundle, runtime evaluation harness, provider wiring, or benchmark execution.

---

## Use this skill when

Use this skill when the request is about **defining or clarifying what a skill should be** before implementation.

Typical cases:
- Create a new skill from scratch with a clear single job.
- Refactor an existing skill so its job, boundaries, and activation rules are clearer.
- Rewrite an existing skill contract using repository docs as the source of truth.
- Freeze the success model and evaluation intent before writing final instructions or downstream eval assets.
- Turn a vague idea for a skill into a precise authoring contract.

---

## Do not use this skill when

Do **not** use this skill for:
- repository-wide policy or `AGENTS.md` work
- runtime eval harness implementation
- benchmark generation
- scoring, grading, timing, or reporting implementation
- downstream eval authoring from an already finished brief
- implementing the final skill files as the main task
- requests that combine multiple workflows in one pass without a clear primary target

If the request is mainly about downstream eval authoring or runtime implementation, this skill is out of scope.

---

## Expected outcomes

When this skill applies, the outcome is the **canonical contract-first handoff artifact** for a single skill.

That handoff is intended for the next implementation step to materialize or refactor the final skill files and downstream evaluation assets **without re-deriving the contract from scratch**.

The artifact must define:
- the skill job
- the target skill
- the activation boundary
- nearby negatives / non-trigger cases
- stop-and-ask conditions
- the success model
- minimal evaluation intent for downstream work
- relevant source references

The response must stop at:

`Eval Brief ready`

---

## Inputs

The request should make it possible to identify:
- whether this is a **new skill**, **existing-skill refactor**, or **skill rewrite**
- the target skill or target domain
- the intended single job
- enough context to define boundaries without inventing missing facts

Useful supporting inputs may include:
- existing skill files
- repository docs
- templates
- examples
- prior notes about the skill boundary

---

## Outputs

Produce a boundary-only **Eval Brief** as structured JSON.

The brief should be implementation-ready for the next step, but must remain contract-only.

Implementation-ready means the next step can materialize the final skill files and downstream evaluation assets from this brief **without reopening the skill boundary, activation rules, success model, or core evaluation intent**.

The next step should consume this brief as the canonical handoff artifact rather than re-deriving the contract from the original request.

The brief may include fields like:
- `skill`
- `authoring`
- `successModel`
- `activationProbes`
- `negativeSignals`
- `sourceRefs`
- `seedEvalIntent`

Do not include runtime behavior, provider wiring, benchmark layout, grader logic, or scoring implementation in the brief payload.

---

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

---

## Trigger rules

### Trigger
Return `Classification: trigger` only when:
- the request is clearly about defining or refining the contract of a single skill
- the request has enough specificity to identify one target workflow
- the work belongs to the contract phase, not downstream implementation

### Non-trigger
Return `Classification: non-trigger` when the request is primarily about:
- runtime implementation
- shared eval infrastructure
- benchmark/scoring/grading work
- downstream eval authoring from a finished brief
- repository policy or unrelated documentation work

### Stop-and-ask
Return `Classification: stop-and-ask` when:
- the request combines multiple major workflows
- the target skill is missing or ambiguous
- the user asks for contract and implementation in one inseparable step
- the scope is too unclear to freeze a single-skill contract safely

---

## Core operating rules

### 1. One skill only
Always work on **one skill** at a time.

Do not merge multiple skill contracts into one output.

### 2. Contract first
Freeze the contract before any implementation-oriented detail.

### 3. Boundary only
Produce only the authoring boundary and handoff artifact.

Do not invent implementation steps that belong to the next phase.

### 4. No hidden widening
Do not silently widen the job from:
- contract authoring
  to:
- final skill implementation
- runtime eval authoring
- repo policy work

### 5. No invention
If required facts are missing, stop and ask rather than inventing them.

### 6. Minimal downstream intent
Include enough evaluation intent to make downstream authoring easier, but stop before runtime or full eval implementation.

---

## Local materials

Use local materials only when they help the current contract-authoring run.

Typical examples:
- contract templates
- skill authoring templates
- repository source docs
- examples of existing skills
- local case suites used as downstream eval context

These materials help shape the contract.
They do **not** change the boundary of this skill.

Engine-specific execution assets live outside this skill contract.

---

## Procedure

### Step 1 — Classify the request
Return one of:
- `trigger`
- `non-trigger`
- `stop-and-ask`

### Step 2 — Choose the workflow
If triggered, choose exactly one:
- `new-skill`
- `existing-skill-refactor`
- `skill-rewrite`

### Step 3 — Freeze the contract
Define:
- the single job
- the target skill
- activation boundary
- nearby negatives
- stop conditions
- success model

### Step 4 — Capture downstream evaluation intent
Define only the minimal evaluation intent needed by the next step:
- what success should be testable
- which boundary cases matter
- which negatives matter
- what should be deferred

The goal is to make downstream evaluation authoring possible **without re-deriving what should be tested from the original request**.

### Step 5 — Produce the Eval Brief
Materialize the contract-first JSON brief.

Keep it boundary-only:
- no runtime implementation
- no benchmark execution logic
- no scorer/grader logic
- no provider-specific execution details

### Step 6 — Stop cleanly
End the response with the exact line:

`Eval Brief ready`

---

## Quality bar

A good result:
- clearly identifies whether the request belongs to this skill
- chooses the correct workflow
- defines one skill only
- produces a contract that is specific, testable, and non-ambiguous
- makes downstream implementation easier
- avoids stepping into implementation work too early

A weak result:
- mixes contract and implementation
- invents missing targets
- accepts multi-workflow requests without clarification
- writes generic advice instead of a structured contract
- leaks runtime or benchmark detail into the brief

---

## Out of scope reminders

This skill does **not**:
- implement the final `SKILL.md` bundle as the main job
- write downstream eval files as the main job
- create benchmark harnesses
- implement shared runtime infrastructure
- modify repository-wide policy
- decide provider-specific execution strategy

Those belong to later steps or separate workflows.

