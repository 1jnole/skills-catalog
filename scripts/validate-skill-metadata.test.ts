import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { describe, expect, it, vi } from 'vitest';

import {
  formatValidationReport,
  isDirectSkillMetadataValidationEntry,
  runSkillMetadataValidation,
  validateSkillMetadataDirectory,
} from './validate-skill-metadata';

async function writeSkill(rootDir: string, folderName: string, content: string) {
  const skillDir = resolve(rootDir, folderName);
  await mkdir(skillDir, { recursive: true });
  await writeFile(resolve(skillDir, 'SKILL.md'), content, 'utf8');
}

describe('validateSkillMetadataDirectory', () => {
  it('returns no issues for a valid skill directory', async () => {
    const rootDir = await mkdtemp(resolve(tmpdir(), 'skill-metadata-valid-'));
    await writeSkill(rootDir, 'demo-skill', ['---', 'name: demo-skill', 'description: works', '---'].join('\n'));

    await expect(validateSkillMetadataDirectory(rootDir)).resolves.toEqual([]);
  });

  it('returns issues for an invalid skill directory', async () => {
    const rootDir = await mkdtemp(resolve(tmpdir(), 'skill-metadata-invalid-'));
    await writeSkill(rootDir, 'demo-skill', ['---', 'name: wrong-name', '---'].join('\n'));

    await expect(validateSkillMetadataDirectory(rootDir)).resolves.toEqual([
      {
        code: 'missing_required_field',
        field: 'description',
        filePath: resolve(rootDir, 'demo-skill', 'SKILL.md'),
        message: 'Missing required field "description"',
      },
      {
        code: 'name_directory_mismatch',
        field: 'name',
        filePath: resolve(rootDir, 'demo-skill', 'SKILL.md'),
        message: 'Frontmatter name "wrong-name" does not match directory "demo-skill"; expected name "demo-skill"',
      },
    ]);
  });
});

describe('runSkillMetadataValidation', () => {
  it('logs a success report and returns exit code 0 when there are no issues', async () => {
    const rootDir = await mkdtemp(resolve(tmpdir(), 'skill-metadata-run-valid-'));
    const logger = vi.fn<(message: string) => void>();
    await writeSkill(rootDir, 'demo-skill', ['---', 'name: demo-skill', 'description: works', '---'].join('\n'));

    await expect(runSkillMetadataValidation(rootDir, logger)).resolves.toBe(0);
    expect(logger).toHaveBeenCalledWith('Skill metadata validation passed.');
  });

  it('logs a failure report and returns exit code 1 when issues are found', async () => {
    const rootDir = await mkdtemp(resolve(tmpdir(), 'skill-metadata-run-invalid-'));
    const logger = vi.fn<(message: string) => void>();
    await writeSkill(rootDir, 'demo-skill', '# no frontmatter');

    await expect(runSkillMetadataValidation(rootDir, logger)).resolves.toBe(1);
    expect(logger).toHaveBeenCalledWith(
      formatValidationReport(
        [
          {
            code: 'missing_frontmatter',
            filePath: resolve(rootDir, 'demo-skill', 'SKILL.md'),
            message: 'SKILL.md must start with a frontmatter block delimited by ---',
          },
        ],
        rootDir,
      ),
    );
  });
});

describe('isDirectSkillMetadataValidationEntry', () => {
  it('returns true for the validator entry script path', () => {
    expect(isDirectSkillMetadataValidationEntry('C:/repo/scripts/validate-skill-metadata.ts')).toBe(true);
    expect(isDirectSkillMetadataValidationEntry('C:\\repo\\scripts\\validate-skill-metadata.js')).toBe(true);
  });

  it('returns false for other scripts or missing values', () => {
    expect(isDirectSkillMetadataValidationEntry(undefined)).toBe(false);
    expect(isDirectSkillMetadataValidationEntry('C:/repo/scripts/something-else.ts')).toBe(false);
  });
});
