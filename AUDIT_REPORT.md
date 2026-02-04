# Auditoría técnica — skills-catalog (2026-02-02)

## Resumen ejecutivo

Este repositorio está bien encaminado: **packs como source-of-truth**, scripts **offline/deterministas** (`verify`), y un set de **evals reproducibles**. Los principales problemas eran de **deriva** (duplicación de skills fuera de `packs/`) y de **contrato/regresión** (evals que no reflejaban los outputs y preflights reales de varias skills).

Aplicadas mejoras de bajo riesgo para reforzar consistencia y mantenibilidad:
- Eliminación de duplicación/ruido.
- Contratos documentados de forma homogénea (`Outputs` + `Failure modes`) y **enforced** por `verify`.
- Evals alineados con contratos reales y fixtures más realistas.

## Alcance y mapa del repositorio

### Estructura

```
skills-catalog/
├── docs/
│   ├── AGENTS.md
│   ├── AUDIT.md
│   ├── CODEX_COMPAT.md
│   └── CONVENTIONS.md
├── evals/
│   ├── fixtures/
│   ├── rubric/
│   ├── .gitignore
│   ├── README.md
│   ├── core-skills.json
│   ├── golden-prompts.csv
│   ├── golden-prompts.md
│   └── prompts.csv
├── openspec/
│   ├── changes/
│   ├── specs/
│   ├── AGENTS.md
│   ├── AGENTS.override.md
│   └── project.md
├── packs/
│   ├── angular/
│   └── core/
├── scripts/
│   ├── lib/
│   ├── install-user-skills.mjs
│   ├── run-evals.mjs
│   └── verify-skills.mjs
├── .gitignore
├── AGENTS.md
├── AUDIT_REPORT.md
├── CONTRIBUTING.md
├── README.md
└── package.json
```

### Propósito por carpeta

- `packs/`: packs de skills (core + angular). **Source-of-truth**.
- `scripts/`: tooling local (instalación, verify, eval runner). Objetivo: **determinismo/offline**.
- `openspec/`: workspace de especificación y changes (source-of-truth para cambios).
- `evals/`: dataset de regresión de skills (fixtures + checks deterministas).
- `docs/`: documentación operativa (convenciones, compatibilidad Codex, etc.).

## Convenciones reales detectadas

- **Naming:** kebab-case, y `folder == frontmatter.name` (verificado).
- **Frontmatter mínimo:** `name` + `description` (single-line), con `metadata.short-description` opcional.
- **Layout de skill:** `SKILL.md` + opcionales `assets/` o `assets/`.
- **Guardrails:** `npm run verify` como gate determinista del catálogo; scripts sin deps externas.

## Hallazgos priorizados

### Critical

- **Hallazgo:** Evals no alineadas con los contratos reales de las skills (rutas/fixtures/prompts), dando falsa confianza en regresión.
- **Acción:** Reparado: actualicé `evals/prompts.csv` para `spec-spec-from-readme` y `spec-new-change-from-templates` (fixtures y checks), y añadí `evals/fixtures/tt_scaffold/` para cubrir preflight real.

### High

- **Hallazgo:** Duplicación/deriva: carpeta `skills/` (curated/experimental) no usada por scripts ni docs, duplicaba `packs/**/skills` y podía divergir.
- **Acción:** Reparado: eliminada la carpeta `skills/` y reforzado que `packs/<pack>/skills/...` es source-of-truth.

### High

- **Hallazgo:** Contratos inconsistentes: muchas skills no declaraban `Outputs` y ninguna declaraba `Failure modes`; CONTRIBUTING lo pedía pero el verificador no lo hacía cumplir.
- **Acción:** Reparado: añadidas secciones `## Outputs` y `## Failure modes` a **todas** las skills; `scripts/verify-skills.mjs` ahora las exige.

### Medium

- **Hallazgo:** Ruido de repo: `.idea/` (config de IDE) incluido; propenso a leaks y no portable.
- **Acción:** Reparado: eliminado `.idea/` (ya estaba en `.gitignore`).

### Medium

