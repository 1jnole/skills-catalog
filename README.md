# Best Practices for Creating Codex Agent Skills

This guide is a concentrated set of best practices for writing **professional-grade skills** for **OpenAI Codex**:
- predictable routing (good discovery),
- deterministic execution (low hallucination),
- lean context (progressive disclosure),
- regression-safe maintenance (validation + evals).

> Scope: This is a **human-facing** guide for a **skills catalog repository**.
> Inside each skill folder, prefer **agent-facing** files only (SKILL.md + references/scripts/assets).

---

## 0) Codex mental model (what Codex actually loads)

Codex uses **progressive disclosure**:
1) It starts with each skill’s **metadata**: `name`, `description`, file path, plus optional metadata from `agents/openai.yaml`.
2) It loads the full `SKILL.md` instructions **only when it decides to use the skill**.

Implication:
- Keep frontmatter **high-signal** (routing).
- Keep `SKILL.md` **lean** (execution).
- Offload bulk to `references/`, `assets/`, `scripts/` and load them **just-in-time**.

---

## 1) Structure of a Codex skill

A Codex skill is a directory with a required `SKILL.md`, plus optional standard folders:

skill-name/
├── SKILL.md              # Required: YAML frontmatter + core instructions (<500 lines recommended)
├── scripts/              # Optional: tiny CLIs (Python/Bash/Node). Variation is a bug.
├── references/           # Optional: supplementary context (schemas, cheatsheets, rules)
├── assets/               # Optional: templates or static output artifacts
└── agents/
└── openai.yaml       # Optional: UI metadata + policy + dependencies

Notes:
- `SKILL.md` is the "brain": routing clarifications + high-level procedures.
- `references/` must be **one level deep** (avoid references/foo/bar.md).
- `scripts/` should contain **single-purpose executables**, not shared libraries.
- `assets/` is for templates: JSON schemas, markdown templates, config templates, etc.
- `agents/openai.yaml` is Codex-specific: UI metadata and invocation policy.

---

## 2) Where to save skills (Codex discovery)

Codex scans skills from multiple scopes:

- REPO: `.agents/skills` in every directory from `$CWD` up to `$REPO_ROOT`
    - `$CWD/.agents/skills`
    - `$CWD/../.agents/skills` (parents up to repo root)
    - `$REPO_ROOT/.agents/skills`
- USER: `$HOME/.agents/skills`
- ADMIN: `/etc/codex/skills`
- SYSTEM: bundled with Codex

Important:
- If two skills share the same `name`, Codex doesn’t merge them (both can appear).
- Symlinked skill folders are supported.

Official docs:
- https://developers.openai.com/codex/skills/

---

## 3) SKILL.md frontmatter (routing metadata)

Codex sees **only** `name` and `description` before deciding to load a skill.

### 3.1 Strict naming (recommended for predictability)
Adopt these constraints (community best practice):
- `name`: 1–64 chars
- lowercase letters, numbers, hyphens (no consecutive hyphens)
- must match the parent folder name exactly: `my-skill/SKILL.md` => `name: my-skill`

Example:

---
name: ts-control-flow-narrowing
description: "Branches safely on union variants and unknown inputs using control-flow narrowing and honest type guards. Don't use for class-only refactors or generic utilities."
---

### 3.2 Trigger-optimized descriptions (<= 1024 chars recommended)
Write `description` in a routing-friendly way:
- third-person capability statement
- include **negative triggers** ("Don't use when ...")
- avoid procedural detail here; keep that in the body.

Bad:
- "TypeScript skills."

Good:
- "Models TypeScript data contracts (objects, tuples, callables) and avoids unsafe casts. Use when defining API/domain shapes. Don't use for runtime narrowing or class-only refactors."

---

## 4) Optional metadata: agents/openai.yaml (Codex)

Use this file to improve UI and policy:

agents/openai.yaml
interface:
display_name: "User-facing name"
short_description: "Short UI description"
policy:
allow_implicit_invocation: true|false
dependencies:
tools:
- type: "mcp"
value: "yourServerName"

Use it for:
- stable UI naming
- explicitly disabling implicit invocation for risky skills
- declaring tool dependencies for Codex environments that support it

Docs:
- https://developers.openai.com/codex/skills/

---

