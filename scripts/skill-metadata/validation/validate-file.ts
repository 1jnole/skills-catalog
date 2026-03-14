import { readSkillFrontmatter } from '../frontmatter';
import { createValidationIssue, sortValidationIssues, validationMessages } from './issues';
import {
  readSkillFrontmatterObject,
  validateNameMatchesDirectory,
  validateOptionalMetadata,
  validateRequiredTextField,
} from './rules';
import {
  type ValidateSkillMetadataFileInput,
  type ValidationIssue,
} from './types';

export type { ValidationIssue } from './types';

export function validateSkillMetadataFile(input: ValidateSkillMetadataFileInput): ValidationIssue[] {
  const frontmatterReadResult = readSkillFrontmatter(input.content);

  if (frontmatterReadResult.ok === false) {
    if (frontmatterReadResult.reason === 'missing_frontmatter') {
      return [
        createValidationIssue(
          input.filePath,
          'missing_frontmatter',
          validationMessages.missingFrontmatter(),
        ),
      ];
    }

    return [
      createValidationIssue(
        input.filePath,
        'invalid_frontmatter_yaml',
        validationMessages.invalidFrontmatterYaml(),
      ),
    ];
  }

  const skillFrontmatter = readSkillFrontmatterObject(frontmatterReadResult.value);

  if (skillFrontmatter === null) {
    return sortValidationIssues([
      createValidationIssue(
        input.filePath,
        'missing_required_field',
        validationMessages.missingRequiredField('description'),
        'description',
      ),
      createValidationIssue(
        input.filePath,
        'missing_required_field',
        validationMessages.missingRequiredField('name'),
        'name',
      ),
    ]);
  }

  const nameResult = validateRequiredTextField(input.filePath, 'name', skillFrontmatter.name);
  const descriptionResult = validateRequiredTextField(input.filePath, 'description', skillFrontmatter.description);
  const validationIssues: ValidationIssue[] = [];
  const metadataIssues = validateOptionalMetadata(input.filePath, skillFrontmatter.metadata);
  const directoryIssues = validateNameMatchesDirectory(input.filePath, input.expectedDirName, nameResult);

  if (nameResult.ok === false) {
    validationIssues.push(nameResult.issue);
  }

  if (descriptionResult.ok === false) {
    validationIssues.push(descriptionResult.issue);
  }

  validationIssues.push(...metadataIssues);
  validationIssues.push(...directoryIssues);

  return sortValidationIssues(validationIssues);
}
