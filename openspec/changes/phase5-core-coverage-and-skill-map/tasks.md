# Tasks — phase5-core-coverage-and-skill-map

## Checklist
- [x] Collect repo evidence (workflow contract, gates, declared core skill set).
- [x] Define tier criteria grounded in repo signals.
- [x] Classify all canonical skills + key non-skill repo pieces.
- [x] Audit eval dataset coverage by skill (types + negatives + checks).
- [x] Produce prioritized gaps + minimal plan to close them.
- [x] Run `npm run verify` and capture output.

## Evidence (commands + outputs)

### Declared core skill set

```sh
cat evals/core-skills.json
```

```json
{
  "core_skills": [
    "agents-bootstrap",
    "repo-env-vars-bootstrap",
    "repo-gates-bootstrap",
    "spec-bootstrap",
    "spec-spec-from-readme",
    "spec-new-change-from-templates",
    "spec-spec-lint"
  ]
}
```

### Cross-skill prerequisite signals (`$skill` references inside core SKILL.md)

```
Top referenced core skills (by $skill mention inside core SKILL.md):
  8 spec-bootstrap  <-  6 skills
  6 spec-new-change-from-templates  <-  5 skills
  6 spec-spec-lint  <-  6 skills
  3 spec-change-slugger  <-  2 skills
  3 spec-spec-fix  <-  3 skills
  3 spec-spec-from-brief  <-  2 skills
  3 spec-spec-from-readme  <-  2 skills
  2 core-gates-and-evidence  <-  2 skills
  2 spec-drift-check  <-  2 skills
  1 core-error-fix-loop  <-  1 skills
  1 spec-tasks-lint  <-  1 skills
```

### Eval dataset coverage stats (current `evals/prompts.csv`)

```
Skill coverage in evals/prompts.csv (rows=28)
agents-bootstrap: prompts=4, types=[contextual|explicit|implicit|negative], negatives=1, check_signals=[file_contains|file_exists|file_not_exists|no_file_writes_trace|no_shell|no_web_search|no_writes|writes_only]
repo-env-vars-bootstrap: prompts=4, types=[contextual|explicit|implicit|negative], negatives=1, check_signals=[file_contains|file_exists|no_file_writes_trace|no_shell|no_web_search|no_writes|writes_only]
repo-gates-bootstrap: prompts=4, types=[contextual|explicit|implicit|negative], negatives=1, check_signals=[file_contains|file_exists|file_not_exists|no_file_writes_trace|no_shell|no_web_search|no_writes|writes_only]
spec-bootstrap: prompts=4, types=[contextual|explicit|implicit|negative], negatives=1, check_signals=[dir_exists|dir_not_exists|no_file_writes_trace|no_shell|no_web_search|no_writes|writes_only]
spec-new-change-from-templates: prompts=4, types=[contextual|explicit|implicit|negative], negatives=1, check_signals=[dir_exists|dir_not_exists|file_exists|no_file_writes_trace|no_shell|no_web_search|no_writes|writes_only]
spec-spec-from-readme: prompts=4, types=[contextual|explicit|implicit|negative], negatives=1, check_signals=[file_contains|file_exists|no_file_writes_trace|no_shell|no_web_search|no_writes|writes_only]
spec-spec-lint: prompts=4, types=[contextual|explicit|implicit|negative], negatives=1, check_signals=[no_file_writes_trace|no_shell|no_web_search|no_writes]
```

### Verification gate

```sh
npm run verify
```

```text
> verify
> node scripts/verify-skills.mjs

✅ Required instruction docs exist and are within size limits
✅ Required bootstrap assets are present
✅ Validated 54 skills (frontmatter + naming + duplicates + structure)
✅ Validated core eval coverage: 7 skills
✅ Validated eval dataset: 28 rows
✅ No obvious secrets detected
✅ verify: OK
```

## A) Tabla — Clasificación core (skills + piezas)

