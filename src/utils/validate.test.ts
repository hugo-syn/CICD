import { expect, test } from "bun:test";
import { isEmail, pluralize } from "../utils/validate";

test("validate: isEmail", () => {
  expect(typeof isEmail("Hello World")).toBe("string");
});

test("validate: pluralize", () => {
  expect(pluralize("abc")).toBe("cba");
});
