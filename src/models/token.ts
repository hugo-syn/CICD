export interface Token {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export function isNew(item: Token): boolean {
  return item.createdAt === item.updatedAt;
}
