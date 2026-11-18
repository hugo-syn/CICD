import { expect, test } from "bun:test";
import { metricsInit, metricsRun } from "./metrics";

test("metricsInit", () => expect(typeof metricsInit("  X ")).toBe("string"));
test("metricsRun", () => expect(metricsRun(1)).toBe(true));
