import type { MiddlewareFunction, RouterContextProvider } from "react-router";
import { createContext } from "react-router";

import type { AuthMiddlewarePort } from "../ports/auth-middleware";
import { getUserId } from "./auth-session.server";

const authUserIdContext = createContext<string | null>();

/**
 * React Router middleware that resolves the authenticated user ID.
 */
export const authMiddleware: MiddlewareFunction = async (args, next) => {
  const userId = await getUserId(args.request);
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
};
