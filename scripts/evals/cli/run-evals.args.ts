import { z } from 'zod';

import { parseEvalInputSource } from '../application/load-eval-definition/load-eval-definition.js';
import { type EvalInputSource } from '../application/load-eval-definition/eval-input-source.types.js';
import { parsePositiveInteger, readNextArg } from '../shared/cli/args.js';

const argsSchema = z.object({
  skillName: z.string().min(1).optional(),
  file: z.string().min(1).optional(),
  iteration: z.number().int().positive().optional(),
  model: z.string().min(1),
  retryErrors: z.boolean(),
});

export type RunEvalsCliArgs = EvalInputSource & {
  iteration?: number;
  model: string;
  retryErrors: boolean;
};

export function parseRunEvalsArgs(argv: string[], options?: { defaultModel?: string }): RunEvalsCliArgs {
  const collected = {
    skillName: undefined as string | undefined,
    file: undefined as string | undefined,
    iteration: undefined as number | undefined,
    model: options?.defaultModel ?? 'gpt-4.1-mini',
    retryErrors: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--skill-name') {
      collected.skillName = readNextArg(argv, index, '--skill-name');
      index += 1;
      continue;
    }

    if (arg === '--file') {
      collected.file = readNextArg(argv, index, '--file');
      index += 1;
      continue;
    }

    if (arg === '--iteration') {
      collected.iteration = parsePositiveInteger(readNextArg(argv, index, '--iteration'), '--iteration');
      index += 1;
      continue;
    }

    if (arg === '--model') {
      collected.model = readNextArg(argv, index, '--model');
      index += 1;
      continue;
    }

    if (arg === '--retry-errors') {
      collected.retryErrors = true;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  const parsed = argsSchema.parse(collected);
  const source = parseEvalInputSource({
    skillName: parsed.skillName,
    file: parsed.file,
  });

  return {
    ...source,
    iteration: parsed.iteration,
    model: parsed.model,
    retryErrors: parsed.retryErrors,
  };
}
