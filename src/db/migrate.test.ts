import { expect, test } from "bun:test";
import { migrateInit, migrateRun } from "./migrate";

test("migrateInit", () => expect(typeof migrateInit("  X ")).toBe("string"));
test("migrateRun", () => expect(migrateRun(1)).toBe(true));
