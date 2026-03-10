import * as fs from 'node:fs';

import { type ZodType } from 'zod';

export function readValidatedJsonFile<T>(filePath: string, schema: ZodType<T>): T {
  const raw = fs.readFileSync(filePath, 'utf8');
  const json: unknown = JSON.parse(raw);
  return schema.parse(json);
}

export function writeValidatedJsonFile<T>(filePath: string, schema: ZodType<T>, payload: unknown): T {
  const validatedPayload = schema.parse(payload);
  fs.writeFileSync(filePath, `${JSON.stringify(validatedPayload, null, 2)}\n`, 'utf8');
  return validatedPayload;
}
