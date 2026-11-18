import { expect, test } from "bun:test";
import { auditInit, auditRun } from "./audit";

test("auditInit", () => expect(typeof auditInit("  X ")).toBe("string"));
test("auditRun", () => expect(auditRun(1)).toBe(true));
