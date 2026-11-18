import { expect, test } from "bun:test";
import { authInit, authRun } from "./auth";

test("authInit", () => expect(typeof authInit("  X ")).toBe("string"));
test("authRun", () => expect(authRun(1)).toBe(true));
