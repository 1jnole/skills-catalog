import * as fs from 'node:fs';
import * as path from 'node:path';

import {
  caseGradingArtifactSchema,
  caseModeOutputArtifactSchema,
  caseTimingArtifactSchema,
} from '../../domain/schemas/run-artifact.schema.js';
import { type EvalCase } from '../../domain/types/eval-case.types.js';
import { type CaseArtifacts } from '../../domain/types/run.types.js';
import { readValidatedJsonFile } from '../../shared/json.js';

function resolveCaseArtifactPaths(caseDir: string) {
  return {
    timing: path.join(caseDir, 'timing.json'),
    grading: path.join(caseDir, 'grading.json'),
    feedback: path.join(caseDir, 'feedback.json'),
    withSkillOutput: path.join(caseDir, 'outputs', 'with_skill.json'),
    withoutSkillOutput: path.join(caseDir, 'outputs', 'without_skill.json'),
  };
}

export function readLegacyCaseArtifactsIfComplete(caseDir: string, caseDefinition: EvalCase): CaseArtifacts | null {
  const artifactPaths = resolveCaseArtifactPaths(caseDir);
  const requiredPaths = [
    artifactPaths.timing,
    artifactPaths.grading,
    artifactPaths.feedback,
    artifactPaths.withSkillOutput,
    artifactPaths.withoutSkillOutput,
  ];

  if (requiredPaths.some((filePath) => !fs.existsSync(filePath))) {
    return null;
  }

  const timing = readValidatedJsonFile(artifactPaths.timing, caseTimingArtifactSchema);
  const grading = readValidatedJsonFile(artifactPaths.grading, caseGradingArtifactSchema);
  const withSkillOutput = readValidatedJsonFile(artifactPaths.withSkillOutput, caseModeOutputArtifactSchema);
  const withoutSkillOutput = readValidatedJsonFile(artifactPaths.withoutSkillOutput, caseModeOutputArtifactSchema);

  return {
    case_id: caseDefinition.id,
    expected_stop: caseDefinition.stop_at,
    should_trigger: caseDefinition.should_trigger,
    with_skill: {
      status: withSkillOutput.status,
      duration_ms: timing.with_skill,
      score: grading.with_skill.score,
      passed: grading.with_skill.passed,
      provider: withSkillOutput.status === 'completed' ? withSkillOutput.provider : undefined,
      model: withSkillOutput.status === 'completed' ? withSkillOutput.model : undefined,
      usage: withSkillOutput.status === 'completed' ? withSkillOutput.usage : undefined,
      error: withSkillOutput.status === 'error' ? withSkillOutput.error : undefined,
    },
    without_skill: {
      status: withoutSkillOutput.status,
      duration_ms: timing.without_skill,
      score: grading.without_skill.score,
      passed: grading.without_skill.passed,
      provider: withoutSkillOutput.status === 'completed' ? withoutSkillOutput.provider : undefined,
      model: withoutSkillOutput.status === 'completed' ? withoutSkillOutput.model : undefined,
      usage: withoutSkillOutput.status === 'completed' ? withoutSkillOutput.usage : undefined,
      error: withoutSkillOutput.status === 'error' ? withoutSkillOutput.error : undefined,
    },
  };
}
