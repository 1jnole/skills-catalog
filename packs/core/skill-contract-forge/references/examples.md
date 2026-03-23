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
    "description": "Use this skill when the task is to define one reusable skill contract before implementation. Do not use it for runtime implementation, downstream eval authoring, or repository policy work."
  },
  "authoring": {
    "singleJob": "Define one reusable skill contract before implementation.",
    "packageShape": {
      "requiredFiles": [
        "SKILL.md"
      ],
      "supportFolders": []
    }
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
  "sourceRefs": []
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

### Trigger output uses `skill.description` as an output summary

Invalid because `skill.description` must behave like activation metadata for `SKILL.md` frontmatter, not like a short description of the artifact it will produce.

### Trigger output invents `sourceRefs`

Invalid because `sourceRefs` must reflect real authority used for the brief, not plausible-but-missing docs such as `docs/contracts/<skill>.md` or target skill paths that do not exist yet.

### Trigger output uses `AGENTS.md` as filler

Invalid when `AGENTS.md` did not materially shape the contract. `sourceRefs` should list only sources that actually influenced the brief, and it may be `[]` when the contract comes mainly from the user request.

### Trigger output missing `authoring.packageShape`

Invalid because trigger-path briefs must freeze the minimal package shape instead of leaving downstream implementation to invent whether support folders are needed.

### Trigger output selects `agents` without `authoring.interface`

Invalid because once a brief says `agents` is required, it must also freeze the minimal interface metadata that downstream implementation would need for `agents/openai.yaml`.

## What the examples are for

Use these examples to confirm envelope shape and boundary discipline.
Do not copy values mechanically when the request requires different skill details.
