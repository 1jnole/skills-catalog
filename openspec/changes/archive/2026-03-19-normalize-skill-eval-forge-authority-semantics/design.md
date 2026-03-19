## Overview

This change brings `skill-eval-forge` to the same semantic robustness standard already used by the other forge phases: authoritative inputs must be real, inspectable, and repo-local enough to act on, not merely referenced abstractly. The work stays within the existing Promptfoo family and does not expand runtime scope.

## Design Decisions

### Three authoritative inputs stay explicit

`skill-eval-forge` depends on three inputs:
- approved contract artifact
- existing implementation
- active eval context

The suite should treat each one the same way: if it is only mentioned vaguely or “somewhere in the repo,” that is a clarification path, not a valid trigger.

### Uplift stays lighter than contract

`uplift.yaml` should not copy the entire contract suite. It should add only the highest-signal authority guardrails needed to prevent false positives:
- contract artifact mentioned only
- implementation mentioned only
- eval context mentioned only

Existing widening, mixed-phase, missing-input, and deictic guardrails remain in place.

### Baseline stays informational

`uplift.without-skill.yaml` should mirror the renamed prompts where applicable so comparison remains readable, but it must continue to reject skill-owned authority framing such as:
- `Skill eval ready`
- `approved contract artifact`
- `existing implementation`
- repo-local Promptfoo boundary phrases
- `stop and ask`

### No operational parity work

This change does not:
- add offline replay fixtures
- add public npm entrypoints
- move files or change topology
- rewrite `SKILL.md`
- change the Promptfoo provider/runtime surface

## Verification Strategy

- Validate the OpenSpec change with `openspec validate "normalize-skill-eval-forge-authority-semantics" --type change`
- Run `promptfoo validate` for the three `skill-eval-forge` configs
- Run `promptfoo eval` for those same three configs
- Record concise evidence in `tasks.md`

## Risks

- The main risk is over-tightening uplift until it ceases to be lighter than the contract gate.
- A secondary risk is leaving the baseline asymmetrical so one renamed authority case still sounds skill-owned while the suite stays green.
