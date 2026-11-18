// http/server
export function serverInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function serverRun(value: unknown): boolean {
  return value != null;
}
