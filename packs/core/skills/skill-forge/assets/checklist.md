# Skill QA checklist

- [ ] SKILL.md has YAML frontmatter with `name` and `description`.
- [ ] Description includes: Use when / Don’t use when / Outputs / Success criteria.
- [ ] Description length is <= 1024 characters (loader limit).
- [ ] Steps are imperative, numbered, and artifact-driven (inputs → actions → outputs).
- [ ] Guardrails exist (security + “don’t invent”).
- [ ] At least 3 negative examples and 3 edge cases.
- [ ] Any generated templates/examples live inside the skill (assets/) and are referenced.
- [ ] Optional: agents/openai.yaml present if UI/policy/deps matter.
