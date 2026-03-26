## Overview

This is a contract-only change for the existing `agents-bootstrap` skill. The change does not edit the maintained skill package yet. It freezes the skill boundary into one approved brief artifact so implementation can tighten `packs/core/agents-bootstrap/SKILL.md` from explicit authority instead of carrying forward older assumptions.

## Decisions

### Workflow

Use `existing-skill-refactor`.

Reason:
- the target skill already exists under `packs/core/agents-bootstrap/`
- the goal is to clarify its boundary before editing maintained files

### Skill boundary

The skill remains responsible for synchronizing the managed block in the repository root `AGENTS.md` from a maintained baseline.

It should trigger for:
- bootstrapping the managed block in a missing or drifted root `AGENTS.md`
- refreshing the managed root instructions after the managed baseline changes
- standardizing repo-level guardrails, prompt policy, and stop conditions inside the managed block only

It should not trigger for:
- ad-hoc edits outside the managed markers
- OpenSpec workspace bootstrap or repair
- nested or specialized override authoring outside the root managed block
- repository policy changes that need a broader contract decision than syncing the current managed baseline

### Package shape

The maintained package should keep:
- `SKILL.md`
- `assets/`

Reason:
- the procedure and routing fit in `SKILL.md`
- the canonical managed block template already lives in `assets/AGENTS.managed.md` and is a required support artifact for deterministic sync behavior

### Portable handoff

The approved brief should carry the distilled contract directly. Repo-local files may be inspected while drafting the contract, but the handoff should remain usable without requiring downstream phases to recover authority from auxiliary authoring paths.
