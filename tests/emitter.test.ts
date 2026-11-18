import { expect, test } from "bun:test";
import { Emitter } from "../src/lib/eventemitter";
test("emitter", () => { let n = 0; const e = new Emitter(); e.on("x", () => n++); e.emit("x"); expect(n).toBe(1); });
