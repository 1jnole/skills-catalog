import { collectCases, type EvalDefinition } from '../../domain/eval-definition/eval-definition.types.js';
import { type EvalCase, type EvalCaseMode } from '../../domain/eval-case/eval-case.types.js';

// Owns the platform-facing dataset shape derived from the local eval definition.
export type LaminarDatasetEntry = {
  caseId: EvalCase['id'];
  mode: EvalCaseMode;
  prompt: EvalCase['prompt'];
  expectedOutput: EvalCase['expected_output'];
  assertions: EvalCase['assertions'];
  files: EvalCase['files'];
  shouldTrigger: EvalCase['should_trigger'];
  expectedStop: EvalCase['stop_at'];
};

const laminarModes: EvalCaseMode[] = ['with_skill', 'without_skill'];

export function buildLaminarDatasetEntries(definition: EvalDefinition): LaminarDatasetEntry[] {
  return collectCases(definition).flatMap((testCase) =>
    laminarModes.map((mode) => ({
      caseId: testCase.id,
      mode,
      prompt: testCase.prompt,
      expectedOutput: testCase.expected_output,
      assertions: testCase.assertions,
      files: testCase.files,
      shouldTrigger: testCase.should_trigger,
      expectedStop: testCase.stop_at,
    })),
  );
}

