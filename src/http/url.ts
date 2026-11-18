// http/url
export function urlInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function urlRun(value: unknown): boolean {
  return value != null;
}
