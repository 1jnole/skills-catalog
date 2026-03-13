import { z } from 'zod';

import { parseEvalInputSource } from '../application/load-eval-definition/load-eval-definition.js';
import { type EvalInputSource } from '../application/load-eval-definition/eval-input-source.types.js';
import { readNextArg } from '../shared/cli/args.js';

const argsSchema = z.object({
  skillName: z.string().min(1).optional(),
  file: z.string().min(1).optional(),
  model: z.string().min(1),
  provider: z.string().min(1).optional(),
  output: z.string().min(1).optional(),
  scoreOutput: z.string().min(1).optional(),
  benchmarkOutput: z.string().min(1).optional(),
  configOut: z.string().min(1).optional(),
  modelOutputs: z.string().min(1).optional(),
  dryRun: z.boolean(),
});

export type RunEvalsCliArgs = EvalInputSource & {
  provider: string;
  output?: string;
  scoreOutput?: string;
  benchmarkOutput?: string;
  configOut?: string;
  modelOutputs?: string;
  dryRun: boolean;
};

export function parseRunEvalsArgs(
  argv: string[],
  options?: { defaultModel?: string; defaultProvider?: string },
): RunEvalsCliArgs {
  const collected = {
    skillName: undefined as string | undefined,
    file: undefined as string | undefined,
    model: options?.defaultModel ?? 'gpt-4.1-mini',
    provider: undefined as string | undefined,
    output: undefined as string | undefined,
    scoreOutput: undefined as string | undefined,
    benchmarkOutput: undefined as string | undefined,
    configOut: undefined as string | undefined,
    modelOutputs: undefined as string | undefined,
    dryRun: false,
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

    if (arg === '--model') {
      collected.model = readNextArg(argv, index, '--model');
      index += 1;
      continue;
    }

    if (arg === '--provider') {
      collected.provider = readNextArg(argv, index, '--provider');
      index += 1;
      continue;
    }

    if (arg === '--output') {
      collected.output = readNextArg(argv, index, '--output');
      index += 1;
      continue;
    }

    if (arg === '--score-output') {
      collected.scoreOutput = readNextArg(argv, index, '--score-output');
      index += 1;
      continue;
    }

    if (arg === '--benchmark-output') {
      collected.benchmarkOutput = readNextArg(argv, index, '--benchmark-output');
      index += 1;
      continue;
    }

    if (arg === '--config-out') {
      collected.configOut = readNextArg(argv, index, '--config-out');
      index += 1;
      continue;
    }

    if (arg === '--model-outputs') {
      collected.modelOutputs = readNextArg(argv, index, '--model-outputs');
      index += 1;
      continue;
    }

    if (arg === '--dry-run') {
      collected.dryRun = true;
      continue;
    }

    if (arg === '--iteration') {
      throw new Error('--iteration is no longer supported in the final eval flow.');
    }

    if (arg === '--retry-errors') {
      throw new Error('--retry-errors is no longer supported in the final eval flow.');
    }

    if (arg === '--json') {
      throw new Error('--json is only supported by read-evals.');
    }

    if (arg === '--skill') {
      throw new Error('Use --skill-name <name>.');
    }

    if (arg === '--promptfoo') {
      throw new Error('Promptfoo is already the supported engine path for run-evals.');
    }

    if (arg === '--legacy' || arg === '--laminar') {
      throw new Error(`${arg} is no longer supported in the final eval flow.`);
    }

    if (arg === '--retry' || arg === '--resume') {
      throw new Error(`${arg} is no longer supported in the final eval flow.`);
    }

    if (arg === '--run-promptfoo-pilot') {
      throw new Error('Use run-evals instead of the deprecated run-promptfoo-pilot alias.');
    }

    if (arg === '--run-evals') {
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
    provider: parsed.provider ?? options?.defaultProvider ?? `openai:${parsed.model}`,
    output: parsed.output,
    scoreOutput: parsed.scoreOutput,
    benchmarkOutput: parsed.benchmarkOutput,
    configOut: parsed.configOut,
    modelOutputs: parsed.modelOutputs,
    dryRun: parsed.dryRun,
  };
}
