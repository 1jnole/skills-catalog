# Scorers Boundary

This directory marks the stable home for portable scoring logic.

## Current scope
The supported `skill-forge` grader lives in:
- `evals/engines/promptfoo/support/assertions.cjs`

## Ownership rule
Scorers should own only semantic inputs and outputs:
- case-level scoring rules,
- deterministic checks,
- pass/fail and score semantics.

Scorers should not own:
- provider wiring,
- engine config,
- filesystem iteration details,
- lock or retry machinery.

Current `skill-forge` scorer state:
- useful deterministic scorer inputs are authored in `evals/cases/skill-forge/suite.v1.json` and serialized into `evals/engines/promptfoo/tests/skill-forge.yaml`
- the historical `packs/core/skill-forge/evals/evals.json` file is no longer the primary scorer-input path
- the supported scorer implementation runs inside Promptfoo as a JavaScript assertion
