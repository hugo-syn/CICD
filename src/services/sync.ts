import { ok, type Result } from "../lib/result";
export async function syncAction(): Promise<Result<boolean>> {
  return ok(true);
}
