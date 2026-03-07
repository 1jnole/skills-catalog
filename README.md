# Agent Skills Catalog — Authoring Guide

This repository defines a **provider-agnostic** way to write, review, and maintain agent skills.

It is intentionally designed to:
- stay **agent-lean**;
- keep skills **small and discoverable**;
- separate **always-on repo guidance** from **reusable workflows**;
- remain compatible with runtimes that support skill discovery from metadata and on-demand loading of supporting files.

This guide is for **humans authoring a skills catalog**.  
Inside each skill folder, prefer **agent-facing files only**.

---

## 1. Mental model

A skill is a **reusable workflow** for an agent.

A good skill is not a knowledge dump. It is a compact operational unit that tells an agent:
- **when** to use it,
- **when not** to use it,
- **what procedure** to follow,
- **what “done” looks like**.

Design assumption:
- discovery should work from **high-signal metadata**;
- the core instruction file should stay **lean**;
- larger examples, templates, and helper scripts should live in **supporting files** and be consulted only when needed.

This keeps context small and reduces accidental overlap between skills.

---

## 2. AGENTS vs Skills vs Vault

Use the right layer for the right kind of information.

### `AGENTS.md`
Use `AGENTS.md` for **always-on guidance** that should apply before any task begins.

Examples:
- repository conventions;
- package manager and scripts;
- testing defaults;
- architectural boundaries;
- naming conventions;
- “do not add new dependencies unless requested”.

Use `AGENTS.md` when the rule is **persistent repo behavior**, not a single workflow.

### Skill
Use a skill for a **repeatable workflow with a clear trigger**.

Examples:
- harden unknown boundary inputs;
- design a component contract;
- model async UI state;
- extract a hook safely;
- test a component contract.

Use a skill when the work can be described as **one job** with a clear start and finish.

### Vault
Use a vault or knowledge base for **broad reference material**.

Examples:
- course notes;
- theory;
- design-pattern overviews;
- framework comparisons;
- large playbooks that are not day-to-day workflows.

If the content is mainly for **study or reference**, not direct execution, it belongs in the vault.

---

## 3. Minimal skill structure

A skill is a directory with a required `SKILL.md` and optional supporting folders.

```txt
my-skill/
├── SKILL.md
├── references/      # optional
├── assets/          # optional
├── scripts/         # optional
└── agents/          # optional compatibility layer(s)
    └── openai.yaml
```

### Required
- `SKILL.md` — the core instructions and routing metadata.

### Optional
- `references/` — supplementary reading such as routing notes, patterns, pitfalls.
- `assets/` — templates, schemas, static examples, output skeletons.
- `scripts/` — tiny deterministic helpers when plain instructions are not enough.
- `agents/` — provider-specific compatibility files when needed.

Keep the top-level skill structure simple. Avoid deep nesting unless a runtime explicitly requires it.

---

## 4. Catalog authoring policy

These are the catalog rules for this repository.

### 4.1 One skill = one job
Each skill must do **one operational thing**.

If you need “and also…”, you probably have:
- two skills,
- or one skill plus references,
- or a skill plus repo-level guidance in `AGENTS.md`.

### 4.2 Instruction-first
Prefer plain instructions over scripts.

Use a script only when:
- variation is a bug;
- the operation is fragile or repetitive;
- a helper materially improves determinism.

### 4.3 Lean core, detailed support
Keep `SKILL.md` focused on:
- routing;
- procedure;
- definition of done;
- stop conditions.

Move large examples, pattern libraries, and supporting material into `references/` or `assets/`.

### 4.4 Avoid overlap
A skill should have a **clear trigger boundary**.

If two skills would both reasonably activate for the same prompt, clarify:
- the trigger,
- the non-trigger,
- or merge/split them.

### 4.5 Name and description are routing tools
`name` and `description` are not marketing copy.

They should make discovery easier by stating:
- the problem the skill solves;
- the kind of task it applies to;
- the situations where it should **not** apply.

### 4.6 Keep references useful, not encyclopedic
If supporting files become broad course material or long-form theory, move that material to the vault.

---

## 5. Skill profiles

This catalog recognizes two common profiles.

### A. Guardrail skill
Use for small, frequent pre-flight guidance.

Typical shape:
- compact trigger;
- short procedure;
- clear delegation to narrower skills when needed;
- lightweight references for patterns and pitfalls.

Examples:
- boundary hardening;
- async state modeling;
- component contract checks.

### B. Job-based skill
Use for a single mechanical workflow.

Typical shape:
- clear input conditions;
- explicit sequence of steps;
- minimal output ambiguity;
- strict “done” criteria.

Examples:
- extract a hook;
- normalize route params;
- generate a typed context helper.

If a skill is broad but still homogeneous, keep it job-based only if the workflow remains coherent from start to finish.

---

