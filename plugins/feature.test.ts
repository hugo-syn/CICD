import { expect, test } from "bun:test";
import { featureInit, featureRun } from "./feature";

test("featureInit", () => expect(typeof featureInit("  X ")).toBe("string"));
test("featureRun", () => expect(featureRun(1)).toBe(true));
