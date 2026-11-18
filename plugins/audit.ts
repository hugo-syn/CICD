// plugins/audit
export function auditInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function auditRun(value: unknown): boolean {
  return value != null;
}
