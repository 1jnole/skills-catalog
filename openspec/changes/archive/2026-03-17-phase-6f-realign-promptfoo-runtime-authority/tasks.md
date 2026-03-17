# Tasks: phase-6f-realign-promptfoo-runtime-authority

## 1. Normalize the Phase A plan

- [x] 1.1 Rewrite `PLAN.md` to use real repository paths and classify active, historical, and ephemeral eval artifacts.
  - Verification command: `rg -n "/mnt/data/inspect|evals/evals|Fase A — Reencuadre controlado|skill-contract-forge\\.yaml" PLAN.md`

## 2. Realign supported runtime docs

- [x] 2.1 Update `evals/cases/README.md` to reference the split Promptfoo runtime surfaces instead of `evals/engines/promptfoo/tests/skill-contract-forge.yaml`.
  - Verification command: `rg -n "skill-contract-forge\\.contract\\.yaml|skill-contract-forge\\.uplift\\.yaml|skill-contract-forge\\.uplift\\.without-skill\\.yaml|skill-contract-forge\\.yaml" evals/cases/README.md`
- [x] 2.2 Update `evals/fixtures/skill-contract-forge/README.md` so it no longer presents `skill-contract-forge.yaml` as the supported runtime suite.
  - Verification command: `rg -n "skill-contract-forge\\.contract\\.yaml|skill-contract-forge\\.uplift\\.yaml|skill-contract-forge\\.uplift\\.without-skill\\.yaml|skill-contract-forge\\.yaml" evals/fixtures/skill-contract-forge/README.md`
- [x] 2.3 Update `evals/README.md` so supported artifacts match the active split runtime and no longer reference `evals/final-supported-path.md`.
  - Verification command: `rg -n "skill-contract-forge\\.uplift\\.without-skill\\.yaml|final-supported-path\\.md" evals/README.md`

## 3. Realign the active runtime spec

- [x] 3.1 Update `openspec/specs/skill-contract-forge-promptfoo-eval-runtime/spec.md` to identify the split `contract` and `uplift` suites as the supported runtime authority.
  - Verification command: `rg -n "skill-contract-forge\\.contract\\.yaml|skill-contract-forge\\.uplift\\.yaml|skill-contract-forge\\.uplift\\.without-skill\\.yaml|skill-contract-forge\\.yaml" openspec/specs/skill-contract-forge-promptfoo-eval-runtime/spec.md`

## 4. Verification evidence

- [x] 4.1 Run targeted reference checks to confirm the supported runtime docs no longer treat `skill-contract-forge.yaml` as current authority.
  - Verification command: `rg -n "skill-contract-forge\\.yaml" evals/README.md evals/cases/README.md evals/fixtures/skill-contract-forge/README.md openspec/specs/skill-contract-forge-promptfoo-eval-runtime/spec.md`
- [x] 4.2 Record evidence in this file using the standard command/result/date/note format.
  - Verification command: `rg -n "\\*\\*Command:\\*\\*|\\*\\*Result:\\*\\*|\\*\\*Date:\\*\\*|\\*\\*Note:\\*\\*" openspec/changes/phase-6f-realign-promptfoo-runtime-authority/tasks.md`

## Evidence

- **Command:** `rg -n "/mnt/data/inspect|evals/evals|Fase A — Reencuadre controlado|skill-contract-forge\.yaml" PLAN.md`
- **Result:** `PLAN.md:1` now starts with `# Fase A — Reencuadre controlado`; no `/mnt/data/inspect` or `evals/evals` matches remained; `skill-contract-forge.yaml` appears only as a legacy-runtime example inside task A-06 and claim-cleanup task A-08.
- **Date:** `2026-03-16`
- **Note:** The Phase A plan now uses real repo paths and classifies active vs historical surfaces instead of assuming a hard reset.

- **Command:** `rg -n "skill-contract-forge\.contract\.yaml|skill-contract-forge\.uplift\.yaml|skill-contract-forge\.uplift\.without-skill\.yaml|skill-contract-forge\.yaml" evals/cases/README.md`
- **Result:** `evals/cases/README.md` now points to `skill-contract-forge.contract.yaml`, `skill-contract-forge.uplift.yaml`, and `skill-contract-forge.uplift.without-skill.yaml`, while `skill-contract-forge.yaml` is labeled inherited migration residue.
- **Date:** `2026-03-16`
- **Note:** The cases boundary now distinguishes local authoring from supported runtime surfaces.

- **Command:** `rg -n "skill-contract-forge\.contract\.yaml|skill-contract-forge\.uplift\.yaml|skill-contract-forge\.uplift\.without-skill\.yaml|skill-contract-forge\.yaml" evals/fixtures/skill-contract-forge/README.md`
- **Result:** `evals/fixtures/skill-contract-forge/README.md` now lists the split runtime files and labels `skill-contract-forge.yaml` as inherited migration residue rather than supported runtime.
- **Date:** `2026-03-16`
- **Note:** The fixtures note no longer points readers at the wrong execution suite.

- **Command:** `rg -n "skill-contract-forge\.uplift\.without-skill\.yaml|final-supported-path\.md" evals/README.md`
- **Result:** `evals/README.md` now includes `skill-contract-forge.uplift.without-skill.yaml` in the supported artifacts list; `final-supported-path.md` no longer appears.
- **Date:** `2026-03-16`
- **Note:** The top-level eval scaffold doc now reflects the current split runtime and no longer links to a missing closeout file.

- **Command:** `rg -n "skill-contract-forge\.contract\.yaml|skill-contract-forge\.uplift\.yaml|skill-contract-forge\.uplift\.without-skill\.yaml|skill-contract-forge\.yaml" openspec/specs/skill-contract-forge-promptfoo-eval-runtime/spec.md`
- **Result:** The active runtime spec now names `skill-contract-forge.contract.yaml` as the canonical contract gate, names both uplift suites explicitly, and forbids treating `skill-contract-forge.yaml` as supported runtime authority.
- **Date:** `2026-03-16`
- **Note:** OpenSpec now matches the runtime split already present in code and configs.

- **Command:** `openspec status --change "phase-6f-realign-promptfoo-runtime-authority" --json`
- **Result:** `isComplete: true` with `proposal`, `design`, `specs`, and `tasks` all marked `done`.
- **Date:** `2026-03-16`
- **Note:** The slug is apply-ready under the repository OpenSpec workflow.

- **Command:** `openspec validate "phase-6f-realign-promptfoo-runtime-authority" --type change`
- **Result:** `Change 'phase-6f-realign-promptfoo-runtime-authority' is valid`
- **Date:** `2026-03-16`
- **Note:** The change artifacts validate successfully after the runtime-authority edits.
