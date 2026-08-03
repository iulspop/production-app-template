import { useState } from "react";
import { useSubmit } from "react-router";

import type { Route } from "./+types/verify";
import { authAction } from "~/features/auth/application/adapters/auth-action.server";
import { getUserIdFromContext } from "~/features/auth/application/adapters/auth-middleware.server";
import { VerifyPageComponent } from "~/features/auth/application/adapters/verify-page";
import { VERIFY_CODE_INTENT } from "~/features/auth/domain/auth-constants";

export const meta: Route.MetaFunction = () => [{ title: "Verify" }];

export async function loader({ context, request }: Route.LoaderArgs) {
  const userId = getUserIdFromContext(context);
  if (userId)
    throw new Response(null, { headers: { Location: "/" }, status: 302 });

  const url = new URL(request.url);
  return {
    target: url.searchParams.get("target") ?? "",
    type: url.searchParams.get("type") ?? "",
  };
}

export async function action(args: Route.ActionArgs) {
  return await authAction(args);
}

export default function VerifyRoute({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const submit = useSubmit();
  const [isPending, setIsPending] = useState(false);
  const error = actionData?.success === false ? actionData.error : null;

  return (
    <VerifyPageComponent
      error={error}
      isPending={isPending}
      onSubmit={(event) => {
        event.preventDefault();
        setIsPending(true);
        const formData = new FormData(event.currentTarget);
        formData.set("intent", VERIFY_CODE_INTENT);
        formData.set("type", loaderData.type);
        formData.set("target", loaderData.target);
        submit(formData, { method: "post" });
      }}
      target={loaderData.target}
    />
  );
}
