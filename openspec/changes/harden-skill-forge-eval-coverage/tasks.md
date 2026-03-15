# Tasks: harden-skill-forge-eval-coverage

## Preconditions

- Dependency slug `migrate-skill-forge-to-promptfoo-native` is complete or apply-ready.
- Preferred repo gate remains `npm run promptfoo:run:offline`.
- Evidence for each executed check MUST be recorded in this file using the standard format.

## Phase 0 — Preflight and artifact completion

- [ ] 0.1 Run `openspec --version`.
  - Verification command: `openspec --version`
  - Expected evidence: CLI is available.
- [ ] 0.2 Run `openspec schemas --json`.
  - Verification command: `openspec schemas --json`
  - Expected evidence: schema list is available.
- [ ] 0.3 Run `openspec list --json`.
  - Verification command: `openspec list --json`
  - Expected evidence: current changes are visible and dependency slug state is inspectable.
- [ ] 0.4 Run `openspec status --change "harden-skill-forge-eval-coverage" --json`.
  - Verification command: `openspec status --change "harden-skill-forge-eval-coverage" --json`
  - Expected evidence: this change exists and artifact status is visible.
- [ ] 0.5 Build or review proposal, specs, design, and tasks artifacts for this slug.
  - Verification command: `openspec validate "harden-skill-forge-eval-coverage" --type change`
  - Expected evidence: change validates after artifacts are complete.
- [ ] 0.6 Confirm dependency slug state is compatible with apply work.
  - Verification command: `openspec status --change "migrate-skill-forge-to-promptfoo-native" --json`
  - Expected evidence: dependency is complete or otherwise explicitly approved as the baseline.
- [ ] 0.7 Record implementation authority sources before code mutation.
  - Verification command: manual note in this file
  - Expected evidence: Promptfoo docs, Agent Skills, and repo contract sources are listed in a short note.

## Phase 1 — Approval checkpoint for critical tooling changes

- [ ] 1.1 Summarize scope, target files, risks, and verification commands before runtime mutation.
  - Verification command: manual approval-checkpoint note in this file
  - Expected evidence: one short summary is recorded.
- [ ] 1.2 Obtain explicit human approval before mutating runtime files during apply.
  - Verification command: manual approval note in this file
  - Expected evidence: approval is recorded with date and note.

## Phase 2 — Add schema-backed trigger validation

- [ ] 2.1 Create a minimal Eval Brief schema file for trigger validation.
  - Verification command: `test -f evals/contracts/skill-forge/eval-brief-output.schema.json`
  - Expected evidence: schema file exists at the expected path.
- [ ] 2.2 Define required core sections in the schema.
  - Verification command: `rg -n '"(skill|authoring|successModel|activationProbes|negativeSignals|sourceRefs)"' evals/contracts/skill-forge/eval-brief-output.schema.json`
  - Expected evidence: essential sections are present in the schema.
- [ ] 2.3 Keep the schema minimally sufficient rather than fully locked down.
  - Verification command: manual schema review note in this file
  - Expected evidence: one note explains why the schema is intentionally minimal.
- [ ] 2.4 Wire trigger cases in `evals/engines/promptfoo/tests/skill-forge.yaml` to use `contains-json` with the schema file.
  - Verification command: `rg -n 'contains-json|eval-brief-output\.schema\.json' evals/engines/promptfoo/tests/skill-forge.yaml`
  - Expected evidence: trigger cases reference schema-backed JSON validation.
- [ ] 2.5 Verify no trigger case remains on bare `contains-json` without schema.
  - Verification command: `python - <<'PY'
from pathlib import Path
text = Path('evals/engines/promptfoo/tests/skill-forge.yaml').read_text()
for i, line in enumerate(text.splitlines(), 1):
    if 'contains-json' in line:
        print(i, line)
PY`
  - Expected evidence: every `contains-json` use is associated with the schema-backed pattern, or any exception is justified.

## Phase 3 — Add contradiction guards and high-signal routing cases

- [ ] 3.1 Add contradiction guards for trigger cases.
  - Verification command: `rg -n 'Classification: trigger|not-icontains' evals/engines/promptfoo/tests/skill-forge.yaml`
  - Expected evidence: trigger cases reject incompatible classifications.
- [ ] 3.2 Add contradiction guards for non-trigger cases.
  - Verification command: `rg -n 'Classification: non-trigger|Eval Brief ready|not-icontains' evals/engines/promptfoo/tests/skill-forge.yaml`
  - Expected evidence: non-trigger cases reject trigger markers and incompatible classifications.
- [ ] 3.3 Add contradiction guards for stop-and-ask cases.
  - Verification command: `rg -n 'Classification: stop-and-ask|Eval Brief ready|not-icontains' evals/engines/promptfoo/tests/skill-forge.yaml`
  - Expected evidence: stop-and-ask cases reject trigger markers and incompatible classifications.
- [ ] 3.4 Add one trigger-with-downstream-noise boundary case.
  - Verification command: `rg -n 'downstream|benchmark|noise|new-skill' evals/engines/promptfoo/tests/skill-forge.yaml`
  - Expected evidence: one case explicitly protects a valid trigger despite unrelated downstream noise.
- [ ] 3.5 Add one runtime-only boundary case.
  - Verification command: `rg -n 'runtime implementation|authoring-only output would not satisfy this request' evals/engines/promptfoo/tests/skill-forge.yaml`
  - Expected evidence: one case explicitly protects the runtime-only non-trigger boundary.
