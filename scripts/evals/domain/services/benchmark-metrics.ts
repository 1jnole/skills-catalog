export function roundToTwo(value: number): number {
  return Number(value.toFixed(2));
}

export function safeRate(numerator: number, denominator: number): number {
  if (denominator === 0) {
    return 0;
  }

  return roundToTwo(numerator / denominator);
}

export function safeAverage(total: number, count: number): number {
  if (count === 0) {
    return 0;
  }

  return roundToTwo(total / count);
}

export function safeAverageDuration(totalDurationMs: number, count: number): number {
  if (count === 0) {
    return 0;
  }

  return Math.round(totalDurationMs / count);
}
