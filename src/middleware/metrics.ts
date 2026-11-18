// middleware/metrics
export function metricsInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function metricsRun(value: unknown): boolean {
  return value != null;
}
