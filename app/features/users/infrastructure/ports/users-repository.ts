export type UserRecord = {
  email: string;
  id: string;
  name: string;
};

export type SaveUser = Pick<UserRecord, "email" | "name">;

export interface UsersRepositoryPort {
  retrieveByEmail(email: string): Promise<UserRecord | null>;
  retrieveById(id: string): Promise<UserRecord | null>;
  save(user: SaveUser): Promise<UserRecord>;
}
