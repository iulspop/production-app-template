import { ClerkProvider, SignedIn, UserButton } from "@clerk/react-router";
import { rootAuthLoader } from "@clerk/react-router/ssr.server";
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
  isClerkEnabled,
} from "./features/auth/application/auth-middleware.server";
import { ClientHintCheck, getHints } from "./utils/client-hints";

export const middleware = [authMiddleware];

export async function loader(args: Route.LoaderArgs) {
  const userId = getUserIdFromContext(args.context);
  const baseData = {
    isClerkEnabled: isClerkEnabled(),
    requestInfo: { hints: getHints(args.request) },
    userId,
  };

  if (isClerkEnabled()) {
    return rootAuthLoader(args as never, () => baseData, {
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    });
  }

  return data(baseData);
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

function AppContent({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <header className="flex items-center justify-end p-4">
        {loaderData.isClerkEnabled ? (
          <SignedIn>
            <UserButton />
          </SignedIn>
        ) : (
          loaderData.userId && (
            <Form action="/logout" method="post">
              <Button size="sm" type="submit" variant="ghost">
                Log out
              </Button>
            </Form>
          )
        )}
      </header>
      <Outlet />
    </>
  );
}

export default function App(props: Route.ComponentProps) {
  if (props.loaderData.isClerkEnabled) {
    return (
      <ClerkProvider loaderData={props.loaderData}>
        <AppContent {...props} />
      </ClerkProvider>
    );
  }

  return <AppContent {...props} />;
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
