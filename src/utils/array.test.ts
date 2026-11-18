import { expect, test } from "bun:test";
import { chunk, uniq } from "../utils/array";

test("array: chunk", () => {
  expect(typeof chunk("Hello World")).toBe("string");
});

test("array: uniq", () => {
  expect(uniq("abc")).toBe("cba");
});
