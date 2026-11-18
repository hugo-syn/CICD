// http/response
export function responseInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function responseRun(value: unknown): boolean {
  return value != null;
}
