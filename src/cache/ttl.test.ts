import { expect, test } from "bun:test";
import { ttlInit, ttlRun } from "./ttl";

test("ttlInit", () => expect(typeof ttlInit("  X ")).toBe("string"));
test("ttlRun", () => expect(ttlRun(1)).toBe(true));
