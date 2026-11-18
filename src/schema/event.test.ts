import { expect, test } from "bun:test";
import { eventInit, eventRun } from "./event";

test("eventInit", () => expect(typeof eventInit("  X ")).toBe("string"));
test("eventRun", () => expect(eventRun(1)).toBe(true));
