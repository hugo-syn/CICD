// errors/base
export function baseInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function baseRun(value: unknown): boolean {
  return value != null;
}
