import { expect, test } from "bun:test";
import { ok, err } from "../src/lib/result";
test("ok/err", () => { expect(ok(1).ok).toBe(true); expect(err(1).ok).toBe(false); });
