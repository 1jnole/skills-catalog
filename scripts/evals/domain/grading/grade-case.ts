import {
  type EvalCaseAssertionRule,
} from '../eval-case/eval-case.types.js';
import {
  type CaseGrading,
  type GradeCaseInput,
  type GradingCaseDefinition,
  type GradingError,
} from './grading.types.js';

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

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasMarker(text: string, marker: string): boolean {
  const pattern = new RegExp(`(^|[^a-z0-9_-])${escapeRegex(marker)}($|[^a-z0-9_-])`);
  return pattern.test(text);
}

function extractKeywords(text: string): string[] {
  const matches = text.toLowerCase().match(/[a-z][a-z0-9_-]{2,}/g) ?? [];
  const filtered = matches.filter((token) => !STOPWORDS.has(token));
  return [...new Set(filtered)].slice(0, 6);
}

function includesAny(text: string, markers: string[]): string[] {
  return markers.filter((marker) => hasMarker(text, marker));
}

function includesAll(text: string, markers: string[]): boolean {
  return markers.every((marker) => hasMarker(text, marker));
}

function formatMarkers(markers: string[]): string {
  return markers.join(', ');
}

function createAssertionCheck(params: {
  passed: boolean;
  evidence: string;
}): CaseGrading['checks'][number] {
  return {
    label: 'Assertion',
    status: params.passed ? 'PASS' : 'FAIL',
    evidence: params.evidence,
  };
}

function evaluateBoundary(caseDefinition: GradingCaseDefinition, output: string): CaseGrading['checks'][number] {
  const normalizedOutput = normalizeText(output);

  if (caseDefinition.should_trigger) {
    const markers = includesAny(normalizedOutput, ['classification: trigger', 'eval brief ready']);
    const passed = markers.length === 2 || hasMarker(normalizedOutput, 'eval brief ready');
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

function resolveAssertionRule(caseDefinition: GradingCaseDefinition, index: number): EvalCaseAssertionRule | null {
  const assertionRules = caseDefinition.grading?.assertion_rules;
  if (!assertionRules) {
    return null;
  }

  return assertionRules[index] ?? null;
}

function evaluatePresentAssertionRule(rule: EvalCaseAssertionRule, matchedMarkers: string[]): CaseGrading['checks'][number] {
  const missingMarkers = rule.markers.filter((marker) => !matchedMarkers.includes(marker));
  const passed = missingMarkers.length === 0;

  return createAssertionCheck({
    passed,
    evidence: passed
      ? `Matched markers: ${formatMarkers(matchedMarkers)}`
      : `Missing markers: ${formatMarkers(missingMarkers)}`,
  });
}

function evaluateAbsentAssertionRule(rule: EvalCaseAssertionRule, matchedMarkers: string[]): CaseGrading['checks'][number] {
  const passed = matchedMarkers.length === 0;

  return createAssertionCheck({
    passed,
    evidence: passed
      ? `Confirmed absence of markers: ${formatMarkers(rule.markers)}`
      : `Unexpected markers present: ${formatMarkers(matchedMarkers)}`,
  });
}

function evaluateAssertionRule(rule: EvalCaseAssertionRule, output: string): CaseGrading['checks'][number] {
  const normalizedOutput = normalizeText(output);
  const matchedMarkers = includesAny(normalizedOutput, rule.markers);

  if (rule.absent === true) {
    return evaluateAbsentAssertionRule(rule, matchedMarkers);
  }

  return evaluatePresentAssertionRule(rule, matchedMarkers);
}

function evaluateAssertion(
  assertion: string,
  output: string,
  index: number,
  caseDefinition: GradingCaseDefinition,
): CaseGrading['checks'][number] {
  const assertionRule = resolveAssertionRule(caseDefinition, index);
  if (assertionRule) {
    return {
      ...evaluateAssertionRule(assertionRule, output),
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

export function gradeCase(params: GradeCaseInput): CaseGrading {
  const checks = [
    evaluateBoundary(params.caseDefinition, params.output),
    ...params.caseDefinition.assertions.map((assertion, index) =>
      evaluateAssertion(assertion, params.output, index, params.caseDefinition),
    ),
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
  caseDefinition: GradingCaseDefinition;
  mode: GradeCaseInput['mode'];
  error: GradingError;
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

