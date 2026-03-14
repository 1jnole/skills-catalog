## 1. OpenSpec artifacts

- [x] 1.1 Create the `add-skill-metadata-validator-v1` slug and complete `proposal.md`, `spec.md`, and `design.md`.
- [x] 1.2 Define the validator scope as metadata-only, Zod-first, and free of any new runner framework.

## 2. Source-backed preparation

- [x] 2.1 Read the required vault notes with Obsidian CLI and record evidence in this file.
- [x] 2.2 Read the required repo skills for Zod, JavaScript, and TypeScript guidance and record evidence in this file.

## 3. Core TDD

- [x] 3.1 Implement and test missing frontmatter detection.
- [x] 3.2 Implement and test invalid YAML handling.
- [x] 3.3 Implement and test required `name` and `description` field checks.
- [x] 3.4 Implement and test empty-string checks for required fields.
- [x] 3.5 Implement and test optional `metadata.short-description` validation.
- [x] 3.6 Implement and test `name` versus directory mismatch detection.
- [x] 3.7 Implement and test stable ordering for multiple issues.
- [x] 3.8 Polish validator diagnostics and boundary coverage for malformed frontmatter, wrongly typed required fields, and direct frontmatter parsing tests.

## 4. Entrypoint and package integration

- [x] 4.1 Add the minimal TypeScript entry script and keep it free of validation logic.
- [x] 4.2 Add the `validate:skill-metadata` npm command and required dependencies.

## 5. Verification and evidence

- [x] 5.1 Run `npm run test:run`.
- [x] 5.2 Run `npm run validate:skill-metadata`.
- [x] 5.3 Run `npm run promptfoo:validate`.
- [x] 5.4 Run `openspec validate "add-skill-metadata-validator-v1" --type change`.
- [x] 5.5 Record evidence for source reads and verification commands in this file.

## Evidence

- **Command:** `obsidian read path="30-Resources/Courses/FrontendMasters/10-Processed/Testing/Web App Testing & Tools/Ejemplos/Fase 2 - Ejemplos de código reales.md"`
  **Result:** PASS. The note explicitly showed `beforeEach` as a refactor after repetition exists, a requirement-focused `it`, and an example where a test name can overpromise more than the behavior really covered.
  **Date:** `2026-03-14`
  **Note:** Used to keep the core suite behavior-first and to avoid inventing extra harness or overclaiming coverage.

- **Command:** `obsidian read path="30-Resources/Courses/FrontendMasters/10-Processed/Testing/Web App Testing & Tools/02 - Agente - Plantilla de iteración TDD.md"`
  **Result:** PASS. The template reinforced a one-behavior iteration with explicit red, minimum green, bounded refactor, and a clear stop condition for each test step.
  **Date:** `2026-03-14`
  **Note:** Used to sequence the core work as small iterations instead of building the validator in one pass.

- **Command:** `obsidian read path="30-Resources/Courses/FrontendMasters/10-Processed/Testing/Web App Testing & Tools/05 - Agente - Guardrails operativos.md"`
  **Result:** PASS. The guardrails called out avoiding false reds, not mixing behaviors in a single iteration, not mocking deterministic local logic, and preferring the smallest sufficient layer.
  **Date:** `2026-03-14`
  **Note:** Used to keep TDD limited to the pure core and to leave the entry script as a smoke-tested boundary.

- **Command:** `obsidian read path="30-Resources/Courses/FrontendMasters/10-Processed/Testing/Web App Testing & Tools/Fase 1 - Diseño para la Testeabilidad.md"`
  **Result:** PASS. The note emphasized seams, separating logic from wiring, and keeping construction out of the business logic path.
  **Date:** `2026-03-14`
  **Note:** Used to justify the split between `scripts/skill-metadata/core.ts` and `scripts/validate-skill-metadata.ts`.

- **Command:** `obsidian read path="30-Resources/Courses/FrontendMasters/10-Processed/Testing/Web App Testing & Tools/Fase 2 - Micro-Modelo de Desarrollo (Ciclo TDD).md"`
  **Result:** PASS. The note reinforced red-green-refactor, minimum green, and extracting repeated setup only after the suite has a stable shape.
  **Date:** `2026-03-14`
  **Note:** Used to keep the suite flat and explicit, without jumping to `beforeEach` or extra helpers too early.

