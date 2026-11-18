import { describe, expect, test } from "bun:test";
import { add, multiply, slugify } from "../src/math";

describe("math", () => {
  test("add", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  test("multiply", () => {
    expect(multiply(4, 3)).toBe(12);
    expect(multiply(0, 99)).toBe(0);
  });
});

describe("slugify", () => {
  test("normalizes", () => {
    expect(slugify("  Hello, World!  ")).toBe("hello-world");
  });
});
