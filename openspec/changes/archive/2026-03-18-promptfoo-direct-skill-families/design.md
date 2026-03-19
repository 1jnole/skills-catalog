# Design

## Summary

Promptfoo eval assets are organized into direct per-skill families:

```text
evals/engines/promptfoo/
  skill-contract-forge/
    promptfooconfig.yaml
    promptfooconfig.uplift.with-skill.yaml
    promptfooconfig.uplift.without-skill.yaml
    prompts/
    tests/
  skill-implementation-forge/
    promptfooconfig.yaml
    promptfooconfig.uplift.with-skill.yaml
    promptfooconfig.uplift.without-skill.yaml
    prompts/
    tests/
  providers/
  fixtures/
  generated/
```

## Decisions

### Direct per-skill folders

Each evaluated skill gets its own direct folder under `evals/engines/promptfoo/`. A separate `skills/` container is intentionally avoided because the parent path already identifies the eval engine and the child folder already names the skill.

### Shared runtime assets stay shared

`providers/`, `fixtures/`, `generated/`, and engine-level documentation remain shared at the Promptfoo root. This keeps provider adapters and runtime artifacts centralized while letting suites, prompts, and configs stay skill-local.

### Three entrypoints per family

Each skill family keeps the same operational shape:

- `promptfooconfig.yaml`
- `promptfooconfig.uplift.with-skill.yaml`
- `promptfooconfig.uplift.without-skill.yaml`

This preserves the existing contract/uplift split while making the physical layout scalable.

### Compatibility commands

The existing generic `promptfoo:*` commands continue to point at `skill-contract-forge` as compatibility aliases. Explicit per-skill commands are also exposed for both `skill-contract-forge` and `skill-implementation-forge`.

### OpenSpec scope

This change updates runtime topology, maintained docs, and package commands. Stable specs are updated later by archiving this change; until then, the new truth lives in this change's spec deltas.
