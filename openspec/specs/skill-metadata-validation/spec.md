# skill-metadata-validation Specification

## Purpose
TBD - created by archiving change add-skill-metadata-validator-v1. Update Purpose after archive.
## Requirements
### Requirement: Skill frontmatter metadata is validated at the repository boundary
The repository MUST validate frontmatter metadata for `packs/**/SKILL.md` files before the metadata is treated as trusted.

#### Scenario: Missing frontmatter fails validation
- **WHEN** a `SKILL.md` file does not start with a valid frontmatter block
- **THEN** the validator reports a `missing_frontmatter` issue for that file

#### Scenario: Invalid YAML fails validation
- **WHEN** a `SKILL.md` file has a frontmatter block that cannot be parsed as YAML
- **THEN** the validator reports an `invalid_frontmatter_yaml` issue for that file

#### Scenario: Unterminated frontmatter fails validation
- **WHEN** a `SKILL.md` file starts with a frontmatter opening delimiter but has no closing delimiter
- **THEN** the validator reports an `invalid_frontmatter_yaml` issue for that file

### Requirement: Required skill metadata fields are enforced
The repository MUST require `name` and `description` metadata fields in each validated `SKILL.md` file.

#### Scenario: Missing required field is reported
- **WHEN** `name` or `description` is missing from frontmatter
- **THEN** the validator reports a `missing_required_field` issue naming the missing field

#### Scenario: Empty required field is reported
- **WHEN** `name` or `description` exists but is empty after trimming
- **THEN** the validator reports an `empty_required_field` issue naming that field

#### Scenario: Wrongly typed required field is reported
- **WHEN** `name` or `description` is present but is not a non-empty string
- **THEN** the validator reports an `invalid_required_field` issue naming that field

### Requirement: Optional metadata remains narrow and valid
The repository MUST accept `metadata.short-description` as optional metadata and report invalid values when it is present with the wrong shape or an empty string.

#### Scenario: Optional short description is accepted
- **WHEN** `metadata.short-description` is present with a non-empty string value
- **THEN** the validator accepts the file without raising an issue for that field

#### Scenario: Optional short description is rejected when invalid
- **WHEN** `metadata.short-description` is present but empty or not a string
- **THEN** the validator reports an `invalid_optional_field` issue for `metadata.short-description`

### Requirement: Frontmatter name matches the skill directory
The repository MUST require the frontmatter `name` to match the immediate directory name containing `SKILL.md`.

#### Scenario: Directory mismatch is reported
- **WHEN** the frontmatter `name` differs from the containing skill directory name
- **THEN** the validator reports a `name_directory_mismatch` issue for that file

### Requirement: A stable local validation command is available
The repository MUST provide a stable local command to run skill metadata validation and return a failing exit code when issues are found.

#### Scenario: Validation command exits successfully for valid metadata
- **WHEN** the validation command runs and no issues are found
- **THEN** it exits with code `0`

#### Scenario: Validation command exits with failure for invalid metadata
- **WHEN** the validation command runs and at least one issue is found
- **THEN** it exits with code `1`

