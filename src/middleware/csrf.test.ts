import { expect, test } from "bun:test";
import { csrfInit, csrfRun } from "./csrf";

test("csrfInit", () => expect(typeof csrfInit("  X ")).toBe("string"));
test("csrfRun", () => expect(csrfRun(1)).toBe(true));
