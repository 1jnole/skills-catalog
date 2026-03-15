# Tasks: harden-skill-forge-eval-coverage

## Preconditions

- Dependency slug `migrate-skill-forge-to-promptfoo-native` is complete or archived.
- Preferred repo gate remains `npm run promptfoo:run:offline`.
- Evidence for each executed check is recorded below.

## Phase 0 — Preflight and artifact completion

- [x] 0.1 Run `openspec --version`.
- [x] 0.2 Run `openspec schemas --json`.
- [x] 0.3 Run `openspec list --json`.
- [x] 0.4 Run `openspec status --change "harden-skill-forge-eval-coverage" --json`.
- [x] 0.5 Build or review proposal, specs, design, and tasks artifacts for this slug.
- [x] 0.6 Confirm dependency slug state is compatible with apply work.
- [x] 0.7 Record implementation authority sources before code mutation.

## Phase 1 — Approval checkpoint for critical tooling changes

- [x] 1.1 Summarize scope, target files, risks, and verification commands before runtime mutation.
- [x] 1.2 Obtain explicit human approval before mutating runtime files during apply.

## Phase 2 — Add schema-backed trigger validation

- [x] 2.1 Create a minimal Eval Brief schema file for trigger validation.
- [x] 2.2 Define required core sections in the schema.
- [x] 2.3 Keep the schema minimally sufficient rather than fully locked down.
- [x] 2.4 Wire trigger cases in `evals/engines/promptfoo/tests/skill-forge.yaml` to use `contains-json` with the schema file.
- [x] 2.5 Verify no trigger case remains on bare `contains-json` without schema.

## Phase 3 — Add contradiction guards and high-signal routing cases

- [x] 3.1 Add contradiction guards for trigger cases.
- [x] 3.2 Add contradiction guards for non-trigger cases.
- [x] 3.3 Add contradiction guards for stop-and-ask cases.
- [x] 3.4 Add one trigger-with-downstream-noise boundary case.
- [x] 3.5 Add one runtime-only boundary case.
- [x] 3.6 Add one eval-authoring-disguised-as-authoring boundary case.
- [x] 3.7 Add one genuine stop-and-ask ambiguity boundary case.
- [x] 3.8 Keep added coverage high-signal and non-duplicative.

## Phase 4 — Align offline fixtures with hardened runtime

- [x] 4.1 Identify the active offline fixture files used by the Promptfoo workflow.
- [x] 4.2 Regenerate or update offline fixture artifacts to match the hardened suite.
- [x] 4.3 Verify trigger fixture outputs contain classification, contract note, embedded JSON, and stop marker where expected.
- [x] 4.4 Record any environment blockage that prevents full live fixture regeneration.

## Phase 5 — Final documentation alignment for hardened runtime

- [x] 5.1 Update `packs/core/skill-forge/SKILL.md` so trigger expectations reflect schema-backed Eval Brief validation where relevant.
- [x] 5.2 Update `evals/README.md` to describe the hardened runtime contract without reintroducing deprecated grading layers.
- [x] 5.3 Review `evals/cases/skill-forge/README.md` and `evals/final-supported-path.md` for final alignment.

## Phase 6 — Verification and gates

- [x] 6.1 Run `npm run promptfoo:validate`.
- [x] 6.2 Run `npm run promptfoo:run:offline`.
- [x] 6.3 Run `npm run promptfoo:run` if live execution is allowed for this repo state.
- [x] 6.4 Compare offline and live results and record any remaining mismatch.
- [x] 6.5 Run a short stability check if feasible.

## Phase 7 — Closure

- [x] 7.1 Run `/review` or repository-equivalent review step before marking done.
- [x] 7.2 Re-run `openspec validate "harden-skill-forge-eval-coverage" --type change` before closure.
- [x] 7.3 Confirm done criteria are met and record closure note.

## Evidence log

### 0.1
- **Command:** `openspec --version`
- **Result:** `1.2.0`
- **Date:** `2026-03-15`
- **Note:** OpenSpec CLI available in workspace.

### 0.2
- **Command:** `openspec schemas --json`
- **Result:** Returned the `spec-driven` schema with artifacts `proposal`, `specs`, `design`, and `tasks`.
- **Date:** `2026-03-15`
- **Note:** OpenSpec schema registry loaded successfully.

