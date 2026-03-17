import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

import {
  buildPromptfooSuites,
  loadSkillContractForgeEvalDefinition,
  parseSkillContractForgeEvalDefinition,
  renderPromptfooSuites,
  syncPromptfooSuites,
} from './sync-skill-contract-forge-promptfoo';

const repoRoot = process.cwd();
const datasetPath = resolve(repoRoot, 'packs/core/skill-contract-forge/evals/evals.json');
const contractSuitePath = resolve(repoRoot, 'evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml');
const upliftWithSkillSuitePath = resolve(repoRoot, 'evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml');
const upliftWithoutSkillSuitePath = resolve(
  repoRoot,
  'evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml',
);

function normalizeLineEndings(value: string) {
  return value.replace(/\r\n/g, '\n');
}

describe('parseSkillContractForgeEvalDefinition', () => {
  it('rejects duplicate case ids', () => {
    expect(() =>
      parseSkillContractForgeEvalDefinition({
        skill_name: 'skill-contract-forge',
        eval_version: 2,
        purpose: 'demo',
        comparison_intent: {},
        scoring: {},
        gates: {},
        golden: [
          {
            id: 'duplicate',
            case_bucket: 'golden',
            surfaces: ['contract'],
            prompt: 'one',
            expected_output: 'one',
            should_trigger: true,
            stop_at: 'Eval Brief ready',
            assertions: [],
            files: [],
            promptfoo: {
              contract: {
                assert: [{ type: 'starts-with', value: 'Classification: trigger' }],
              },
            },
          },
        ],
        negative: [
          {
            id: 'duplicate',
            case_bucket: 'negative',
            surfaces: ['contract'],
            prompt: 'two',
            expected_output: 'two',
            should_trigger: false,
            stop_at: 'do_not_trigger',
            assertions: [],
            files: [],
            promptfoo: {
              contract: {
                assert: [{ type: 'starts-with', value: 'Classification: non-trigger' }],
              },
            },
          },
        ],
      }),
    ).toThrow(/Duplicate case id/);
  });

  it('rejects cases with missing surface-specific Promptfoo assertions', () => {
    expect(() =>
      parseSkillContractForgeEvalDefinition({
        skill_name: 'skill-contract-forge',
        eval_version: 2,
        purpose: 'demo',
        comparison_intent: {},
        scoring: {},
        gates: {},
        golden: [
          {
            id: 'missing-contract-assertions',
            case_bucket: 'golden',
            surfaces: ['contract'],
            prompt: 'one',
            expected_output: 'one',
            should_trigger: true,
            stop_at: 'Eval Brief ready',
            assertions: [],
            files: [],
            promptfoo: {},
          },
        ],
        negative: [],
      }),
    ).toThrow(/must define promptfoo\.contract/);
  });

  it('rejects cases with surface-specific Promptfoo assertions that are not declared in surfaces', () => {
    expect(() =>
      parseSkillContractForgeEvalDefinition({
        skill_name: 'skill-contract-forge',
        eval_version: 2,
        purpose: 'demo',
        comparison_intent: {},
        scoring: {},
        gates: {},
        golden: [],
        negative: [
          {
            id: 'orphaned-uplift-assertions',
            case_bucket: 'negative',
            surfaces: ['contract'],
            prompt: 'two',
            expected_output: 'two',
            should_trigger: false,
            stop_at: 'do_not_trigger',
            assertions: [],
            files: [],
            promptfoo: {
              contract: {
                assert: [{ type: 'starts-with', value: 'Classification: non-trigger' }],
              },
              uplift_with_skill: {
                assert: [{ type: 'starts-with', value: 'Classification: non-trigger' }],
              },
            },
          },
        ],
      }),
    ).toThrow(/defines promptfoo\.uplift_with_skill without targeting the uplift\.with_skill surface/);
  });

  it('rejects unsupported promptfoo surface keys instead of ignoring them', () => {
    expect(() =>
      parseSkillContractForgeEvalDefinition({
        skill_name: 'skill-contract-forge',
        eval_version: 2,
        purpose: 'demo',
        comparison_intent: {},
        scoring: {},
        gates: {},
        golden: [],
        negative: [
          {
            id: 'unexpected-without-skill-assertions',
            case_bucket: 'negative',
            surfaces: ['uplift.without_skill'],
            prompt: 'three',
            expected_output: 'three',
            should_trigger: false,
            stop_at: 'do_not_trigger',
            assertions: [],
            files: [],
            promptfoo: {
              uplift_without_skill: {
                assert: [{ type: 'starts-with', value: 'Classification: non-trigger' }],
              },
            },
          },
        ],
      }),
    ).toThrow(/unrecognized key/i);
  });
});

