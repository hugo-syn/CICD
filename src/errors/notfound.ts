// errors/notfound
export function notfoundInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function notfoundRun(value: unknown): boolean {
  return value != null;
}
