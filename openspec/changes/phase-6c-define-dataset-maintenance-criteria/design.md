## Context

The current repository already has:
- a local `skill-contract-forge` authoring contract in `evals/cases/skill-contract-forge/suite.v1.json`
- a Phase 6A audit loop
- a Phase 6B expansion pattern and bucket map

What is still missing is a clear answer to four maintenance questions:
- when does a new case deserve entry?
- when should a case be pruned, fused, or moved?
- what is the repeatable workflow to evolve the dataset?
- when do maintainers stop expanding for its own sake?

## Decision 1 - Put the policy in the local skill-contract-forge case docs

**Decision:** Record the 6C maintenance rules in `evals/cases/skill-contract-forge/README.md`.

**Rationale:**
- the policy is local to `skill-contract-forge` rather than global engine topology
- maintainers reviewing or editing cases already land in this folder
- the guidance stays close to the canonical suite without changing the suite JSON contract

## Decision 2 - Keep the rules short and operational

**Decision:** Use short acceptance, pruning, workflow, and stopping rules instead of a longer governance document.

**Rationale:**
- 6C is meant to stop drift, not create a process burden
- short rules are easier to follow during routine case edits
- this matches the plan guardrail not to turn the README into a treatise

## Decision 3 - Optimize for signal, not volume

**Decision:** The 6C policy explicitly favors observed failures, uncovered boundaries, and comparative value over raw case count.

**Rationale:**
- this preserves the calibration-first direction established by 6A and 6B
- it prevents prompt accumulation from looking like progress
- it defines a realistic stopping point so the dataset can be considered healthy before it becomes exhaustive
