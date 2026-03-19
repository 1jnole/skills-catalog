## 1. OpenSpec artifacts

- [x] 1.1 Write proposal, design, and spec artifacts for the repo-scoped subagent baseline.
- [x] 1.2 Validate the change artifacts with `openspec validate "adopt-repo-subagents-baseline" --type change`.

## 2. Repo baseline

- [x] 2.1 Add tracked `.codex/config.toml` with conservative subagent defaults.
- [x] 2.2 Add read-only `gpt-5.4-mini` custom agents for repo mapping, OpenSpec preflight, and Promptfoo drift review.
- [x] 2.3 Update `.gitignore` so the tracked `.codex` baseline is committed while other `.codex` runtime state remains ignored.

## 3. Contributor docs and verification

- [x] 3.1 Document the repo-scoped subagent baseline and usage guidance in `README.md`.
- [x] 3.2 Validate the tracked TOML files parse correctly.

## Evidence

- **Command:** `openspec validate "adopt-repo-subagents-baseline" --type change`
  **Result:** PASS. `Change 'adopt-repo-subagents-baseline' is valid`
  **Date:** `2026-03-19`
  **Note:** The change artifacts validate cleanly before implementation review.
- **Command:** `python -c "import pathlib, tomllib; files=[pathlib.Path('.codex/config.toml'), *sorted(pathlib.Path('.codex/agents').glob('*.toml'))]; [tomllib.loads(p.read_text(encoding='utf-8')) for p in files]; print('TOML OK:', ', '.join(str(p) for p in files))"`
  **Result:** PASS. Parsed `.codex/config.toml`, `.codex/agents/openspec-preflight.toml`, `.codex/agents/promptfoo-drift-checker.toml`, and `.codex/agents/repo-mapper.toml`.
  **Date:** `2026-03-19`
  **Note:** This confirms the tracked repo-scoped subagent baseline is syntactically valid TOML.
- **Command:** `git status --short --untracked-files=all .codex openspec\changes\adopt-repo-subagents-baseline .gitignore README.md`
  **Result:** PASS. The tracked `.codex` files and the new change artifacts appear as expected, while unrelated repo state remains outside this change scope.
  **Date:** `2026-03-19`
  **Note:** This verifies `.gitignore` now allows the committed baseline files without reopening the whole `.codex` runtime tree.
- **Command:** `git diff --check -- .gitignore README.md .codex openspec/changes/adopt-repo-subagents-baseline`
  **Result:** PASS. No whitespace or patch-format errors were reported for files owned by this change.
  **Date:** `2026-03-19`
  **Note:** The diff check was scoped to this change because the worktree already contained unrelated prior modifications.