- **Hallazgo:** Carpeta `evals/artifacts/` podía venir pre-poblada; debe ser solo output efímero.
- **Acción:** Reparado: eliminada del ZIP (se recrea al ejecutar `npm run evals`).

### Low

- **Hallazgo:** Algunas skills asumen `npm run verify` como gate único. Es coherente con tu workflow, pero acopla a repos que no lo tengan.
- **Acción:** Mitigación: `repo-gates-bootstrap` + `agents-bootstrap` ayudan a estandarizar el gate y política en repos nuevos; documentado en README/AGENTS.


## Calidad y seguridad

- **Dependencias:** sin deps runtime (solo Node). Reduce superficie supply-chain.
- **Secretos:** `npm run verify` incluye detector básico; no se detectaron patrones evidentes en el estado auditado.
- **Acceso a FS/red:** los scripts del repo son offline; el runner de evals fuerza `web_search=disabled` por reproducibilidad.

## Revisión por skill (una por una)

> Formato: se incluye extracto de `Inputs/Outputs/Failure modes` (contrato observable en los docs). Para análisis profundo, ver cada `SKILL.md`.

## Pack: `core` (25 skills)

### `agents-bootstrap`

- **Descripción:** Scaffold repo-local AGENTS.md (short, truncation-safe) plus `openspec/AGENTS.override.md` for OpenSpec workflows. Uses a managed block; stops if repo root or `npm run verify` is missing.
- **Ruta:** `packs/core/skills/agents-bootstrap/SKILL.md`

**Inputs (extracto)**
```
- Repo root (preferred: Git root).
- The single verification gate (required): `npm run verify`.
- Whether the repo is “untrusted” for Codex config (if yes, rely more on `AGENTS.md`).
```

**Outputs (extracto)**
```
- `AGENTS.md` updated with a managed block:
  - `assets/AGENTS.managed.md` → inserted between markers
- `openspec/AGENTS.override.md` created/updated from:
  - `assets/openspec.AGENTS.override.md`
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `core-error-fix-loop`

- **Descripción:** Use when lint/test/build/typecheck fails to follow a strict fix loop read error → minimal fix → rerun the same command; stop after 3 attempts and report blockers.
- **Ruta:** `packs/core/skills/core-error-fix-loop/SKILL.md`

**Inputs (extracto)**
```
- Exact failing command (copy/paste)
- Error output (first actionable error)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `core-gates-and-evidence`

- **Descripción:** Use at the end of each iteration to run the repo gate (prefer npm run verify) and record evidence (commands + results) in OpenSpec tasks.md or a fallback evidence file.
- **Ruta:** `packs/core/skills/core-gates-and-evidence/SKILL.md`

**Inputs (extracto)**
```
- Preferred gate command (default) npm run verify
- Evidence target
  - preferred openspec/changes/<slug>/tasks.md
  - fallback docs/EVIDENCE.md
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `core-minimal-diff-implementer`

- **Descripción:** Use when implementing an iteration to keep changes minimal, scoped, and reviewable; avoid refactors, renames, and unrelated cleanup.
- **Ruta:** `packs/core/skills/core-minimal-diff-implementer/SKILL.md`

**Inputs (extracto)**
```
- Current iteration goal (1 objective)
- Relevant acceptance criteria subset
- Repo constraints (ARCHITECTURE if present)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `core-pr-ready-packager`

- **Descripción:** Use at the end of a change to produce PR-ready delivery notes summary, how to run, verification evidence, scope boundaries, tradeoffs, and follow-ups.
- **Ruta:** `packs/core/skills/core-pr-ready-packager/SKILL.md`

**Inputs (extracto)**
```
- Acceptance criteria/scope
- Verification evidence
- Decisions/tradeoffs made
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `repo-env-vars-bootstrap`

- **Descripción:** Create docs/ENV.md and .env.example from README/docs references. Use when the README mentions env vars, API keys, config, or .env. Never include real secrets; use placeholders.
- **Ruta:** `packs/core/skills/repo-env-vars-bootstrap/SKILL.md`

**Inputs (extracto)**
```
- `README.md`
- Any existing env documentation (`docs/**`, `.env.example`, `*.md`)
```

**Outputs (extracto)**
```
- `.env.example` (created if missing; updated minimally if present)
- `docs/ENV.md` (created if missing; updates only managed block if present)
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `repo-gates-bootstrap`

