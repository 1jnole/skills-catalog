import * as fs from 'node:fs';
import * as path from 'node:path';

import { caseModeOutputArtifactSchema } from '../domain/schemas/run-artifact.schema.js';
import { type EvalCase, type EvalCaseMode } from '../domain/types/eval-case.types.js';
import { type ArtifactError, type CaseGrading, type CaseModeOutputArtifact } from '../domain/types/run-artifact.types.js';
import { writeValidatedJsonFile } from '../shared/json.js';

const STOPWORDS = new Set([
  'the',
  'and',
  'for',
  'that',
  'this',
  'with',
  'from',
  'into',
  'only',
  'must',
  'should',
  'before',
  'after',
  'when',
  'where',
  'keep',
  'does',
  'not',
  'avoid',
  'produce',
  'response',
  'request',
  'workflow',
]);

function normalizeText(value: string): string {
  return value.toLowerCase();
}

function extractKeywords(text: string): string[] {
  const matches = text.toLowerCase().match(/[a-z][a-z0-9_-]{2,}/g) ?? [];
  const filtered = matches.filter((token) => !STOPWORDS.has(token));
  return [...new Set(filtered)].slice(0, 6);
}

function includesAny(text: string, markers: string[]): string[] {
  return markers.filter((marker) => text.includes(marker));
}

function includesAll(text: string, markers: string[]): boolean {
  return markers.every((marker) => text.includes(marker));
}

function evaluateBoundary(caseDefinition: EvalCase, output: string): CaseGrading['checks'][number] {
  const normalizedOutput = normalizeText(output);

  if (caseDefinition.should_trigger) {
    const markers = includesAny(normalizedOutput, ['classification: trigger', 'eval brief ready']);
    const passed = markers.length === 2 || normalizedOutput.includes('eval brief ready');
    return {
      label: 'Boundary stop condition',
      status: passed ? 'PASS' : 'FAIL',
      evidence: passed
        ? `Matched trigger markers: ${markers.join(', ') || 'eval brief ready'}`
        : 'Missing trigger classification or "Eval Brief ready" marker for a trigger case.',
    };
  }

  if (caseDefinition.stop_at === 'stop_and_ask') {
    const markers = includesAny(normalizedOutput, ['classification: stop-and-ask', 'scope clarification required', 'clarify', 'narrow', 'multiple workflows']);
    const passed = markers.length >= 2;
    return {
      label: 'Clarification boundary',
      status: passed ? 'PASS' : 'FAIL',
      evidence: passed
        ? `Matched clarification markers: ${markers.join(', ')}`
        : 'Missing clear clarification language for a stop-and-ask case.',
    };
  }

  const markers = includesAny(normalizedOutput, ['classification: non-trigger', 'out of scope', 'do not trigger', 'not skill authoring', 'belongs downstream']);
  const passed = markers.length >= 2 || includesAll(normalizedOutput, ['classification: non-trigger', 'out of scope']);
  return {
    label: 'Non-trigger boundary',
    status: passed ? 'PASS' : 'FAIL',
    evidence: passed
      ? `Matched non-trigger markers: ${markers.join(', ')}`
      : 'Missing clear non-trigger classification and out-of-scope language.',
  };
}

