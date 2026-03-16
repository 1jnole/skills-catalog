import { describe, expect, it } from 'vitest';

import {
  readSkillFrontmatterObject,
  validateNameMatchesDirectory,
  validateOptionalMetadata,
  validateRequiredTextField,
} from './rules';

const filePath = 'packs/demo/demo-skill/SKILL.md';

describe('validateRequiredTextField', () => {
  it('returns a missing issue when the field is absent', () => {
    expect(validateRequiredTextField(filePath, 'name', undefined)).toEqual({
      ok: false,
      issue: {
        code: 'missing_required_field',
        field: 'name',
        filePath,
        message: 'Missing required field "name"',
      },
    });
  });

  it('returns an empty issue when the field is whitespace-only', () => {
    expect(validateRequiredTextField(filePath, 'description', '   ')).toEqual({
      ok: false,
      issue: {
        code: 'empty_required_field',
        field: 'description',
        filePath,
        message: 'Required field "description" must not be empty',
      },
    });
  });

  it('returns a trimmed string when the field is valid', () => {
    expect(validateRequiredTextField(filePath, 'name', ' demo-skill ')).toEqual({
      ok: true,
      value: 'demo-skill',
    });
  });

  it('returns a type-focused issue when the field is present but not a string', () => {
    expect(validateRequiredTextField(filePath, 'name', 123)).toEqual({
      ok: false,
      issue: {
        code: 'invalid_required_field',
        field: 'name',
        filePath,
        message: 'Required field "name" must be a non-empty string',
      },
    });
  });
});

describe('validateOptionalMetadata', () => {
  it('returns no issues when metadata is missing', () => {
    expect(validateOptionalMetadata(filePath, undefined)).toEqual([]);
  });

  it('returns a metadata issue when metadata is not an object', () => {
    expect(validateOptionalMetadata(filePath, 'nope')).toEqual([
      {
        code: 'invalid_optional_field',
        field: 'metadata',
        filePath,
        message: 'Optional field "metadata" must be an object when present',
      },
    ]);
  });

  it('returns a short-description issue when the value is empty', () => {
    expect(validateOptionalMetadata(filePath, { 'short-description': '' })).toEqual([
      {
        code: 'invalid_optional_field',
        field: 'metadata.short-description',
        filePath,
        message: 'Optional field "metadata.short-description" must not be empty',
      },
    ]);
  });

  it('returns a short-description issue when the value is not a string', () => {
    expect(validateOptionalMetadata(filePath, { 'short-description': 123 })).toEqual([
      {
        code: 'invalid_optional_field',
        field: 'metadata.short-description',
        filePath,
        message: 'Optional field "metadata.short-description" must be a string when present',
      },
    ]);
  });

  it('returns no issues when short-description is valid', () => {
    expect(validateOptionalMetadata(filePath, { 'short-description': 'short text' })).toEqual([]);
  });
});

describe('readSkillFrontmatterObject', () => {
  it('returns the parsed object when the shape is valid', () => {
    expect(
      readSkillFrontmatterObject({
        name: 'demo-skill',
        description: 'works',
        metadata: { 'short-description': 'short text' },
      }),
    ).toEqual({
      name: 'demo-skill',
      description: 'works',
      metadata: { 'short-description': 'short text' },
    });
  });

  it('returns null when the value is not a frontmatter object', () => {
    expect(readSkillFrontmatterObject('nope')).toBeNull();
  });
});

describe('validateNameMatchesDirectory', () => {
  it('returns no issues when the name matches the directory', () => {
    expect(validateNameMatchesDirectory(filePath, 'demo-skill', { ok: true, value: 'demo-skill' })).toEqual([]);
  });

  it('returns a mismatch issue when the name differs from the directory', () => {
    expect(validateNameMatchesDirectory(filePath, 'demo-skill', { ok: true, value: 'another-skill' })).toEqual([
      {
        code: 'name_directory_mismatch',
        field: 'name',
        filePath,
        message: 'Frontmatter name "another-skill" does not match directory "demo-skill"; expected name "demo-skill"',
      },
    ]);
  });

  it('returns no issues when the name result is already invalid', () => {
    expect(
      validateNameMatchesDirectory(filePath, 'demo-skill', {
        ok: false,
        issue: {
          code: 'missing_required_field',
          field: 'name',
          filePath,
          message: 'Missing required field "name"',
        },
      }),
    ).toEqual([]);
  });
});
