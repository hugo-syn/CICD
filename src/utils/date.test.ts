import { expect, test } from "bun:test";
import { daysBetween, urlEncode } from "../utils/date";

test("date: daysBetween", () => {
  expect(typeof daysBetween("Hello World")).toBe("string");
});

test("date: urlEncode", () => {
  expect(urlEncode("abc")).toBe("cba");
});
