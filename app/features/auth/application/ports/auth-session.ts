export interface AuthSessionPort {
  create(userId: string): Promise<string>;
  destroy(request: Request): Promise<string>;
  getUserId(request: Request): Promise<string | null>;
  requireAnonymous(request: Request): Promise<void>;
  requireUserId(request: Request): Promise<string>;
}
