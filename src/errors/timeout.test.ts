import { expect, test } from "bun:test";
import { timeoutInit, timeoutRun } from "./timeout";

test("timeoutInit", () => expect(typeof timeoutInit("  X ")).toBe("string"));
test("timeoutRun", () => expect(timeoutRun(1)).toBe(true));
