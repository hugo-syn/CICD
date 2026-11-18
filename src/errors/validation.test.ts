import { expect, test } from "bun:test";
import { validationInit, validationRun } from "./validation";

test("validationInit", () => expect(typeof validationInit("  X ")).toBe("string"));
test("validationRun", () => expect(validationRun(1)).toBe(true));
