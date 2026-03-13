import * as path from 'node:path';
import * as process from 'node:process';

export type EvalsPathConfig = {
  skillsRoot: string;
  evalsDirName: string;
  evalDefinitionFileName: string;
  filesDirName: string;
  runsDirName: string;
  skillPromptFileName: string;
};

function readConfigValue(env: NodeJS.ProcessEnv, key: string, fallback: string): string {
  const value = env[key]?.trim();
  return value && value.length > 0 ? value : fallback;
}

export function readEvalsPathConfig(env: NodeJS.ProcessEnv = process.env): EvalsPathConfig {
  return {
    skillsRoot: path.resolve(readConfigValue(env, 'EVALS_SKILLS_ROOT', path.join('packs', 'core'))),
    evalsDirName: readConfigValue(env, 'EVALS_EVALS_DIR', 'evals'),
    evalDefinitionFileName: readConfigValue(env, 'EVALS_EVAL_DEFINITION_FILE', 'evals.json'),
    filesDirName: readConfigValue(env, 'EVALS_FILES_DIR', 'files'),
    runsDirName: readConfigValue(env, 'EVALS_RUNS_DIR', 'runs'),
    skillPromptFileName: readConfigValue(env, 'EVALS_SKILL_PROMPT_FILE', 'SKILL.md'),
  };
}

export function resolveSkillRoot(skillName: string, env: NodeJS.ProcessEnv = process.env): string {
  const config = readEvalsPathConfig(env);
  return path.resolve(config.skillsRoot, skillName);
}

export function resolveSkillPromptPath(skillName: string, env: NodeJS.ProcessEnv = process.env): string {
  const config = readEvalsPathConfig(env);
  return path.resolve(config.skillsRoot, skillName, config.skillPromptFileName);
}

export function resolveSkillEvalRoot(skillName: string, env: NodeJS.ProcessEnv = process.env): string {
  const config = readEvalsPathConfig(env);
  return path.resolve(config.skillsRoot, skillName, config.evalsDirName);
}

export function resolveSkillEvalDefinitionPath(skillName: string, env: NodeJS.ProcessEnv = process.env): string {
  const config = readEvalsPathConfig(env);
  return path.resolve(config.skillsRoot, skillName, config.evalsDirName, config.evalDefinitionFileName);
}

export function resolveSkillEvalFilesRoot(skillName: string, env: NodeJS.ProcessEnv = process.env): string {
  const config = readEvalsPathConfig(env);
  return path.resolve(config.skillsRoot, skillName, config.evalsDirName, config.filesDirName);
}

export function resolveSkillEvalRunsRoot(skillName: string, env: NodeJS.ProcessEnv = process.env): string {
  const config = readEvalsPathConfig(env);
  return path.resolve(config.skillsRoot, skillName, config.evalsDirName, config.runsDirName);
}
