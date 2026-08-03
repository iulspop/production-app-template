export type SessionRecord = {
  expirationDate: Date;
  id: string;
  userId: string;
};

export type SaveSession = {
  expirationDate: Date;
  user: { connect: { id: string } };
};

export interface SessionsRepositoryPort {
  deleteById(id: string): Promise<SessionRecord>;
  retrieveWithUserById(id: string): Promise<SessionRecord | null>;
  save(session: SaveSession): Promise<SessionRecord>;
}
