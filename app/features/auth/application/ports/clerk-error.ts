export interface ClerkErrorPort {
  extract(error: unknown): string;
}
