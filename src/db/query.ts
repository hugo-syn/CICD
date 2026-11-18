// db/query
export function queryInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function queryRun(value: unknown): boolean {
  return value != null;
}
