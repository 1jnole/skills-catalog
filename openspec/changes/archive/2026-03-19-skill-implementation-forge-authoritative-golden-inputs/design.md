## Context

The current `skill-implementation-forge` Promptfoo family proves that the skill stops when authority is missing, but it does not prove the complementary behavior: that the skill triggers correctly when a real repo-local contract artifact and an explicit target skill are both present.

The repository already has a clean real candidate for that path: `skill-eval-forge`, whose approved contract artifact lives at `openspec/specs/skill-eval-forge/spec.md` and whose current implementation lives at `packs/core/skill-eval-forge/SKILL.md`.

## Goals / Non-Goals

**Goals:**
- Add one positive real case that is actionable from repo-local authority.
- Keep `contract`, `uplift`, and `without_skill` semantically aligned around the same case.
- Preserve deterministic assertions.

**Non-Goals:**
- Changing `packs/core/skill-implementation-forge/SKILL.md`.
- Adding new Promptfoo configs, fixtures, providers, or generated reports.
- Expanding the family with multiple new goldens.

## Decisions

### Use `skill-eval-forge` as the real target

We will anchor the new golden on `skill-eval-forge` because it has a direct one-to-one mapping between:
- target skill name
- approved contract artifact
- existing implementation

Alternative considered: `openspec-bootstrap`.
Rejected because its skill-to-spec mapping is less direct for a minimal deterministic golden.

### Mirror one canonical case across all three suites

The same `case_id`, description, and prompt semantics will appear in:
- `contract.yaml`
- `uplift.yaml`
- `uplift.without-skill.yaml`

`contract` and `uplift` will treat it as an in-scope trigger path. `without_skill` will mirror the case as an informational baseline and explicitly avoid impersonating the skill-owned boundary.

### Keep assertions semantic but deterministic

Assertions will require:
- the explicit target skill
- contract-authority language
- the exact terminal marker in with-skill suites

They will not require the model to echo the exact file paths verbatim.

## Risks / Trade-offs

- [Cross-suite drift] -> Use one canonical case name and closely matched prompt wording in all three files.
- [Over-brittle assertions] -> Assert target, authority concept, and terminal marker, but avoid exact path-echo requirements.
- [Baseline impersonation] -> Keep `uplift.without-skill.yaml` limited to absence assertions for the skill-owned marker and boundary language.

## Migration Plan

1. Update the Promptfoo family spec to require the new positive case.
2. Add the canonical case to the three maintained suites.
3. Validate the OpenSpec change.
4. Validate the three Promptfoo configs and run live evals if credentials are available.

## Open Questions

- None. The target skill and authoritative repo-local artifact are fixed by this change.
