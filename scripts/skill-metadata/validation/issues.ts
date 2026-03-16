import { type ValidationIssue, type ValidationIssueCode } from './types';

export const validationMessages = {
  emptyRequiredField: (field: string): string => `Required field "${field}" must not be empty`,
  invalidFrontmatterYaml: (): string => 'Frontmatter YAML could not be parsed',
  invalidOptionalMetadata: (): string => 'Optional field "metadata" must be an object when present',
  invalidOptionalShortDescriptionType: (): string =>
    'Optional field "metadata.short-description" must be a string when present',
  invalidOptionalShortDescriptionValue: (): string =>
    'Optional field "metadata.short-description" must not be empty',
  invalidRequiredField: (field: string): string => `Required field "${field}" must be a non-empty string`,
  missingFrontmatter: (): string => 'SKILL.md must start with a frontmatter block delimited by ---',
  missingRequiredField: (field: string): string => `Missing required field "${field}"`,
  nameDirectoryMismatch: (name: string, expectedDirName: string): string =>
    `Frontmatter name "${name}" does not match directory "${expectedDirName}"; expected name "${expectedDirName}"`,
};

export function createValidationIssue(
  filePath: string,
  code: ValidationIssueCode,
  message: string,
  field?: string,
): ValidationIssue {
  return {
    code,
    filePath,
    message,
    ...(field ? { field } : {}),
  };
}

export function sortValidationIssues(issues: ValidationIssue[]): ValidationIssue[] {
  return [...issues].sort((left, right) => {
    if (left.filePath !== right.filePath) {
      return left.filePath.localeCompare(right.filePath);
    }

    if (left.code !== right.code) {
      return left.code.localeCompare(right.code);
    }

    return (left.field ?? '').localeCompare(right.field ?? '');
  });
}
