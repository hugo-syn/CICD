// db/index
export function indexInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function indexRun(value: unknown): boolean {
  return value != null;
}
