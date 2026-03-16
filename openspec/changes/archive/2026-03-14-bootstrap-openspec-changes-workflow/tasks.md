## 1. Workspace normalization

- [x] 1.1 Create the `bootstrap-openspec-changes-workflow` slug and complete its proposal, specs, and design artifacts.
- [x] 1.2 Add a tracked placeholder under `openspec/changes/` so the workspace remains present in git when no active changes exist.

## 2. Verification and evidence

- [x] 2.1 Run OpenSpec preflight commands and confirm the workspace is readable.
- [x] 2.2 Validate the bootstrap slug and run one repo-compatible non-mutating gate.
- [x] 2.3 Record command evidence using the required command/result/date/note format.

## Evidence

- **Command:** `openspec --version`
  **Result:** PASS
  `1.2.0`
  **Date:** 2026-03-14
  **Note:** Confirmed the OpenSpec CLI is available in the repo environment.

- **Command:** `openspec schemas --json`
  **Result:** PASS
  `[{`
  `  "name": "spec-driven",`
  `  "description": "Default OpenSpec workflow - proposal → specs → design → tasks"`
  `}]`
  **Date:** 2026-03-14
  **Note:** Confirmed the expected schema is visible to the CLI.

- **Command:** `openspec list --json`
  **Result:** PASS
  `{`
  `  "changes": [`
  `    { "name": "bootstrap-openspec-changes-workflow", "status": "in-progress" }`
  `  ]`
  `}`
  **Date:** 2026-03-14
  **Note:** Verified that OpenSpec can now read the changes workspace instead of failing on a missing directory.

- **Command:** `openspec validate "bootstrap-openspec-changes-workflow" --type change --json`
  **Result:** PASS
  `{`
  `  "items": [{ "id": "bootstrap-openspec-changes-workflow", "type": "change", "valid": true, "issues": [] }],`
  `  "summary": { "totals": { "items": 1, "passed": 1, "failed": 0 } }`
  `}`
  **Date:** 2026-03-14
  **Note:** Confirmed the slug artifacts validate successfully as an OpenSpec change.

- **Command:** `npm run promptfoo:validate`
  **Result:** PASS
  `> promptfoo:validate`
  `> promptfoo validate -c evals/engines/promptfoo/promptfooconfig.yaml`
  `Configuration is valid.`
  **Date:** 2026-03-14
  **Note:** Repo-compatible non-mutating gate passed; the version warning from Promptfoo was informational only.
