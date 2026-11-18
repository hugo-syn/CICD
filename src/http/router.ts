// http/router
export function routerInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function routerRun(value: unknown): boolean {
  return value != null;
}
