import { createValidationIssue, validationMessages } from './issues';
import {
  frontmatterMetadataObjectSchema,
  nonEmptyTrimmedStringSchema,
  skillFrontmatterObjectSchema,
} from './schemas';
import {
  type RequiredTextFieldResult,
  type SkillFrontmatterObject,
  type ValidationIssue,
} from './types';

export function validateRequiredTextField(
  filePath: string,
  field: 'name' | 'description',
  value: unknown,
): RequiredTextFieldResult {
  if (value === undefined) {
    return {
      ok: false,
      issue: createValidationIssue(
        filePath,
        'missing_required_field',
        validationMessages.missingRequiredField(field),
        field,
      ),
    };
  }

  const textFieldResult = nonEmptyTrimmedStringSchema.safeParse(value);

  if (textFieldResult.success) {
    return {
      ok: true,
      value: textFieldResult.data,
    };
  }

  if (typeof value === 'string') {
    return {
      ok: false,
      issue: createValidationIssue(
        filePath,
        'empty_required_field',
        validationMessages.emptyRequiredField(field),
        field,
      ),
    };
  }

  return {
    ok: false,
    issue: createValidationIssue(
      filePath,
      'invalid_required_field',
      validationMessages.invalidRequiredField(field),
      field,
    ),
  };
}

export function validateOptionalMetadata(filePath: string, value: unknown): ValidationIssue[] {
  if (value === undefined) {
    return [];
  }

  const metadataResult = frontmatterMetadataObjectSchema.safeParse(value);

  if (!metadataResult.success) {
    return [
      createValidationIssue(
        filePath,
        'invalid_optional_field',
        validationMessages.invalidOptionalMetadata(),
        'metadata',
      ),
    ];
  }

  const shortDescription = metadataResult.data['short-description'];

  if (shortDescription === undefined) {
    return [];
  }

  const shortDescriptionResult = nonEmptyTrimmedStringSchema.safeParse(shortDescription);

  if (shortDescriptionResult.success) {
    return [];
  }

  if (typeof shortDescription === 'string') {
    return [
      createValidationIssue(
        filePath,
        'invalid_optional_field',
        validationMessages.invalidOptionalShortDescriptionValue(),
        'metadata.short-description',
      ),
    ];
  }

  return [
    createValidationIssue(
      filePath,
      'invalid_optional_field',
      validationMessages.invalidOptionalShortDescriptionType(),
      'metadata.short-description',
    ),
  ];
}

export function readSkillFrontmatterObject(value: unknown): SkillFrontmatterObject | null {
  const frontmatterObjectResult = skillFrontmatterObjectSchema.safeParse(value);

  if (frontmatterObjectResult.success) {
    return frontmatterObjectResult.data;
  }

  return null;
}

export function validateNameMatchesDirectory(
  filePath: string,
  expectedDirName: string,
  nameResult: RequiredTextFieldResult,
): ValidationIssue[] {
  if (nameResult.ok === false) {
    return [];
  }

  if (nameResult.value === expectedDirName) {
    return [];
  }

  return [
    createValidationIssue(
      filePath,
      'name_directory_mismatch',
      validationMessages.nameDirectoryMismatch(nameResult.value, expectedDirName),
      'name',
    ),
  ];
}
