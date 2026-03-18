## Overview

This change adds a new portable core skill, `skill-eval-forge`, that owns only the eval-authoring phase of the repo's documented skill-forge workflow. The skill consumes an already approved contract artifact and an existing implementation, then authors or refactors eval coverage for that one named skill, stopping at `Skill eval ready`.

## Design decisions

### New skill, not legacy restoration

The removed historical `skill-eval-forge` taught a deprecated per-skill eval workflow. This change does not restore that legacy shape. Instead, it introduces a new eval-authoring skill aligned to the active Promptfoo-native runtime boundary under `evals/engines/promptfoo/` and the current repo workflow.

### Package shape

For v1, the skill remains self-contained in:
- `packs/core/skill-eval-forge/SKILL.md`

No `evals/` subtree is introduced inside the skill package by default. No Promptfoo config, fixtures, providers, or generated outputs are added as part of this skill definition.

Examples, anti-examples, and edge cases stay inline in `SKILL.md` unless the content becomes too large to route from clearly. This change intentionally chooses the self-contained shape.

### Behavioral boundary

The new skill has one job only:
- author or refactor eval coverage for one named skill from an approved contract artifact and an existing implementation

In scope:
- author or refactor Promptfoo-native eval coverage for one named skill
- use the active repo eval boundary under `evals/engines/promptfoo/` as context
- add nearby support files only when they are materially necessary to explain the eval-authoring workflow

Out of scope:
- redefining or renegotiating the contract
- implementing or refactoring the target skill itself
- eval/runtime architecture changes
- providers, fixtures, generated outputs, or shared runner structure
- repo-wide policy changes and unrelated tooling refactors

### Stop-and-ask behavior

The skill must explicitly stop and ask when:
- the approved contract artifact is missing
- the target skill implementation is missing
- the target skill is not clearly identified
- the contract and implementation conflict materially in a way that would require redefining the contract
- eval authoring is mixed inseparably with contract authoring
- eval authoring is mixed inseparably with skill implementation
- the request widens into eval/runtime redesign or shared infrastructure work

Deictic prompts such as `write evals for this skill`, `fix the current evals`, `cover the next skill`, or `update this suite` are not sufficient on their own.

### Minimal documentation update

`README.md` should be updated only as needed so the core skill list reflects that the third phase skill now exists. No broader workflow rewrite is included in this change.

## Verification strategy

- Validate the OpenSpec change before apply
- Run `npm run validate:skill-metadata`
- Manually review `packs/core/skill-eval-forge/SKILL.md` against the approved brief and repo rules

## Risks

- The main risk is accidentally recreating the legacy removed workflow; the skill text must anchor itself to the active Promptfoo-native repo eval boundary under `evals/engines/promptfoo/`.
- Another risk is hidden widening into contract or implementation work; the skill text must exclude both explicitly.
- A smaller risk is over-prescribing support files; the skill should remain self-contained by default.