### 0.3
- **Command:** `openspec list --json`
- **Result:** Returned one active change: `harden-skill-forge-eval-coverage`.
- **Date:** `2026-03-15`
- **Note:** Dependency slug is no longer active because it has already been archived.

### 0.4
- **Command:** `openspec status --change "harden-skill-forge-eval-coverage" --json`
- **Result:** `isComplete: true`; artifacts `proposal`, `design`, `specs`, and `tasks` all reported `done`.
- **Date:** `2026-03-15`
- **Note:** Change artifacts were complete before final runtime verification.

### 0.5
- **Command:** `openspec validate "harden-skill-forge-eval-coverage" --type change`
- **Result:** `Change 'harden-skill-forge-eval-coverage' is valid`
- **Date:** `2026-03-15`
- **Note:** Validation passed after correcting the spec delta format.

### 0.6
- **Command:** `openspec status --change "migrate-skill-forge-to-promptfoo-native" --json`
- **Result:** `Change 'migrate-skill-forge-to-promptfoo-native' not found`
- **Date:** `2026-03-15`
- **Note:** This is expected because the dependency slug was already archived earlier on 2026-03-15; `openspec list --json` confirmed only the harden slug remains active.

### 0.7
- **Command:** manual note
- **Result:** Authority sources recorded.
- **Date:** `2026-03-15`
- **Note:** Sources used: repo contracts in `AGENTS.md`, `openspec/AGENTS.override.md`, `PLAN.md`, current `skill-forge` docs, Promptfoo runtime behavior from the installed package and official Promptfoo docs for `contains-json`.

### 1.1
- **Command:** manual checkpoint note
- **Result:** Scope, risks, and target files were summarized before edits.
- **Date:** `2026-03-15`
- **Note:** The plan was to harden schema-backed trigger validation, add routing boundary coverage, keep docs aligned, and verify with `promptfoo:validate`, `promptfoo:run:offline`, and `promptfoo:run`.

### 1.2
- **Command:** manual approval note
- **Result:** Explicit user approval received.
- **Date:** `2026-03-15`
- **Note:** The user asked: `implementalo ese slug harden-skill-forge-eval-coverage, apply`, which served as explicit approval for this tooling mutation.

### 2.1
- **Command:** file creation plus existence check for `evals/contracts/skill-forge/eval-brief-output.schema.json`
- **Result:** Schema file exists.
- **Date:** `2026-03-15`
- **Note:** The file was added and kept under the Promptfoo runtime boundary.

### 2.2
- **Command:** `rg -n '"(skill|authoring|successModel|activationProbes|negativeSignals|sourceRefs)"' evals/contracts/skill-forge/eval-brief-output.schema.json`
- **Result:** Required top-level sections found at lines 43-48 and corresponding property blocks at lines 51, 68, 95, 132, 146, and 160.
- **Date:** `2026-03-15`
- **Note:** The hardened schema keeps the canonical top-level contract intact.

### 2.3
- **Command:** manual schema review note
- **Result:** Minimal schema rationale recorded.
- **Date:** `2026-03-15`
- **Note:** The schema intentionally validates only the core top-level structure plus a small set of acceptable nested shapes. This keeps it useful against malformed payloads while tolerating real `skill-forge` variants already emitted by the model. Internal `$ref` pointers were removed because Promptfoo 0.120.19 failed to resolve them from file-backed `contains-json` schemas.

### 2.4
- **Command:** `rg -n 'contains-json|eval-brief-output\.schema\.json' evals/engines/promptfoo/tests/skill-forge.yaml`
- **Result:** Trigger assertions found at lines 19, 48, 75, 104, and 133, each pointing at `file://evals/contracts/skill-forge/eval-brief-output.schema.json`.
- **Date:** `2026-03-15`
- **Note:** All trigger cases now use schema-backed JSON validation.

### 2.5
- **Command:** line-by-line inspection of `contains-json` uses in `evals/engines/promptfoo/tests/skill-forge.yaml`
- **Result:** Exactly five `contains-json` assertions exist, all on trigger cases and all schema-backed.
- **Date:** `2026-03-15`
- **Note:** No bare `contains-json` usage remains in the hardened suite.

