import { expect, test } from "bun:test";
import { lruInit, lruRun } from "./lru";

test("lruInit", () => expect(typeof lruInit("  X ")).toBe("string"));
test("lruRun", () => expect(lruRun(1)).toBe(true));
