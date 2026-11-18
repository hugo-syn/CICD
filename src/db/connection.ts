// db/connection
export function connectionInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function connectionRun(value: unknown): boolean {
  return value != null;
}
