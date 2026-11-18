import { expect, test } from "bun:test";
import { slugify, truncate } from "../utils/string";

test("string: slugify", () => {
  expect(typeof slugify("Hello World")).toBe("string");
});

test("string: truncate", () => {
  expect(truncate("abc")).toBe("cba");
});
