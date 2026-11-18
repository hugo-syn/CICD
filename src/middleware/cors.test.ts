import { expect, test } from "bun:test";
import { corsInit, corsRun } from "./cors";

test("corsInit", () => expect(typeof corsInit("  X ")).toBe("string"));
test("corsRun", () => expect(corsRun(1)).toBe(true));
