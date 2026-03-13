import * as process from 'node:process';
import { pathToFileURL } from 'node:url';

import { parseRunEvalsArgs } from './run-evals.args.js';
import { runSupportedEvals } from './run-evals.supported.js';

function main(options?: { deprecatedAlias?: boolean }): void {
  if (options?.deprecatedAlias) {
    console.warn('`run-promptfoo-pilot` is deprecated. Use `run-evals` instead.');
  }

  const args = parseRunEvalsArgs(process.argv.slice(2), {
    defaultModel: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
    defaultProvider: process.env.PROMPTFOO_PROVIDER,
  });
  runSupportedEvals(args);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main({ deprecatedAlias: true });
}
