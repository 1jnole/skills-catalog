# Tasks: phase-3-provider-decoupling

## Execution policy

- Keep the diff limited to provider adapter files, Promptfoo configs, and minimum docs.
- Do not modify tests or prompts.
- Record structural evidence for the decoupling checks.

## Tasks

- [x] 0.1 Confirm the current configs still declare the provider inline before the change.
- [x] 0.2 Add minimal OpenSpec artifacts for this slug.
- [x] 1.1 Create `evals/engines/promptfoo/providers/default.openai.yaml`.
- [x] 1.2 Update `evals/engines/promptfoo/promptfooconfig.yaml` to read the provider from `providers/`.
- [x] 1.3 Update `evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml` to read the provider from `providers/`.
- [x] 1.4 Update `evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml` to read the provider from `providers/`.
- [x] 1.5 Update `evals/README.md` for provider-neutral wording.
- [x] 1.6 Update `evals/engines/promptfoo/README.md` for the default provider adapter path.
- [x] 1.7 Run a final structural coherence check.

## Evidence

### 0.1
- **Command:** `Get-Content evals/engines/promptfoo/promptfooconfig.yaml`
- **Result:** PASS.
  `providers:`
  `  - openai:gpt-4.1-mini`
- **Date:** `2026-03-15`
- **Note:** The contract config declared the provider inline before decoupling.

### 1.1
- **Command:** `Test-Path evals/engines/promptfoo/providers/default.openai.yaml`
- **Result:** PASS.
  `True`
- **Date:** `2026-03-15`
- **Note:** The provider adapter file exists.

### 1.2
- **Command:** `Get-Content evals/engines/promptfoo/promptfooconfig.yaml`
- **Result:** PASS.
  `providers:`
  `  - file://providers/default.openai.yaml`
- **Date:** `2026-03-15`
- **Note:** The contract gate now reads the provider from the adapter file.

### 1.3
- **Command:** `Get-Content evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
- **Result:** PASS.
  `providers:`
  `  - file://providers/default.openai.yaml`
- **Date:** `2026-03-15`
- **Note:** The uplift with-skill config now reads the provider from the adapter file.

### 1.4
- **Command:** `Get-Content evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
- **Result:** PASS.
  `providers:`
  `  - file://providers/default.openai.yaml`
- **Date:** `2026-03-15`
- **Note:** The uplift without-skill config now reads the provider from the adapter file.

### 1.5
- **Command:** `rg -n "provider|default.openai|OpenAI|swappable|adapter" evals/README.md`
- **Result:** PASS.
  `Top-level docs now describe provider selection as an external adapter concern.`
- **Date:** `2026-03-15`
- **Note:** Eval docs no longer imply vendor choice is part of the suite contract.

### 1.6
- **Command:** `rg -n "default.openai|provider adapter|swappable|providers/" evals/engines/promptfoo/README.md`
- **Result:** PASS.
  `Engine docs now identify the default provider adapter path and replacement boundary.`
- **Date:** `2026-03-15`
- **Note:** Engine README documents the operational provider boundary.

### 1.7
- **Command:** `rg -n "providers:|default.openai.yaml|openai:gpt-4.1-mini" evals/engines/promptfoo/promptfooconfig.yaml evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml evals/engines/promptfoo/providers/default.openai.yaml evals/README.md evals/engines/promptfoo/README.md`
- **Result:** PASS.
  `Provider selection is centralized in providers/default.openai.yaml and configs reference it via file://.`
- **Date:** `2026-03-15`
- **Note:** Final structure distinguishes suite, engine, and provider adapter cleanly.
