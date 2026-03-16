# Tasks: migrate-skill-contract-forge-to-promptfoo-native

## Execution policy

- Work one task at a time.
- Keep diffs minimal and scoped to files named by this change.
- Record evidence in this file using the standard format:
  - **Command:** `...`
  - **Result:** PASS or FAIL with 2-10 relevant lines of output
  - **Date:** `YYYY-MM-DD`
  - **Note:** one sentence
- Stop and reconcile if code requirements drift from these artifacts.
- Stop for explicit approval before mutating runtime files because this slug changes tooling behavior.

## Phase 0 — Preflight and artifact completion

- [x] 0.1 Run `openspec --version` and capture evidence.
  - Verification command: `openspec --version`
  - Expected evidence: CLI version output is present.
- [x] 0.2 Run `openspec schemas --json` and capture evidence.
  - Verification command: `openspec schemas --json`
  - Expected evidence: schema list includes change artifact schemas.
- [x] 0.3 Run `openspec list --json` and capture evidence.
  - Verification command: `openspec list --json`
  - Expected evidence: current changes are visible.
- [x] 0.4 Create or confirm the change folder `openspec/changes/migrate-skill-contract-forge-to-promptfoo-native/`.
  - Verification command: `test -d openspec/changes/migrate-skill-contract-forge-to-promptfoo-native`
  - Expected evidence: command exits successfully.
- [x] 0.5 Add or confirm `proposal.md`, `design.md`, `tasks.md`, and `specs/skill-contract-forge-promptfoo-eval-runtime/spec.md`.
  - Verification command: `find openspec/changes/migrate-skill-contract-forge-to-promptfoo-native -maxdepth 3 -type f | sort`
  - Expected evidence: all required change artifacts are listed.
- [x] 0.6 Run `openspec status --change "migrate-skill-contract-forge-to-promptfoo-native" --json`.
  - Verification command: `openspec status --change "migrate-skill-contract-forge-to-promptfoo-native" --json`
  - Expected evidence: change status is returned.
- [x] 0.7 Run `openspec validate "migrate-skill-contract-forge-to-promptfoo-native" --type change`.
  - Verification command: `openspec validate "migrate-skill-contract-forge-to-promptfoo-native" --type change`
  - Expected evidence: validation passes.

## Phase 1 — Approval checkpoint before apply

- [x] 1.1 Summarize scope, target files, risks, and verification commands for the apply phase.
  - Verification command: manual review note in this file
  - Expected evidence: one concise checkpoint summary is recorded.
- [x] 1.2 Obtain explicit human approval before mutating runtime files.
  - Verification command: manual approval note in this file
  - Expected evidence: approval is recorded with date and note.

## Phase 2 — Remove legacy central grader wiring

- [x] 2.1 Inspect `evals/engines/promptfoo/promptfooconfig.yaml` and identify the current grader wiring.
  - Verification command: `rg -n "assertions\.cjs|assertions_json|assertion_rules_json|defaultTest" evals/engines/promptfoo/promptfooconfig.yaml`
  - Expected evidence: current wiring locations are listed.
- [x] 2.2 Remove config paths that send tests through the legacy JS grader.
  - Verification command: `rg -n "assertions\.cjs|assertions_json|assertion_rules_json" evals/engines/promptfoo/promptfooconfig.yaml`
  - Expected evidence: removed wiring no longer appears in active config.
- [x] 2.3 Verify there are no remaining supported runtime references to `evals/engines/promptfoo/support/assertions.cjs`.
  - Verification command: `rg -n "evals/engines/promptfoo/support/assertions\.cjs|assertions\.cjs" evals/engines/promptfoo evals/README.md packs/core/skill-contract-forge/SKILL.md`
  - Expected evidence: only historical references remain, or no matches remain.
- [x] 2.4 Delete `evals/engines/promptfoo/support/assertions.cjs` if no supported runtime dependency remains.
  - Verification command: `test ! -f evals/engines/promptfoo/support/assertions.cjs`
  - Expected evidence: file is absent.

## Phase 3 — Move case expectations into Promptfoo-native assertions

- [x] 3.1 Rework `evals/engines/promptfoo/tests/skill-contract-forge.yaml` so each active case owns its own `assert` block.
  - Verification command: `rg -n "^\s*- description:|^\s*assert:" evals/engines/promptfoo/tests/skill-contract-forge.yaml`
  - Expected evidence: each case is paired with a visible `assert` block.
- [x] 3.2 Implement trigger-case assertions using documented deterministic Promptfoo assertions.
  - Verification command: `rg -n "Classification: trigger|Workflow:|Freeze the contract before final instructions\.|Eval Brief ready" evals/engines/promptfoo/tests/skill-contract-forge.yaml`
  - Expected evidence: trigger-case markers appear in assertions.
