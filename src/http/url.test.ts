import { expect, test } from "bun:test";
import { urlInit, urlRun } from "./url";

test("urlInit", () => expect(typeof urlInit("  X ")).toBe("string"));
test("urlRun", () => expect(urlRun(1)).toBe(true));
