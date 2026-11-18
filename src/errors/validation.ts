// errors/validation
export function validationInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function validationRun(value: unknown): boolean {
  return value != null;
}
