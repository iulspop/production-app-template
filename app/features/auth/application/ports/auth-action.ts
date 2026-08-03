export interface AuthActionPort {
  handle({ request }: { request: Request }): Promise<unknown>;
}
