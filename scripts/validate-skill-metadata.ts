import { readdir, readFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';

import { sortValidationIssues } from './skill-metadata/validation/issues';
import {
  type ValidationExitCode,
  type ValidationIssue,
} from './skill-metadata/validation/types';
import { validateSkillMetadataFile } from './skill-metadata/validation/validate-file';

const validationEntryPattern = /(?:^|[\\/])validate-skill-metadata\.(?:ts|js|mts|cts)$/i;

async function collectSkillMarkdownFiles(rootDir: string): Promise<string[]> {
  const entries = await readdir(rootDir, { withFileTypes: true });
  const nestedFileGroups = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = resolve(rootDir, entry.name);

      if (entry.isDirectory()) {
        return collectSkillMarkdownFiles(fullPath);
      }

      if (entry.isFile() && entry.name === 'SKILL.md') {
        return [fullPath];
      }

      return [];
    }),
  );

  return [...nestedFileGroups.flat()].sort((left, right) => left.localeCompare(right));
}

export async function validateSkillMetadataDirectory(rootDir: string): Promise<ValidationIssue[]> {
  const skillMarkdownFiles = await collectSkillMarkdownFiles(rootDir);
  const collectedIssues: ValidationIssue[] = [];

  for (const skillMarkdownFile of skillMarkdownFiles) {
    const content = await readFile(skillMarkdownFile, 'utf8');
    const expectedDirName = dirname(skillMarkdownFile).split(/[\\/]/).pop() ?? '';

    collectedIssues.push(
      ...validateSkillMetadataFile({
        content,
        expectedDirName,
        filePath: skillMarkdownFile,
      }),
    );
  }

  return sortValidationIssues(collectedIssues);
}

export function formatValidationReport(issues: ValidationIssue[], rootDir: string): string {
  if (issues.length === 0) {
    return 'Skill metadata validation passed.';
  }

  const reportLines = ['Skill metadata validation failed.', ''];

  for (const issue of issues) {
    reportLines.push(`${relative(rootDir, issue.filePath)}: ${issue.code} - ${issue.message}`);
  }

  return reportLines.join('\n');
}

export async function runSkillMetadataValidation(
  rootDir: string,
  logger: (message: string) => void = console.log,
): Promise<ValidationExitCode> {
  const issues = await validateSkillMetadataDirectory(rootDir);
  logger(formatValidationReport(issues, rootDir));
  return issues.length === 0 ? 0 : 1;
}

export function isDirectSkillMetadataValidationEntry(executedScriptPath: string | undefined): boolean {
  if (typeof executedScriptPath !== 'string') {
    return false;
  }

  return validationEntryPattern.test(executedScriptPath);
}

if (isDirectSkillMetadataValidationEntry(process.argv[1])) {
  const rootDir = resolve(process.cwd(), 'packs');
  runSkillMetadataValidation(rootDir)
    .then((exitCode) => {
      process.exitCode = exitCode;
    })
    .catch((error: unknown) => {
      console.error(error);
      process.exitCode = 1;
    });
}
