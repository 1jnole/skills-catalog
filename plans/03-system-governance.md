> Complements: `02-eval-blueprint.md`

# Skills Domain -- Agreements: System Governance

## 1. Purpose

This document defines stable agreements for the skills ecosystem.

It does not redefine the eval system. It defines what, why, and the boundaries around skills, evals, and shared runtime.

---

## 2. Documentation hierarchy

### 2.1 Governing eval document

The source of truth for the eval system is:

- `02-eval-blueprint.md`

### 2.2 Accepted external references

- `Evaluating Skills` is the external reference for eval scaffold architecture.
- The OpenAI `eval-skills` blog is the external reference for refinement workflow.
- Neither source replaces this `plans/` package inside the repo.

### 2.3 Role of this document

This document:

- complements the blueprint,
- fixes stable ecosystem rules,
- clarifies responsibilities and boundaries,
- but does not replace or compete with the blueprint.

If there is conflict, the eval blueprint adapted to this repo wins.

---

## 3. Separation of responsibilities

### 3.1 `skill-forge`

Main responsibility:

- create or refactor a skill,
- set its `single job`,
- define trigger boundary,
- freeze non-goals,
- define success model,
- prepare activation probes,
- prepare the `Eval Brief`.

`skill-forge` does not implement the full eval v1 infrastructure on its own.

### 3.2 `skill-eval-forge`

Main responsibility:

- build or refactor the v1 eval for one skill,
- define the concrete scaffold for that eval,
- curate initial eval cases,
- implement checks,
- fix gates,
- generate analysis summary,
- consolidate baseline.

### 3.3 Shared Eval Runtime

Main responsibility:

- run cases,
- integrate the provider adapter,
- capture run evidence,
- support scoring and analysis.

It does not control the domain and does not replace the handoff.

---

## 4. Main agreement

The correct separation is:

- skill authoring / refactoring on one side,
- skill eval authoring / refactoring on another,
- shared runtime on another.

This prevents different kinds of work from being mixed into one skill or one eval scaffold.

---

## 5. Eval Brief

The boundary between authoring and eval authoring is `Eval Brief`.

### 5.1 Produced by `skill-forge`

It must include at minimum:

- skill objective,
- `single job`,
- trigger boundary,
- nearby negative cases,
- non-goals,
- outcome goals,
- process goals,
- style goals,
- efficiency goals,
- activation probes,
- seed eval intent.

### 5.2 Consumed by `skill-eval-forge`

From that brief, downstream work builds:

- eval definition,
- initial eval cases,
- golden set,
- negative set,
- deterministic checks,
- analysis summary,
- baseline,
- gates.

---

## 6. Legacy runtime reset rule

The deleted legacy runtime must not be treated as a reconstruction base.

Therefore:

- do not restore old paths, scripts, or operational docs as a shortcut,
- rebuild from the blueprint and adopted external references,
- align any new scaffold implementation with this package before touching runtime code.

---

## 7. What belongs to the agreements layer

The agreements layer contains:

- frozen goal,
- minimum glossary,
- minimum architecture,
- minimum contracts,
- separation of responsibilities,
- the `Eval Brief` boundary,
- Definition of Done,
- stable system rules.

## 8. What does not belong to this layer

This layer does not contain:

- the exact operational order of each scaffold,
- runner execution step-by-step,
- filenames or tooling copied from external references,
- concrete implementation of shared runtime.

Those belong to workflow or execution artifacts.

---

## 9. Definition of Done for this layer

This layer is closed when there is a stable definition of:

1. who does what,
2. what is in and what is out,
3. where `skill-forge` ends,
4. where `skill-eval-forge` begins,
5. where shared runtime fits,
6. which document wins if there is conflict.

---

## 10. Maintenance rule

When a structural decision changes, the correct order is:

1. update the blueprint if it affects the eval system,
2. update agreements if it affects the ecosystem,
3. update workflow if needed,
4. update concrete artifacts.

Never the other way around.
