// http/server_sent
export function server_sentInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function server_sentRun(value: unknown): boolean {
  return value != null;
}