- **Descripción:** Standardize a single repo gate (`npm run verify`), generate a deterministic RUNBOOK, and ensure AGENTS routing references gates/docs.
- **Ruta:** `packs/core/skills/repo-gates-bootstrap/SKILL.md`

**Inputs (extracto)**
```
- `package.json` (scripts + deps)
- Existing docs: `docs/RUNBOOK.md`, `AGENTS.md`
- If Angular: run `angular-tooling-bootstrap` first when lint/format tooling is missing.
```

**Outputs (extracto)**
```
- Ensures `npm run verify` exists and is meaningful.
- Creates/updates `docs/RUNBOOK.md` from template:
  - `assets/docs/RUNBOOK.md`
- Minimal patch in `AGENTS.md` to reference RUNBOOK and the verify gate.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `repo-runbook-command-extractor`

- **Descripción:** Update docs/RUNBOOK.md deterministically by resolving dev/test/build/verify commands from package.json scripts (install is `npm ci`). Use ONLY when RUNBOOK exists but contains UNVERIFIED/placeholders or unclear commands. Never guess.
- **Ruta:** `packs/core/skills/repo-runbook-command-extractor/SKILL.md`

**Inputs (extracto)**
```
- `package.json` (scripts)
- `docs/RUNBOOK.md`
```

**Outputs (extracto)**
```
- Updates ONLY the managed block in `docs/RUNBOOK.md`:
  - `<!-- RUNBOOK:START --> ... <!-- RUNBOOK:END -->`
- Reports a command map (PASS/UNVERIFIED) in the assistant response.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `repo-testing-suites-discovery`

- **Descripción:** Document unit/integration/e2e suites deterministically from package.json scripts and deps. Use when the repo has multiple test runners/scripts or unclear testing commands. Never invent commands.
- **Ruta:** `packs/core/skills/repo-testing-suites-discovery/SKILL.md`

