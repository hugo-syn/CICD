export interface Account {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export function isNew(item: Account): boolean {
  return item.createdAt === item.updatedAt;
}
