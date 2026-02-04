# Spec — phase5-core-coverage-and-skill-map

## Objective
Create an evidence-based map of what is **truly core** in this catalog (skills + repo pieces), define explicit priority tiers, and audit whether the current eval dataset covers the highest-priority skills.

## Scope
- Derive "core" signals from this repo only:
  - workflow contract + agent policy docs
  - default gate(s) (e.g. `npm run verify`)
  - declared core skill set (`evals/core-skills.json`)
  - cross-skill prerequisite references (`$skill` mentions inside SKILL.md)
- Define 2–4 tiers with criteria grounded in those signals.
- Classify all canonical skills in `packs/**/skills/*` plus key non-skill repo pieces.
- Audit eval coverage from `evals/prompts.csv`:
  - counts and invocation types
  - negative quality (near-miss vs trivial)
  - checks: outcome / process (trace JSONL) / safety
- Produce a minimal plan to close the highest-tier gaps.

## Out of scope
- Large refactors of skills, scripts, or repo structure.
- Expanding the dataset beyond the minimum plan (implementation is for the next phase).

## Tier definitions (criteria)

### Tier A (P0)
A thing is Tier A if **both** are true:
1) It is explicitly declared core by the repo (e.g. `evals/core-skills.json`) *or* it is the workflow contract / primary gate.
2) Its failure would block the default workflow (bootstrapping, spec scaffolding, or `npm run verify`).

### Tier B (P1)
A thing is Tier B if it is a **dependency hub** or **drift/safety enforcer**, evidenced by at least one of:
- referenced as a prerequisite by multiple core skills (via `$skill` references)
- required to satisfy workflow contract rules (evidence, gate execution, drift checks)
- required to interpret or run the regression harness (runner/dataset)

### Tier C (P2)
Helpful or common extensions, but not required to operate the baseline workflow. Evidence: exists as a skill in the core pack but is not declared core and has low prerequisite frequency.

### Tier D (P3)
Pack-specific / optional skills not required for the catalog's core operation (e.g. framework knowledge packs). Evidence: optional pack called out in docs/policy.

## Acceptance criteria
1) `openspec/changes/phase5-core-coverage-and-skill-map/spec.md` and `tasks.md` exist.
2) `tasks.md` contains:
   - a tiered classification table (skills + key repo pieces)
   - an eval coverage table with OK/GAP status
   - a prioritized gaps list + a minimal plan to close them
3) `npm run verify` passes.
