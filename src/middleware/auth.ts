// middleware/auth
export function authInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function authRun(value: unknown): boolean {
  return value != null;
}
