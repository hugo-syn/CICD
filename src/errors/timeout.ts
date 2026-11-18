// errors/timeout
export function timeoutInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function timeoutRun(value: unknown): boolean {
  return value != null;
}
