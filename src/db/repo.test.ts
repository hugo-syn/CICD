import { expect, test } from "bun:test";
import { repoInit, repoRun } from "./repo";

test("repoInit", () => expect(typeof repoInit("  X ")).toBe("string"));
test("repoRun", () => expect(repoRun(1)).toBe(true));
