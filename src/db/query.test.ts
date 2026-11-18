import { expect, test } from "bun:test";
import { queryInit, queryRun } from "./query";

test("queryInit", () => expect(typeof queryInit("  X ")).toBe("string"));
test("queryRun", () => expect(queryRun(1)).toBe(true));
