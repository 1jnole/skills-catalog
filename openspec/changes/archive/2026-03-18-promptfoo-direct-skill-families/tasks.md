- [x] 1. Migrate Promptfoo runtime assets to direct per-skill folders.
  - [x] 1.1 Confirm `skill-contract-forge` uses `evals/engines/promptfoo/skill-contract-forge/` for configs, prompts, and tests.
  - [x] 1.2 Confirm `skill-implementation-forge` uses `evals/engines/promptfoo/skill-implementation-forge/` for configs, prompts, and tests.
  - [x] 1.3 Remove active references to the rejected `evals/engines/promptfoo/skills/` topology.
- [x] 2. Rewire supported command and documentation surfaces.
  - [x] 2.1 Update `package.json` Promptfoo commands to point to the per-skill family paths.
  - [x] 2.2 Update `evals/README.md` and `evals/engines/promptfoo/README.md` to describe the new topology and command surface.
- [x] 3. Define the new topology in OpenSpec change deltas.
  - [x] 3.1 Add spec deltas for Promptfoo modular topology and `skill-contract-forge` runtime path updates.
- [x] 4. Verify the migrated runtime.
  - [x] 4.1 Run `openspec validate "promptfoo-direct-skill-families" --type change`.
  - [x] 4.2 Run `npm run promptfoo:validate:skill-contract-forge`.
  - [x] 4.3 Run `npm run promptfoo:validate:skill-contract-forge:uplift:with-skill`.
  - [x] 4.4 Run `npm run promptfoo:validate:skill-contract-forge:uplift:without-skill`.
  - [x] 4.5 Run `npm run promptfoo:validate:skill-implementation-forge`.
  - [x] 4.6 Run `npm run promptfoo:validate:skill-implementation-forge:uplift:with-skill`.
  - [x] 4.7 Run `npm run promptfoo:validate:skill-implementation-forge:uplift:without-skill`.
  - [x] 4.8 Search the active tree for stale flat Promptfoo paths and rejected `skills/` paths.
  - [x] 4.9 Run one live Promptfoo evaluation for `skill-contract-forge`.
  - [x] 4.10 Run one live Promptfoo evaluation for `skill-implementation-forge`.

## Evidence

- **Command:** `openspec validate "promptfoo-direct-skill-families" --type change`
  - **Result:** PASS. `Change 'promptfoo-direct-skill-families' is valid`
  - **Date:** `2026-03-18`
  - **Note:** The new change artifacts are structurally valid.

- **Command:** `npm run promptfoo:validate:skill-contract-forge`
  - **Result:** PASS. `Configuration is valid.`
  - **Date:** `2026-03-18`
  - **Note:** The canonical `skill-contract-forge` config resolves from the per-skill family path.

- **Command:** `npm run promptfoo:validate:skill-contract-forge:uplift:with-skill`
  - **Result:** PASS. `Configuration is valid.`
  - **Date:** `2026-03-18`
  - **Note:** The uplift `with_skill` config resolves from the per-skill family path.

- **Command:** `npm run promptfoo:validate:skill-contract-forge:uplift:without-skill`
  - **Result:** PASS. `Configuration is valid.`
  - **Date:** `2026-03-18`
  - **Note:** The uplift `without_skill` config resolves from the per-skill family path.

- **Command:** `npm run promptfoo:validate:skill-implementation-forge`
  - **Result:** PASS. `Configuration is valid.`
  - **Date:** `2026-03-18`
  - **Note:** The canonical `skill-implementation-forge` config resolves from the per-skill family path.

- **Command:** `npm run promptfoo:validate:skill-implementation-forge:uplift:with-skill`
  - **Result:** PASS. `Configuration is valid.`
  - **Date:** `2026-03-18`
  - **Note:** The implementation uplift `with_skill` config resolves from the per-skill family path.

- **Command:** `npm run promptfoo:validate:skill-implementation-forge:uplift:without-skill`
  - **Result:** PASS. `Configuration is valid.`
  - **Date:** `2026-03-18`
  - **Note:** The implementation uplift `without_skill` config resolves from the per-skill family path.

- **Command:** `rg -n "evals/engines/promptfoo/(skills/|tests/skill-contract-forge|promptfooconfig\\.yaml|promptfooconfig\\.uplift|prompts/with-skill|prompts/without-skill)" evals/README.md evals/engines/promptfoo/README.md package.json evals/engines/promptfoo -g '!openspec/changes/archive/**' -g '!openspec/specs/**'`
  - **Result:** PASS. Only self-referential mentions remained inside the active change artifacts; active docs and runtime files no longer referenced the rejected topology.
  - **Date:** `2026-03-18`
  - **Note:** The maintained eval runtime surface no longer points at the flat or `skills/` layouts.

- **Command:** `npm run promptfoo:run:skill-contract-forge`
  - **Result:** FAIL. `Results: ✓ 11 passed, ✗ 1 failed, 0 errors (91.67%)`
  - **Date:** `2026-03-18`
  - **Note:** The live run now executes from the migrated family path, confirming the wiring works even though one semantic case still needs follow-up.

- **Command:** `npm run promptfoo:run:skill-implementation-forge`
  - **Result:** FAIL. `Results: ✓ 6 passed, ✗ 4 failed, 0 errors (60.00%)`
  - **Date:** `2026-03-18`
  - **Note:** The live run executes from the migrated family path, but the current dataset/prompt contract still needs semantic tuning for several cases.
