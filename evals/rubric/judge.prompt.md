You are grading the result of running a Codex skill in a workspace.
Return ONLY valid JSON that matches the provided output schema.

Evaluate:
- The workspace changes are scoped and consistent with the skill intent.
- No unrelated files are modified.
- The produced artifacts follow the expected structure and include required sections.

If issues exist, include them with stable `code` values (e.g. "scope_violation", "missing_section", "unexpected_write").