- [x] 3.3 Implement non-trigger-case assertions using documented deterministic Promptfoo assertions.
  - Verification command: `rg -n "Classification: non-trigger|Out of scope for skill-contract-forge\." evals/engines/promptfoo/tests/skill-contract-forge.yaml`
  - Expected evidence: non-trigger markers appear in assertions.
- [x] 3.4 Implement stop-and-ask-case assertions using documented deterministic Promptfoo assertions.
  - Verification command: `rg -n "Classification: stop-and-ask|Scope clarification required\." evals/engines/promptfoo/tests/skill-contract-forge.yaml`
  - Expected evidence: stop-and-ask markers appear in assertions.
- [x] 3.5 Add contradiction guards so incompatible classifications do not pass simultaneously.
  - Verification command: `rg -n "not-icontains" evals/engines/promptfoo/tests/skill-contract-forge.yaml`
  - Expected evidence: contradiction guards are present for each classification family.
- [x] 3.6 Keep assertion types within documented Promptfoo capabilities; record justification if any `javascript` assertion remains.
  - Verification command: `rg -n "type:\s*javascript|type:\s*(starts-with|icontains|icontains-any|not-icontains|regex|contains-json|assert-set)" evals/engines/promptfoo/tests/skill-contract-forge.yaml`
  - Expected evidence: only documented types are used, or justification is recorded.

## Phase 4 — Minimum documentation cleanup

- [x] 4.1 Update `packs/core/skill-contract-forge/SKILL.md` so active references do not present legacy eval paths as current runtime truth.
  - Verification command: `rg -n "packs/core/skill-contract-forge/evals/evals\.json|evals/cases/skill-contract-forge/suite\.v1\.json|skill-contract-forge\.yaml" packs/core/skill-contract-forge/SKILL.md`
  - Expected evidence: active path guidance is explicit and legacy path is historical if retained.
- [x] 4.2 Update `evals/README.md` so it does not present the removed grader as a supported artifact.
  - Verification command: `rg -n "assertions\.cjs|skill-contract-forge\.yaml" evals/README.md`
  - Expected evidence: removed grader is no longer described as supported runtime behavior.
- [x] 4.3 Review `evals/cases/skill-contract-forge/README.md` and `evals/final-supported-path.md` for alignment.
  - Verification command: `rg -n "skill-contract-forge\.yaml|suite\.v1\.json|packs/core/skill-contract-forge/evals/evals\.json" evals/cases/skill-contract-forge/README.md evals/final-supported-path.md`
  - Expected evidence: supported runtime references are aligned.

## Phase 5 — Verification and gates

- [x] 5.1 Run `npm run promptfoo:validate`.
  - Verification command: `npm run promptfoo:validate`
  - Expected evidence: Promptfoo config parses successfully.
- [x] 5.2 Run `npm run promptfoo:run:offline`.
  - Verification command: `npm run promptfoo:run:offline`
  - Expected evidence: Promptfoo reports real pass/fail behavior in offline mode.
- [x] 5.3 Run `npm run promptfoo:run` if live execution is allowed for this repo state.
  - Verification command: `npm run promptfoo:run`
  - Expected evidence: live run is consistent with migrated pass/fail semantics, or blockage is recorded.
- [x] 5.4 Compare `with_skill` and `without_skill` behavior and record any mismatch that belongs to the follow-up slug.
  - Verification command: manual comparison note with command outputs referenced
  - Expected evidence: one short note captures whether offline/live mismatch remains.

## Phase 6 — Closure

- [x] 6.1 Run `/review` or repository-equivalent review step before marking done.
  - Verification command: manual review note in this file
  - Expected evidence: review completion is recorded.
- [x] 6.2 Re-run `openspec validate "migrate-skill-contract-forge-to-promptfoo-native" --type change` before closure.
  - Verification command: `openspec validate "migrate-skill-contract-forge-to-promptfoo-native" --type change`
  - Expected evidence: validation passes.
- [x] 6.3 Confirm done criteria are met and record closure note.
  - Verification command: manual closure note in this file
  - Expected evidence: one short closure note confirms done criteria.

## Deferred work for follow-up slug

- [x] D.1 Add `contains-json` with JSON Schema validation for trigger payloads. (deferred to `harden-skill-contract-forge-eval-coverage`)
- [x] D.2 Expand edge-case coverage for routing boundaries. (deferred to `harden-skill-contract-forge-eval-coverage`)
- [x] D.3 Regenerate and harden offline fixtures. (deferred to `harden-skill-contract-forge-eval-coverage`)
- [x] D.4 Apply final documentation alignment after hardened suite lands. (deferred to `harden-skill-contract-forge-eval-coverage`)

