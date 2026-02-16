import type { Route } from "./+types/onboarding";
import { authAction } from "~/features/auth/application/auth-action.server";
import { requireAnonymous } from "~/features/auth/application/auth-session.server";
import { OnboardingPageComponent } from "~/features/auth/application/onboarding-page";

export const meta: Route.MetaFunction = () => [{ title: "Welcome" }];

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);

  const url = new URL(request.url);
  const email = url.searchParams.get("email") ?? "";

  return { email };
}

export async function action(args: Route.ActionArgs) {
  return await authAction(args);
}

export default function OnboardingRoute({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  return (
    <OnboardingPageComponent actionData={actionData} email={loaderData.email} />
  );
}
