# Design

## Summary

This change makes the forge workflow explicit and repo-authoritative:

1. `skill-contract-forge`
2. `skill-implementation-forge`
3. `skill-eval-forge`

Each phase has:
- one objective
- one required precondition set
- one terminal marker
- explicit stop-and-ask boundaries

Built-in Codex capabilities remain useful, but they are positioned as support rather than as the governing repo workflow.

## Decisions

### Forge workflow is the default strong path

The repository documents one default workflow for skill authoring and refactoring:
- contract first
- implementation second
- eval third

This is a strong default, not a claim that exceptions are impossible. When a request mixes phases inseparably, the default behavior is to stop, split, or explicitly defer later phases rather than silently absorb them.

### Each forge skill owns one phase only

The three forge skills remain intentionally narrow:
- `skill-contract-forge` freezes the contract and stops at `Eval Brief ready`
- `skill-implementation-forge` implements from an approved contract artifact and stops at `Skill implementation ready`
- `skill-eval-forge` authors Promptfoo-native eval coverage and stops at `Skill eval ready`

The workflow policy will be documented in repo-level docs, but the operative details still live in the corresponding `SKILL.md` files.

### Built-ins are support, not the workflow authority

The repo will position built-ins like this:
- built-in planning is pre-work for exploration and decomposition
- `skill-creator` is a baseline/fallback reference
- `skill-installer` is operational and outside the functional forge pipeline

This avoids reinventing the whole built-in skill story while still making the repo workflow deterministic.

### Anti-hallucination guardrails are phase-specific

The new policy explicitly freezes a few repo-wide guardrails:
- do not infer target skills from deictic phrases
- do not move to implementation without an approved contract artifact
- do not move to eval authoring without contract plus existing implementation
- do not renegotiate the contract inside implementation or eval
- do not compensate for one phase by silently widening another

### Workflow policy is separate from runtime policy

This change does not touch Promptfoo topology or semantic tuning. Runtime authority stays documented in the eval-facing docs. This change only codifies how the forge skills and built-ins should be used together.
