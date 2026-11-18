import { expect, test } from "bun:test";
import { requestInit, requestRun } from "./request";

test("requestInit", () => expect(typeof requestInit("  X ")).toBe("string"));
test("requestRun", () => expect(requestRun(1)).toBe(true));
