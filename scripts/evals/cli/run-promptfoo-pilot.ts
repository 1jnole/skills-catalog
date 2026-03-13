import { spawnSync } from 'node:child_process';
import * as path from 'node:path';
import * as process from 'node:process';

import { z } from 'zod';

import { readEvalDefinition } from '../application/load-eval-definition/load-eval-definition.js';
import {
  buildPromptfooPilotConfig,
  resolveGeneratedPromptfooConfigPath,
  resolveGeneratedPromptfooEvalPath,
  resolvePilotSuitePath,
  writePromptfooPilotConfig,
} from '../infrastructure/promptfoo/pilot-config.js';
import { readSkillPrompt } from '../infrastructure/filesystem/read-skill-prompt.js';
import {
  buildPromptfooPilotScoringArtifact,
  readPromptfooCaseModeOutputs,
  resolveGeneratedPromptfooScoringPath,
  writePromptfooPilotScoringArtifact,
} from '../infrastructure/promptfoo/pilot-scoring.js';
import { readNextArg } from '../shared/cli/args.js';

const argsSchema = z.object({
  skillName: z.string().min(1),
  file: z.string().min(1).optional(),
  provider: z.string().min(1),
  output: z.string().min(1).optional(),
  scoreOutput: z.string().min(1).optional(),
  configOut: z.string().min(1).optional(),
  modelOutputs: z.string().min(1).optional(),
  dryRun: z.boolean(),
});

type PromptfooPilotCliArgs = z.infer<typeof argsSchema>;

function parseArgs(argv: string[]): PromptfooPilotCliArgs {
  const collected = {
    skillName: 'skill-forge',
    file: undefined as string | undefined,
    provider: process.env.PROMPTFOO_PROVIDER ?? `openai:${process.env.OPENAI_MODEL ?? 'gpt-4.1-mini'}`,
    output: undefined as string | undefined,
    scoreOutput: undefined as string | undefined,
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

    if (arg === '--config-out') {
      collected.configOut = readNextArg(argv, index, '--config-out');
      index += 1;
      continue;
    }

    if (arg === '--score-output') {
      collected.scoreOutput = readNextArg(argv, index, '--score-output');
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

    throw new Error(`Unknown argument: ${arg}`);
  }

  return argsSchema.parse(collected);
}

function runPromptfooEval(args: PromptfooPilotCliArgs): void {
  const suitePath = args.file ? path.resolve(args.file) : resolvePilotSuitePath(args.skillName);
  const definition = readEvalDefinition(suitePath);
  const resolvedSkillName = definition.skill_name;
  const skillPrompt = readSkillPrompt(definition.skill_name);
  const configPath = args.configOut
    ? path.resolve(args.configOut)
    : resolveGeneratedPromptfooConfigPath(resolvedSkillName);
  const evalOutputPath = args.output
    ? path.resolve(args.output)
    : resolveGeneratedPromptfooEvalPath(resolvedSkillName);
  const scoreOutputPath = args.scoreOutput
    ? path.resolve(args.scoreOutput)
    : resolveGeneratedPromptfooScoringPath(resolvedSkillName);

  writePromptfooPilotConfig(
    configPath,
    buildPromptfooPilotConfig({
      definition,
      skillPrompt,
      provider: args.provider,
    }),
  );

  const promptfooArgs = ['--yes', 'promptfoo@latest', 'eval', '-c', configPath, '-o', evalOutputPath];
  if (args.modelOutputs) {
    promptfooArgs.push('--model-outputs', path.resolve(args.modelOutputs));
  }

  const command = 'npx';

  console.log(`promptfoo suite: ${suitePath}`);
  console.log(`promptfoo config: ${configPath}`);
  console.log(`promptfoo output: ${evalOutputPath}`);
  console.log(`local scoring output: ${scoreOutputPath}`);
  if (args.dryRun) {
    console.log(`dry run command: ${command} ${promptfooArgs.join(' ')}`);
    return;
  }

  const result = spawnSync(command, promptfooArgs, {
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`promptfoo eval failed with exit code ${result.status ?? 'unknown'}`);
  }

  const caseModeOutputs = readPromptfooCaseModeOutputs(evalOutputPath);
  const scoringArtifact = buildPromptfooPilotScoringArtifact({
    definition,
    sourceEvalPath: suitePath,
    sourcePromptfooOutputPath: evalOutputPath,
    caseModeOutputs,
  });
  writePromptfooPilotScoringArtifact(scoreOutputPath, scoringArtifact);
  console.log(`local scoring complete: ${scoreOutputPath}`);
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  runPromptfooEval(args);
}

main();
