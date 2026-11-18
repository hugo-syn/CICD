export class Pool {
  constructor(private limit = 8) {}
  async run<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
    const out: T[] = [];
    for (const t of tasks) out.push(await t());
    return out;
  }
}
