// middleware/compression
export function compressionInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function compressionRun(value: unknown): boolean {
  return value != null;
}
