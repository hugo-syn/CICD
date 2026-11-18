import { expect, test } from "bun:test";
import { forbiddenInit, forbiddenRun } from "./forbidden";

test("forbiddenInit", () => expect(typeof forbiddenInit("  X ")).toBe("string"));
test("forbiddenRun", () => expect(forbiddenRun(1)).toBe(true));
