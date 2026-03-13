export const supportedEvalCaseModes = ['with_skill', 'without_skill'] as const;
export type EvalCaseMode = (typeof supportedEvalCaseModes)[number];

export const supportedStrongerModes = ['with_skill', 'without_skill', 'tie'] as const;
export type StrongerMode = (typeof supportedStrongerModes)[number];

export const baselineComparisonIntent = 'with_skill_vs_without_skill' as const;
