import { ok, type Result } from "../lib/result";
export async function notifyAction(): Promise<Result<boolean>> {
  return ok(true);
}
