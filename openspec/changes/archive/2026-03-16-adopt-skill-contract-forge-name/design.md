## Context

The legacy skill name appears in three broad layers:
- the core skill package and its local assets
- the Promptfoo eval and local authoring contract surfaces
- OpenSpec specs and archived change records

The user asked for a full rename and explicit review at the end, so the change needs to treat path names and textual references as part of the same operation.

## Decision 1 - Rename both paths and content

**Decision:** Rename filesystem paths that still carry the legacy skill name and then update textual references to `skill-contract-forge`.

**Rationale:**
- a content-only rename would leave stale paths behind
- a path-only rename would break references throughout docs, tests, and configs
- doing both in one slug keeps the repo consistent

## Decision 2 - Rename archived OpenSpec artifacts too

**Decision:** Update archived OpenSpec change paths and archived text references that still carry the old skill name.

**Rationale:**
- the request was to rename all references, not just active runtime paths
- archived changes are still part of repo search and maintenance workflows
- leaving the old name only in archives would keep the naming split alive

## Decision 3 - Verify by absence and path consistency

**Decision:** Validate the rename by checking two things:
- no legacy-name textual references remain in the repository
- the renamed key paths exist where configs and docs now point

**Rationale:**
- this gives a direct end-state verification for a rename slug
- it is more useful here than trying to rerun every historical artifact
