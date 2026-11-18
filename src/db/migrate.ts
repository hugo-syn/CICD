// db/migrate
export function migrateInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function migrateRun(value: unknown): boolean {
  return value != null;
}
