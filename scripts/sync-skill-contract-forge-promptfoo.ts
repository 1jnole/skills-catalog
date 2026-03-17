import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { z } from 'zod';
import { stringify } from 'yaml';

const promptfooSyncEntryPattern =
  /(?:^|[\\/])sync-skill-contract-forge-promptfoo\.(?:ts|js|mts|cts)$/i;

const skillPromptPath = 'file://../../../packs/core/skill-contract-forge/SKILL.md';
const evalBriefSchemaPath = 'file://evals/contracts/skill-contract-forge/eval-brief-output.schema.json';

const surfaceSchema = z.enum(['contract', 'uplift.with_skill', 'uplift.without_skill']);
const promptfooSurfaceSchema = z.object({
  assert: z.array(z.unknown()).min(1),
});

function normalizeLineEndings(value: string) {
  return value.replace(/\r\n/g, '\n');
}

const evalCaseSchema = z
  .object({
    id: z.string().min(1),
    case_bucket: z.string().min(1),
    surfaces: z.array(surfaceSchema).min(1),
    prompt: z.string().min(1),
    expected_output: z.string().min(1),
    should_trigger: z.boolean(),
    stop_at: z.string().min(1),
    assertions: z.array(z.string()).default([]),
    files: z.array(z.string()).default([]),
    grading: z.unknown().optional(),
    promptfoo: z
      .object({
        contract: promptfooSurfaceSchema.optional(),
        uplift_with_skill: promptfooSurfaceSchema.optional(),
      })
      .strict()
      .default({}),
  })
  .superRefine((value, ctx) => {
    const uniqueSurfaces = new Set(value.surfaces);

    if (uniqueSurfaces.size !== value.surfaces.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Case "${value.id}" contains duplicate surface entries.`,
      });
    }

    if (uniqueSurfaces.has('contract') && value.promptfoo.contract === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Case "${value.id}" must define promptfoo.contract when it targets the contract surface.`,
      });
    }

    if (!uniqueSurfaces.has('contract') && value.promptfoo.contract !== undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Case "${value.id}" defines promptfoo.contract without targeting the contract surface.`,
      });
    }

    if (uniqueSurfaces.has('uplift.with_skill') && value.promptfoo.uplift_with_skill === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Case "${value.id}" must define promptfoo.uplift_with_skill when it targets the uplift.with_skill surface.`,
      });
    }

    if (!uniqueSurfaces.has('uplift.with_skill') && value.promptfoo.uplift_with_skill !== undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Case "${value.id}" defines promptfoo.uplift_with_skill without targeting the uplift.with_skill surface.`,
      });
    }
  });

const evalDefinitionSchema = z
  .object({
    skill_name: z.literal('skill-contract-forge'),
    eval_version: z.number().int().positive(),
    purpose: z.string().min(1),
    comparison_intent: z.record(z.string(), z.unknown()),
    scoring: z.record(z.string(), z.unknown()),
    gates: z.record(z.string(), z.unknown()),
    golden: z.array(evalCaseSchema),
    negative: z.array(evalCaseSchema),
  })
  .superRefine((value, ctx) => {
    const seen = new Set<string>();

    for (const testCase of [...value.golden, ...value.negative]) {
      if (seen.has(testCase.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate case id "${testCase.id}" detected in evals.json.`,
        });
        continue;
      }

      seen.add(testCase.id);
    }
  });

type SkillContractForgeEvalDefinition = z.infer<typeof evalDefinitionSchema>;
type SkillContractForgeEvalCase = z.infer<typeof evalCaseSchema>;

type PromptfooSuiteCase = {
  description: string;
  vars: {
    skill_prompt: string;
    case_id: string;
    prompt: string;
    expected_stop: string;
    should_trigger: boolean;
  };
  metadata: {
    skill_name: string;
    case_bucket: string;
    expected_stop: string;
  };
  assert: unknown[];
};

type RenderedPromptfooSuites = {
  contract: string;
  upliftWithSkill: string;
  upliftWithoutSkill: string;
};

function getDefinitionPath(rootDir: string) {
  return resolve(rootDir, 'packs/core/skill-contract-forge/evals/evals.json');
}

function getContractSuitePath(rootDir: string) {
  return resolve(rootDir, 'evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml');
}

function getUpliftWithSkillSuitePath(rootDir: string) {
  return resolve(rootDir, 'evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml');
}

function getUpliftWithoutSkillSuitePath(rootDir: string) {
  return resolve(rootDir, 'evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml');
}

function buildBaselineAssertions() {
  return [
    {
      type: 'assert-set',
      metric: 'baseline_surface',
      threshold: 1,
      assert: [
        {
          type: 'not-icontains',
          metric: 'no_classification_header',
          value: 'Classification:',
        },
        {
          type: 'not-icontains',
          metric: 'no_trigger_header',
          value: 'Classification: trigger',
        },
        {
          type: 'not-icontains',
          metric: 'no_workflow_header',
          value: 'Workflow:',
        },
        {
          type: 'not-icontains',
          metric: 'no_terminal_marker',
          value: 'Eval Brief ready',
        },
        {
          type: 'not-icontains',
          metric: 'no_contract_authoring_key',
          value: '"authoring"',
        },
        {
          type: 'not-icontains',
          metric: 'no_contract_success_model_key',
          value: '"successModel"',
        },
        {
          type: 'not-icontains',
          metric: 'no_contract_activation_probes_key',
          value: '"activationProbes"',
        },
        {
          type: 'not-icontains',
          metric: 'no_contract_negative_signals_key',
          value: '"negativeSignals"',
        },
        {
          type: 'not-icontains',
          metric: 'no_contract_source_refs_key',
          value: '"sourceRefs"',
        },
      ],
    },
  ];
}

