## Context

The repository has 36 `SKILL.md` files today and already uses more than one frontmatter style: quoted and unquoted strings, optional nested `metadata`, and multiline `description: |` blocks. It also already ships Zod, TypeScript, and Vitest, but has no script or tests for validating catalog metadata. The change therefore needs to stay small, source-backed, and deterministic.

## Goals / Non-Goals

**Goals:**
- Add a narrow metadata validator for `packs/**/SKILL.md`.
- Keep Zod as the single source of truth for the frontmatter contract.
- Use TDD only for the pure validation core.
- Use Obsidian CLI and current repo skills as implementation guidance so tests follow existing examples rather than invented patterns.

**Non-Goals:**
- Create a new runner framework or configurable CLI.
- Validate `agents/openai.yaml`, `evals/`, or the markdown body of `SKILL.md`.
- Add CI integration or auto-fix behavior.
- Introduce a parallel manual interface layer for the validated metadata contract.

## Decisions

### Separate the validator into a pure core and a minimal script entrypoint
The core owns frontmatter extraction, YAML parsing, Zod validation, repo-specific mismatch checks, and deterministic issue ordering. The script entrypoint is limited to finding files, reading them, calling the core, printing errors, and setting `process.exitCode`.

**Alternative considered:** put validation logic directly in the script entrypoint.
**Why not chosen:** that would make testing noisy and encourage ad hoc branching in the script.

### Use Zod as the frontmatter contract source of truth
The implementation uses a Zod schema for accepted frontmatter shape and infers any supporting TypeScript types from it where needed.

**Alternative considered:** handwritten interfaces plus manual validation.
**Why not chosen:** it creates drift risk and duplicates the boundary contract.

### Keep diagnostics and boundary coverage precise without widening the scope
The validator stays metadata-only, but it should still distinguish malformed frontmatter from missing frontmatter, distinguish wrongly typed required fields from missing ones, and keep direct tests around the frontmatter parsing boundary.

**Alternative considered:** collapse these cases into broader issue buckets and rely only on end-to-end tests.
**Why not chosen:** that weakens feedback quality for skill authors and makes the frontmatter boundary harder to reason about as the validator evolves.

### Read examples from the vault with Obsidian CLI before shaping the test suite
The test suite must follow real examples and guardrails from the vault. The implementation records that evidence in `tasks.md` so the test style is source-backed rather than improvised.

**Alternative considered:** rely on memory or generic Vitest habits.
**Why not chosen:** the user explicitly asked for source-backed tests and to avoid invented patterns.

### Keep the entrypoint minimal and use direct execution tooling only
The repository needs a stable npm surface, but not a framework-level runner. A single TypeScript entry script is enough. YAML parsing and direct execution tooling are acceptable additions because they support this minimal boundary without broadening the architecture.

**Alternative considered:** add a more configurable CLI with flags or multiple formats.
**Why not chosen:** overkill for this scope and contrary to the requested constraints.

## Risks / Trade-offs

- **Different frontmatter styles already exist** -> Accept current real styles and keep v1 tolerant of extra fields.
- **Test suite could overgrow beyond the core** -> Restrict TDD to the core and use smoke tests for the entrypoint.
- **Vault guidance could be overapplied** -> Use the simplest pattern that matches the notes; do not transplant complexity when no direct example exists.
- **Tooling footprint could creep** -> Add only the minimum runtime support needed for YAML parsing and direct execution.

## Migration Plan

1. Create the slug artifacts and record source-backed guidance from the vault and repo skills.
2. Implement the pure validation core with TDD.
3. Add the minimal script entrypoint and npm command.
4. Run tests, the new command, Promptfoo validation, and OpenSpec validation.
5. Record evidence and complete the slug.

Rollback is straightforward: remove the new script, tests, and package changes, then archive or discard the slug.

## Open Questions

None for v1. The contract and scope are intentionally narrow.
