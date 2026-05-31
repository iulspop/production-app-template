import { useSignIn, useSignUp } from "@clerk/react-router";
import { useState } from "react";
import { useNavigate, useSubmit } from "react-router";

import type { Route } from "./+types/verify";
import { authAction } from "~/features/auth/application/auth-action.server";
import {
  getUserIdFromContext,
  isClerkEnabled,
} from "~/features/auth/application/auth-middleware.server";
import { extractClerkError } from "~/features/auth/application/clerk-error";
import { VerifyPageComponent } from "~/features/auth/application/verify-page";
import { VERIFY_CODE_INTENT } from "~/features/auth/domain/auth-constants";

export const meta: Route.MetaFunction = () => [{ title: "Verify" }];

export async function loader({ context, request }: Route.LoaderArgs) {
  const userId = getUserIdFromContext(context);
  if (userId)
    throw new Response(null, { headers: { Location: "/" }, status: 302 });

  const url = new URL(request.url);
  return {
    isClerkEnabled: isClerkEnabled(),
    mode: url.searchParams.get("mode") ?? "",
    target: url.searchParams.get("target") ?? "",
    type: url.searchParams.get("type") ?? "",
  };
}

export async function action(args: Route.ActionArgs) {
  return await authAction(args);
}

function DevVerifyContainer({
  actionData,
  target,
  type,
}: {
  actionData: Route.ComponentProps["actionData"];
  target: string;
  type: string;
}) {
  const submit = useSubmit();
  const [isPending, setIsPending] = useState(false);

  const error = actionData?.success === false ? actionData.error : null;

  return (
    <VerifyPageComponent
      error={error}
      isPending={isPending}
      onSubmit={(e) => {
        e.preventDefault();
        setIsPending(true);
        const fd = new FormData(e.currentTarget);
        fd.set("intent", VERIFY_CODE_INTENT);
        fd.set("type", type);
        fd.set("target", target);
        submit(fd, { method: "post" });
      }}
      target={target}
    />
  );
}

function ClerkVerifyContainer({
  mode,
  target,
}: {
  mode: string;
  target: string;
}) {
  const {
    signIn,
    setActive: setSignInActive,
    isLoaded: isSignInLoaded,
  } = useSignIn();
  const {
    signUp,
    setActive: setSignUpActive,
    isLoaded: isSignUpLoaded,
  } = useSignUp();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  return (
    <VerifyPageComponent
      error={error}
      isPending={isPending}
      onSubmit={async (e) => {
        e.preventDefault();
        if (!isSignInLoaded || !isSignUpLoaded) return;
        setError(null);
        setIsPending(true);

        const fd = new FormData(e.currentTarget);
        const code = fd.get("code") as string;

        try {
          if (mode === "sign-in") {
            const result = await signIn.attemptFirstFactor({
              code,
              strategy: "email_code",
            });
            if (result.status === "complete" && result.createdSessionId) {
              await setSignInActive({ session: result.createdSessionId });
              navigate("/");
            }
          } else {
            const result = await signUp.attemptEmailAddressVerification({
              code,
            });
            if (result.status === "complete" && result.createdSessionId) {
              await setSignUpActive({ session: result.createdSessionId });
              navigate(`/onboarding?${new URLSearchParams({ email: target })}`);
            }
          }
        } catch (err) {
          setError(extractClerkError(err));
        } finally {
          setIsPending(false);
        }
      }}
      target={target}
    />
  );
}

export default function VerifyRoute({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  if (loaderData.isClerkEnabled) {
    return (
      <ClerkVerifyContainer mode={loaderData.mode} target={loaderData.target} />
    );
  }
  return (
    <DevVerifyContainer
      actionData={actionData}
      target={loaderData.target}
      type={loaderData.type}
    />
  );
}