function createPromptfooSuiteCase(
  definition: SkillContractForgeEvalDefinition,
  testCase: SkillContractForgeEvalCase,
  expectedStop: string,
  shouldTrigger: boolean,
  assertions: unknown[],
): PromptfooSuiteCase {
  return {
    description: testCase.id,
    vars: {
      skill_prompt: skillPromptPath,
      case_id: testCase.id,
      prompt: testCase.prompt,
      expected_stop: expectedStop,
      should_trigger: shouldTrigger,
    },
    metadata: {
      skill_name: definition.skill_name,
      case_bucket: testCase.case_bucket,
      expected_stop: expectedStop,
    },
    assert: assertions,
  };
}

function getAllCases(definition: SkillContractForgeEvalDefinition) {
  return [...definition.golden, ...definition.negative];
}

export function parseSkillContractForgeEvalDefinition(
  value: unknown,
): SkillContractForgeEvalDefinition {
  return evalDefinitionSchema.parse(value);
}

export async function loadSkillContractForgeEvalDefinition(
  rootDir: string,
): Promise<SkillContractForgeEvalDefinition> {
  const definitionPath = getDefinitionPath(rootDir);
  const raw = await readFile(definitionPath, 'utf8');
  return parseSkillContractForgeEvalDefinition(JSON.parse(raw));
}

export function buildPromptfooSuites(definition: SkillContractForgeEvalDefinition) {
  const cases = getAllCases(definition);

  const contract = cases
    .filter((testCase) => testCase.surfaces.includes('contract'))
    .map((testCase) =>
      createPromptfooSuiteCase(
        definition,
        testCase,
        testCase.stop_at,
        testCase.should_trigger,
        testCase.promptfoo.contract!.assert,
      ),
    );

  const upliftWithSkill = cases
    .filter((testCase) => testCase.surfaces.includes('uplift.with_skill'))
    .map((testCase) =>
      createPromptfooSuiteCase(
        definition,
        testCase,
        testCase.stop_at,
        testCase.should_trigger,
        testCase.promptfoo.uplift_with_skill!.assert,
      ),
    );

  const upliftWithoutSkill = cases
    .filter((testCase) => testCase.surfaces.includes('uplift.without_skill'))
    .map((testCase) =>
      createPromptfooSuiteCase(definition, testCase, 'baseline_only', false, buildBaselineAssertions()),
    );

  return {
    contract,
    upliftWithSkill,
    upliftWithoutSkill,
  };
}

function formatPromptfooSuite(cases: PromptfooSuiteCase[]) {
  return `${stringify(cases, {
    indent: 2,
    lineWidth: 0,
  })}`.trimEnd() + '\n';
}

export function renderPromptfooSuites(
  definition: SkillContractForgeEvalDefinition,
): RenderedPromptfooSuites {
  const suites = buildPromptfooSuites(definition);

  return {
    contract: formatPromptfooSuite(suites.contract),
    upliftWithSkill: formatPromptfooSuite(suites.upliftWithSkill),
    upliftWithoutSkill: formatPromptfooSuite(suites.upliftWithoutSkill),
  };
}

type SyncOptions = {
  rootDir?: string;
  check?: boolean;
  logger?: (message: string) => void;
};

export async function syncPromptfooSuites({
  rootDir = process.cwd(),
  check = false,
  logger = console.log,
}: SyncOptions = {}) {
  const definition = await loadSkillContractForgeEvalDefinition(rootDir);
  const renderedSuites = renderPromptfooSuites(definition);

  const suiteTargets = [
    {
      label: 'contract',
      path: getContractSuitePath(rootDir),
      content: renderedSuites.contract,
    },
    {
      label: 'uplift.with_skill',
      path: getUpliftWithSkillSuitePath(rootDir),
      content: renderedSuites.upliftWithSkill,
    },
    {
      label: 'uplift.without_skill',
      path: getUpliftWithoutSkillSuitePath(rootDir),
      content: renderedSuites.upliftWithoutSkill,
    },
  ];

  if (check) {
    const driftedLabels: string[] = [];

    for (const target of suiteTargets) {
      const currentContent = await readFile(target.path, 'utf8');

      if (normalizeLineEndings(currentContent) !== normalizeLineEndings(target.content)) {
        driftedLabels.push(`${target.label}: ${target.path}`);
      }
    }

    if (driftedLabels.length > 0) {
      throw new Error(`Promptfoo suite drift detected:\n${driftedLabels.join('\n')}`);
    }

    logger('Promptfoo suites are in sync with packs/core/skill-contract-forge/evals/evals.json.');
    return;
  }

  for (const target of suiteTargets) {
    await writeFile(target.path, target.content, 'utf8');
    logger(`Synced ${target.label} -> ${target.path}`);
  }
}

export function isDirectPromptfooSyncEntry(executedScriptPath: string | undefined) {
  if (typeof executedScriptPath !== 'string') {
    return false;
  }

  return promptfooSyncEntryPattern.test(executedScriptPath);
}

if (isDirectPromptfooSyncEntry(process.argv[1])) {
  const check = process.argv.includes('--check');

  syncPromptfooSuites({ check })
    .catch((error: unknown) => {
      console.error(error);
      process.exitCode = 1;
    });
}
