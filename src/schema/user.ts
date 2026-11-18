// schema/user
export function userInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function userRun(value: unknown): boolean {
  return value != null;
}
