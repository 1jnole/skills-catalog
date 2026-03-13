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

function normalizeText(value) {
  return String(value ?? '').toLowerCase();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasMarker(text, marker) {
  const pattern = new RegExp(`(^|[^a-z0-9_-])${escapeRegex(marker)}($|[^a-z0-9_-])`);
  return pattern.test(text);
}

function includesAny(text, markers) {
  return markers.filter((marker) => hasMarker(text, marker));
}

function includesAll(text, markers) {
  return markers.every((marker) => hasMarker(text, marker));
}

function extractKeywords(text) {
  const matches = String(text ?? '').toLowerCase().match(/[a-z][a-z0-9_-]{2,}/g) ?? [];
  const filtered = matches.filter((token) => !STOPWORDS.has(token));
  return [...new Set(filtered)].slice(0, 6);
}

function readVars(context) {
  return context?.vars ?? context?.testCase?.vars ?? {};
}

function readOutputText(output) {
  if (typeof output === 'string') {
    return output;
  }

  if (output && typeof output === 'object' && typeof output.output === 'string') {
    return output.output;
  }

  return String(output ?? '');
}

function readArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string' && value.length > 0) {
    return JSON.parse(value);
  }

  return [];
}

function createCheck(label, passed, evidence) {
  return {
    label,
    passed,
    evidence,
  };
}

function evaluateBoundary(vars, normalizedOutput) {
  if (vars.should_trigger === true || vars.should_trigger === 'true') {
    const markers = includesAny(normalizedOutput, ['classification: trigger', 'eval brief ready']);
    const passed = markers.length === 2 || hasMarker(normalizedOutput, 'eval brief ready');
    return createCheck(
      'Boundary stop condition',
      passed,
      passed
        ? `Matched trigger markers: ${markers.join(', ') || 'eval brief ready'}`
        : 'Missing trigger classification or "Eval Brief ready" marker for a trigger case.',
    );
  }

  if (vars.expected_stop === 'stop_and_ask') {
    const markers = includesAny(normalizedOutput, [
      'classification: stop-and-ask',
      'scope clarification required',
      'clarify',
      'narrow',
      'multiple workflows',
    ]);
    const passed = markers.length >= 2;
    return createCheck(
      'Clarification boundary',
      passed,
      passed
        ? `Matched clarification markers: ${markers.join(', ')}`
        : 'Missing clear clarification language for a stop-and-ask case.',
    );
  }

  const markers = includesAny(normalizedOutput, [
    'classification: non-trigger',
    'out of scope',
    'do not trigger',
    'not skill authoring',
    'belongs downstream',
  ]);
  const passed = markers.length >= 2 || includesAll(normalizedOutput, ['classification: non-trigger', 'out of scope']);
  return createCheck(
    'Non-trigger boundary',
    passed,
    passed
      ? `Matched non-trigger markers: ${markers.join(', ')}`
      : 'Missing clear non-trigger classification and out-of-scope language.',
  );
}

function evaluateAssertionRule(rule, normalizedOutput, label) {
  const matchedMarkers = includesAny(normalizedOutput, rule.markers);

  if (rule.absent === true) {
    const passed = matchedMarkers.length === 0;
    return createCheck(
      label,
      passed,
      passed
        ? `Confirmed absence of markers: ${rule.markers.join(', ')}`
        : `Unexpected markers present: ${matchedMarkers.join(', ')}`,
    );
  }

  const missingMarkers = rule.markers.filter((marker) => !matchedMarkers.includes(marker));
  const passed = missingMarkers.length === 0;
  return createCheck(
    label,
    passed,
    passed ? `Matched markers: ${matchedMarkers.join(', ')}` : `Missing markers: ${missingMarkers.join(', ')}`,
  );
}

function evaluateAssertion(assertion, index, vars, normalizedOutput) {
  const assertionRules = readArray(vars.assertion_rules_json ?? vars.assertion_rules);
  const rule = assertionRules[index] ?? null;
  const label = `Assertion ${index + 1}`;

  if (rule) {
    return evaluateAssertionRule(rule, normalizedOutput, label);
  }

  const keywords = extractKeywords(assertion);
  const matched = keywords.filter((keyword) => normalizedOutput.includes(keyword));
  const requiredMatches = Math.min(2, keywords.length === 0 ? 1 : keywords.length);
  const passed = matched.length >= requiredMatches;
  return createCheck(
    label,
    passed,
    passed
      ? `Matched keywords: ${matched.join(', ')}`
      : `Missing keywords. Matched ${matched.join(', ') || 'none'} from ${keywords.join(', ') || 'no-keywords'}`,
  );
}

function gradeSkillForgeCase(output, context) {
  const vars = readVars(context);
  const outputText = readOutputText(output);
  const normalizedOutput = normalizeText(outputText);
  const assertions = readArray(vars.assertions_json ?? vars.assertions);
  const threshold = Number(vars.case_score_threshold ?? 0.75);

  const checks = [
    evaluateBoundary(vars, normalizedOutput),
    ...assertions.map((assertion, index) => evaluateAssertion(assertion, index, vars, normalizedOutput)),
  ];

  const passedChecks = checks.filter((check) => check.passed).length;
  const score = checks.length === 0 ? 0 : Number((passedChecks / checks.length).toFixed(2));
  const failures = checks.filter((check) => !check.passed);
  const expectedPass = score >= threshold;

  return {
    pass: true,
    score,
    reason: failures.length === 0
      ? `Expected pass outcome satisfied at score ${score}.`
      : `Expected pass outcome = ${expectedPass}. ${failures.map((failure) => `${failure.label}: ${failure.evidence}`).join(' | ')}`,
    componentResults: checks.map((check) => ({
      pass: check.passed,
      score: check.passed ? 1 : 0,
      reason: `${check.label}: ${check.evidence}`,
    })),
  };
}

module.exports = {
  gradeSkillForgeCase,
};
