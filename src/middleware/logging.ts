// middleware/logging
export function loggingInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function loggingRun(value: unknown): boolean {
  return value != null;
}
