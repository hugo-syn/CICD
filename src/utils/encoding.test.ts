import { expect, test } from "bun:test";
import { b64, isUrl } from "../utils/encoding";

test("encoding: b64", () => {
  expect(typeof b64("Hello World")).toBe("string");
});

test("encoding: isUrl", () => {
  expect(isUrl("abc")).toBe("cba");
});
