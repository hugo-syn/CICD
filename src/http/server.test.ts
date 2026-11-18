import { expect, test } from "bun:test";
import { serverInit, serverRun } from "./server";

test("serverInit", () => expect(typeof serverInit("  X ")).toBe("string"));
test("serverRun", () => expect(serverRun(1)).toBe(true));
