// plugins/feature
export function featureInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function featureRun(value: unknown): boolean {
  return value != null;
}