| Skill / Piece | Pack | Tier | Evidence (repo signal) | Justification |
|---|---:|---|---|---|
| openspec/specs/workflow.md | — | Tier A (P0) | declares non-negotiables + source-of-truth | Defines the contract other skills/scripts rely on. |
| scripts/verify-skills.mjs (npm run verify) | — | Tier A (P0) | package.json single gate | Primary gate; prevents drift and enforces conventions. |
| scripts/run-evals.mjs | — | Tier B (P1) | eval harness; saves JSONL traces + deterministic checks | Required to run regression suite. |
| evals/prompts.csv | — | Tier B (P1) | executable regression dataset | Defines what behavior is being tested. |
| docs/AGENTS.md + openspec/AGENTS.override.md | — | Tier B (P1) | agent instruction entrypoint; referenced by workflow | Operational policy surface for Codex agents. |
| docs/CONVENTIONS.md | — | Tier C (P2) | documents source-of-truth + conventions | Reduces future layout drift. |
| docs/RUN_EVALS.md | — | Tier C (P2) | documents verify + evals + artifacts | Operational runbook; not executed by tooling. |
| angular-architecture-bootstrap | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular-docs-bootstrap | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular-styling-bootstrap | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular-tooling-bootstrap | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-computed-vs-linked-signal | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-defer-blocks-triggers-and-states | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-defer-hydrate-triggers | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-defer-testing-strategy | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-di-hierarchical-providers-scoping | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-di-injection-context-rules | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-di-injectiontoken-config | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-di-injectiontoken-factory-composition | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-effect-usage-rules | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-httpresource-basics | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-httpresource-chained-resources | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-httpresource-factory-service-pattern | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-httpresource-parse-validation | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-incremental-hydration-setup | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-router-component-input-binding | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-routing-functional-guards | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-routing-functional-resolvers | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-routing-standalone-lazy-loading | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-rxjs-concurrency-operator-choice | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-rxjs-interop-take-until-destroyed | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-signals-input-output-model | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-template-control-flow-states | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-testing-component-scenarios | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-testing-di-overrides | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| angular21-testing-httpclient | angular | Tier D (P3) | optional framework pack (docs/AGENTS.md) | Framework-specific; not needed for core catalog operation. |
| agents-bootstrap | core | Tier A (P0) | listed in evals/core-skills.json | Baseline workflow step; evals require stable behavior. |
| core-error-fix-loop | core | Tier B (P1) | referenced by 1 core skills; implements single gate + error loop | Keeps the workflow safe/deterministic (evidence, drift, or dependency hub). |
| core-gates-and-evidence | core | Tier B (P1) | referenced by 2 core skills; implements single gate + error loop | Keeps the workflow safe/deterministic (evidence, drift, or dependency hub). |
| core-minimal-diff-implementer | core | Tier C (P2) |  | Helpful extension; not required for baseline gate-driven loop. |
| core-pr-ready-packager | core | Tier C (P2) |  | Helpful extension; not required for baseline gate-driven loop. |
| repo-env-vars-bootstrap | core | Tier A (P0) | listed in evals/core-skills.json | Baseline workflow step; evals require stable behavior. |
| repo-gates-bootstrap | core | Tier A (P0) | listed in evals/core-skills.json | Baseline workflow step; evals require stable behavior. |
| repo-runbook-command-extractor | core | Tier C (P2) |  | Helpful extension; not required for baseline gate-driven loop. |
| repo-testing-suites-discovery | core | Tier C (P2) |  | Helpful extension; not required for baseline gate-driven loop. |
| spec-apply-with-evidence | core | Tier B (P1) |  | Keeps the workflow safe/deterministic (evidence, drift, or dependency hub). |
| spec-archive-change | core | Tier C (P2) |  | Helpful extension; not required for baseline gate-driven loop. |
| spec-bootstrap | core | Tier A (P0) | listed in evals/core-skills.json; referenced by 6 core skills | Baseline workflow step; evals require stable behavior. |
| spec-change-slugger | core | Tier B (P1) | referenced by 2 core skills | Keeps the workflow safe/deterministic (evidence, drift, or dependency hub). |
| spec-commit-message-from-slug | core | Tier C (P2) |  | Helpful extension; not required for baseline gate-driven loop. |
| spec-drift-check | core | Tier B (P1) | referenced by 2 core skills; guards spec/code drift | Keeps the workflow safe/deterministic (evidence, drift, or dependency hub). |
| spec-intake-router | core | Tier B (P1) | router skill for standard flow | Keeps the workflow safe/deterministic (evidence, drift, or dependency hub). |
| spec-new-change-from-templates | core | Tier A (P0) | listed in evals/core-skills.json; referenced by 5 core skills | Baseline workflow step; evals require stable behavior. |
| spec-slice-into-iterations-from-brief | core | Tier C (P2) |  | Helpful extension; not required for baseline gate-driven loop. |
| spec-slice-into-iterations-from-readme | core | Tier C (P2) |  | Helpful extension; not required for baseline gate-driven loop. |
| spec-spec-fix | core | Tier B (P1) | referenced by 3 core skills | Keeps the workflow safe/deterministic (evidence, drift, or dependency hub). |
| spec-spec-from-brief | core | Tier B (P1) | referenced by 2 core skills | Keeps the workflow safe/deterministic (evidence, drift, or dependency hub). |
| spec-spec-from-readme | core | Tier A (P0) | listed in evals/core-skills.json; referenced by 2 core skills | Baseline workflow step; evals require stable behavior. |
| spec-spec-lint | core | Tier A (P0) | listed in evals/core-skills.json; referenced by 6 core skills | Baseline workflow step; evals require stable behavior. |
| spec-tasks-fix | core | Tier B (P1) | enforces tasks.md evidence contract | Keeps the workflow safe/deterministic (evidence, drift, or dependency hub). |
| spec-tasks-lint | core | Tier B (P1) | referenced by 1 core skills; enforces tasks.md evidence contract | Keeps the workflow safe/deterministic (evidence, drift, or dependency hub). |

