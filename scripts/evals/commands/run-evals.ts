import * as process from 'node:process';

import { executeRunEvalIteration } from '../application/run-eval-iteration/execute-run-eval-iteration.js';
import { parseRunEvalsArgs } from './run-evals.args.js';

async function main(): Promise<void> {
  const args = parseRunEvalsArgs(process.argv.slice(2), {
    defaultModel: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
  });

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


