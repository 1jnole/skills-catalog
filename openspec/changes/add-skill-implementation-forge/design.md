## Overview

This change adds a new portable core skill, `skill-implementation-forge`, that owns only the implementation phase of the repo's documented skill-forge workflow. The skill consumes an already approved contract artifact and turns that into a shallow skill bundle, stopping at `Skill implementation ready`.

## Design decisions

### Single source of truth

The implemented skill contract is derived from:
- the approved Eval Brief produced by `skill-contract-forge`
- `README.md`
- `AGENTS.md`
- `packs/core/skill-contract-forge/SKILL.md`

The new skill must not import structure or behavior from legacy implementation-oriented skills as normative authority.

### Package shape

For v1, the skill remains self-contained in:
- `packs/core/skill-implementation-forge/SKILL.md`

No `evals/` subtree is introduced. No Promptfoo config, prompts, fixtures, providers, or generated outputs are added.

Examples, anti-examples, and edge cases stay inline in `SKILL.md` unless the content becomes too large to route from clearly. This change intentionally chooses the self-contained shape.

### Behavioral boundary

The new skill has one job only:
- implement or refactor one named skill from an already frozen contract into the repo's shallow skill structure

In scope:
- create or refactor `SKILL.md`
- create nearby `references/`, `assets/`, `agents/`, or `scripts/` only when explicitly required by the frozen contract
- preserve shallow repo conventions

Out of scope:
- redefining or renegotiating the contract
- Promptfoo-native eval authoring
- eval runtime architecture
- providers, fixtures, generated outputs, or shared runner structure
- repo-wide policy changes and unrelated tooling refactors

### Stop-and-ask behavior

The skill must explicitly stop and ask when:
- the approved Eval Brief is missing
- the contract is ambiguous or not specific enough to implement safely
- the target skill is not clearly identified
- implementation is mixed inseparably with contract authoring
- implementation is mixed inseparably with eval authoring
- the request widens into eval runtime architecture or shared eval infrastructure

Deictic prompts such as `implement this skill`, `refactor this skill`, `rewrite the current skill`, or `build the next skill` are not sufficient on their own.

### Minimal documentation update

`README.md` should be updated only if needed to reflect that the new core skill now exists. No workflow policy rewrite is included in this change.

## Verification strategy

- Validate the OpenSpec change before apply
- Run `npm run validate:skill-metadata`
- Manually review `packs/core/skill-implementation-forge/SKILL.md` against the approved brief and repo rules

## Risks

- The main risk is hidden widening into contract or eval work; the skill text must exclude that explicitly.
- Another risk is under-specified stop-and-ask behavior; deictic and missing-contract cases must be called out directly.