**Inputs (extracto)**
```
- `package.json` (scripts + dependencies)
- Existing docs (`docs/**`)
```

**Outputs (extracto)**
```
- Creates or updates `docs/TESTING.md`
- If `docs/TESTING.md` exists, update ONLY `<!-- TESTING:START --> ... <!-- TESTING:END -->`
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-apply-with-evidence`

- **Descripción:** Implement the active OpenSpec change (<slug>) with minimal diffs, run npm run verify, and record deterministic evidence in openspec/changes/<slug>/tasks.md.
- **Ruta:** `packs/core/skills/spec-apply-with-evidence/SKILL.md`

**Inputs (extracto)**
```
- `slug`
- Change folder: `openspec/changes/<slug>/`
- Spec(s): `openspec/changes/<slug>/specs/`
- Gate command: `npm run verify`
```

**Outputs (extracto)**
```
- Code changes implementing the spec
- Updated evidence log:
  - `openspec/changes/<slug>/tasks.md`
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-archive-change`

- **Descripción:** Close out an OpenSpec change (<slug>): ensure gate+evidence, run drift check, and mark the change as archived with a short archive note. Optional: use openspec CLI if present.
- **Ruta:** `packs/core/skills/spec-archive-change/SKILL.md`

**Inputs (extracto)**
```
- `slug`
- Change folder: `openspec/changes/<slug>/`
- Gate command: `npm run verify`
```

**Outputs (extracto)**
```
- Update `openspec/changes/<slug>/tasks.md` with an archive checklist entry
- Write `openspec/changes/<slug>/ARCHIVED.md` (short archive note)
```

**Failure modes (extracto)**
```
STOP if:
- the gate cannot pass, or
- drift cannot be resolved without inventing requirements.
```

### `spec-bootstrap`

- **Descripción:** Preflight and scaffold a repo-local openspec/ workspace (changes/ + templates) for deterministic spec-driven work. Stops if repo root or npm run verify is missing.
- **Ruta:** `packs/core/skills/spec-bootstrap/SKILL.md`

**Inputs (extracto)**
```
- Repository root path (preferred: Git root).
- Existing verification gate command (required: `npm run verify`).
```

**Outputs (extracto)**
```
- Repo file structure created/updated:
  - `openspec/changes/.gitkeep`
  - `openspec/specs/` (stable workflow contracts)
  - `openspec/templates/` (repo-local templates used by other skills)
    - `proposal.md`
    - `spec.md`
    - `mini-spec.md`
    - `tasks.md`
…
```

**Failure modes (extracto)**
```
Stop and ask the user if:
- `openspec/` already exists but differs materially (unknown conventions).
- `npm run verify` does not exist or fails and there is no accepted substitute.
- You cannot determine repo root.
```

### `spec-change-slugger`

- **Descripción:** Generate a stable verb-led kebab-case slug for an OpenSpec change folder at openspec/changes/<slug>/. Deterministic - same input -> same slug.
- **Ruta:** `packs/core/skills/spec-change-slugger/SKILL.md`

**Inputs (extracto)**
```
- Feature/title sentence (e.g., "Add pet detail page")
```

**Outputs (extracto)**
```
- A single slug (kebab-case), no extra text.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-commit-message-from-slug`

- **Descripción:** Generate a Conventional Commit message for an OpenSpec change, enforcing scope=<slug> and including OpenSpec traceability in the body. No git commands.
- **Ruta:** `packs/core/skills/spec-commit-message-from-slug/SKILL.md`

**Inputs (extracto)**
```
- `slug`
- Short summary of what changed (1–2 sentences)
- Optional: commit `type` (default: `chore`)
```

**Outputs (extracto)**
```
- Commit subject line
- Commit body (multi-line)
- No commands.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-drift-check`

- **Descripción:** Check the current diff against the OpenSpec change (<slug>) and FAIL if any code change cannot be traced to an explicit requirement or accepted decision.
- **Ruta:** `packs/core/skills/spec-drift-check/SKILL.md`

**Inputs (extracto)**
```
- `slug`
- Spec (Mini-SPEC/SPEC and/or iteration specs) under `openspec/changes/<slug>/`
- Current working diff (`git diff` and/or file change list)
```

**Outputs (extracto)**
```
- Drift report only (no file writes):
  - Status: `PASS` | `FAIL`
  - Drift items: file/path + what changed + missing traceability
  - Fix options (remove change vs update spec)
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-intake-router`

- **Descripción:** Entry router. Given README or brief or spec or tasks, decide tech-test vs feature, mini-spec vs full spec, and process handling. Output exact next skill call(s). No file writes.
- **Ruta:** `packs/core/skills/spec-intake-router/SKILL.md`

**Inputs (extracto)**
```
- Source text (README/notes/spec/tasks)
- Optional flags:
  - mode: auto | tt | feature (default: auto)
  - spec_level: auto | mini | full (default: auto)
  - process_mode: auto | strict | advisory (default: auto)
```

**Outputs (extracto)**
```
- A short routing decision + exact next skill call(s)
- No file writes.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-new-change-from-templates`

- **Descripción:** Scaffold openspec/changes/<slug>/ from repo-local templates (proposal, tasks, design, specs) so other skills never write ad-hoc files. No commands, no code.
- **Ruta:** `packs/core/skills/spec-new-change-from-assets/SKILL.md`

**Inputs (extracto)**
```
- `slug` (required)
- Optional:
  - `title` (used only to fill placeholders in filenames or headings if you choose to)
  - `mode`: `missing | refresh` (default: `missing`)
    - `missing`: create files only if absent
    - `refresh`: re-copy templates only for placeholder files that have not been edited (do NOT overwrite real content)
```

**Outputs (extracto)**
```
Creates (or ensures) this layout:
- `openspec/changes/<slug>/proposal.md`
- `openspec/changes/<slug>/tasks.md`
- `openspec/changes/<slug>/design.md` (optional; created from template)
- `openspec/changes/<slug>/specs/`
  - `mini-spec.md`
  - `spec.md`
  - `spec-delta.md`
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-slice-into-iterations-from-brief`

- **Descripción:** After a full SPEC, write openspec/changes/<slug>/tasks.md as 3-6 reviewable iterations with Iteration 0 baseline and gates. Each iteration maps to specific ACs. PROCESS items are advisory unless process_mode=strict.
- **Ruta:** `packs/core/skills/spec-slice-into-iterations-from-brief/SKILL.md`

**Inputs (extracto)**
```
- SPEC (Acceptance criteria + Requirements + Determinism rules)
- Preferred gate command (default: `npm run verify`)
- Optional: docs/RUNBOOK.md
```

**Outputs (extracto)**
```
- Write tasks plan to:
  `openspec/changes/<slug>/tasks.md`
- No code changes. No commands.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-slice-into-iterations-from-readme`

- **Descripción:** After a TT Mini-SPEC: write `openspec/changes/<slug>/tasks.md` as 3–5 PR-sized iterations (plus Iteration 0 baseline) that cover every AC and PROCESS constraint (e.g., PR #1 skeleton-only) with gate checks (prefer `npm run verify`). No code changes.
- **Ruta:** `packs/core/skills/spec-slice-into-iterations-from-readme/SKILL.md`

**Inputs (extracto)**
```
- Mini-SPEC (must include: AC list, requirement inventory, traceability)
- Preferred gate command (default: npm run verify)
```

**Outputs (extracto)**
```
- Write/replace plan in:
  `openspec/changes/<slug>/tasks.md`
- No code changes. No command execution.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-spec-fix`

- **Descripción:** Fix a Mini-SPEC/SPEC that failed `spec-spec-lint` by rewriting the spec with minimal edits (no new scope). Preserve existing IDs when possible. Output the corrected spec only.
- **Ruta:** `packs/core/skills/spec-spec-fix/SKILL.md`

**Inputs (extracto)**
```
- Current spec markdown
- Lint report from `spec-spec-lint`
- Optional: source brief
- Optional flags:
  - `process_mode`: `strict | advisory | auto` (default: `auto`)
    - `auto`: follow the mode requested/mentioned in the lint report if present; otherwise default to `strict`.
```

**Outputs (extracto)**
```
- Write ONLY the corrected spec to the same target path implied by context.
- No code changes. No dependency changes. No commands.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-spec-from-brief`

- **Descripción:** Product feature intake. Convert a brief or PRD or notes or README excerpt into a full OpenSpec SPEC with requirement inventory and traceability. Avoid tech-test PR choreography unless process_mode=strict is requested.
- **Ruta:** `packs/core/skills/spec-spec-from-brief/SKILL.md`

**Inputs (extracto)**
```
- Brief (notes, markdown, refined tasks, README excerpt)
- Optional flags:
  - process_mode: advisory|strict (default: advisory)
  - include_scenarios: true (default: true)
```

**Outputs (extracto)**
```
- Write ONLY:
  `openspec/changes/<slug>/specs/spec.md`
- No code changes. No dependency changes. No commands.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-spec-from-readme`

- **Descripción:** Technical test / code challenge: convert README into a spec-first Mini-SPEC with a complete inventory of explicit v1 requirements (incl PROCESS/PR instructions) + traceability BEFORE any implementation. Do NOT slice into iterations here.
- **Ruta:** `packs/core/skills/spec-spec-from-readme/SKILL.md`

**Inputs (extracto)**
```
- README content (paste or file)
- Optional flags:
  - `process_mode`: `strict | advisory` (default: `strict`)
```

**Outputs (extracto)**
```
- Write **ONLY** the Mini-SPEC to:
  `openspec/changes/<slug>/specs/mini-spec.md`
- No code changes. No dependency changes. No commands.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-spec-lint`

- **Descripción:** Lint an OpenSpec Mini-SPEC or SPEC for completeness and no-drop coverage against the source brief (README or notes). Output PASS or FAIL only. No writes.
- **Ruta:** `packs/core/skills/spec-spec-lint/SKILL.md`

**Inputs (extracto)**
```
- Spec markdown (Mini-SPEC or SPEC)
- Optional: source brief (recommended) to check coverage
- Optional flags:
  - `process_mode`: `strict | advisory | auto` (default: `auto`)
    - `auto`: infer strict if the spec declares strict, otherwise advisory
```

**Outputs (extracto)**
```
- A lint report only (no file writes):
  - Status: `PASS|FAIL`
  - Errors: `LINT-1`, `LINT-2`...
  - Fix hints (optional, max 5 bullets)
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-tasks-fix`

- **Descripción:** Fix tasks.md that failed spec-tasks-lint with minimal edits. Schedule missing ACs or PROCESS constraints, add Iteration 0 gates if missing, keep PR-sized iterations. No new scope.
- **Ruta:** `packs/core/skills/spec-tasks-fix/SKILL.md`

**Inputs (extracto)**
```
- tasks.md
- tasks lint report from `spec-tasks-lint`
- Spec (Mini-SPEC or SPEC)
```

**Outputs (extracto)**
```
- Write ONLY the corrected tasks.md to the same target path implied by context.
- No code changes. No commands.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `spec-tasks-lint`

- **Descripción:** Lint openspec/changes/<slug>/tasks.md against the spec. Require Iteration 0 baseline and gates, every AC scheduled exactly once, PROCESS constraints handled or deferred, and PR-sized iterations. Output PASS or FAIL only. No writes.
- **Ruta:** `packs/core/skills/spec-tasks-lint/SKILL.md`

**Inputs (extracto)**
```
- tasks.md
- Spec (Mini-SPEC or SPEC) for AC list + PROCESS requirements
- Optional: preferred gate command (default: `npm run verify`)
```

**Outputs (extracto)**
```
- Status: PASS|FAIL
- Errors: TLINT-1, TLINT-2...
- Fix hints (optional, max 5 bullets)
- No file writes.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

## Pack: `angular` (29 skills)

### `angular-architecture-bootstrap`

- **Descripción:** Install the standard Angular architecture rules doc (docs/ARCHITECTURE.md) from templates, using a managed block for safe updates.
- **Ruta:** `packs/angular/skills/angular-architecture-bootstrap/SKILL.md`

**Inputs (extracto)**
```
- `assets/docs/ARCHITECTURE.md`
```

**Outputs (extracto)**
```
- Create `docs/` if missing
- Create/update `docs/ARCHITECTURE.md`
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular-docs-bootstrap`

- **Descripción:** Bootstrap standard Angular docs (ARCHITECTURE + STYLING) into docs/ using catalog templates, with managed blocks for safe updates.
- **Ruta:** `packs/angular/skills/angular-docs-bootstrap/SKILL.md`

**Inputs (extracto)**
```
- This skill's templates:
  - `assets/docs/ARCHITECTURE.md`
  - `assets/docs/STYLING.md`
```

**Outputs (extracto)**
```
Creates or updates:
- `docs/ARCHITECTURE.md`
- `docs/STYLING.md`
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular-styling-bootstrap`

- **Descripción:** Install the standard Angular styling rules doc (docs/STYLING.md) from templates, using a managed block for safe updates.
- **Ruta:** `packs/angular/skills/angular-styling-bootstrap/SKILL.md`

**Inputs (extracto)**
```
- `assets/docs/STYLING.md`
```

**Outputs (extracto)**
```
- Create `docs/` if missing
- Create/update `docs/STYLING.md`
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular-tooling-bootstrap`

- **Descripción:** Install and configure Prettier + ESLint (Angular ESLint) for an Angular repo using this skill assets, then wire a CI-like verify gate. Use when Angular tooling is missing or inconsistent.
- **Ruta:** `packs/angular/skills/angular-tooling-bootstrap/SKILL.md`

**Inputs (extracto)**
```
- `package.json` (existing scripts)
- Angular workspace setup
```

**Outputs (extracto)**
```
- Tooling config files copied from assets.
- Scripts merged from `assets/package-json-scripts.json`.
- A CI-like `npm run verify` that does not write files.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-computed-vs-linked-signal`

- **Descripción:** Use when choosing between computed() and linkedSignal() to avoid duplicated state and keep derivations correct.
- **Ruta:** `packs/angular/skills/angular21-computed-vs-linked-signal/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-defer-blocks-triggers-and-states`

- **Descripción:** Use when adding @defer blocks with placeholder/loading/error states and choosing the right trigger (viewport/interaction/idle) for UX.
- **Ruta:** `packs/angular/skills/angular21-defer-blocks-triggers-and-states/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-defer-hydrate-triggers`

- **Descripción:** Use when choosing @defer hydration triggers (viewport/interaction/idle) and avoiding UX pitfalls (focus/CLS).
- **Ruta:** `packs/angular/skills/angular21-defer-hydrate-triggers/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-defer-testing-strategy`

- **Descripción:** Use when testing @defer blocks deterministically without flaky timing-based tests.
- **Ruta:** `packs/angular/skills/angular21-defer-testing-strategy/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-di-hierarchical-providers-scoping`

- **Descripción:** Use when scoping providers/services intentionally (root/route/component) to isolate state and control lifetime (sandboxing).
- **Ruta:** `packs/angular/skills/angular21-di-hierarchical-providers-scoping/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-di-injection-context-rules`

- **Descripción:** Use when fixing or avoiding inject() usage outside a valid injection context (functional APIs, token factories, constructors).
- **Ruta:** `packs/angular/skills/angular21-di-injection-context-rules/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-di-injectiontoken-config`

- **Descripción:** Use when defining typed configuration via InjectionToken (API URLs/flags) with easy test overrides and no hard-coded constants.
- **Ruta:** `packs/angular/skills/angular21-di-injectiontoken-config/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-di-injectiontoken-factory-composition`

- **Descripción:** Use when you need to derive new DI tokens from existing tokens using InjectionToken factories and inject() (e.g., base URL → endpoints), keeping config strongly typed and composable.
- **Ruta:** `packs/angular/skills/angular21-di-injectiontoken-factory-composition/SKILL.md`

**Inputs (extracto)**
```
- Token names (UPPER_SNAKE_CASE) and types
- Where tokens are provided (app config / route / component)
- Base value source (env/runtime config)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-effect-usage-rules`

- **Descripción:** Use when adding/refactoring effect() usage; enforces side-effects only and replaces derivations with computed/linkedSignal.
- **Ruta:** `packs/angular/skills/angular21-effect-usage-rules/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-httpresource-basics`

- **Descripción:** Use when fetching data with httpResource and rendering loading/error/empty/value states in Angular 21+.
- **Ruta:** `packs/angular/skills/angular21-httpresource-basics/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-httpresource-chained-resources`

- **Descripción:** Use when chaining resources (B depends on A) safely, guarding inputs and keeping states clear.
- **Ruta:** `packs/angular/skills/angular21-httpresource-chained-resources/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-httpresource-factory-service-pattern`

- **Descripción:** Use when creating reusable httpResource factories in services to reduce duplication and centralize parsing.
- **Ruta:** `packs/angular/skills/angular21-httpresource-factory-service-pattern/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-httpresource-parse-validation`

- **Descripción:** Use when adding parse validation/transform to httpResource to keep consumers typed and safe.
- **Ruta:** `packs/angular/skills/angular21-httpresource-parse-validation/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-incremental-hydration-setup`

- **Descripción:** Use when enabling incremental hydration for SSR apps and combining it with @defer for faster interactivity.
- **Ruta:** `packs/angular/skills/angular21-incremental-hydration-setup/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-router-component-input-binding`

- **Descripción:** Use when binding route params/query directly to component inputs via router component input binding.
- **Ruta:** `packs/angular/skills/angular21-router-component-input-binding/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-routing-functional-guards`

- **Descripción:** Use when implementing functional route guards (CanActivateFn) with inject() and testable logic.
- **Ruta:** `packs/angular/skills/angular21-routing-functional-guards/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-routing-functional-resolvers`

- **Descripción:** Use when implementing functional resolvers for route preloading and deciding when to prefer progressive loading instead.
- **Ruta:** `packs/angular/skills/angular21-routing-functional-resolvers/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-routing-standalone-lazy-loading`

- **Descripción:** Use when adding standalone lazy-loaded routes with loadComponent/loadChildren using feature-first organization.
- **Ruta:** `packs/angular/skills/angular21-routing-standalone-lazy-loading/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-rxjs-concurrency-operator-choice`

- **Descripción:** Use when selecting RxJS mapping operators (switchMap/exhaustMap/concatMap/mergeMap) for correct UX under concurrency.
- **Ruta:** `packs/angular/skills/angular21-rxjs-concurrency-operator-choice/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-rxjs-interop-take-until-destroyed`

- **Descripción:** Use when integrating RxJS streams in Angular 21+; ensures lifecycle-safe subscriptions with takeUntilDestroyed.
- **Ruta:** `packs/angular/skills/angular21-rxjs-interop-take-until-destroyed/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-signals-input-output-model`

- **Descripción:** Use when building/refactoring components to Angular’s signals-based model using input(), output(), and model().
- **Ruta:** `packs/angular/skills/angular21-signals-input-output-model/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-template-control-flow-states`

- **Descripción:** Use when rendering UI states with modern control flow (@if/@for/@switch) with stable tracking and readable templates.
- **Ruta:** `packs/angular/skills/angular21-template-control-flow-states/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-testing-component-scenarios`

- **Descripción:** Use when writing high-value component/integration tests (Testing Trophy) with minimal brittle mocks.
- **Ruta:** `packs/angular/skills/angular21-testing-component-scenarios/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-testing-di-overrides`

- **Descripción:** Use when overriding providers and InjectionTokens in tests cleanly and robustly.
- **Ruta:** `packs/angular/skills/angular21-testing-di-overrides/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```

### `angular21-testing-httpclient`

- **Descripción:** Use when testing HttpClient requests/interceptors deterministically (request method/url/headers + success/error).
- **Ruta:** `packs/angular/skills/angular21-testing-httpclient/SKILL.md`

**Inputs (extracto)**
```
- What feature/component/service you’re working on
- Constraints (SSR/zoneless/testing/tooling)
- Desired API shape (types, state fields, public methods)
```

**Outputs (extracto)**
```
- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.
```

**Failure modes (extracto)**
```
- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.
```


## Cambios aplicados

- Eliminada carpeta `skills/` (duplicada/no usada) y `.idea/`.
- Alineación de contratos: añadidas secciones `## Outputs` y `## Failure modes` en las 54 skills; renombradas secciones `Stop conditions` → `Failure modes` donde aplicaba.
- Endurecido el verificador: `scripts/verify-skills.mjs` ahora exige `Outputs` + `Failure modes`.
- Evals reparados: `evals/prompts.csv` actualizado; nueva fixture `evals/fixtures/tt_scaffold/` que incluye templates + change scaffold para probar `spec-spec-from-readme` y `spec-spec-lint` de forma realista.
- Limpieza de outputs: removida carpeta `evals/artifacts/` del ZIP (se genera en runtime).

## Cómo validar / ejecutar

Comandos ejecutados en esta auditoría:

```bash
node -v
npm -v

npm run verify
node scripts/run-evals.mjs --help
```

Resultados principales:

- `npm run verify` → OK (54 skills + dataset de evals con 21 filas).
- `run-evals.mjs --help` → OK (CLI del runner accesible).

## Riesgos y próximos pasos

- **Evals aún dependen de `codex` instalado**: en CI necesitarás un entorno con Codex CLI y credenciales (si quieres automatizar).
- **Valorar añadir “chain evals”** (futuro): para workflows multi-skill (slugger → new-change → spec-from-readme → slice → apply). Ahora mismo la regresión es por-skill.
- **Refinar Failure modes por skill**: los añadidos son homogéneos; si quieres más precisión, conviene que cada skill liste sus stops/preflights concretos.
