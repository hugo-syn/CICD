import { expect, test } from "bun:test";
import { loggingInit, loggingRun } from "./logging";

test("loggingInit", () => expect(typeof loggingInit("  X ")).toBe("string"));
test("loggingRun", () => expect(loggingRun(1)).toBe(true));
