## Context

The forge family already has clear phase boundaries, but two authoring behaviors remain underspecified:
- `skill-contract-forge` ships maintained templates in `assets/` without telling the agent when to read them from `SKILL.md`.
- `skill-implementation-forge` and `skill-eval-forge` describe routing precedence and terminal markers, but they do not freeze an exact response envelope for `trigger`, `non-trigger`, and `stop-and-ask`.

Those gaps show up in authoring audits and logic simulation as reviewer inference rather than explicit contract text. Existing Promptfoo suites already exercise these skills, so the change must stay compatible with the current forge workflow and update only the load-bearing contract surfaces.

## Goals / Non-Goals

**Goals:**
- Make maintained support assets in `skill-contract-forge` discoverable from `SKILL.md` with explicit forward-slash relative paths and decision-point guidance.
- Freeze an exact response envelope for `skill-implementation-forge` and `skill-eval-forge` without collapsing their identity into `skill-contract-forge`'s `Classification/Workflow` convention.
- Align maintained forge-family frontmatter descriptions to third-person routing metadata and make `skill-contract-forge` teach that same pattern downstream.
- Keep Promptfoo `with_skill` harness guidance aligned to the skill-owned response boundary instead of teaching superseded labels.
- Keep the change small enough to review as one forge-family hardening pass and update existing contract suites only where they validate the changed behavior.

**Non-Goals:**
- Redesign Promptfoo runtime ownership, provider boundaries, or family architecture.
- Add new support folders, new shared scripts, or new repo-wide policy.
- Expand the scope into contract/eval authoring behavior outside these three skills.

## Decisions

### Decision: Use `Result:` as the explicit routing header for implementation and eval

`skill-implementation-forge` and `skill-eval-forge` will each adopt an exact first-line routing envelope:
- `Result: trigger`
- `Result: non-trigger`
- `Result: stop-and-ask`

Rationale:
- It makes the response shape deterministic, which is the missing authoring contract.
- It preserves each skill's own response boundary instead of copying `skill-contract-forge`'s `Classification:` and `Workflow:` lines.
- It minimizes suite churn because the existing negative checks only reject `Classification:` and `Workflow:` for `skill-eval-forge`.

Alternative considered:
- Reuse `Classification:` across the whole forge family. Rejected because it widens the change more than needed and erases the existing "own response boundary" distinction.

### Decision: Route `skill-contract-forge` assets from `SKILL.md` instead of moving or deleting them

`skill-contract-forge/SKILL.md` will explicitly reference maintained templates at the point they are needed:
- `assets/eval-brief.template.json` before producing trigger-path JSON
- `assets/skill-template.job.md` and `assets/skill-template.guardrail.md` only when reusable wording is needed to freeze job or guardrail text

Rationale:
- The assets already exist and fit the package boundary.
- The audit problem is hidden routing, not bad asset ownership.
- Explicit pathing satisfies progressive disclosure with the smallest diff.

Alternative considered:
- Delete the assets and keep everything in prose. Rejected because it would make `SKILL.md` denser and move away from the playbook.

### Decision: Use third-person activation metadata in frontmatter and generated brief descriptions

The maintained forge-family `description` frontmatter fields will use third-person capability language followed by activation boundaries such as `Use when ... Do not use for ...`. `skill-contract-forge` will teach the same pattern for downstream `skill.description`.

Rationale:
- It aligns the maintained skills with the repo's skill-authoring guidance for discovery metadata.
- It preserves the existing activation-oriented routing work while removing the second-person imperative phrasing.
- It keeps the change small because only metadata strings and the related guidance/examples need to move.

### Decision: Update only the contract suites and support examples that teach the changed boundary

This change will update:
- the OpenSpec delta specs for the affected capabilities,
- the three forge `SKILL.md` files plus the affected reference/example files,
- the Promptfoo contract/uplift cases that currently encode the old boundary.

Rationale:
- Leaving examples or suites on the old boundary would make the repo internally inconsistent.
- Updating only boundary-teaching surfaces keeps the diff local and avoids unrelated cleanup.

## Risks / Trade-offs

- [Risk] Existing Promptfoo cases may assume the previous free-form response shape. → Mitigation: update only the cases that validate routing-envelope behavior and rerun the focused offline suites.
- [Risk] Adding a header could accidentally make trigger responses fail older negative assertions. → Mitigation: use `Result:` rather than `Classification:`/`Workflow:` and adjust suite expectations where necessary.
- [Risk] Asset routing text could bloat `skill-contract-forge/SKILL.md`. → Mitigation: add only short “read this now” directions and keep long examples in `references/`.
