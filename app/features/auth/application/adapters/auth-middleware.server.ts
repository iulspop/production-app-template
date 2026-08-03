import { getAuth } from "@clerk/react-router/ssr.server";
import type { MiddlewareFunction, RouterContextProvider } from "react-router";
import { createContext } from "react-router";

import type { AuthMiddlewarePort } from "../ports/auth-middleware";
import { getUserId } from "./auth-session.server";
import { retrieveUserFromDatabaseByClerkId } from "~/features/users/infrastructure/adapters/users-model.server";

const authUserIdContext = createContext<string | null>();

export const isClerkEnabled = () => Boolean(process.env.CLERK_SECRET_KEY);

/**
 * Resolves the local user ID from a Clerk-authenticated request.
 */
const getClerkUserId = async (
  args: Parameters<MiddlewareFunction>[0],
): Promise<string | null> => {
  const { userId: clerkId } = await getAuth(args as never);
  if (!clerkId) return null;

  const user = await retrieveUserFromDatabaseByClerkId(clerkId);
  return user?.id ?? null;
};

/**
 * React Router middleware that resolves the authenticated user ID
 * from either Clerk or the session cookie, depending on configuration.
 */
export const authMiddleware: MiddlewareFunction = async (args, next) => {
  const userId = isClerkEnabled()
    ? await getClerkUserId(args)
    : await getUserId(args.request);
  args.context.set(authUserIdContext, userId);
  return next();
};

/**
 * Reads the authenticated user ID from the middleware-populated context.
 */
export const getUserIdFromContext = (
  context: Readonly<RouterContextProvider>,
): string | null => context.get(authUserIdContext) ?? null;

export const authMiddlewareAdapter: AuthMiddlewarePort = {
  getUserId: getUserIdFromContext,
  handle: authMiddleware,
  isClerkEnabled,
};