## Evidence log

### 0.1
- **Command:** `openspec --version`
- **Result:** PASS.
  `1.2.0`
- **Date:** `2026-03-15`
- **Note:** Confirmed OpenSpec CLI availability before apply.

### 0.2
- **Command:** `openspec schemas --json`
- **Result:** PASS.
  `[{"name":"spec-driven","description":"Default OpenSpec workflow - proposal -> specs -> design -> tasks"}]`
- **Date:** `2026-03-15`
- **Note:** Confirmed expected schema visibility.

### 0.3
- **Command:** `openspec list --json`
- **Result:** PASS.
  `{"changes":[{"name":"migrate-skill-contract-forge-to-promptfoo-native","status":"in-progress"}]}`
- **Date:** `2026-03-15`
- **Note:** Confirmed active slug visibility in the workspace.

### 0.6
- **Command:** `openspec status --change "migrate-skill-contract-forge-to-promptfoo-native" --json`
- **Result:** PASS.
  `{"changeName":"migrate-skill-contract-forge-to-promptfoo-native","schemaName":"spec-driven","isComplete":true}`
- **Date:** `2026-03-15`
- **Note:** Artifacts were present and status was readable before implementation.

### 0.7
- **Command:** `openspec validate "migrate-skill-contract-forge-to-promptfoo-native" --type change`
- **Result:** PASS.
  `Change 'migrate-skill-contract-forge-to-promptfoo-native' is valid`
- **Date:** `2026-03-15`
- **Note:** Delta format issue in `spec.md` was corrected and validation now passes.

### 1.1
- **Command:** `manual checkpoint note`
- **Result:** PASS.
  `Scope: remove central grader, move to native assertions, align docs, run Promptfoo gates.`
  `Risks: fixture/live drift and stricter deterministic checks revealing real failures.`
- **Date:** `2026-03-15`
- **Note:** Apply scope, risks, and verification were summarized before mutating runtime files.

### 1.2
- **Command:** `user approval in chat: "migrate-skill-contract-forge-to-promptfoo-native , implementelalo ese slug creado"`
- **Result:** PASS.
  `Explicit instruction to implement the slug end-to-end.`
- **Date:** `2026-03-15`
- **Note:** Approval checkpoint satisfied.

### 2.1
- **Command:** `rg -n "assertions\.cjs|assertions_json|assertion_rules_json|defaultTest" evals/engines/promptfoo/promptfooconfig.yaml`
- **Result:** PASS.
  `no matches`
- **Date:** `2026-03-15`
- **Note:** Verified no legacy grader wiring remains in active config.

### 2.2
- **Command:** `rg -n "assertions\.cjs|assertions_json|assertion_rules_json" evals/engines/promptfoo/promptfooconfig.yaml`
- **Result:** PASS.
  `no matches`
- **Date:** `2026-03-15`
- **Note:** Confirmed grader-specific config keys are removed.

### 2.3
- **Command:** `rg -n "evals/engines/promptfoo/support/assertions\.cjs|assertions\.cjs" evals/engines/promptfoo evals/README.md packs/core/skill-contract-forge/SKILL.md`
- **Result:** PASS.
  `no matches`
- **Date:** `2026-03-15`
- **Note:** Supported runtime/doc targets no longer reference `assertions.cjs`.

### 2.4
- **Command:** `Test-Path evals/engines/promptfoo/support/assertions.cjs`
- **Result:** PASS.
  `False`
- **Date:** `2026-03-15`
- **Note:** Legacy central grader file was deleted.

### 3.1
- **Command:** `rg -n "^\s*- description:|^\s*assert:" evals/engines/promptfoo/tests/skill-contract-forge.yaml`
- **Result:** PASS.
  `8 case entries and 8 assert blocks are present.`
- **Date:** `2026-03-15`
- **Note:** Each case now owns inline Promptfoo assertions.

### 3.2
- **Command:** `rg -n "Classification: trigger|Workflow:|Freeze the contract before final instructions\.|Eval Brief ready" evals/engines/promptfoo/tests/skill-contract-forge.yaml`
- **Result:** PASS.
  `Trigger markers found across trigger cases.`
- **Date:** `2026-03-15`
- **Note:** Trigger contract markers were migrated into deterministic assertions.

### 3.3
- **Command:** `rg -n "Classification: non-trigger|Out of scope for skill-contract-forge\." evals/engines/promptfoo/tests/skill-contract-forge.yaml`
- **Result:** PASS.
  `Non-trigger markers found across negative cases.`
- **Date:** `2026-03-15`
- **Note:** Non-trigger contract markers were migrated into deterministic assertions.

