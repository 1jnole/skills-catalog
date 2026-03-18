# Design

## Summary

This change sharpens the stop-and-ask boundary for `skill-eval-forge` so the family can tell the difference between:

1. prerequisites that are merely claimed
2. prerequisites that are concretely accessible
3. Promptfoo context that is still too incomplete to author coverage safely

## Decisions

### Accessibility is a first-class precondition

`skill-eval-forge` already requires one approved contract artifact, one existing implementation, and enough repo-local eval context. This change treats accessibility as part of that contract instead of a hidden assumption.

### Stop-and-ask for incomplete operational context

The contract suite should cover cases where:
- the contract exists but is not concretely identified enough to act
- the implementation exists but is not concretely identified enough to act
- contract and implementation are named but the active Promptfoo context is still too incomplete

### Semantic behavior over phrasing

The family should pass when the model prudently asks for the missing operational detail, even if the response wording varies.

## Non-goals

- Reworking the golden trigger examples
- Broadening comparative uplift
- Changing the baseline `without_skill` surface
