// middleware/cors
export function corsInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function corsRun(value: unknown): boolean {
  return value != null;
}