## B) Tabla — Cobertura actual de evals (por skill)

| Skill | Pack | Tier | #prompts | Types covered | Negatives near-miss? | Checks (outcome/process/security) | Status |
|---|---:|---|---:|---|---|---|---|
| angular-architecture-bootstrap | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular-docs-bootstrap | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular-styling-bootstrap | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular-tooling-bootstrap | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-computed-vs-linked-signal | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-defer-blocks-triggers-and-states | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-defer-hydrate-triggers | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-defer-testing-strategy | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-di-hierarchical-providers-scoping | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-di-injection-context-rules | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-di-injectiontoken-config | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-di-injectiontoken-factory-composition | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-effect-usage-rules | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-httpresource-basics | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-httpresource-chained-resources | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-httpresource-factory-service-pattern | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-httpresource-parse-validation | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-incremental-hydration-setup | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-router-component-input-binding | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-routing-functional-guards | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-routing-functional-resolvers | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-routing-standalone-lazy-loading | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-rxjs-concurrency-operator-choice | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-rxjs-interop-take-until-destroyed | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-signals-input-output-model | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-template-control-flow-states | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-testing-component-scenarios | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-testing-di-overrides | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| angular21-testing-httpclient | angular | Tier D (P3) | 0 | — | — | no / no / no | — |
| agents-bootstrap | core | Tier A (P0) | 4 | contextual, explicit, implicit, negative | yes | yes / yes / yes | OK |
| core-error-fix-loop | core | Tier B (P1) | 0 | — | — | no / no / no | GAP |
| core-gates-and-evidence | core | Tier B (P1) | 0 | — | — | no / no / no | GAP |
| core-minimal-diff-implementer | core | Tier C (P2) | 0 | — | — | no / no / no | — |
| core-pr-ready-packager | core | Tier C (P2) | 0 | — | — | no / no / no | — |
| repo-env-vars-bootstrap | core | Tier A (P0) | 4 | contextual, explicit, implicit, negative | yes | yes / yes / yes | OK |
| repo-gates-bootstrap | core | Tier A (P0) | 4 | contextual, explicit, implicit, negative | yes | yes / yes / yes | OK |
| repo-runbook-command-extractor | core | Tier C (P2) | 0 | — | — | no / no / no | — |
| repo-testing-suites-discovery | core | Tier C (P2) | 0 | — | — | no / no / no | — |
| spec-apply-with-evidence | core | Tier B (P1) | 0 | — | — | no / no / no | GAP |
| spec-archive-change | core | Tier C (P2) | 0 | — | — | no / no / no | — |
| spec-bootstrap | core | Tier A (P0) | 4 | contextual, explicit, implicit, negative | yes | yes / yes / yes | OK |
| spec-change-slugger | core | Tier B (P1) | 0 | — | — | no / no / no | GAP |
| spec-commit-message-from-slug | core | Tier C (P2) | 0 | — | — | no / no / no | — |
| spec-drift-check | core | Tier B (P1) | 0 | — | — | no / no / no | GAP |
| spec-intake-router | core | Tier B (P1) | 0 | — | — | no / no / no | GAP |
| spec-new-change-from-templates | core | Tier A (P0) | 4 | contextual, explicit, implicit, negative | yes | yes / yes / yes | OK |
| spec-slice-into-iterations-from-brief | core | Tier C (P2) | 0 | — | — | no / no / no | — |
| spec-slice-into-iterations-from-readme | core | Tier C (P2) | 0 | — | — | no / no / no | — |
| spec-spec-fix | core | Tier B (P1) | 0 | — | — | no / no / no | GAP |
| spec-spec-from-brief | core | Tier B (P1) | 0 | — | — | no / no / no | GAP |
| spec-spec-from-readme | core | Tier A (P0) | 4 | contextual, explicit, implicit, negative | yes | yes / yes / yes | OK |
| spec-spec-lint | core | Tier A (P0) | 4 | contextual, explicit, implicit, negative | yes | yes / yes / yes | OK |
| spec-tasks-fix | core | Tier B (P1) | 0 | — | — | no / no / no | GAP |
| spec-tasks-lint | core | Tier B (P1) | 0 | — | — | no / no / no | GAP |

