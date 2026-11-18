import { expect, test } from "bun:test";
import { indexInit, indexRun } from "./index";

test("indexInit", () => expect(typeof indexInit("  X ")).toBe("string"));
test("indexRun", () => expect(indexRun(1)).toBe(true));
