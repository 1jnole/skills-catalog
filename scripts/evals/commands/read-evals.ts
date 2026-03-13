import * as process from 'node:process';
import { z } from 'zod';

import { executeReadEvalDefinition } from '../application/load-eval-definition/read-eval-definition.js';
import { parseEvalInputSource } from '../application/load-eval-definition/load-eval-definition.js';
import { type EvalInputSource } from '../application/load-eval-definition/eval-input-source.types.js';
import { readNextArg } from '../shared/cli/args.js';

const argsSchema = z.object({
  skillName: z.string().min(1).optional(),
  file: z.string().min(1).optional(),
  json: z.boolean(),
});

type CliArgs = EvalInputSource & { json: boolean };

function parseArgs(argv: string[]): CliArgs {
  const collected = {
    skillName: undefined as string | undefined,
    file: undefined as string | undefined,
    json: false,
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

    if (arg === '--json') {
      collected.json = true;
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
    json: parsed.json,
  };
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const result = executeReadEvalDefinition({
    skillName: args.skillName,
    file: args.file,
  });

  if (args.json) {
    console.log(
      JSON.stringify(
        {
          file: result.filePath,
          summary: result.summary,
          definition: result.definition,
        },
        null,
        2,
      ),
    );
    return;
  }

  console.log(`eval definition OK: ${result.filePath}`);
  console.log(`skill: ${result.summary.skill_name}`);
  console.log(`version: ${result.summary.eval_version}`);
  console.log(`golden: ${result.summary.golden_cases}`);
  console.log(`negative: ${result.summary.negative_cases}`);
  console.log(`total: ${result.summary.total_cases}`);
}

main();


