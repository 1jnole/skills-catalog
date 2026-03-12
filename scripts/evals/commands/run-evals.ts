import * as process from 'node:process';
import { z } from 'zod';

import { executeRunEvalIteration } from '../platforms/laminar/run-eval-iteration.js';
import { parseEvalInputSource } from '../run/definition/load-eval-definition.js';
import { type EvalInputSource } from '../shared/types/eval-input-source.types.js';
import { parsePositiveInteger, readNextArg } from '../shared/cli/args.js';

const argsSchema = z.object({
  skillName: z.string().min(1).optional(),
  file: z.string().min(1).optional(),
  iteration: z.number().int().positive().optional(),
  model: z.string().min(1),
  retryErrors: z.boolean(),
});

type CliArgs = EvalInputSource & {
  iteration?: number;
  model: string;
  retryErrors: boolean;
};

function parseArgs(argv: string[]): CliArgs {
  const collected = {
    skillName: undefined as string | undefined,
    file: undefined as string | undefined,
    iteration: undefined as number | undefined,
    model: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
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

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const result = await executeRunEvalIteration({
    skillName: args.skillName,
    file: args.file,
    iteration: args.iteration,
    model: args.model,
    retryErrors: args.retryErrors,
  });

  console.log(`iteration complete: ${result.iterationDir}`);
  console.log(`iteration: ${result.iterationNumber}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`run failed: ${message}`);
  process.exit(1);
});
