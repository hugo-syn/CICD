import { expect, test } from "bun:test";
import { responseInit, responseRun } from "./response";

test("responseInit", () => expect(typeof responseInit("  X ")).toBe("string"));
test("responseRun", () => expect(responseRun(1)).toBe(true));