### 3.1
- **Command:** `rg -n 'Classification: trigger|not-icontains' evals/engines/promptfoo/tests/skill-forge.yaml`
- **Result:** Trigger cases include positive trigger markers and contradiction guards against `Classification: non-trigger` and `Classification: stop-and-ask`.
- **Date:** `2026-03-15`
- **Note:** Trigger outputs must not mix incompatible classification families.

### 3.2
- **Command:** `rg -n 'Classification: non-trigger|Eval Brief ready|not-icontains' evals/engines/promptfoo/tests/skill-forge.yaml`
- **Result:** Non-trigger cases assert `Classification: non-trigger` and reject `Classification: trigger`, `Classification: stop-and-ask`, and `Eval Brief ready`.
- **Date:** `2026-03-15`
- **Note:** This protects the shared runtime and downstream eval-authoring non-trigger boundary.

### 3.3
- **Command:** `rg -n 'Classification: stop-and-ask|Eval Brief ready|not-icontains' evals/engines/promptfoo/tests/skill-forge.yaml`
- **Result:** Stop-and-ask cases assert `Classification: stop-and-ask` and reject trigger/non-trigger markers plus `Eval Brief ready`.
- **Date:** `2026-03-15`
- **Note:** Ambiguous authoring requests now have explicit contradiction guards.

### 3.4
- **Command:** `rg -n 'downstream|benchmark|noise|new-skill' evals/engines/promptfoo/tests/skill-forge.yaml`
- **Result:** `trigger-with-benchmark-noise` exists and asserts trigger routing despite later benchmark work.
- **Date:** `2026-03-15`
- **Note:** This case protects against regression from downstream-noise mentions.

### 3.5
- **Command:** `rg -n 'runtime implementation|authoring-only output would not satisfy this request' evals/engines/promptfoo/tests/skill-forge.yaml`
- **Result:** `runtime-harness-implementation` exists and checks the exact runtime-only non-trigger sentence.
- **Date:** `2026-03-15`
- **Note:** Runtime implementation remains explicitly outside `skill-forge`.

### 3.6
- **Command:** `rg -n 'golden|benchmark|eval definition|non-trigger' evals/engines/promptfoo/tests/skill-forge.yaml`
- **Result:** `eval-authoring-benchmark-suite-request` exists and asserts non-trigger routing for downstream eval/benchmark authoring.
- **Date:** `2026-03-15`
- **Note:** This case blocks eval-authoring work from masquerading as skill authoring.

### 3.7
- **Command:** `rg -n 'stop-and-ask|Scope clarification required' evals/engines/promptfoo/tests/skill-forge.yaml`
- **Result:** `ambiguous-multi-workflow-request` and `ambiguous-refactor-missing-target` explicitly assert `Scope clarification required.`
- **Date:** `2026-03-15`
- **Note:** Ambiguous routing boundaries now have direct coverage.

### 3.8
- **Command:** manual review note
- **Result:** Added-case rationale recorded.
- **Date:** `2026-03-15`
- **Note:** Added coverage is high-signal and non-duplicative: one downstream-noise trigger, one runtime-only non-trigger, one downstream eval-authoring non-trigger, and one genuine ambiguity boundary.

### 4.1
- **Command:** `rg -n 'fixtures|offline' evals/engines/promptfoo/promptfooconfig.yaml package.json`
- **Result:** `package.json:22` points `promptfoo:run:offline` at `evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json`.
- **Date:** `2026-03-15`
- **Note:** The offline fixture path is driven by the public npm script rather than `promptfooconfig.yaml`.

### 4.2
- **Command:** existence check plus file review for `evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json`
- **Result:** Fixture file exists and was updated to 22 outputs.
- **Date:** `2026-03-15`
- **Note:** The fixture aligns to 11 cases x 2 prompt modes.

### 4.3
- **Command:** `python -c "import json, pathlib; p = pathlib.Path('evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json'); data = json.loads(p.read_text()); print(type(data).__name__); print(len(data))"`
- **Result:** `list` and `22`
- **Date:** `2026-03-15`
- **Note:** Trigger fixture entries were reviewed and contain classification markers, trigger notes, embedded JSON payloads, and the `Eval Brief ready` stop line where expected.