describe('buildPromptfooSuites', () => {
  it('renders the current three Promptfoo suites from the canonical eval definition', async () => {
    const definition = await loadSkillContractForgeEvalDefinition(repoRoot);
    const rendered = renderPromptfooSuites(definition);

    await expect(readFile(contractSuitePath, 'utf8')).resolves.toEqual(normalizeLineEndings(rendered.contract));
    await expect(readFile(upliftWithSkillSuitePath, 'utf8')).resolves.toEqual(
      normalizeLineEndings(rendered.upliftWithSkill),
    );
    await expect(readFile(upliftWithoutSkillSuitePath, 'utf8')).resolves.toEqual(
      normalizeLineEndings(rendered.upliftWithoutSkill),
    );
  });

  it('keeps the expected case counts per surface', async () => {
    const definition = await loadSkillContractForgeEvalDefinition(repoRoot);
    const suites = buildPromptfooSuites(definition);

    expect(suites.contract).toHaveLength(12);
    expect(suites.upliftWithSkill).toHaveLength(8);
    expect(suites.upliftWithoutSkill).toHaveLength(8);
  });

  it('produces YAML that parses to the checked-in suite structures', async () => {
    const definition = await loadSkillContractForgeEvalDefinition(repoRoot);
    const rendered = renderPromptfooSuites(definition);

    const [checkedInContract, checkedInUpliftWithSkill, checkedInUpliftWithoutSkill] = await Promise.all([
      readFile(contractSuitePath, 'utf8'),
      readFile(upliftWithSkillSuitePath, 'utf8'),
      readFile(upliftWithoutSkillSuitePath, 'utf8'),
    ]);

    expect(parse(rendered.contract)).toEqual(parse(checkedInContract));
    expect(parse(rendered.upliftWithSkill)).toEqual(parse(checkedInUpliftWithSkill));
    expect(parse(rendered.upliftWithoutSkill)).toEqual(parse(checkedInUpliftWithoutSkill));
  });
});

describe('syncPromptfooSuites', () => {
  it('fails in check mode when suite files drift from evals.json', async () => {
    const rootDir = await mkdtemp(resolve(tmpdir(), 'skill-contract-forge-sync-'));
    const datasetContent = await readFile(datasetPath, 'utf8');

    await mkdir(resolve(rootDir, 'packs/core/skill-contract-forge/evals'), { recursive: true });
    await mkdir(resolve(rootDir, 'evals/engines/promptfoo/tests'), { recursive: true });

    await writeFile(resolve(rootDir, 'packs/core/skill-contract-forge/evals/evals.json'), datasetContent, 'utf8');

    await syncPromptfooSuites({
      rootDir,
      check: false,
      logger: () => {},
    });

    await writeFile(resolve(rootDir, 'evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml'), '# drift\n');

    await expect(
      syncPromptfooSuites({
        rootDir,
        check: true,
        logger: () => {},
      }),
    ).rejects.toThrow(/Promptfoo suite drift detected/);
  });

  it('treats CRLF and LF suite files as in sync when the YAML content is the same', async () => {
    const rootDir = await mkdtemp(resolve(tmpdir(), 'skill-contract-forge-sync-'));
    const datasetContent = await readFile(datasetPath, 'utf8');

    await mkdir(resolve(rootDir, 'packs/core/skill-contract-forge/evals'), { recursive: true });
    await mkdir(resolve(rootDir, 'evals/engines/promptfoo/tests'), { recursive: true });

    await writeFile(resolve(rootDir, 'packs/core/skill-contract-forge/evals/evals.json'), datasetContent, 'utf8');

    await syncPromptfooSuites({
      rootDir,
      check: false,
      logger: () => {},
    });

    const contractPath = resolve(rootDir, 'evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml');
    const upliftWithSkillPath = resolve(rootDir, 'evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml');
    const upliftWithoutSkillPath = resolve(
      rootDir,
      'evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml',
    );

    const [contractContent, upliftWithSkillContent, upliftWithoutSkillContent] = await Promise.all([
      readFile(contractPath, 'utf8'),
      readFile(upliftWithSkillPath, 'utf8'),
      readFile(upliftWithoutSkillPath, 'utf8'),
    ]);

    await Promise.all([
      writeFile(contractPath, contractContent.replace(/\n/g, '\r\n'), 'utf8'),
      writeFile(upliftWithSkillPath, upliftWithSkillContent.replace(/\n/g, '\r\n'), 'utf8'),
      writeFile(upliftWithoutSkillPath, upliftWithoutSkillContent.replace(/\n/g, '\r\n'), 'utf8'),
    ]);

    await expect(
      syncPromptfooSuites({
        rootDir,
        check: true,
        logger: () => {},
      }),
    ).resolves.toBeUndefined();
  });
});
