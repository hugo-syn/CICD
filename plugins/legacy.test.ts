import { expect, test } from "bun:test";
import { legacyInit, legacyRun } from "./legacy";

test("legacyInit", () => expect(typeof legacyInit("  X ")).toBe("string"));
test("legacyRun", () => expect(legacyRun(1)).toBe(true));
