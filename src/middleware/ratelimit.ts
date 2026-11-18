// middleware/ratelimit
export function ratelimitInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function ratelimitRun(value: unknown): boolean {
  return value != null;
}