## 5) Progressive disclosure and resource management

### Keep SKILL.md lean (<500 lines recommended)
SKILL.md should be:
- navigation + strict procedure
- stop conditions
- output format
- just-in-time file reads

### Flat subdirectories
- ✅ references/schema.md
- ❌ references/db/v1/schema.md

### Just-in-time (JiT) loading
Codex will not see `references/` or `assets/` unless you instruct it.
Write explicit instructions like:
- "Read `references/catalog.md` and pick 1–2 patterns."
- "Copy the template from `assets/output.template.md`."

### Explicit pathing
Always use **relative paths** with forward slashes (`references/foo.md`).

---

## 6) Skills are for agents (keep skill folders agent-lean)

Inside each skill folder, avoid adding:
- README.md / CHANGELOG.md / INSTALLATION_GUIDE.md
- redundant prose the agent already handles reliably
- library code (put that in your repo’s normal CLI/tooling directories)

Human docs belong in:
- this repo root README
- `docs/` (catalog-level docs)
- issue templates / contribution guides

---

## 7) Write procedural instructions, not prose

Agents follow **procedures** better than essays.

### Step-by-step numbering
Use strict chronological steps.
For branching, make decision points explicit:
- "Step 2: If X, do A. Otherwise, skip to Step 3."

### Third-person imperative
Prefer:
- "Read …"
- "Execute …"
- "Replace …"
- "Stop and ask …"

Avoid:
- "I will …"
- "You should …" (human-facing tone)

### Consistent terminology
Pick one term per concept and reuse it consistently.

---

## 8) Bundle deterministic scripts for repetitive operations

When variation is a bug, use `scripts/` tiny CLIs:
- parsing files
- generating reports
- performing mechanical refactors
- validating JSON/YAML formats

Script rules:
- fail loudly with actionable stderr
- stable stdout for parsing
- no shared “library” code inside skills

---

## 9) Validation guide (LLM-assisted)

### 9.1 Discovery validation (routing)
Paste into a fresh chat:

I am building a Codex Agent Skill. Codex decides whether to load this skill based entirely on the YAML metadata below (name + description).

name: angular-vite-migrator
description: Migrates Angular CLI projects from Webpack to Vite and esbuild. Use when the user wants to update builder configurations, replace webpack plugins with rollup equivalents, or speed up Angular compilation. Don't use for React/Vue/Svelte projects or for version-only upgrades.

Based strictly on this description:
1) Generate 3 realistic user prompts that should trigger this skill.
2) Generate 3 realistic prompts that should NOT trigger this skill.
3) Critique the description: is it too broad? Suggest a tighter rewrite.

### 9.2 Logic validation (determinism)
Feed the LLM your `SKILL.md` + folder tree:

Here is my skill folder tree:
skill/
├── SKILL.md
├── scripts/...
└── assets/...

Act as an autonomous Codex agent that has just triggered this skill. Simulate execution step-by-step for this request: "<user request>".

For each step:
- What exactly are you doing?
- Which file/script are you reading or running?
- Flag "Execution Blockers": the exact line where you are forced to guess/hallucinate.

### 9.3 Edge-case testing (attack the skill)
Now switch roles: act as a ruthless QA tester. Your goal is to break this skill.
Ask 3–5 highly specific questions about:
- failure states
- unsupported configurations
- missing fallbacks
  Do not fix issues yet. Ask the questions and wait.

### 9.4 Architecture refinement (shrink token footprint)
Based on the edge-case answers, rewrite SKILL.md enforcing progressive disclosure:
- keep SKILL.md as high-level steps
- move dense rules/templates into references/ or assets/
- add an Error Handling section for known failure modes

---

## 10) Evals and regressions (recommended)

Skills drift over time. Use evals to detect regressions early:
- trigger correctness (should/should-not)
- output format stability
- refusal / stop behavior when context is missing

OpenAI evals reference:
- https://developers.openai.com/blog/eval-skills/

---

## 11) Relationship to AGENTS.md (always-on vs on-demand)

- `AGENTS.md` is always-on project guidance. Codex reads it before any work.
- Skills are on-demand workflows (progressive disclosure).

AGENTS.md guide:
- https://developers.openai.com/codex/guides/agents-md/

Skills docs:
- https://developers.openai.com/codex/skills/
