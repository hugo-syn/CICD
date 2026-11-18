// middleware/csrf
export function csrfInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function csrfRun(value: unknown): boolean {
  return value != null;
}
