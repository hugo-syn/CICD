// http/request
export function requestInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function requestRun(value: unknown): boolean {
  return value != null;
}
