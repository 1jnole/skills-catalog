# Tasks: phase-7a-upgrade-promptfoo-native-baseline

## 1. Upgrade the native Promptfoo baseline

- [x] 1.1 Update the repository Promptfoo dependency to `0.121.2`.
  - Verification command: `node -p "require('./node_modules/promptfoo/package.json').version"`
- [x] 1.2 Declare the supported repository Node.js range required by Promptfoo `0.121.2`.
  - Verification command: `node -p "require('./package.json').engines.node"`

## 2. Revalidate existing runtime surfaces

- [x] 2.1 Run the canonical contract validate command on the upgraded baseline.
  - Verification command: `npm run promptfoo:validate`
- [x] 2.2 Run the uplift `with-skill` validate command on the upgraded baseline.
  - Verification command: `npm run promptfoo:validate:uplift:with-skill`
- [x] 2.3 Run the uplift `without-skill` validate command on the upgraded baseline.
  - Verification command: `npm run promptfoo:validate:uplift:without-skill`
- [x] 2.4 Run the canonical contract offline replay on the upgraded baseline.
  - Verification command: `npm run promptfoo:run:offline`
- [x] 2.5 Run the uplift `with-skill` offline replay on the upgraded baseline.
  - Verification command: `npm run promptfoo:run:offline:uplift:with-skill`
- [x] 2.6 Run the uplift `without-skill` offline replay on the upgraded baseline.
  - Verification command: `npm run promptfoo:run:offline:uplift:without-skill`

## 3. Preserve the no-runner boundary

- [x] 3.1 Confirm that the repo still executes Promptfoo directly and does not add any local runner, wrapper, or grading override.
  - Verification command: `rg -n "promptfoo:sync|promptfoo eval|local runner|wrapper|grading override" package.json evals/README.md evals/engines/promptfoo/README.md`

## Evidence

- **Command:** `npm install promptfoo@0.121.2 --save-dev --ignore-scripts`
  - **Result:** PASS
    - `npm warn EBADENGINE   package: 'promptfoo@0.121.2'`
    - `npm warn EBADENGINE   required: { node: '^20.20.0 || >=22.22.0' }`
    - `npm warn EBADENGINE   current: { node: 'v22.13.0', npm: '11.10.0' }`
    - `added 19 packages, removed 16 packages, changed 28 packages, and audited 1204 packages in 6s`
    - `found 0 vulnerabilities`
  - **Date:** `2026-03-17`
  - **Note:** The install completed successfully despite the upstream engine warning; the upgraded binary was verified and revalidated below.

- **Command:** `node -p "require('./node_modules/promptfoo/package.json').version"`
  - **Result:** PASS
    - `0.121.2`
  - **Date:** `2026-03-17`
  - **Note:** The effective local Promptfoo binary now matches the target version for this slug.

- **Command:** `node -p "require('./package.json').engines.node"`
  - **Result:** PASS
    - `^20.20.0 || >=22.22.0`
  - **Date:** `2026-03-17`
  - **Note:** The repository now declares the supported Node.js baseline required by Promptfoo `0.121.2`.

- **Command:** `npm run promptfoo:validate`
  - **Result:** PASS
    - `> promptfoo:validate`
    - `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.yaml`
    - `Configuration is valid.`
  - **Date:** `2026-03-17`
  - **Note:** The canonical contract config remains valid on Promptfoo `0.121.2`.

- **Command:** `npm run promptfoo:validate:uplift:with-skill`
  - **Result:** PASS
    - `> promptfoo:validate:uplift:with-skill`
    - `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
    - `Configuration is valid.`
  - **Date:** `2026-03-17`
  - **Note:** The uplift with-skill config remains valid on Promptfoo `0.121.2`.

- **Command:** `npm run promptfoo:validate:uplift:without-skill`
  - **Result:** PASS
    - `> promptfoo:validate:uplift:without-skill`
    - `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
    - `Configuration is valid.`
  - **Date:** `2026-03-17`
  - **Note:** The uplift without-skill config remains valid on Promptfoo `0.121.2`.

- **Command:** `npm run promptfoo:run:offline`
  - **Result:** PASS
    - `Starting evaluation eval-hRJ-2026-03-17T10:23:47`
    - `Running 12 test cases (up to 4 at a time)...`
    - `Results: ✓ 12 passed, 0 failed, 0 errors (100%)`
    - `Writing output to evals/engines/promptfoo/generated/skill-contract-forge.eval.json`
  - **Date:** `2026-03-17`
  - **Note:** The canonical offline replay preserves the existing 12/12 contract baseline on Promptfoo `0.121.2`.

- **Command:** `npm run promptfoo:run:offline:uplift:with-skill`
  - **Result:** PASS
    - `Starting evaluation eval-3wF-2026-03-17T10:23:47`
    - `Running 8 test cases (up to 4 at a time)...`
    - `Results: ✓ 8 passed, 0 failed, 0 errors (100%)`
    - `Writing output to evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.eval.json`
  - **Date:** `2026-03-17`
  - **Note:** The uplift with-skill offline replay preserves the existing 8/8 baseline on Promptfoo `0.121.2`.

- **Command:** `npm run promptfoo:run:offline:uplift:without-skill`
  - **Result:** PASS
    - `Starting evaluation eval-MbO-2026-03-17T10:23:47`
    - `Running 8 test cases (up to 4 at a time)...`
    - `Results: ✓ 8 passed, 0 failed, 0 errors (100%)`
    - `Writing output to evals/engines/promptfoo/generated/skill-contract-forge.uplift.without-skill.offline.eval.json`
  - **Date:** `2026-03-17`
  - **Note:** The uplift without-skill offline replay preserves the existing 8/8 baseline on Promptfoo `0.121.2`.

- **Command:** `rg -n "promptfoo:sync|promptfoo eval|local runner|wrapper|grading override" package.json evals/README.md evals/engines/promptfoo/README.md`
  - **Result:** PASS
    - `evals/engines/promptfoo/README.md:31:- native Promptfoo execution from evals/engines/promptfoo/ with repo-owned wrappers removed`
    - `evals/README.md:95:- the old wrapper runtime no longer participates in the supported flow.`
    - `package.json:25:    "promptfoo:run": "promptfoo eval -c evals/engines/promptfoo/promptfooconfig.yaml ..."`
    - `package.json:26:    "promptfoo:run:offline": "promptfoo eval -c evals/engines/promptfoo/promptfooconfig.yaml ..."`
  - **Date:** `2026-03-17`
  - **Note:** Runtime execution still calls Promptfoo directly, and this slug does not expose any extra repo-local sync or wrapper command.

- **Command:** `openspec validate "phase-7a-upgrade-promptfoo-native-baseline" --type change`
  - **Result:** PASS
    - `Change 'phase-7a-upgrade-promptfoo-native-baseline' is valid`
  - **Date:** `2026-03-17`
  - **Note:** The phase-7a change artifacts remain valid after recording the implementation evidence.