## 6. Recommended shape of `SKILL.md`

Every skill must include frontmatter with at least:

```yaml
---
name: my-skill
description: "What it does, when to use it, and when not to use it."
---
```

Recommended body shape:

```md
## When to use
## Procedure
## Definition of done
## Stop conditions
## Don’t use when
```

### Section guidance

#### `When to use`
Describe the trigger in practical terms.

#### `Procedure`
List the operational steps in order.
Keep them imperative and concrete.

#### `Definition of done`
State the success condition.
A reviewer should be able to tell whether the skill completed correctly.

#### `Stop conditions`
State when the agent should stop and ask for missing context instead of guessing.

#### `Don’t use when`
State nearby cases that should route elsewhere.
This is the main tool for reducing overlap and misfires.

### What not to put in `SKILL.md`
Avoid turning `SKILL.md` into:
- a long tutorial;
- a theory document;
- a giant rules dump;
- a pattern cookbook.

That content belongs in support files.

---

## 7. Supporting files policy

### `references/`
Use `references/` for small, high-value supporting material.

Recommended pattern:

```txt
references/
├── catalog.md   # quick routing / decision notes
├── patterns.md  # positive patterns, before/after, mechanical examples
└── pitfalls.md  # negative examples, common failure modes
```

This pack is optional. Use only what the skill needs.

### `assets/`
Use `assets/` for reusable templates and static artifacts.

Examples:
- markdown skeletons;
- JSON schemas;
- config templates;
- output templates.

### `scripts/`
Use `scripts/` for tiny deterministic helpers.

Rules:
- single-purpose;
- no hidden side effects;
- easy to run and inspect;
- documented from `SKILL.md`.

Do not turn `scripts/` into a mini-framework.

### Source-backed examples
If examples come from curated sources, prefer adding a source line near each example in `references/`.

For example:

```md
Source: lessons-p2/forms-events-and-number-inputs.md
```

This is a **catalog policy**, not a universal requirement.
Use it when traceability matters.

---

## 8. Workflow for writing a skill

Write skills in phases.

### Step 1 — Classify the need
Decide whether the content belongs in:
- `AGENTS.md`,
- a skill,
- or the vault.

### Step 2 — Define the contract before writing
Before drafting the skill, define:
- the **job**;
- **when to use it**;
- **when not to use it**;
- the **definition of done**;
- 2–5 nearby **negative cases**.

Do this before writing prose. It prevents overlap.

### Step 3 — Draft the smallest useful skill
Write the minimum viable `SKILL.md`.
Add support files only if they clearly improve correctness or reuse.

### Step 4 — Dogfood manually
Test the skill with:
- an explicit invocation;
- a plausible implicit trigger;
- negative cases;
- an edge case.

### Step 5 — Refine routing
Tighten:
- `description`;
- `Don’t use when`;
- stop conditions;
- references.

### Step 6 — Add evaluations later
When the skill has stabilized through real use, add lightweight evals.
Start with:
- should trigger;
- should not trigger;
- should stop and ask;
- should satisfy definition of done.

---

## 9. Validation and review

Before considering a skill ready, check:
- the skill has **one job**;
- the trigger is clear;
- the non-trigger is clear;
- `SKILL.md` is procedural and lean;
- support files add real value;
- there is no obvious overlap with another skill;
- a human can explain what “done” means in one or two sentences.

If a skill is hard to explain briefly, it is probably too broad.

---

## 10. Compatibility notes

This catalog is **provider-agnostic by default**.

Compatibility layers are optional and should stay isolated under `agents/`.

Example:
- `agents/openai.yaml` for runtimes that support provider-specific metadata, UI labels, invocation policy, or tool dependencies.

The core of the skill should remain portable:
- `SKILL.md`
- `references/`
- `assets/`
- `scripts/`

A provider-specific file may improve runtime behavior, but it should not define the entire skill.

---

## 11. What this guide does not require

This guide does **not** require, by default:
- provider-specific branding in every skill;
- a rigid eval harness from day one;
- code examples inside every `SKILL.md`;
- deep folder hierarchies;
- scripts for tasks that instructions can already handle.

Those may be added later if the catalog proves they are needed.

---

## 12. Recommended next layer

Once this authoring standard is stable, the next step is to keep a small meta-skill such as `skill-forge` that helps create new skills consistently.

That meta-skill should:
- classify the requested skill;
- choose the appropriate template;
- draft a lean `SKILL.md`;
- add support files only when justified;
- recommend manual testing before formal evals.

---

## 13. Summary

A good skill catalog is built on three separations:
- **repo rules** in `AGENTS.md`;
- **repeatable workflows** as skills;
- **broad knowledge** in the vault.

And on four authoring habits:
- one job per skill;
- lean routing metadata;
- procedural core instructions;
- dogfooding before eval hardening.
