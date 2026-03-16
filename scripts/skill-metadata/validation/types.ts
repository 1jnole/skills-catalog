import { z } from 'zod';

import {
  skillFrontmatterObjectSchema,
  validationIssueCodeSchema,
  validationIssueSchema,
} from './schemas';

export type ValidationIssue = z.infer<typeof validationIssueSchema>;
export type ValidationIssueCode = z.infer<typeof validationIssueCodeSchema>;
export type SkillFrontmatterObject = z.infer<typeof skillFrontmatterObjectSchema>;

export type ReadSkillFrontmatterResult =
  | { ok: true; value: unknown }
  | { ok: false; reason: 'missing_frontmatter' | 'invalid_frontmatter_yaml' };

export type ValidateSkillMetadataFileInput = {
  content: string;
  expectedDirName: string;
  filePath: string;
};

export type RequiredTextFieldResult =
  | { ok: true; value: string }
  | { ok: false; issue: ValidationIssue };

export type ValidationExitCode = 0 | 1;
