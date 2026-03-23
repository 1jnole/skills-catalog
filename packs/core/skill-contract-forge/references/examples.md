# Examples

This file provides examples and anti-examples for `skill-contract-forge`.

It is supportive, not normative. The required envelope still comes from `../SKILL.md`.

## Canonical trigger example

```text
Classification: trigger
Workflow: new-skill
{
  "skill": {
    "name": "example-skill",
    "description": "Describe the skill in the same user-facing terms that `SKILL.md` frontmatter will need later."
  },
  "authoring": {
    "singleJob": "Define one reusable skill contract before implementation."
  },
  "successModel": {
    "outcomeGoals": [
      "Produce a boundary-only Eval Brief."
    ]
  },
  "activationProbes": [
    "User asks for one skill contract before implementation."
  ],
  "negativeSignals": [
    "Requests for runtime implementation."
  ],
  "sourceRefs": [
    "packs/core/example-skill/SKILL.md"
  ]
}
Eval Brief ready
```

## Canonical non-trigger example

```text
Classification: non-trigger
Out of scope for skill-contract-forge.
The request is runtime implementation work, not skill contract authoring.
```

## Canonical stop-and-ask example

```text
Classification: stop-and-ask
Scope clarification required.
The target skill is unclear, so the contract cannot be frozen safely yet.
```

## Anti-examples

These responses may look plausible but violate the contract:

### Bare JSON without routing headers

Invalid because the required `Classification:` line is missing.

```json
{
  "skill": {
    "name": "example-skill"
  }
}
```

### Trigger header without workflow

Invalid because trigger paths require one exact `Workflow:` line.

```text
Classification: trigger
{
  "skill": {
    "name": "example-skill"
  }
}
Eval Brief ready
```

### Stop-and-ask with a JSON payload

Invalid because non-trigger and stop-and-ask paths must not emit an Eval Brief payload.

```text
Classification: stop-and-ask
{
  "skill": {
    "name": "example-skill"
  }
}
```

### Trigger output with implementation detail

Invalid because the brief must stay boundary-only and must not spill into runtime wiring, grader logic, or benchmark execution detail.

### Trigger output missing `skill.description`

Invalid because trigger-path briefs must freeze the repo-required skill metadata instead of expecting downstream implementation to recover it later.

## What the examples are for

Use these examples to confirm envelope shape and boundary discipline.
Do not copy values mechanically when the request requires different skill details.
