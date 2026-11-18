import { expect, test } from "bun:test";

// Plain smoke tests living in a tests/ directory — proves the harness runs.
test("numbers are sane", () => {
  expect(1 + 1).toBe(2);
});

test("strings compare", () => {
  expect("bun".toUpperCase()).toBe("BUN");
});
