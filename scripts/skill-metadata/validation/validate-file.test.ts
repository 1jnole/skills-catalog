import { describe, expect, it } from 'vitest';

import { validateSkillMetadataFile } from './validate-file';

function validate(content: string, expectedDirName = 'demo-skill', filePath = 'packs/demo/demo-skill/SKILL.md') {
  return validateSkillMetadataFile({
    content,
    expectedDirName,
    filePath,
  });
}

describe('validateSkillMetadataFile', () => {
  it('reports missing frontmatter when the file does not start with a frontmatter block', () => {
    expect(validate('# No frontmatter')).toEqual([
      {
        code: 'missing_frontmatter',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'SKILL.md must start with a frontmatter block delimited by ---',
      },
    ]);
  });

  it('reports invalid YAML when the frontmatter cannot be parsed', () => {
    expect(validate(['---', 'name: [broken', 'description: ok', '---'].join('\n'))).toEqual([
      {
        code: 'invalid_frontmatter_yaml',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'Frontmatter YAML could not be parsed',
      },
    ]);
  });

  it('reports invalid YAML when the frontmatter opening delimiter has no closing delimiter', () => {
    expect(validate(['---', 'name: demo-skill', 'description: works'].join('\n'))).toEqual([
      {
        code: 'invalid_frontmatter_yaml',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'Frontmatter YAML could not be parsed',
      },
    ]);
  });

  it('reports a missing required field when name is absent', () => {
    expect(validate(['---', 'description: hello', '---'].join('\n'))).toEqual([
      {
        code: 'missing_required_field',
        field: 'name',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'Missing required field "name"',
      },
    ]);
  });

  it('reports a missing required field when description is absent', () => {
    expect(validate(['---', 'name: demo-skill', '---'].join('\n'))).toEqual([
      {
        code: 'missing_required_field',
        field: 'description',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'Missing required field "description"',
      },
    ]);
  });

  it('reports a type-focused message when a required field is present but not a string', () => {
    expect(validate(['---', 'name: 123', 'description: works', '---'].join('\n'))).toEqual([
      {
        code: 'invalid_required_field',
        field: 'name',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'Required field "name" must be a non-empty string',
      },
    ]);
  });

  it('reports empty required fields after trimming', () => {
    expect(validate(['---', 'name: "   "', 'description: ""', '---'].join('\n'))).toEqual([
      {
        code: 'empty_required_field',
        field: 'description',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'Required field "description" must not be empty',
      },
      {
        code: 'empty_required_field',
        field: 'name',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'Required field "name" must not be empty',
      },
    ]);
  });

  it('accepts a multiline description block scalar', () => {
    expect(
      validate(['---', 'name: demo-skill', 'description: |', '  line one', '  line two', '---'].join('\n')),
    ).toEqual([]);
  });

  it('accepts a folded multiline description block scalar', () => {
    expect(
      validate(['---', 'name: demo-skill', 'description: >', '  line one', '  line two', '---'].join('\n')),
    ).toEqual([]);
  });

  it('accepts BOM-prefixed frontmatter with CRLF line endings', () => {
    expect(
      validate(['\uFEFF---', 'name: demo-skill', 'description: works', '---'].join('\r\n')),
    ).toEqual([]);
  });

  it('accepts metadata.short-description when present with a non-empty string', () => {
    expect(
      validate(
        ['---', 'name: demo-skill', 'description: works', 'metadata:', '  short-description: short text', '---'].join(
          '\n',
        ),
      ),
    ).toEqual([]);
  });

  it('reports an invalid optional field when metadata.short-description is empty', () => {
    expect(
      validate(['---', 'name: demo-skill', 'description: works', 'metadata:', '  short-description: ""', '---'].join('\n')),
    ).toEqual([
      {
        code: 'invalid_optional_field',
        field: 'metadata.short-description',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'Optional field "metadata.short-description" must not be empty',
      },
    ]);
  });

  it('reports an invalid optional field when metadata.short-description is not a string', () => {
    expect(
      validate(
        ['---', 'name: demo-skill', 'description: works', 'metadata:', '  short-description: 123', '---'].join('\n'),
      ),
    ).toEqual([
      {
        code: 'invalid_optional_field',
        field: 'metadata.short-description',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'Optional field "metadata.short-description" must be a string when present',
      },
    ]);
  });

  it('reports an invalid optional field when metadata is not an object', () => {
    expect(validate(['---', 'name: demo-skill', 'description: works', 'metadata: nope', '---'].join('\n'))).toEqual([
      {
        code: 'invalid_optional_field',
        field: 'metadata',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'Optional field "metadata" must be an object when present',
      },
    ]);
  });

  it('reports an invalid optional field when metadata is null', () => {
    expect(validate(['---', 'name: demo-skill', 'description: works', 'metadata: null', '---'].join('\n'))).toEqual([
      {
        code: 'invalid_optional_field',
        field: 'metadata',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'Optional field "metadata" must be an object when present',
      },
    ]);
  });

  it('reports a mismatch when the name does not match the containing directory', () => {
    expect(validate(['---', 'name: another-skill', 'description: works', '---'].join('\n'))).toEqual([
      {
        code: 'name_directory_mismatch',
        field: 'name',
        filePath: 'packs/demo/demo-skill/SKILL.md',
        message: 'Frontmatter name "another-skill" does not match directory "demo-skill"; expected name "demo-skill"',
      },
    ]);
  });

  it('returns multiple issues in stable order', () => {
    expect(
      validate(
        ['---', 'name: " "', 'metadata:', '  short-description: ""', '---'].join('\n'),
        'expected-skill',
        'packs/demo/expected-skill/SKILL.md',
      ),
    ).toEqual([
      {
        code: 'empty_required_field',
        field: 'name',
        filePath: 'packs/demo/expected-skill/SKILL.md',
        message: 'Required field "name" must not be empty',
      },
      {
        code: 'invalid_optional_field',
        field: 'metadata.short-description',
        filePath: 'packs/demo/expected-skill/SKILL.md',
        message: 'Optional field "metadata.short-description" must not be empty',
      },
      {
        code: 'missing_required_field',
        field: 'description',
        filePath: 'packs/demo/expected-skill/SKILL.md',
        message: 'Missing required field "description"',
      },
    ]);
  });
});