- [ ] 3.6 Add one eval-authoring-disguised-as-authoring boundary case.
  - Verification command: `rg -n 'golden|benchmark|eval definition|non-trigger' evals/engines/promptfoo/tests/skill-forge.yaml`
  - Expected evidence: one case explicitly protects against eval-authoring masquerading as skill authoring.
- [ ] 3.7 Add one genuine stop-and-ask ambiguity boundary case.
  - Verification command: `rg -n 'stop-and-ask|Scope clarification required' evals/engines/promptfoo/tests/skill-forge.yaml`
  - Expected evidence: one case explicitly protects ambiguous requests from being misrouted.
- [ ] 3.8 Keep added coverage high-signal and non-duplicative.
  - Verification command: manual review note in this file
  - Expected evidence: one note explains why each added case exists.

## Phase 4 — Align offline fixtures with hardened runtime

- [ ] 4.1 Identify the active offline fixture files used by the Promptfoo workflow.
  - Verification command: `rg -n 'fixtures|offline' evals/engines/promptfoo promptfooconfig.yaml package.json`
  - Expected evidence: active fixture paths are identified.
- [ ] 4.2 Regenerate or update offline fixture artifacts to match the hardened suite.
  - Verification command: `test -f evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json`
  - Expected evidence: fixture artifact exists and is updated, or blockage is recorded.
- [ ] 4.3 Verify trigger fixture outputs contain classification, contract note, embedded JSON, and stop marker where expected.
  - Verification command: `python - <<'PY'
import json
from pathlib import Path
p = Path('evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json')
if p.exists():
    data = json.loads(p.read_text())
    print(type(data).__name__)
else:
    print('missing')
PY`
  - Expected evidence: fixture file is readable and manual note confirms required trigger content.
- [ ] 4.4 Record any environment blockage that prevents full live fixture regeneration.
  - Verification command: manual blockage note in this file
  - Expected evidence: if blocked, one note explains the blocker and the remaining gap.

## Phase 5 — Final documentation alignment for hardened runtime

- [ ] 5.1 Update `packs/core/skill-forge/SKILL.md` so trigger expectations reflect schema-backed Eval Brief validation where relevant.
  - Verification command: `rg -n 'Eval Brief|schema|suite\.v1\.json|skill-forge\.yaml' packs/core/skill-forge/SKILL.md`
  - Expected evidence: active runtime and hardened trigger expectations are explicit.
- [ ] 5.2 Update `evals/README.md` to describe the hardened runtime contract without reintroducing deprecated grading layers.
  - Verification command: `rg -n 'contains-json|schema|assertions\.cjs|skill-forge\.yaml' evals/README.md`
  - Expected evidence: README reflects hardened behavior and does not mention removed grader support.
- [ ] 5.3 Review `evals/cases/skill-forge/README.md` and `evals/final-supported-path.md` for final alignment.
  - Verification command: `rg -n 'schema|skill-forge\.yaml|suite\.v1\.json' evals/cases/skill-forge/README.md evals/final-supported-path.md`
  - Expected evidence: supported hardened runtime references are aligned.

## Phase 6 — Verification and gates

- [ ] 6.1 Run `npm run promptfoo:validate`.
  - Verification command: `npm run promptfoo:validate`
  - Expected evidence: Promptfoo config parses successfully with schema-backed assertions.
- [ ] 6.2 Run `npm run promptfoo:run:offline`.
  - Verification command: `npm run promptfoo:run:offline`
  - Expected evidence: offline run reflects hardened pass/fail semantics.
- [ ] 6.3 Run `npm run promptfoo:run` if live execution is allowed for this repo state.
  - Verification command: `npm run promptfoo:run`
  - Expected evidence: live run is consistent with offline hardening semantics, or blockage is recorded.
- [ ] 6.4 Compare offline and live results and record any remaining mismatch.
  - Verification command: manual comparison note with command outputs referenced
  - Expected evidence: one short note captures any mismatch and disposition.
- [ ] 6.5 Run a short stability check if feasible.
  - Verification command: repo-approved repeat command or manual note if unavailable
  - Expected evidence: one short note records whether a repeat check was run and what it showed.

## Phase 7 — Closure

- [ ] 7.1 Run `/review` or repository-equivalent review step before marking done.
  - Verification command: manual review note in this file
  - Expected evidence: review completion is recorded.
- [ ] 7.2 Re-run `openspec validate "harden-skill-forge-eval-coverage" --type change` before closure.
  - Verification command: `openspec validate "harden-skill-forge-eval-coverage" --type change`
  - Expected evidence: validation passes.
- [ ] 7.3 Confirm done criteria are met and record closure note.
  - Verification command: manual closure note in this file
  - Expected evidence: one short closure note confirms done criteria.

## Evidence log

### 0.1
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 0.2
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 0.3
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 0.4
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 0.5
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 0.6
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 0.7
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 1.1
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 1.2
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 2.1
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 2.2
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 2.3
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 2.4
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 2.5
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 3.1
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 3.2
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 3.3
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 3.4
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 3.5
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 3.6
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 3.7
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 3.8
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 4.1
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 4.2
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 4.3
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 4.4
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 5.1
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 5.2
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 5.3
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 6.1
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 6.2
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 6.3
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 6.4
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 6.5
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 7.1
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 7.2
- **Command:**
- **Result:**
- **Date:**
- **Note:**

### 7.3
- **Command:**
- **Result:**
- **Date:**
- **Note:**
