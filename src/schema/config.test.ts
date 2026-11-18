import { expect, test } from "bun:test";
import { configInit, configRun } from "./config";

test("configInit", () => expect(typeof configInit("  X ")).toBe("string"));
test("configRun", () => expect(configRun(1)).toBe(true));
