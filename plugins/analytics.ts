// plugins/analytics
export function analyticsInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function analyticsRun(value: unknown): boolean {
  return value != null;
}
