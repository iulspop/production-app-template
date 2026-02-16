import type { Route } from "./+types/login";
import { authAction } from "~/features/auth/application/auth-action.server";
import { requireAnonymous } from "~/features/auth/application/auth-session.server";
import { LoginPageComponent } from "~/features/auth/application/login-page";

export const meta: Route.MetaFunction = () => [{ title: "Log in" }];

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);
  return {};
}

export async function action(args: Route.ActionArgs) {
  return await authAction(args);
}

export default function LoginRoute({ actionData }: Route.ComponentProps) {
  return <LoginPageComponent actionData={actionData} />;
}
