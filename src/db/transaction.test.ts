import { expect, test } from "bun:test";
import { transactionInit, transactionRun } from "./transaction";

test("transactionInit", () => expect(typeof transactionInit("  X ")).toBe("string"));
test("transactionRun", () => expect(transactionRun(1)).toBe(true));