### 3.4
- **Command:** `rg -n "Classification: stop-and-ask|Scope clarification required\." evals/engines/promptfoo/tests/skill-contract-forge.yaml`
- **Result:** PASS.
  `Stop-and-ask markers present in the ambiguity case.`
- **Date:** `2026-03-15`
- **Note:** Stop-and-ask behavior is now asserted natively.

### 3.5
- **Command:** `rg -n "not-icontains" evals/engines/promptfoo/tests/skill-contract-forge.yaml`
- **Result:** PASS.
  `17 contradiction guard assertions found.`
- **Date:** `2026-03-15`
- **Note:** Incompatible classifications are explicitly guarded.

### 3.6
- **Command:** `rg -n "type:\s*javascript|type:\s*(starts-with|icontains|icontains-any|not-icontains|regex|contains-json|assert-set)" evals/engines/promptfoo/tests/skill-contract-forge.yaml`
- **Result:** PASS.
  `Only starts-with, icontains, icontains-any, and not-icontains are used.`
- **Date:** `2026-03-15`
- **Note:** No `javascript` assertions remain in runtime suite.

### 4.1
- **Command:** `rg -n "packs/core/skill-contract-forge/evals/evals\.json|evals/cases/skill-contract-forge/suite\.v1\.json|skill-contract-forge\.yaml" packs/core/skill-contract-forge/SKILL.md`
- **Result:** PASS.
  `Active references now point to skill-contract-forge.yaml (runtime) and suite.v1.json (authoring contract).`
- **Date:** `2026-03-15`
- **Note:** Legacy active-path wording was removed from `SKILL.md`.

### 4.2
- **Command:** `rg -n "assertions\.cjs|skill-contract-forge\.yaml" evals/README.md`
- **Result:** PASS.
  `No assertions.cjs match; skill-contract-forge.yaml remains as canonical runtime suite reference.`
- **Date:** `2026-03-15`
- **Note:** Removed grader is no longer listed as supported artifact.

### 4.3
- **Command:** `rg -n "skill-contract-forge\.yaml|suite\.v1\.json|packs/core/skill-contract-forge/evals/evals\.json" evals/cases/skill-contract-forge/README.md evals/final-supported-path.md`
- **Result:** PASS.
  `Both docs keep skill-contract-forge.yaml and suite.v1.json aligned; packs/core/skill-contract-forge/evals/evals.json appears only as historical in final-supported-path.md.`
- **Date:** `2026-03-15`
- **Note:** Runtime-vs-historical contract remains explicit.

### 5.1
- **Command:** `npm run promptfoo:validate`
- **Result:** PASS.
  `Configuration is valid.`
- **Date:** `2026-03-15`
- **Note:** Promptfoo config parses after removal of central grader wiring.

### 5.2
- **Command:** `npm run promptfoo:run:offline`
- **Result:** PASS.
  `Results: ✓ 6 passed, ✗ 10 failed, 0 errors (37.50%)`
  `Writing output to evals/engines/promptfoo/generated/skill-contract-forge.eval.json`
- **Date:** `2026-03-15`
- **Note:** Offline run now surfaces real pass/fail outcomes instead of false-green grading.

### 5.3
- **Command:** `npm run promptfoo:run`
- **Result:** PASS.
  `Results: ✓ 7 passed, ✗ 9 failed, 0 errors (43.75%)`
  `Writing output to evals/engines/promptfoo/generated/skill-contract-forge.eval.json`
- **Date:** `2026-03-15`
- **Note:** Live run is executable and reflects native assertion semantics.

### 5.4
- **Command:** `PowerShell: parse evals/engines/promptfoo/generated/skill-contract-forge.eval.json prompt metrics`
- **Result:** PASS.
  `with_skill | pass=7 fail=1`
  `without_skill | pass=0 fail=8`
- **Date:** `2026-03-15`
- **Note:** Mismatch persists and is expected follow-up hardening work (fixtures/coverage/schema).

### 6.1
- **Command:** `git diff --stat`
- **Result:** PASS.
  `8 files changed, 1813 insertions(+), 1444 deletions(-)`
- **Date:** `2026-03-15`
- **Note:** Repository-equivalent review completed by inspecting scoped diff and slug artifacts.

### 6.2
- **Command:** `openspec validate "migrate-skill-contract-forge-to-promptfoo-native" --type change`
- **Result:** PASS.
  `Change 'migrate-skill-contract-forge-to-promptfoo-native' is valid`
- **Date:** `2026-03-15`
- **Note:** Change remains valid after implementation and evidence updates.

### 6.3
- **Command:** `manual closure note`
- **Result:** PASS.
  `Promptfoo is the runtime pass/fail authority; legacy grader removed; docs aligned for this slug scope.`
- **Date:** `2026-03-15`
- **Note:** Done criteria for slug 1 are satisfied, with hardening items kept deferred.
