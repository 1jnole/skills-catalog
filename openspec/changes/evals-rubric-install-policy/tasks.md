# Tasks — evals-rubric-install-policy

## Objective
Close the loop with optional rubric scoring, reproducible user-scope installation, and minimal maintenance policies.

## Checklist
- [x] Rubric schema and judge prompt exist under `evals/rubric/`.
- [x] Runner supports `--with-rubric` and skips gracefully if `--output-schema` isn't supported (unless --strict).
- [x] Installer script supports `--dry-run`, `--clean`, and custom `--codex-home`.
- [x] Docs describe the recommended loop: verify -> evals -> optional rubric.

## Evidence (commands + outputs)
- [x] `node scripts/install-user-skills.mjs --dry-run` — OK (prints planned operations)
