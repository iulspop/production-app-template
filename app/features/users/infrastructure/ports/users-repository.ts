export type UserRecord = {
  clerkId: string | null;
  email: string;
  id: string;
  name: string;
};

export type SaveUser = Pick<UserRecord, "email" | "name"> &
  Partial<Pick<UserRecord, "clerkId">>;
export type UpdateUser = Pick<UserRecord, "email" | "name">;

export interface UsersRepositoryPort {
  retrieveByClerkId(clerkId: string): Promise<UserRecord | null>;
  retrieveByEmail(email: string): Promise<UserRecord | null>;
  retrieveById(id: string): Promise<UserRecord | null>;
  save(user: SaveUser): Promise<UserRecord>;
  updateByClerkId(clerkId: string, user: UpdateUser): Promise<UserRecord>;
}
