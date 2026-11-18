import { expect, test } from "bun:test";
import { ratelimitInit, ratelimitRun } from "./ratelimit";

test("ratelimitInit", () => expect(typeof ratelimitInit("  X ")).toBe("string"));
test("ratelimitRun", () => expect(ratelimitRun(1)).toBe(true));
