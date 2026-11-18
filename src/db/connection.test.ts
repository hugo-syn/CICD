import { expect, test } from "bun:test";
import { connectionInit, connectionRun } from "./connection";

test("connectionInit", () => expect(typeof connectionInit("  X ")).toBe("string"));
test("connectionRun", () => expect(connectionRun(1)).toBe(true));
