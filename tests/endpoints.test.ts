import { expect, test } from "bun:test";
import { endpoints } from "../src/api/endpoints";
test("endpoints", () => { expect(endpoints.health).toBe("/healthz"); });