function evaluateStructuredAssertion(assertion: string, output: string): CaseGrading['checks'][number] | null {
  const normalizedAssertion = normalizeText(assertion);
  const normalizedOutput = normalizeText(output);

  const structuredChecks: Array<{ match: (assertionText: string) => boolean; label: string; markers: string[]; mode: 'all' | 'any' | 'absent'; }> = [
    {
      match: (text) => text.includes('new-skill workflow'),
      label: 'Assertion',
      markers: ['workflow: new-skill'],
      mode: 'any',
    },
    {
      match: (text) => text.includes('existing-skill refactor workflow'),
      label: 'Assertion',
      markers: ['workflow: existing-skill-refactor'],
      mode: 'any',
    },
    {
      match: (text) => text.includes('skill rewrite request') || text.includes('skill-rewrite workflow'),
      label: 'Assertion',
      markers: ['workflow: skill-rewrite'],
      mode: 'any',
    },
    {
      match: (text) => text.includes('define the contract before final skill instructions'),
      label: 'Assertion',
      markers: ['contract', 'before', 'instructions'],
      mode: 'all',
    },
    {
      match: (text) => text.includes('preserve the contract-first refactor sequence') || text.includes('contract-first refactor sequence'),
      label: 'Assertion',
      markers: ['contract-first', 'refactor'],
      mode: 'all',
    },
    {
      match: (text) => text.includes('freeze contract elements before final instructions'),
      label: 'Assertion',
      markers: ['freeze', 'contract', 'before', 'instructions'],
      mode: 'all',
    },
    {
      match: (text) => text.includes('explicitly defer eval scaffold implementation'),
      label: 'Assertion',
      markers: ['downstream', 'out of scope'],
      mode: 'all',
    },
    {
      match: (text) => text.includes('must not invent runner, grading, or benchmark behavior'),
      label: 'Assertion',
      markers: ['runner', 'grading', 'benchmark'],
      mode: 'absent',
    },
    {
      match: (text) => text.includes('classify agents work as out of scope'),
      label: 'Assertion',
      markers: ['out of scope', 'agents'],
      mode: 'all',
    },
    {
      match: (text) => text.includes('classify runtime implementation as out of scope'),
      label: 'Assertion',
      markers: ['out of scope', 'runtime', 'implementation'],
      mode: 'all',
    },
    {
      match: (text) => text.includes('classify eval definition work as out of scope for skill-forge'),
      label: 'Assertion',
      markers: ['out of scope', 'downstream'],
      mode: 'all',
    },
    {
      match: (text) => text.includes('avoid producing an eval brief'),
      label: 'Assertion',
      markers: ['eval brief ready'],
      mode: 'absent',
    },
    {
      match: (text) => text.includes('detect multiple workflows in one request'),
      label: 'Assertion',
      markers: ['multiple', 'workflows'],
      mode: 'all',
    },
  ];

  const structuredCheck = structuredChecks.find((check) => check.match(normalizedAssertion));
  if (!structuredCheck) {
    return null;
  }

  const matched = includesAny(normalizedOutput, structuredCheck.markers);
  const passed = structuredCheck.mode === 'all'
    ? includesAll(normalizedOutput, structuredCheck.markers)
    : structuredCheck.mode === 'any'
      ? matched.length > 0
      : matched.length === 0;

  return {
    label: structuredCheck.label,
    status: passed ? 'PASS' : 'FAIL',
    evidence: passed
      ? structuredCheck.mode === 'absent'
        ? `Confirmed absence of markers: ${structuredCheck.markers.join(', ')}`
        : `Matched markers: ${structuredCheck.markers.filter((marker) => normalizedOutput.includes(marker)).join(', ') || structuredCheck.markers.join(', ')}`
      : structuredCheck.mode === 'absent'
        ? `Unexpected markers present: ${matched.join(', ') || structuredCheck.markers.join(', ')}`
        : `Missing markers: ${structuredCheck.markers.join(', ')}`,
  };
}

function evaluateAssertion(assertion: string, output: string, index: number): CaseGrading['checks'][number] {
  const structuredResult = evaluateStructuredAssertion(assertion, output);
  if (structuredResult) {
    return {
      ...structuredResult,
      label: `Assertion ${index + 1}`,
    };
  }

  const keywords = extractKeywords(assertion);
  const normalizedOutput = normalizeText(output);
  const matched = keywords.filter((keyword) => normalizedOutput.includes(keyword));
  const requiredMatches = Math.min(2, keywords.length === 0 ? 1 : keywords.length);
  const passed = matched.length >= requiredMatches;

  return {
    label: `Assertion ${index + 1}`,
    status: passed ? 'PASS' : 'FAIL',
    evidence: passed
      ? `Matched keywords: ${matched.join(', ')}`
      : `Missing keywords. Matched ${matched.join(', ') || 'none'} from ${keywords.join(', ') || 'no-keywords'}`,
  };
}

export function gradeCase(params: {
  caseDefinition: EvalCase;
  mode: EvalCaseMode;
  output: string;
  passingScoreThreshold: number;
}): CaseGrading {
  const checks = [
    evaluateBoundary(params.caseDefinition, params.output),
    ...params.caseDefinition.assertions.map((assertion, index) => evaluateAssertion(assertion, params.output, index)),
  ];
  const passedChecks = checks.filter((check) => check.status === 'PASS').length;
  const score = checks.length === 0 ? 0 : Number((passedChecks / checks.length).toFixed(2));

  return {
    case_id: params.caseDefinition.id,
    mode: params.mode,
    score,
    passed: score >= params.passingScoreThreshold,
    checks,
  };
}

export function createErroredCaseGrading(params: {
  caseDefinition: EvalCase;
  mode: EvalCaseMode;
  error: ArtifactError;
}): CaseGrading {
  return {
    case_id: params.caseDefinition.id,
    mode: params.mode,
    score: 0,
    passed: false,
    checks: [
      {
        label: 'Execution failure',
        status: 'FAIL',
        evidence: `${params.error.kind}: ${params.error.message}`,
      },
    ],
  };
}

export function writeCaseArtifacts(
  caseDir: string,
  mode: EvalCaseMode,
  payload: CaseModeOutputArtifact,
): CaseModeOutputArtifact {
  const outputPath = path.join(caseDir, 'outputs', `${mode}.json`);
  return writeValidatedJsonFile(outputPath, caseModeOutputArtifactSchema, payload);
}
