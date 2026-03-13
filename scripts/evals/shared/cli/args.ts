export function readNextArg(argv: string[], index: number, flag: string): string {
  const value = argv[index + 1];
  if (!value || value.startsWith('--')) {
    throw new Error(`Missing value for ${flag}`);
  }
  return value;
}

export function parsePositiveInteger(value: string, flag: string): number {
  if (!/^[1-9]\d*$/.test(value)) {
    throw new Error(`Invalid ${flag} value: ${value}`);
  }

  return Number.parseInt(value, 10);
}
