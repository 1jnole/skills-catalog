# Skills Catalog

This repository is a **Codex skills catalog** (SKILL.md + optional references/templates).
Codex primarily uses each skill’s **name + description** (YAML front matter) to decide when to invoke it.

## OpenSpec flows (recommended)

### Entry (when no flow is provided)
Use this when the user provides **README/spec/tasks** but does not tell the agent what to do next.

1) `core-openspec-intake-router`
2) Follow the **Next skill(s)** it returns.

### Technical test (README → Mini-SPEC → tasks.md)
1) `tt-openspec-spec-from-readme` → writes `openspec/changes/<slug>/specs/mini-spec.md`
2) `core-openspec-spec-lint`
3) If FAIL: `core-openspec-spec-fix`
4) `tt-openspec-slice-into-iterations` → writes `openspec/changes/<slug>/tasks.md`
5) `core-openspec-tasks-lint`
6) If FAIL: `core-openspec-tasks-fix`

Implementation per iteration (optional, non-OpenSpec-specific):
- `core-minimal-diff-implementer`
- `core-verify-and-evidence` (→ if fail: `core-error-fix-loop`)
- `core-pr-ready-packager`

### Product feature (brief → SPEC → tasks.md)
1) `feature-openspec-spec-from-brief` → writes `openspec/changes/<slug>/specs/spec.md`
2) `core-openspec-spec-lint`
3) If FAIL: `core-openspec-spec-fix`
4) `feature-openspec-slice-into-iterations` → writes `openspec/changes/<slug>/tasks.md`
5) `core-openspec-tasks-lint`
6) If FAIL: `core-openspec-tasks-fix`

## Repo gates / runbook (recommended prerequisite)
If `docs/RUNBOOK.md` or a standard gate (`npm run verify`) is missing, run:
- `core-repo-gates-bootstrap`

If the project is Angular and tooling/docs are missing, also consider:
- `angular-tooling-bootstrap`
- `angular-docs-bootstrap`
