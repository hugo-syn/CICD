import { expect, test } from "bun:test";
import { Queue } from "../src/lib/queue";
test("queue", () => { const q = new Queue<number>(); q.push(1); expect(q.size).toBe(1); });
