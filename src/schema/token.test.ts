import { expect, test } from "bun:test";
import { tokenInit, tokenRun } from "./token";

test("tokenInit", () => expect(typeof tokenInit("  X ")).toBe("string"));
test("tokenRun", () => expect(tokenRun(1)).toBe(true));
