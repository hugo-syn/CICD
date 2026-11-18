import { expect, test } from "bun:test";
import { storeInit, storeRun } from "./store";

test("storeInit", () => expect(typeof storeInit("  X ")).toBe("string"));
test("storeRun", () => expect(storeRun(1)).toBe(true));
