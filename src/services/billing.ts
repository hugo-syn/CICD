import { ok, type Result } from "../lib/result";
export async function billingAction(): Promise<Result<boolean>> {
  return ok(true);
}
