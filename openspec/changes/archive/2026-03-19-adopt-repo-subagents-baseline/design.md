## Context

The repo currently documents repo-scoped skills in `.codex/skills/` but does not provide any tracked repo-scoped subagent defaults. In practice, common contributor work here falls into three repeatable read-heavy buckets:

- locating the minimum relevant files before any edit
- checking whether an OpenSpec slug is ready for validate/apply/archive
- comparing Promptfoo suites for semantic drift

These tasks are useful candidates for `gpt-5.4-mini` and read-only sandboxing. The user goal for this change is lower day-to-day spend, not maximum agent parallelism.

## Goals / Non-Goals

**Goals:**
- Provide a small repo-scoped subagent baseline that contributors can use immediately.
- Favor savings on expensive main-agent usage over broad feature coverage.
- Keep the baseline read-only and low-risk.
- Make the baseline discoverable in repository docs.

**Non-Goals:**
- Auto-spawning subagents or changing Codex defaults outside this repo.
- Adding write-capable custom agents.
- Adding MCP-specific docs agents or provider-specific integrations.
- Guaranteeing total-token reductions for every task shape.

## Decisions

### Decision: Track repo-scoped `.codex/config.toml` and a small curated agent set

The change adds a tracked `.codex/config.toml` and three tracked custom agent files under `.codex/agents/`.

Why:
- This matches the official Codex repo-scoped configuration model.
- It keeps the baseline visible and reviewable in git.
- It avoids relying on user-scoped setup that new contributors may not have.

Alternative considered:
- User-scoped agents only in `~/.codex/agents/`.
  Rejected because they are not reviewable or shareable as repo defaults.

### Decision: Use conservative concurrency defaults

The repo baseline sets:
- `agents.max_threads = 2`
- `agents.max_depth = 1`

Why:
- The user priority is cost control, not maximal fan-out.
- Official docs note that subagent workflows can consume more total tokens than comparable single-agent runs.
- Low depth prevents agent-of-agent cascades.

Alternative considered:
- Higher concurrency such as `max_threads = 4` or `6`.
  Rejected because it optimizes throughput more than cost.

### Decision: Keep all repo-provided agents read-only and mini-first

The baseline agents are:
- `repo_mapper`
- `openspec_preflight`
- `promptfoo_drift_checker`

All use `sandbox_mode = "read-only"` and `model = "gpt-5.4-mini"`.

Why:
- Read-only agents are the lowest-risk default.
- The repo's repeated expensive work is mostly reading, comparison, and summarization.
- `gpt-5.4` remains available in the parent workflow for integration and judgment.

Alternative considered:
- Shipping a write-capable worker baseline.
  Rejected because it increases risk and does not directly target token savings.

## Risks / Trade-offs

- [Total tokens may not decrease on every task] -> README documents that the main benefit is shifting read-heavy work off the expensive primary agent.
- [Too many narrow agents could add maintenance burden] -> Limit the baseline to three agents tied to repeated repo workflows.
- [Ignored `.codex/` runtime state could leak into git] -> Keep `.codex/*` ignored by default and unignore only tracked baseline files.

## Migration Plan

1. Add change artifacts and validate the OpenSpec change.
2. Commit the repo-scoped `.codex` baseline and docs.
3. Validate TOML syntax for the tracked config and agent files.
4. Archive the slug after review if the baseline is accepted.

Rollback is straightforward: remove the tracked `.codex` baseline, restore the previous ignore rule, and archive a reverting change if needed.

## Open Questions

- None for this baseline. Future changes can add more specialized agents after real usage evidence.
