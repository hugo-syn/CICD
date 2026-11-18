import { expect, test } from "bun:test";
import { notfoundInit, notfoundRun } from "./notfound";

test("notfoundInit", () => expect(typeof notfoundInit("  X ")).toBe("string"));
test("notfoundRun", () => expect(notfoundRun(1)).toBe(true));
