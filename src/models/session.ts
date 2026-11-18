export interface Session {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export function isNew(item: Session): boolean {
  return item.createdAt === item.updatedAt;
}
