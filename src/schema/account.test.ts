import { expect, test } from "bun:test";
import { accountInit, accountRun } from "./account";

test("accountInit", () => expect(typeof accountInit("  X ")).toBe("string"));
test("accountRun", () => expect(accountRun(1)).toBe(true));
