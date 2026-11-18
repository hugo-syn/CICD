import { expect, test } from "bun:test";
import { memoryInit, memoryRun } from "./memory";

test("memoryInit", () => expect(typeof memoryInit("  X ")).toBe("string"));
test("memoryRun", () => expect(memoryRun(1)).toBe(true));
