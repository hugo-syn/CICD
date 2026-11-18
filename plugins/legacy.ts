// plugins/legacy
export function legacyInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function legacyRun(value: unknown): boolean {
  return value != null;
}
