// schema/token
export function tokenInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function tokenRun(value: unknown): boolean {
  return value != null;
}
