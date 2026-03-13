# Proposal: evals-grade-case-test-consolidation

## Why

The temporary `grade-case.characterization.test.ts` file did its job while the assertion seam was being extracted, but keeping a separate characterization-only filename now adds confusion without preserving a meaningful architectural boundary.

## What Changes

- merge the legacy skill-forge parity tests into the main `grade-case.test.ts` suite
- remove the standalone `grade-case.characterization.test.ts` file
- preserve the same behaviors and expectations while simplifying test organization

## Capabilities

### Modified Capabilities
- `evals-grade-case-assertion-seam`

## Impact

- `scripts/evals/grading/grade-case.test.ts`
- `scripts/evals/grading/grade-case.characterization.test.ts`
