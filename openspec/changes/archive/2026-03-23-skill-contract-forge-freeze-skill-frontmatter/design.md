## Context

The repository already treats `name` and `description` as required metadata for `packs/**/SKILL.md`, but the contract-phase skill only freezes `skill.name` at the brief level today. The change needs to stay small and phase-local: tighten the contract artifact and its contract gate without widening into packaging policy or implementation-phase enforcement.

## Goals / Non-Goals

**Goals:**
- Make trigger-path Eval Briefs carry the minimum metadata needed to materialize valid `SKILL.md` frontmatter later.
- Keep the brief engine-neutral while making the metadata requirement explicit.
- Catch missing-description regressions through the existing Promptfoo contract gate.

**Non-Goals:**
- Add `agents/openai.yaml` requirements.
- Introduce `packageShape` or broader packaging contracts.
- Change `skill-implementation-forge` in this slug.
- Add a new metadata validator or repo-wide tooling.

## Decisions

### Require `skill.description` in the existing `skill` object
Use the already-established `skill` object as the canonical home for both `name` and `description`. This keeps the brief small and avoids inventing a second metadata subtree just to mirror `SKILL.md` frontmatter.

Alternative considered: add a new `authoring.frontmatter` block. Rejected because it duplicates intent, expands the contract surface, and is unnecessary for this bug.

### Tighten the schema and contract suite together
Update the Eval Brief JSON schema and the Promptfoo contract cases in the same slug so the structural contract and the semantic gate stay aligned.

Alternative considered: change only examples and `SKILL.md`. Rejected because the current bug passed through precisely because the structural gate was too loose.

## Risks / Trade-offs

- [Stricter brief shape may break existing replay fixtures] -> Refresh only the affected `skill-contract-forge` fixtures after live behavior is green.
- [Model outputs may keep using old minimal payloads] -> Update the schema, examples, and contract wording together so the active guidance and gate converge on the same shape.
- [Scope drift into implementation policy] -> Keep all implementation-phase requirements out of this slug and leave them for the follow-up slug.
