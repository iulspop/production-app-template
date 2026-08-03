import { useUser } from "@clerk/react-router";
import { useState } from "react";
import { useNavigate, useSubmit } from "react-router";

import type { Route } from "./+types/onboarding";
import { authAction } from "~/features/auth/application/adapters/auth-action.server";
import {
  getUserIdFromContext,
  isClerkEnabled,
} from "~/features/auth/application/adapters/auth-middleware.server";
import { extractClerkError } from "~/features/auth/application/adapters/clerk-error";
import { OnboardingPageComponent } from "~/features/auth/application/adapters/onboarding-page";
import { ONBOARD_INTENT } from "~/features/auth/domain/auth-constants";
import type { UserValidationError } from "~/features/users/domain/users-domain";
import {
  isUserValidationError,
  userValidationErrorToMessage,
} from "~/features/users/domain/users-domain";

export const meta: Route.MetaFunction = () => [{ title: "Welcome" }];

export async function loader({ context, request }: Route.LoaderArgs) {
  const clerkEnabled = isClerkEnabled();

  // In dev mode, only anonymous users reach onboarding.
  // In Clerk mode, user is authenticated but completing profile setup.
  if (!clerkEnabled) {
    const userId = getUserIdFromContext(context);
    if (userId)
      throw new Response(null, { headers: { Location: "/" }, status: 302 });
  }

  const url = new URL(request.url);
  return {
    email: url.searchParams.get("email") ?? "",
    isClerkEnabled: clerkEnabled,
  };
}

export async function action(args: Route.ActionArgs) {
  return await authAction(args);
}

function DevOnboardContainer({
  actionData,
  email,
}: {
  actionData: Route.ComponentProps["actionData"];
  email: string;
}) {
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
      onSubmit={(e) => {
        e.preventDefault();
        setIsPending(true);
        const fd = new FormData(e.currentTarget);
        fd.set("intent", ONBOARD_INTENT);
        fd.set("email", email);
        submit(fd, { method: "post" });
      }}
    />
  );
}

function ClerkOnboardContainer() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  return (
    <OnboardingPageComponent
      error={error}
      isPending={isPending}
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setIsPending(true);

        const fd = new FormData(e.currentTarget);
        const name = fd.get("name") as string;
        const [firstName = "", ...rest] = name.trim().split(" ");
        const lastName = rest.join(" ");

        try {
          await user?.update({ firstName, lastName: lastName || undefined });
          navigate("/");
        } catch (err) {
          setError(extractClerkError(err));
        } finally {
          setIsPending(false);
        }
      }}
    />
  );
}

export default function OnboardingRoute({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  if (loaderData.isClerkEnabled) return <ClerkOnboardContainer />;
  return (
    <DevOnboardContainer actionData={actionData} email={loaderData.email} />
  );
}
