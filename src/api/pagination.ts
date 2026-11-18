export interface Page<T> { items: T[]; next?: string; }
export function emptyPage<T>(): Page<T> { return { items: [] }; }
