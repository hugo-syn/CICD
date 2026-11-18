// cache/memory
export function memoryInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function memoryRun(value: unknown): boolean {
  return value != null;
}
