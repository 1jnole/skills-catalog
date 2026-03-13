## 1. Suite migration

- [x] 1.1 Add the canonical `evals/cases/skill-forge/suite.v1.json` file with useful migrated `golden` and `negative` cases.
- [x] 1.2 Update the Promptfoo suite resolver defaults and loader-focused tests to point at the canonical suite.
- [x] 1.3 Update `evals/cases/skill-forge/README.md` to describe the canonical suite and the historical pilot snapshot.

## 2. Fixture ownership

- [x] 2.1 Update `evals/fixtures/skill-forge/README.md` so the new-scaffold fixture story is explicit for `skill-forge`.

## 3. Verification

- [x] 3.1 Run `openspec validate "evals-phase-5-cases-fixtures" --type change`.
- [x] 3.2 Run `npm run test:run -- scripts/evals/application/load-eval-definition/load-eval-definition.test.ts scripts/evals/infrastructure/promptfoo/pilot-config.test.ts`.
- [x] 3.3 Run `npm run read-evals -- -- --file evals/cases/skill-forge/suite.v1.json`.

## Evidence

- Command: `openspec validate "evals-phase-5-cases-fixtures" --type change`
  Result: PASS
  Date: 2026-03-13
  Note: The change validates after introducing `suite.v1.json` as the canonical `skill-forge` suite in the new scaffold.

- Command: `npm run build-evals && npx vitest run "scripts/evals/application/load-eval-definition/load-eval-definition.test.ts" "scripts/evals/infrastructure/promptfoo/pilot-config.test.ts"`
  Result: PASS
  Date: 2026-03-13
  Note: TypeScript built successfully and Vitest ran 2 test files with 9 passing tests covering canonical-suite loading plus Promptfoo resolver defaults.

- Command: `npm run read-evals -- -- --file evals/cases/skill-forge/suite.v1.json`
  Result: PASS
  Date: 2026-03-13
  Note: The canonical suite loaded from `evals/cases/skill-forge/suite.v1.json` with 4 golden cases and 4 negative cases.
