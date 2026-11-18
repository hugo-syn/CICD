type Handler = (...args: unknown[]) => void;
export class Emitter {
  private map = new Map<string, Handler[]>();
  on(event: string, fn: Handler) { (this.map.get(event) ?? this.map.set(event, []).get(event)!).push(fn); }
  emit(event: string, ...args: unknown[]) { for (const fn of this.map.get(event) ?? []) fn(...args); }
}