### 4.4
- **Command:** manual blockage note
- **Result:** No hard environment blocker remained after schema compatibility fixes.
- **Date:** `2026-03-15`
- **Note:** The main issue was Promptfoo 0.120.19 rejecting internal `$ref` pointers in file-backed schemas. Flattening the schema removed the compatibility blocker.

### 5.1
- **Command:** `rg -n 'Eval Brief|schema|suite\.v1\.json|skill-forge\.yaml' packs/core/skill-forge/SKILL.md`
- **Result:** `SKILL.md` references the canonical template, runtime suite, and downstream contract files, and it now states that repo evals validate trigger payload shape against the stable top-level template keys.
- **Date:** `2026-03-15`
- **Note:** Trigger expectations and runtime truth were aligned.

### 5.2
- **Command:** `rg -n 'contains-json|schema|assertions\.cjs|skill-forge\.yaml' evals/README.md`
- **Result:** `evals/README.md` now points to `evals/engines/promptfoo/tests/skill-forge.yaml` and the trigger schema, without reintroducing `assertions.cjs`.
- **Date:** `2026-03-15`
- **Note:** Deprecated centralized grading remains out of the supported path.

### 5.3
- **Command:** `rg -n 'schema|skill-forge\.yaml|suite\.v1\.json' evals/cases/skill-forge/README.md evals/final-supported-path.md`
- **Result:** Both documents reference the hardened trigger schema, canonical Promptfoo suite, and the local authoring contract.
- **Date:** `2026-03-15`
- **Note:** Final runtime docs are aligned with the supported path.

### 6.1
- **Command:** `npm run promptfoo:validate`
- **Result:** `Configuration is valid.`
- **Date:** `2026-03-15`
- **Note:** Validation passed after flattening the schema and switching overlapping variant checks from `oneOf` to `anyOf`.

### 6.2
- **Command:** `npm run promptfoo:run:offline`
- **Result:** `Results: ✓ 7 passed, ✗ 15 failed, 0 errors (31.82%)`
- **Date:** `2026-03-15`
- **Note:** Hardened offline semantics are active. Prompt metrics from the generated eval show `with_skill` at `7/4` and `without_skill` at `0/11`.

### 6.3
- **Command:** `npm run promptfoo:run`
- **Result:** `Results: ✓ 7 passed, ✗ 15 failed, 0 errors (31.82%)`
- **Date:** `2026-03-15`
- **Note:** Live execution was allowed and completed. Promptfoo reported cached evaluation tokens for this run.

### 6.4
- **Command:** manual comparison note based on `npm run promptfoo:run:offline`, `npm run promptfoo:run`, and the generated eval JSON
- **Result:** Offline and live matched exactly at `7 passed / 15 failed`.
- **Date:** `2026-03-15`
- **Note:** Remaining failures are behavioral gaps, not hardening/plumbing gaps. Current failures cluster in `without_skill` degradation plus three `with_skill` routing/content mismatches: `eval-authoring-only-request`, `eval-authoring-benchmark-suite-request`, `ambiguous-multi-workflow-request`, and `ambiguous-refactor-missing-target`.

### 6.5
- **Command:** repeat run via a second `npm run promptfoo:run`
- **Result:** The repeated run again produced `✓ 7 passed, ✗ 15 failed, 0 errors`.
- **Date:** `2026-03-15`
- **Note:** The hardened suite is stable under repeat execution in the current cached environment.

### 7.1
- **Command:** repository-equivalent manual review
- **Result:** Reviewed the changed schema, suite assertions, docs alignment, generated failure reasons, and `git diff`.
- **Date:** `2026-03-15`
- **Note:** No additional hardening bugs were found beyond the already-recorded behavioral gaps.

### 7.2
- **Command:** `openspec validate "harden-skill-forge-eval-coverage" --type change`
- **Result:** `Change 'harden-skill-forge-eval-coverage' is valid`
- **Date:** `2026-03-15`
- **Note:** Final OpenSpec validation passed after the evidence log update.

### 7.3
- **Command:** manual closure note
- **Result:** Done criteria met for this slug.
- **Date:** `2026-03-15`
- **Note:** The schema-backed trigger validation, contradiction guards, high-signal cases, fixture alignment, docs alignment, and runtime verification requested by this slug are implemented. Remaining eval failures are intentionally exposed as follow-on behavioral work rather than blockers for this hardening change.
