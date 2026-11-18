import { expect, test } from "bun:test";
import { baseInit, baseRun } from "./base";

test("baseInit", () => expect(typeof baseInit("  X ")).toBe("string"));
test("baseRun", () => expect(baseRun(1)).toBe(true));
