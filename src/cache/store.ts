// cache/store
export function storeInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function storeRun(value: unknown): boolean {
  return value != null;
}
