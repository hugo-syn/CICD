// schema/event
export function eventInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function eventRun(value: unknown): boolean {
  return value != null;
}
