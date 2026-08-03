import type { MiddlewareFunction, RouterContextProvider } from "react-router";

export interface AuthMiddlewarePort {
  getUserId(context: Readonly<RouterContextProvider>): string | null;
  handle: MiddlewareFunction;
}
