import { spawnSync } from 'node:child_process';
import * as path from 'node:path';
import * as process from 'node:process';

import { readEvalDefinition } from '../application/load-eval-definition/load-eval-definition.js';
import {
  buildPromptfooPilotConfig,
  resolveGeneratedPromptfooConfigPath,
  resolveGeneratedPromptfooEvalPath,
  resolvePromptfooSuitePath,
  writePromptfooPilotConfig,
} from '../infrastructure/promptfoo/pilot-config.js';
import { readSkillPrompt } from '../infrastructure/filesystem/read-skill-prompt.js';
import {
  buildPromptfooPilotBenchmarkArtifact,
  resolveGeneratedPromptfooBenchmarkPath,
  writePromptfooPilotBenchmarkArtifact,
} from '../infrastructure/promptfoo/pilot-benchmark.js';
import {
  buildPromptfooPilotScoringArtifact,
  readPromptfooCaseModeOutputs,
  resolveGeneratedPromptfooScoringPath,
  writePromptfooPilotScoringArtifact,
} from '../infrastructure/promptfoo/pilot-scoring.js';
import type { RunEvalsCliArgs } from './run-evals.args.js';

export function runSupportedEvals(args: RunEvalsCliArgs): void {
  if (!args.file && !args.skillName) {
    throw new Error('Pass --skill-name <name> or --file <path>.');
  }

  const suitePath = args.file
    ? path.resolve(args.file)
    : resolvePromptfooSuitePath(args.skillName!);
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
  const benchmarkOutputPath = args.benchmarkOutput
    ? path.resolve(args.benchmarkOutput)
    : resolveGeneratedPromptfooBenchmarkPath(resolvedSkillName);

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
  console.log(`local benchmark output: ${benchmarkOutputPath}`);
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

  const benchmarkArtifact = buildPromptfooPilotBenchmarkArtifact({
    definition,
    scoringArtifact,
    caseModeOutputs,
  });
  writePromptfooPilotBenchmarkArtifact(benchmarkOutputPath, benchmarkArtifact);
  console.log(`local benchmark complete: ${benchmarkOutputPath}`);
}
