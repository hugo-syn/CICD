import { expect, test } from "bun:test";
import { compressionInit, compressionRun } from "./compression";

test("compressionInit", () => expect(typeof compressionInit("  X ")).toBe("string"));
test("compressionRun", () => expect(compressionRun(1)).toBe(true));
