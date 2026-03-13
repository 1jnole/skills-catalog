import { z } from 'zod';

export const evalInputSourceSchema = z
  .object({
    skillName: z.string().min(1).optional(),
    file: z.string().min(1).optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.skillName && !value.file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Pass --skill-name <name> or --file <path>.',
      });
    }

    if (value.skillName && value.file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Use either --skill-name or --file, not both.',
      });
    }
  });
