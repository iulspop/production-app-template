import { useState } from "react";
import { useSubmit } from "react-router";

import type { Route } from "./+types/onboarding";
import { authAction } from "~/features/auth/application/adapters/auth-action.server";
import { getUserIdFromContext } from "~/features/auth/application/adapters/auth-middleware.server";
import { OnboardingPageComponent } from "~/features/auth/application/adapters/onboarding-page";
import { ONBOARD_INTENT } from "~/features/auth/domain/auth-constants";
import type { UserValidationError } from "~/features/users/domain/users-domain";
import {
  isUserValidationError,
  userValidationErrorToMessage,
} from "~/features/users/domain/users-domain";

export const meta: Route.MetaFunction = () => [{ title: "Welcome" }];

export async function loader({ context, request }: Route.LoaderArgs) {
  const userId = getUserIdFromContext(context);
  if (userId)
    throw new Response(null, { headers: { Location: "/" }, status: 302 });

  const url = new URL(request.url);
  return { email: url.searchParams.get("email") ?? "" };
}

export async function action(args: Route.ActionArgs) {
  return await authAction(args);
}

export default function OnboardingRoute({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const submit = useSubmit();
  const [isPending, setIsPending] = useState(false);
  const error =
    actionData?.success === false
      ? isUserValidationError(actionData.error)
        ? userValidationErrorToMessage(actionData.error as UserValidationError)
        : actionData.error
      : null;

  return (
    <OnboardingPageComponent
      error={error}
      isPending={isPending}
      onSubmit={(event) => {
        event.preventDefault();
        setIsPending(true);
        const formData = new FormData(event.currentTarget);
        formData.set("intent", ONBOARD_INTENT);
        formData.set("email", loaderData.email);
        submit(formData, { method: "post" });
      }}
    />
  );
}
