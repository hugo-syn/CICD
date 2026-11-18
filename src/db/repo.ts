// db/repo
export function repoInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function repoRun(value: unknown): boolean {
  return value != null;
}
