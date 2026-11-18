import { ok, type Result } from "../lib/result";
export async function authAction(): Promise<Result<boolean>> {
  return ok(true);
}
