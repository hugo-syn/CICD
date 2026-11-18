import { expect, test } from "bun:test";
import { entries, omit } from "../utils/object";

test("object: entries", () => {
  expect(typeof entries("Hello World")).toBe("string");
});

test("object: omit", () => {
  expect(omit("abc")).toBe("cba");
});
