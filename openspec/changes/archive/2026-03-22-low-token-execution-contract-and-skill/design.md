## Design

This change introduces `low-token-execution` as a daily-use operational skill for compact, high-signal execution. It is intentionally narrow: it does not do deep code review, product strategy, or architecture redesign as its main job.

### Scope

- Define a permanent contract for when compact execution is the right mode.
- Implement the first `SKILL.md` for the new skill.
- Keep the package shallow.

### Non-goals

- No Promptfoo family in this slug.
- No offline replay or runtime additions.
- No repo-wide policy changes.
- No new shared abstractions across skills.

### Key decisions

- The skill is triggered by execution shape, not by domain.
- The skill optimizes for reducing reopened context, not for “being brief”.
- The skill requires a freezeable done checklist before heavy execution starts.
- The skill stops and asks when the unit of work or success criteria are not stable enough to compact safely.

### Assumption

- Even though the slug name includes `contract-and-skill`, this slug still respects forge sequencing by limiting itself to the permanent contract plus the first skill implementation. Downstream Promptfoo authoring remains deferred to slug 2.

### Risks and mitigation

- Risk: the skill collapses into generic advice such as “speak less”.
  - Mitigation: define behavior in terms of frozen done criteria, one unit at a time, diff-first review, and focused verification.
- Risk: the skill is used where the real problem is ambiguity, not execution overhead.
  - Mitigation: strong stop-and-ask behavior for unclear units, missing done criteria, or non-trivial strategy choice.
