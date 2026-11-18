// schema/config
export function configInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function configRun(value: unknown): boolean {
  return value != null;
}
