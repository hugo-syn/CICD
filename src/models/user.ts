export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export function isNew(item: User): boolean {
  return item.createdAt === item.updatedAt;
}
