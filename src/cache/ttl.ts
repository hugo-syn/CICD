// cache/ttl
export function ttlInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function ttlRun(value: unknown): boolean {
  return value != null;
}
