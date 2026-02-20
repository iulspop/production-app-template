/**
 * Extracts a human-readable message from a Clerk API error.
 */
export const extractClerkError = (err: unknown): string => {
  const clerkErr = err as { errors?: Array<{ longMessage?: string }> };
  return clerkErr.errors?.[0]?.longMessage ?? "Something went wrong.";
};
