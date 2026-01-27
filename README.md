# Skills Catalog — OpenSpec + Codex (2026)

A small, composable skills catalog for **spec-driven development** with OpenSpec and Codex.

## What this catalog optimizes for
- **No silent drops**: requirements present in the brief/README must be captured and traceable.
- **Determinism**: explicit state rules and reproducible acceptance criteria.
- **Low prompt burden**: the workflow is driven by skills + lint/fix loops, not ad-hoc prompting.
- **Small changes**: PR-sized iterations and a single verification gate.

## Install (Codex)
Copy skill folders into one of:
- Repo-scoped: `.codex/skills/<skill>/SKILL.md`
- User-scoped: `~/.codex/skills/<skill>/SKILL.md`

## Recommended flows

### Entry (when the prompt does NOT specify a flow)
1) `core-openspec-intake-router` (no file writes)
2) Follow its **Next skill(s)** exactly.

### Tech Test (README → Mini-SPEC → tasks)
1) `core-openspec-change-slugger` (recommended)
2) `tt-openspec-spec-from-readme`
3) `core-openspec-spec-lint` → (if FAIL) `core-openspec-spec-fix` → repeat until PASS
4) `tt-openspec-slice-into-iterations`
5) `core-openspec-tasks-lint` → (if FAIL) `core-openspec-tasks-fix` → repeat until PASS
6) Only after PASS: implement per-iteration using your repo gates + evidence policy.

### Product Feature (brief → SPEC full → tasks)
1) `core-openspec-change-slugger` (recommended)
2) `feature-openspec-spec-from-brief`
3) `core-openspec-spec-lint` → (if FAIL) `core-openspec-spec-fix` → repeat until PASS
4) `feature-openspec-slice-into-iterations`
5) `core-openspec-tasks-lint` → (if FAIL) `core-openspec-tasks-fix` → repeat until PASS

## Conventions (to avoid overlap)
- Prompts should be **orchestration only** (which skill, which order, when to STOP).
- Spec structure, requirement inventory rules, and traceability rules live **only in SKILL.md**.
- Lint/fix skills are the enforcement layer; generators are not trusted alone.
