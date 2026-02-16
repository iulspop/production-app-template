import {
  data,
  Form,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

import { Button } from "./components/ui/button";
import {
  authMiddleware,
  getUserIdFromContext,
} from "./features/auth/application/auth-middleware.server";
import { ClientHintCheck, getHints } from "./utils/client-hints";

export const middleware = [authMiddleware];

export async function loader({ context, request }: Route.LoaderArgs) {
  const userId = getUserIdFromContext(context);
  return data({
    requestInfo: {
      hints: getHints(request),
    },
    userId,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="system" lang="en">
      <head>
        <ClientHintCheck />
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <>
      {loaderData.userId && (
        <header className="flex items-center justify-end p-4">
          <Form action="/logout" method="post">
            <Button size="sm" type="submit" variant="ghost">
              Log out
            </Button>
          </Form>
        </header>
      )}
      <Outlet />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
