import { z } from 'zod';

export const validationIssueCodeSchema = z.enum([
  'missing_frontmatter',
  'invalid_frontmatter_yaml',
  'missing_required_field',
  'invalid_required_field',
  'empty_required_field',
  'invalid_optional_field',
  'name_directory_mismatch',
]);

export const validationIssueSchema = z.object({
  code: validationIssueCodeSchema,
  filePath: z.string(),
  message: z.string(),
  field: z.string().optional(),
});

export const skillFrontmatterObjectSchema = z
  .object({
    name: z.unknown().optional(),
    description: z.unknown().optional(),
    metadata: z.unknown().optional(),
  })
  .passthrough();

export const frontmatterMetadataObjectSchema = z
  .object({
    'short-description': z.unknown().optional(),
  })
  .passthrough();

export const nonEmptyTrimmedStringSchema = z
  .string()
  .transform((value) => value.trim())
  .pipe(z.string().min(1));
