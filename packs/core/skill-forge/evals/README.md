# skill-forge eval definition

This folder holds the downstream eval artifacts for `skill-forge`.

- The skill contract lives in `../SKILL.md`
- The boundary handoff template lives in `../assets/contracts/eval-brief.template.json`
- Source of truth for this seed example: `evals.json`
- Attached case files, if needed: `files/`
- Run artifacts stay local under `runs/iteration-N/`
- This example is scoped to the real authoring boundary of `skill-forge`: new skill, existing skill refactor or rewrite, and clarification when authoring scope is mixed or unclear
- The negative set is intentionally narrow and only covers nearby non-authoring work, not general repo-wide routing
- This file is not a shared runtime contract for all skills
- This file is not the `Eval Brief`; it is the downstream concrete eval definition
