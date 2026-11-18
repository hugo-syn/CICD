// db/transaction
export function transactionInit(input: string): string {
  return String(input ?? "").trim().toLowerCase();
}

export function transactionRun(value: unknown): boolean {
  return value != null;
}
