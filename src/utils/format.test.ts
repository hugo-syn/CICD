import { expect, test } from "bun:test";
import { titleCase, reverse } from "../utils/format";

test("format: titleCase", () => {
  expect(typeof titleCase("Hello World")).toBe("string");
});

test("format: reverse", () => {
  expect(reverse("abc")).toBe("cba");
});
