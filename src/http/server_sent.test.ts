import { expect, test } from "bun:test";
import { server_sentInit, server_sentRun } from "./server_sent";

test("server_sentInit", () => expect(typeof server_sentInit("  X ")).toBe("string"));
test("server_sentRun", () => expect(server_sentRun(1)).toBe(true));
