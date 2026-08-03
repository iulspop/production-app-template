import { useState } from "react";
import { useSubmit } from "react-router";

import type { Route } from "./+types/login";
import { authAction } from "~/features/auth/application/adapters/auth-action.server";
import { getUserIdFromContext } from "~/features/auth/application/adapters/auth-middleware.server";
import { LoginPageComponent } from "~/features/auth/application/adapters/login-page";
import { SEND_MAGIC_LINK_INTENT } from "~/features/auth/domain/auth-constants";
import type { UserValidationError } from "~/features/users/domain/users-domain";
import {
  isUserValidationError,
  userValidationErrorToMessage,
} from "~/features/users/domain/users-domain";

export const meta: Route.MetaFunction = () => [{ title: "Log in" }];

export async function loader({ context }: Route.LoaderArgs) {
  const userId = getUserIdFromContext(context);
  if (userId)
    throw new Response(null, { headers: { Location: "/" }, status: 302 });
  return null;
}

export async function action(args: Route.ActionArgs) {
  return await authAction(args);
}

export default function LoginRoute({ actionData }: Route.ComponentProps) {
  const submit = useSubmit();
  const [isPending, setIsPending] = useState(false);
  const error =
    actionData?.success === false
      ? isUserValidationError(actionData.error)
        ? userValidationErrorToMessage(actionData.error as UserValidationError)
        : actionData.error
      : null;

  return (
    <LoginPageComponent
      error={error}
      isPending={isPending}
      onSubmit={(event) => {
        event.preventDefault();
        setIsPending(true);
        const formData = new FormData(event.currentTarget);
        formData.set("intent", SEND_MAGIC_LINK_INTENT);
        submit(formData, { method: "post" });
      }}
    />
  );
}
