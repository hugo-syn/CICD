import { expect, test } from "bun:test";
import { routerInit, routerRun } from "./router";

test("routerInit", () => expect(typeof routerInit("  X ")).toBe("string"));
test("routerRun", () => expect(routerRun(1)).toBe(true));