## C) Gaps priorizados (Tier A/B primero)

- **spec-spec-fix** (Tier B (P1)) — No eval cases for a high-priority skill. Repo signal: referenced by 3 core skills.
- **core-gates-and-evidence** (Tier B (P1)) — No eval cases for a high-priority skill. Repo signal: referenced by 2 core skills.
- **spec-change-slugger** (Tier B (P1)) — No eval cases for a high-priority skill. Repo signal: referenced by 2 core skills.
- **spec-drift-check** (Tier B (P1)) — No eval cases for a high-priority skill. Repo signal: referenced by 2 core skills.
- **spec-spec-from-brief** (Tier B (P1)) — No eval cases for a high-priority skill. Repo signal: referenced by 2 core skills.
- **core-error-fix-loop** (Tier B (P1)) — No eval cases for a high-priority skill. Repo signal: referenced by 1 core skills.
- **spec-tasks-lint** (Tier B (P1)) — No eval cases for a high-priority skill. Repo signal: referenced by 1 core skills.
- **spec-apply-with-evidence** (Tier B (P1)) — No eval cases for a high-priority skill. Repo signal: referenced by 0 core skills.
- **spec-intake-router** (Tier B (P1)) — No eval cases for a high-priority skill. Repo signal: referenced by 0 core skills.
- **spec-tasks-fix** (Tier B (P1)) — No eval cases for a high-priority skill. Repo signal: referenced by 0 core skills.

## Plan mínimo para cerrar gaps (sin overkill)

> Nota: Tier A está completamente cubierto con 4 prompts (exp/imp/ctx/near-miss) y checks de outcome+seguridad; los gaps relevantes están en Tier B.

#### Targeted expansion for Tier B (P1) gaps

### spec-spec-fix — add 4 prompts + 1 primary check
- **Explicit**: invoke `$spec-spec-fix` on a focused fixture.
- **Implicit**: same intent without naming the skill.
- **Contextual**: require reading a repo file (README / workflow.md) to ground output.
- **Negative (near-miss)**: ask for explanation/plan only + forbid writes; run in `workspace-write` + `no_writes`.
- **Primary check** (recommended):
  - Outcome: file/dir existence + content checks for the intended artifact(s).
  - Security: `no_web_search`.

### core-gates-and-evidence — add 4 prompts + 1 primary check
- **Explicit**: invoke `$core-gates-and-evidence` on a focused fixture.
- **Implicit**: same intent without naming the skill.
- **Contextual**: require reading a repo file (README / workflow.md) to ground output.
- **Negative (near-miss)**: ask for explanation/plan only + forbid writes; run in `workspace-write` + `no_writes`.
- **Primary check** (recommended):
  - Outcome: `file_contains:openspec/changes/<slug>/tasks.md:npm run verify` and exit code capture in report.
  - Process: `no_web_search`; allow shell if gate execution requires it (otherwise add `no_shell`).

### spec-change-slugger — add 4 prompts + 1 primary check
- **Explicit**: invoke `$spec-change-slugger` on a focused fixture.
- **Implicit**: same intent without naming the skill.
- **Contextual**: require reading a repo file (README / workflow.md) to ground output.
- **Negative (near-miss)**: ask for explanation/plan only + forbid writes; run in `workspace-write` + `no_writes`.
- **Primary check** (recommended):
  - Outcome: `file_contains:...` on generated slug output (stdout capture) OR `writes_only:openspec/**` when used via a router that writes.
  - Process: `no_web_search` always; consider `no_shell` if you want to forbid running git.

### spec-drift-check — add 4 prompts + 1 primary check
- **Explicit**: invoke `$spec-drift-check` on a focused fixture.
- **Implicit**: same intent without naming the skill.
- **Contextual**: require reading a repo file (README / workflow.md) to ground output.
- **Negative (near-miss)**: ask for explanation/plan only + forbid writes; run in `workspace-write` + `no_writes`.
- **Primary check** (recommended):
  - Outcome: create a deliberate drift in fixture, expect report that flags it (stdout / trace regex).
  - Security: `no_web_search`.

#### Defer Tier C/D
- Keep Tier C (P2) and Tier D (P3) out of the default dataset until Tier B is stable, to keep runtime bounded.
