# Tasks — phase1-single-source-of-truth-and-hygiene

## Checklist
- [x] Create OpenSpec change folder with `spec.md` and `tasks.md`.
- [x] Remove versioned noise:
  - [x] `evals/artifacts/`
  - [x] `evals/golden-prompts.*` (unused by scripts)
  - [x] `/.git` and `/.idea` (not present in the ZIP)
- [x] Make skills source of truth unambiguous:
  - [x] **Canon:** `packs/*/skills/*`
  - [x] Remove non-canon: `skills/` (contained `skills/.curated` and `skills/.experimental`)
  - [x] Update `scripts/verify-skills.mjs` to hard-fail if non-canon or orphaned golden-prompts are present
  - [x] Confirm `scripts/install-user-skills.mjs` installs only canon
  - [x] Update docs to declare canon and forbid the other layout
- [x] Validation:
  - [x] `npm run verify`
  - [x] `node scripts/verify-skills.mjs`

## Evidence

### Repo hygiene changes

Removed from the repository:
- `evals/artifacts/`
- `evals/golden-prompts.csv`
- `evals/golden-prompts.md`
- `skills/` (entire duplicate tree)

Snapshot after deletion:

```sh
$ ls -la
$ ls -la evals
$ test ! -e skills
$ test ! -e evals/artifacts
$ test ! -e evals/golden-prompts.csv
$ test ! -e evals/golden-prompts.md
```

Output:

```
ROOT:
total 63
drwxr-xr-x 2 root root   280 Feb  2 22:28 .
drwxr-xr-x 2 root root    60 Feb  2 22:25 ..
-rw-r--r-- 1 root root   477 Feb  2 22:30 .gitignore
-rw-r--r-- 1 root root  1305 Feb  1 21:30 AGENTS.md
-rw-r--r-- 1 root root 56299 Feb  2 10:11 AUDIT_REPORT.md
-rw-r--r-- 1 root root   795 Feb  1 21:30 CONTRIBUTING.md
-rw-r--r-- 1 root root  3900 Feb  1 21:38 README.md
drwxr-xr-x 2 root root   120 Feb  2 10:28 docs
drwxr-xr-x 2 root root   220 Feb  2 22:28 evals
drwxr-xr-x 2 root root   140 Feb  2 10:28 openspec
-rw-r--r-- 1 root root   242 Feb  1 21:30 package.json
drwxr-xr-x 2 root root    80 Feb  1 15:10 packs
drwxr-xr-x 2 root root   120 Feb  2 10:28 scripts

EVALS:
total 8
drwxr-xr-x 2 root root  220 Feb  2 22:28 .
drwxr-xr-x 2 root root  280 Feb  2 22:28 ..
-rw-r--r-- 1 root root   50 Feb  1 17:33 .gitignore
-rw-r--r-- 1 root root  697 Feb  1 21:30 README.md
-rw-r--r-- 1 root root  220 Feb  1 21:30 core-skills.json
drwxr-xr-x 2 root root  200 Feb  2 10:28 fixtures
-rw-r--r-- 1 root root 5952 Feb  2 10:04 prompts.csv
drwxr-xr-x 2 root root   80 Feb  2 10:28 rubric

CHECKS:
OK: skills/ removed
OK: evals/artifacts removed
OK: golden-prompts.csv removed
OK: golden-prompts.md removed
```

### Canon enforcement

`docs/CONVENTIONS.md` states that `packs/<pack>/skills/<skill>/SKILL.md` is the only source of truth and explicitly forbids a `skills/` tree.

`scripts/verify-skills.mjs` now fails if:
- a `skills/` directory exists, or
- `evals/golden-prompts.*` exists (unless wired into scripts).

### Validation output

#### npm run verify

```
> verify
> node scripts/verify-skills.mjs

✅ Required instruction docs exist and are within size limits
✅ Required bootstrap assets are present
✅ Validated 54 skills (frontmatter + naming + duplicates + structure)
✅ Validated core eval coverage: 7 skills
✅ Validated eval dataset: 21 rows
✅ No obvious secrets detected
✅ verify: OK
```

#### node scripts/verify-skills.mjs

```
✅ Required instruction docs exist and are within size limits
✅ Required bootstrap assets are present
✅ Validated 54 skills (frontmatter + naming + duplicates + structure)
✅ Validated core eval coverage: 7 skills
✅ Validated eval dataset: 21 rows
✅ No obvious secrets detected
✅ verify: OK
```
