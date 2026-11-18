// schema/account
export function accountInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function accountRun(value: unknown): boolean {
  return value != null;
}