- **Command:** `obsidian read path="30-Resources/Courses/FrontendMasters/10-Processed/Typescript/Fullstack TypeScript, v2 (feat. Zod)/06 - Fase F - Verificación y Feedback.md"`
  **Result:** PASS. The note emphasized schema-backed tests and feedback loops close to the validation boundary.
  **Date:** `2026-03-14`
  **Note:** Used to keep Zod as the source of truth and to verify schema behavior directly through unit tests.

- **Command:** `obsidian read path="30-Resources/Courses/FrontendMasters/10-Processed/Typescript/Fullstack TypeScript, v2 (feat. Zod)/03 - Fase C - Transformación y Rehidratación.md"`
  **Result:** PASS. The note warned against overusing transforms when simple validation is enough and recommended keeping normalization at the boundary.
  **Date:** `2026-03-14`
  **Note:** Used to keep the schema simple and avoid unnecessary Zod transforms in v1.

- **Command:** `Get-Content packs\\zod\\zod-validate-api-boundaries\\SKILL.md -TotalCount 220`
  **Result:** PASS. The skill reinforced validating untrusted input at the boundary with Zod and returning trusted, inferred types to the rest of the code.
  **Date:** `2026-03-14`
  **Note:** Used to anchor the validator around a single schema-backed boundary gate.

- **Command:** `Get-Content packs\\zod\\zod-normalize-inputs\\SKILL.md -TotalCount 220`
  **Result:** PASS. The skill reinforced normalizing at the boundary once and deriving types via `z.infer` instead of duplicating the contract elsewhere.
  **Date:** `2026-03-14`
  **Note:** Used to keep Zod as the contract source of truth and avoid manual parallel typings.

- **Command:** `Get-Content packs\\typescript\\ts-control-flow-narrowing\\SKILL.md -TotalCount 220`
  **Result:** PASS. The skill reinforced honest branching on untrusted values after the boundary and avoiding unsafe casts.
  **Date:** `2026-03-14`
  **Note:** Used to handle parsed frontmatter and issue mapping without `any` shortcuts.

- **Command:** `Get-Content packs\\typescript\\ts-core-modeling\\SKILL.md -TotalCount 220`
  **Result:** PASS. The skill reinforced minimal, explicit TypeScript modeling around the implementation without creating a duplicate schema system.
  **Date:** `2026-03-14`
  **Note:** Used to keep helper aliases small and local while Zod remained the contract source of truth.

- **Command:** `Get-Content packs\\javascript\\js-best-practices-guardrails\\SKILL.md -TotalCount 220`
  **Result:** PASS. The skill reinforced avoiding accidental complexity, broad tooling changes, or async/control-flow surprises when a minimal local fix is enough.
  **Date:** `2026-03-14`
  **Note:** Used as the final guardrail to keep the entry script small and deterministic.

- **Command:** `npm run test:run`
  **Result:** PASS. The validator suite now covers the frontmatter boundary directly as well as validation rules, file validation, and the minimal entry script.
  **Date:** `2026-03-14`
  **Note:** Covered malformed frontmatter, required field type precision, folded and literal multiline descriptions, and the minimal entry script smoke tests.

- **Command:** `npm run validate:skill-metadata`
  **Result:** PASS. `Skill metadata validation passed.`
  **Date:** `2026-03-14`
  **Note:** Confirmed the new public command works against the current catalog.

- **Command:** `npm run promptfoo:validate`
  **Result:** PASS. `Configuration is valid.` A newer Promptfoo version is available, but validation still passed with the current repo version.
  **Date:** `2026-03-14`
  **Note:** Used as the repo-compatible gate to ensure the change did not disturb the eval runtime boundary.

- **Command:** `openspec validate "add-skill-metadata-validator-v1" --type change`
  **Result:** PASS. `Change 'add-skill-metadata-validator-v1' is valid`
  **Date:** `2026-03-14`
  **Note:** Confirms the slug artifacts and implementation stay aligned.

- **Command:** `openspec status --change "add-skill-metadata-validator-v1" --json`
  **Result:** PASS. `"isComplete": true`
  **Date:** `2026-03-14`
  **Note:** Confirms the slug is apply-ready and complete.
