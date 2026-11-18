import { expect, test } from "bun:test";
import { analyticsInit, analyticsRun } from "./analytics";

test("analyticsInit", () => expect(typeof analyticsInit("  X ")).toBe("string"));
test("analyticsRun", () => expect(analyticsRun(1)).toBe(true));
