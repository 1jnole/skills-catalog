import * as process from 'node:process';

import { parseRunEvalsArgs } from './run-evals.args.js';
import { runSupportedEvals } from './run-evals.supported.js';

function main(): void {
  const args = parseRunEvalsArgs(process.argv.slice(2), {
    defaultModel: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
    defaultProvider: process.env.PROMPTFOO_PROVIDER,
  });

  runSupportedEvals(args);
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`run failed: ${message}`);
  process.exit(1);
}
