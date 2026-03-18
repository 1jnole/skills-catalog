# Design

## Summary

This change makes `skill-eval-forge` trigger-path prompts actionable in live runs by binding each golden to concrete repo-local authority:

1. one named target skill
2. one authoritative contract artifact
3. one authoritative implementation location
4. enough active Promptfoo context to author coverage safely

## Decisions

### Goldens must carry accessible authority

The golden prompts in:
- `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml`
- `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml`

will identify concrete repo-local artifacts instead of saying only that they exist. The goal is to test eval authoring behavior rather than the model's willingness to act on unverifiable prerequisites.

### Real repo-local examples only

Trigger-path examples should use real skills and real repo-local authority wherever possible. If a candidate target skill does not have a sufficiently clear contract artifact or implementation boundary, it should not be used as a golden.

### No phrasing lock-in

The asserts remain semantic. The model should not be required to repeat exact file paths or exact prerequisite wording in order to pass.

## Non-goals

- Redefining stop-and-ask behavior
- Expanding comparative uplift coverage
- Hardening the baseline `without_skill` surface
- Adding runtime or command-surface changes
