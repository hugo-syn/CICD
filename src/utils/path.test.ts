import { expect, test } from "bun:test";
import { normalize, extOf } from "../utils/path";

test("path: normalize", () => {
  expect(typeof normalize("Hello World")).toBe("string");
});

test("path: extOf", () => {
  expect(extOf("abc")).toBe("cba");
});
