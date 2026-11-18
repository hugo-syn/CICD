// cache/lru
export function lruInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function lruRun(value: unknown): boolean {
  return value != null;
}
