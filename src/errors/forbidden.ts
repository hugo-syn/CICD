// errors/forbidden
export function forbiddenInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function forbiddenRun(value: unknown): boolean {
  return value != null;
}
