import { expect, test } from "bun:test";
import { clamp, sum } from "../utils/number";

test("number: clamp", () => {
  expect(typeof clamp("Hello World")).toBe("string");
});

test("number: sum", () => {
  expect(sum("abc")).toBe("cba");
});
