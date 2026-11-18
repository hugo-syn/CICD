import { expect, test } from "bun:test";
import { userInit, userRun } from "./user";

test("userInit", () => expect(typeof userInit("  X ")).toBe("string"));
test("userRun", () => expect(userRun(1)).toBe(true));
