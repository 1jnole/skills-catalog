# Skills Catalog — OpenSpec + Codex (2026)

A small, composable skills catalog for **spec-driven development** with OpenSpec and Codex.

## What this catalog optimizes for
- **No silent drops**: requirements present in the brief/README must be captured and traceable.
- **Determinism**: explicit state rules and reproducible acceptance criteria.
- **Low prompt burden**: the workflow is driven by skills + lint/fix loops, not ad-hoc prompting.
- **Small changes**: PR-sized iterations and a single verification gate.

## Install (Codex)

### Option A: repo-scoped (recommended)
Copy the skills you want into:
- `.codex/skills/<skill>/SKILL.md`

This keeps the workflow portable with the repository.

### Option B: user-scoped
Copy the skills you want into:
- `~/.codex/skills/<skill>/SKILL.md`

### Option C: installer (if available)
If your Codex environment provides a `$skill-installer` command, prefer that for repeatable installs.

## Repository layout
This repo stores skills in a "flattened" layout for easier packaging:
- `skills/.curated/<skill>/SKILL.md` (stable, default pack)
- `skills/.experimental/<skill>/SKILL.md` (optional packs, WIP/knowledge)

Copy skill folders (from `skills/.curated` and/or `skills/.experimental`) into one of:
- Repo-scoped: `.codex/skills/<skill>/SKILL.md`
- User-scoped: `~/.codex/skills/<skill>/SKILL.md`

Keep the curated set small; treat `skills/.experimental` as opt-in packs.


## Recommended flows

### Repo bootstrap (once per repo)
1) `openspec-bootstrap` (scaffold `openspec/` + templates)

2) `agents-bootstrap` (add `AGENTS.md` managed block + `openspec/AGENTS.override.md`)

For extended human notes, see `docs/AGENTS.md`.


### Entry (when the prompt does NOT specify a flow)
1) `openspec-intake-router` (no file writes)
2) Follow its **Next skill(s)** exactly.

### Tech Test (README → Mini-SPEC → tasks)
1) `openspec-change-slugger` (recommended)
2) `openspec-spec-from-readme`
3) `openspec-spec-lint` → (if FAIL) `openspec-spec-fix` → repeat until PASS
4) `openspec-slice-into-iterations-from-readme`
5) `openspec-tasks-lint` → (if FAIL) `openspec-tasks-fix` → repeat until PASS
6) Only after PASS: implement per-iteration using your repo gates + evidence policy.

### Product Feature (brief → SPEC full → tasks)
1) `openspec-change-slugger` (recommended)
2) `openspec-spec-from-brief`
3) `openspec-spec-lint` → (if FAIL) `openspec-spec-fix` → repeat until PASS
4) `openspec-slice-into-iterations-from-brief`
5) `openspec-tasks-lint` → (if FAIL) `openspec-tasks-fix` → repeat until PASS

## Conventions (to avoid overlap)
- Prompts should be **orchestration only** (which skill, which order, when to STOP).
- Spec structure, requirement inventory rules, and traceability rules live **only in SKILL.md**.
- Lint/fix skills are the enforcement layer; generators are not trusted alone.


## Evals prep (optional)
This repo includes a small "golden prompts" set under `evals/` for manual smoke testing now and to seed a future eval harness later.
