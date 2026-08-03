import { redirect } from "react-router";

import type { Route } from "./+types/logout";
import { isClerkEnabled } from "~/features/auth/application/adapters/auth-middleware.server";
import { destroyUserSession } from "~/features/auth/application/adapters/auth-session.server";

export async function loader() {
  return redirect("/");
}

export async function action({ request }: Route.ActionArgs) {
  if (isClerkEnabled()) {
    // Clerk handles sign-out client-side via UserButton; redirect to home
    return redirect("/");
  }

  const setCookie = await destroyUserSession(request);
  return redirect("/login", {
    headers: { "Set-Cookie": setCookie },
  });
}
